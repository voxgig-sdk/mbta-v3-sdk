<?php
declare(strict_types=1);

// Shape entity test

require_once __DIR__ . '/../mbtav3_sdk.php';
require_once __DIR__ . '/Runner.php';

use PHPUnit\Framework\TestCase;
use Voxgig\Struct\Struct as Vs;

class ShapeEntityTest extends TestCase
{
    public function test_create_instance(): void
    {
        $testsdk = MbtaV3SDK::test(null, null);
        $ent = $testsdk->Shape(null);
        $this->assertNotNull($ent);
    }

    public function test_basic_flow(): void
    {
        $setup = shape_basic_setup(null);
        // Per-op sdk-test-control.json skip.
        $_live = !empty($setup["live"]);
        foreach (["load"] as $_op) {
            [$_shouldSkip, $_reason] = Runner::is_control_skipped("entityOp", "shape." . $_op, $_live ? "live" : "unit");
            if ($_shouldSkip) {
                $this->markTestSkipped($_reason ?? "skipped via sdk-test-control.json");
                return;
            }
        }
        // The basic flow consumes synthetic IDs from the fixture. In live mode
        // without an *_ENTID env override, those IDs hit the live API and 4xx.
        if (!empty($setup["synthetic_only"])) {
            $this->markTestSkipped("live entity test uses synthetic IDs from fixture — set MBTA_V3_TEST_SHAPE_ENTID JSON to run live");
            return;
        }
        $client = $setup["client"];

        // Bootstrap entity data from existing test data.
        $shape_ref01_data_raw = Vs::items(Helpers::to_map(
            Vs::getpath($setup["data"], "existing.shape")));
        $shape_ref01_data = null;
        if (count($shape_ref01_data_raw) > 0) {
            $shape_ref01_data = Helpers::to_map($shape_ref01_data_raw[0][1]);
        }

        // LOAD
        $shape_ref01_ent = $client->Shape(null);
        $shape_ref01_match_dt0 = [];
        $shape_ref01_data_dt0_loaded = $shape_ref01_ent->load($shape_ref01_match_dt0, null);
        $this->assertNotNull($shape_ref01_data_dt0_loaded);

    }
}

function shape_basic_setup($extra)
{
    Runner::load_env_local();

    $entity_data_file = __DIR__ . '/../../.sdk/test/entity/shape/ShapeTestData.json';
    $entity_data_source = file_get_contents($entity_data_file);
    $entity_data = json_decode($entity_data_source, true);

    $options = [];
    $options["entity"] = $entity_data["existing"];

    $client = MbtaV3SDK::test($options, $extra);

    // Generate idmap.
    $idmap = [];
    foreach (["shape01", "shape02", "shape03"] as $k) {
        $idmap[$k] = strtoupper($k);
    }

    // Detect ENTID env override before envOverride consumes it. When live
    // mode is on without a real override, the basic test runs against synthetic
    // IDs from the fixture and 4xx's. Surface this so the test can skip.
    $entid_env_raw = getenv("MBTA_V3_TEST_SHAPE_ENTID");
    $idmap_overridden = $entid_env_raw !== false && str_starts_with(trim($entid_env_raw), "{");

    $env = Runner::env_override([
        "MBTA_V3_TEST_SHAPE_ENTID" => $idmap,
        "MBTA_V3_TEST_LIVE" => "FALSE",
        "MBTA_V3_TEST_EXPLAIN" => "FALSE",
        "MBTA_V3_APIKEY" => "NONE",
    ]);

    $idmap_resolved = Helpers::to_map(
        $env["MBTA_V3_TEST_SHAPE_ENTID"]);
    if ($idmap_resolved === null) {
        $idmap_resolved = Helpers::to_map($idmap);
    }

    if ($env["MBTA_V3_TEST_LIVE"] === "TRUE") {
        $merged_opts = Vs::merge([
            [
                "apikey" => $env["MBTA_V3_APIKEY"],
            ],
            $extra ?? [],
        ]);
        $client = new MbtaV3SDK(Helpers::to_map($merged_opts));
    }

    $live = $env["MBTA_V3_TEST_LIVE"] === "TRUE";
    return [
        "client" => $client,
        "data" => $entity_data,
        "idmap" => $idmap_resolved,
        "env" => $env,
        "explain" => $env["MBTA_V3_TEST_EXPLAIN"] === "TRUE",
        "live" => $live,
        "synthetic_only" => $live && !$idmap_overridden,
        "now" => (int)(microtime(true) * 1000),
    ];
}
