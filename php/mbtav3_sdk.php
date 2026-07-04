<?php
declare(strict_types=1);

// MbtaV3 SDK

require_once __DIR__ . '/utility/struct/Struct.php';
require_once __DIR__ . '/core/UtilityType.php';
require_once __DIR__ . '/core/Spec.php';
require_once __DIR__ . '/core/Helpers.php';

// Load utility registration
require_once __DIR__ . '/utility/Register.php';

// Load config and features
require_once __DIR__ . '/config.php';
require_once __DIR__ . '/feature/BaseFeature.php';
require_once __DIR__ . '/features.php';

use Voxgig\Struct\Struct;

class MbtaV3SDK
{
    public string $mode;
    public array $features;
    public ?array $options;

    private $_utility;
    private $_rootctx;

    public function __construct(array $options = [])
    {
        $this->mode = "live";
        $this->features = [];
        $this->options = null;

        $utility = new MbtaV3Utility();
        $this->_utility = $utility;

        $config = MbtaV3Config::make_config();

        $this->_rootctx = ($utility->make_context)([
            "client" => $this,
            "utility" => $utility,
            "config" => $config,
            "options" => $options ?? [],
            "shared" => [],
        ], null);

        $this->options = ($utility->make_options)($this->_rootctx);

        if (Struct::getpath($this->options, "feature.test.active") === true) {
            $this->mode = "test";
        }

        $this->_rootctx->options = $this->options;

        // Add features from config.
        $feature_opts = MbtaV3Helpers::to_map(Struct::getprop($this->options, "feature"));
        if ($feature_opts) {
            $items = Struct::items($feature_opts);
            if ($items) {
                foreach ($items as $item) {
                    $fname = $item[0];
                    $fopts = MbtaV3Helpers::to_map($item[1]);
                    if ($fopts && isset($fopts["active"]) && $fopts["active"] === true) {
                        ($utility->feature_add)($this->_rootctx, MbtaV3Features::make_feature($fname));
                    }
                }
            }
        }

        // Add extension features.
        $extend_val = Struct::getprop($this->options, "extend");
        if (is_array($extend_val)) {
            foreach ($extend_val as $f) {
                if (is_object($f) && method_exists($f, 'get_name')) {
                    ($utility->feature_add)($this->_rootctx, $f);
                }
            }
        }

        // Initialize features.
        foreach ($this->features as $f) {
            ($utility->feature_init)($this->_rootctx, $f);
        }

        ($utility->feature_hook)($this->_rootctx, "PostConstruct");
    }

    public function options_map(): array
    {
        $out = Struct::clone($this->options);
        return is_array($out) ? $out : [];
    }

    public function get_utility()
    {
        return MbtaV3Utility::copy($this->_utility);
    }

    public function get_root_ctx()
    {
        return $this->_rootctx;
    }

    public function prepare(array $fetchargs = []): mixed
    {
        $utility = $this->_utility;
        $fetchargs = $fetchargs ?? [];

        $ctrl = MbtaV3Helpers::to_map(Struct::getprop($fetchargs, "ctrl")) ?? [];

        $ctx = ($utility->make_context)([
            "opname" => "prepare",
            "ctrl" => $ctrl,
        ], $this->_rootctx);

        $opts = $this->options;
        $path = Struct::getprop($fetchargs, "path") ?? "";
        $path = is_string($path) ? $path : "";
        $method_val = Struct::getprop($fetchargs, "method") ?? "GET";
        $method_val = is_string($method_val) ? $method_val : "GET";
        $params = MbtaV3Helpers::to_map(Struct::getprop($fetchargs, "params")) ?? [];
        $query = MbtaV3Helpers::to_map(Struct::getprop($fetchargs, "query")) ?? [];
        $headers = ($utility->prepare_headers)($ctx);

        $base = Struct::getprop($opts, "base") ?? "";
        $base = is_string($base) ? $base : "";
        $prefix = Struct::getprop($opts, "prefix") ?? "";
        $prefix = is_string($prefix) ? $prefix : "";
        $suffix = Struct::getprop($opts, "suffix") ?? "";
        $suffix = is_string($suffix) ? $suffix : "";

        $ctx->spec = new MbtaV3Spec([
            "base" => $base, "prefix" => $prefix, "suffix" => $suffix,
            "path" => $path, "method" => $method_val,
            "params" => $params, "query" => $query, "headers" => $headers,
            "body" => Struct::getprop($fetchargs, "body"),
            "step" => "start",
        ]);

        // Merge user-provided headers.
        $uh = Struct::getprop($fetchargs, "headers");
        if (is_array($uh)) {
            foreach ($uh as $k => $v) {
                $ctx->spec->headers[$k] = $v;
            }
        }

        [$_, $err] = ($utility->prepare_auth)($ctx);
        if ($err) {
            return ($utility->make_error)($ctx, $err);
        }

        [$fetchdef, $fd_err] = ($utility->make_fetch_def)($ctx);
        if ($fd_err) {
            return ($utility->make_error)($ctx, $fd_err);
        }
        return $fetchdef;
    }

    public function direct(array $fetchargs = []): mixed
    {
        $utility = $this->_utility;

        // direct() is the raw-HTTP escape hatch: it never throws, it returns
        // an {ok, err, ...} dict. prepare() now raises on error, so catch it
        // and surface the failure through the dict instead.
        try {
            $fetchdef = $this->prepare($fetchargs);
        } catch (\Throwable $err) {
            return ["ok" => false, "err" => $err];
        }

        $fetchargs = $fetchargs ?? [];
        $ctrl = MbtaV3Helpers::to_map(Struct::getprop($fetchargs, "ctrl")) ?? [];

        $ctx = ($utility->make_context)([
            "opname" => "direct",
            "ctrl" => $ctrl,
        ], $this->_rootctx);

        $url = $fetchdef["url"] ?? "";
        [$fetched, $fetch_err] = ($utility->fetcher)($ctx, $url, $fetchdef);

        if ($fetch_err) {
            return ["ok" => false, "err" => $fetch_err];
        }

        if ($fetched === null) {
            return [
                "ok" => false,
                "err" => $ctx->make_error("direct_no_response", "response: undefined"),
            ];
        }

        if (is_array($fetched)) {
            $status = MbtaV3Helpers::to_int(Struct::getprop($fetched, "status"));
            $headers = Struct::getprop($fetched, "headers") ?? [];

            // No-body responses (204, 304) and explicit zero content-length
            // must skip JSON parsing — calling json() on an empty body errors.
            $content_length = is_array($headers) ? ($headers["content-length"] ?? null) : null;
            $no_body = $status === 204 || $status === 304 || (string)$content_length === "0";

            $json_data = null;
            if (!$no_body) {
                $jf = Struct::getprop($fetched, "json");
                if (is_callable($jf)) {
                    try {
                        $json_data = $jf();
                    } catch (\Throwable $e) {
                        // Non-JSON body — leave data null but keep status/ok.
                        $json_data = null;
                    }
                }
            }

            return [
                "ok" => $status >= 200 && $status < 300,
                "status" => $status,
                "headers" => Struct::getprop($fetched, "headers"),
                "data" => $json_data,
            ];
        }

        return [
            "ok" => false,
            "err" => $ctx->make_error("direct_invalid", "invalid response type"),
        ];
    }


    private $_alert = null;

    // Idiomatic facade: $client->alert()->list() / ->load(["id" => ...]).
    // Also serves the deprecated PascalCase alias Alert() (PHP method
    // names are case-insensitive).
    public function alert($data = null)
    {
        require_once __DIR__ . '/entity/alert_entity.php';
        if ($data === null) {
            if ($this->_alert === null) {
                $this->_alert = new AlertEntity($this, null);
            }
            return $this->_alert;
        }
        return new AlertEntity($this, $data);
    }


    private $_facility = null;

    // Idiomatic facade: $client->facility()->list() / ->load(["id" => ...]).
    // Also serves the deprecated PascalCase alias Facility() (PHP method
    // names are case-insensitive).
    public function facility($data = null)
    {
        require_once __DIR__ . '/entity/facility_entity.php';
        if ($data === null) {
            if ($this->_facility === null) {
                $this->_facility = new FacilityEntity($this, null);
            }
            return $this->_facility;
        }
        return new FacilityEntity($this, $data);
    }


    private $_line = null;

    // Idiomatic facade: $client->line()->list() / ->load(["id" => ...]).
    // Also serves the deprecated PascalCase alias Line() (PHP method
    // names are case-insensitive).
    public function line($data = null)
    {
        require_once __DIR__ . '/entity/line_entity.php';
        if ($data === null) {
            if ($this->_line === null) {
                $this->_line = new LineEntity($this, null);
            }
            return $this->_line;
        }
        return new LineEntity($this, $data);
    }


    private $_prediction = null;

    // Idiomatic facade: $client->prediction()->list() / ->load(["id" => ...]).
    // Also serves the deprecated PascalCase alias Prediction() (PHP method
    // names are case-insensitive).
    public function prediction($data = null)
    {
        require_once __DIR__ . '/entity/prediction_entity.php';
        if ($data === null) {
            if ($this->_prediction === null) {
                $this->_prediction = new PredictionEntity($this, null);
            }
            return $this->_prediction;
        }
        return new PredictionEntity($this, $data);
    }


    private $_route = null;

    // Idiomatic facade: $client->route()->list() / ->load(["id" => ...]).
    // Also serves the deprecated PascalCase alias Route() (PHP method
    // names are case-insensitive).
    public function route($data = null)
    {
        require_once __DIR__ . '/entity/route_entity.php';
        if ($data === null) {
            if ($this->_route === null) {
                $this->_route = new RouteEntity($this, null);
            }
            return $this->_route;
        }
        return new RouteEntity($this, $data);
    }


    private $_route_pattern = null;

    // Idiomatic facade: $client->route_pattern()->list() / ->load(["id" => ...]).
    // Also serves the deprecated PascalCase alias RoutePattern() (PHP method
    // names are case-insensitive).
    public function route_pattern($data = null)
    {
        require_once __DIR__ . '/entity/route_pattern_entity.php';
        if ($data === null) {
            if ($this->_route_pattern === null) {
                $this->_route_pattern = new RoutePatternEntity($this, null);
            }
            return $this->_route_pattern;
        }
        return new RoutePatternEntity($this, $data);
    }


    private $_schedule = null;

    // Idiomatic facade: $client->schedule()->list() / ->load(["id" => ...]).
    // Also serves the deprecated PascalCase alias Schedule() (PHP method
    // names are case-insensitive).
    public function schedule($data = null)
    {
        require_once __DIR__ . '/entity/schedule_entity.php';
        if ($data === null) {
            if ($this->_schedule === null) {
                $this->_schedule = new ScheduleEntity($this, null);
            }
            return $this->_schedule;
        }
        return new ScheduleEntity($this, $data);
    }


    private $_service = null;

    // Idiomatic facade: $client->service()->list() / ->load(["id" => ...]).
    // Also serves the deprecated PascalCase alias Service() (PHP method
    // names are case-insensitive).
    public function service($data = null)
    {
        require_once __DIR__ . '/entity/service_entity.php';
        if ($data === null) {
            if ($this->_service === null) {
                $this->_service = new ServiceEntity($this, null);
            }
            return $this->_service;
        }
        return new ServiceEntity($this, $data);
    }


    private $_shape = null;

    // Idiomatic facade: $client->shape()->list() / ->load(["id" => ...]).
    // Also serves the deprecated PascalCase alias Shape() (PHP method
    // names are case-insensitive).
    public function shape($data = null)
    {
        require_once __DIR__ . '/entity/shape_entity.php';
        if ($data === null) {
            if ($this->_shape === null) {
                $this->_shape = new ShapeEntity($this, null);
            }
            return $this->_shape;
        }
        return new ShapeEntity($this, $data);
    }


    private $_stop = null;

    // Idiomatic facade: $client->stop()->list() / ->load(["id" => ...]).
    // Also serves the deprecated PascalCase alias Stop() (PHP method
    // names are case-insensitive).
    public function stop($data = null)
    {
        require_once __DIR__ . '/entity/stop_entity.php';
        if ($data === null) {
            if ($this->_stop === null) {
                $this->_stop = new StopEntity($this, null);
            }
            return $this->_stop;
        }
        return new StopEntity($this, $data);
    }


    private $_trip = null;

    // Idiomatic facade: $client->trip()->list() / ->load(["id" => ...]).
    // Also serves the deprecated PascalCase alias Trip() (PHP method
    // names are case-insensitive).
    public function trip($data = null)
    {
        require_once __DIR__ . '/entity/trip_entity.php';
        if ($data === null) {
            if ($this->_trip === null) {
                $this->_trip = new TripEntity($this, null);
            }
            return $this->_trip;
        }
        return new TripEntity($this, $data);
    }


    private $_vehicle = null;

    // Idiomatic facade: $client->vehicle()->list() / ->load(["id" => ...]).
    // Also serves the deprecated PascalCase alias Vehicle() (PHP method
    // names are case-insensitive).
    public function vehicle($data = null)
    {
        require_once __DIR__ . '/entity/vehicle_entity.php';
        if ($data === null) {
            if ($this->_vehicle === null) {
                $this->_vehicle = new VehicleEntity($this, null);
            }
            return $this->_vehicle;
        }
        return new VehicleEntity($this, $data);
    }



    public static function test(?array $testopts = null, ?array $sdkopts = null): self
    {
        $sdkopts = $sdkopts ?? [];
        $sdkopts = Struct::clone($sdkopts);
        $sdkopts = is_array($sdkopts) ? $sdkopts : [];

        $testopts = $testopts ?? [];
        $testopts = Struct::clone($testopts);
        $testopts = is_array($testopts) ? $testopts : [];
        $testopts["active"] = true;

        if (!isset($sdkopts["feature"])) {
            $sdkopts["feature"] = [];
        }
        $sdkopts["feature"]["test"] = $testopts;

        $sdk = new MbtaV3SDK($sdkopts);
        $sdk->mode = "test";
        return $sdk;
    }
}
