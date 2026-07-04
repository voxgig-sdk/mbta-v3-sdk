# MbtaV3 PHP SDK



The PHP SDK for the MbtaV3 API — an entity-oriented client using PHP conventions.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to Packagist. Install it from the
GitHub release tag (`php/vX.Y.Z`):

- Releases: [https://github.com/voxgig-sdk/mbta-v3-sdk/releases](https://github.com/voxgig-sdk/mbta-v3-sdk/releases)


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```php
<?php
require_once 'mbtav3_sdk.php';

$client = new MbtaV3SDK([
    "apikey" => getenv("MBTA_V3_APIKEY"),
]);
```

### 3. Load an alert

```php
try {
    $result = $client->alert()->load(["id" => "example_id"]);
    print_r($result);
} catch (\Exception $err) {
    echo "Error: " . $err->getMessage();
}
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```php
// direct() is the raw-HTTP escape hatch: it returns a result array
// (it does not throw). Branch on $result["ok"].
$result = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example"],
]);

if ($result["ok"]) {
    echo $result["status"];  // 200
    print_r($result["data"]);  // response body
} else {
    echo "Error: " . $result["err"]->getMessage();
}
```

### Prepare a request without sending it

```php
// prepare() throws on error and returns the fetch definition.
$fetchdef = $client->prepare([
    "path" => "/api/resource/{id}",
    "method" => "DELETE",
    "params" => ["id" => "example"],
]);

echo $fetchdef["url"];
echo $fetchdef["method"];
print_r($fetchdef["headers"]);
```

### Use test mode

Create a mock client for unit testing — no server required:

```php
$client = MbtaV3SDK::test();

$result = $client->alert()->load(["id" => "test01"]);
// $result contains mock response data
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```php
$mock_fetch = function ($url, $init) {
    return [
        [
            "status" => 200,
            "statusText" => "OK",
            "headers" => [],
            "json" => function () { return ["id" => "mock01"]; },
        ],
        null,
    ];
};

$client = new MbtaV3SDK([
    "base" => "http://localhost:8080",
    "system" => [
        "fetch" => $mock_fetch,
    ],
]);
```

### Run live tests

Create a `.env.local` file at the project root:

```
MBTA_V3_TEST_LIVE=TRUE
MBTA_V3_APIKEY=<your-key>
```

Then run:

```bash
cd php && ./vendor/bin/phpunit test/
```


## Reference

### MbtaV3SDK

```php
require_once 'mbtav3_sdk.php';
$client = new MbtaV3SDK($options);
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `apikey` | `string` | API key for authentication. |
| `base` | `string` | Base URL of the API server. |
| `prefix` | `string` | URL path prefix prepended to all requests. |
| `suffix` | `string` | URL path suffix appended to all requests. |
| `feature` | `array` | Feature activation flags. |
| `extend` | `array` | Additional Feature instances to load. |
| `system` | `array` | System overrides (e.g. custom `fetch` callable). |

### test

```php
$client = MbtaV3SDK::test($testopts, $sdkopts);
```

Creates a test-mode client with mock transport. Both arguments may be `null`.

### MbtaV3SDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `(): array` | Deep copy of current SDK options. |
| `get_utility` | `(): Utility` | Copy of the SDK utility object. |
| `prepare` | `(array $fetchargs): array` | Build an HTTP request definition without sending. |
| `direct` | `(array $fetchargs): array` | Build and send an HTTP request. |
| `Alert` | `($data): AlertEntity` | Create a Alert entity instance. |
| `Facility` | `($data): FacilityEntity` | Create a Facility entity instance. |
| `Line` | `($data): LineEntity` | Create a Line entity instance. |
| `Prediction` | `($data): PredictionEntity` | Create a Prediction entity instance. |
| `Route` | `($data): RouteEntity` | Create a Route entity instance. |
| `RoutePattern` | `($data): RoutePatternEntity` | Create a RoutePattern entity instance. |
| `Schedule` | `($data): ScheduleEntity` | Create a Schedule entity instance. |
| `Service` | `($data): ServiceEntity` | Create a Service entity instance. |
| `Shape` | `($data): ShapeEntity` | Create a Shape entity instance. |
| `Stop` | `($data): StopEntity` | Create a Stop entity instance. |
| `Trip` | `($data): TripEntity` | Create a Trip entity instance. |
| `Vehicle` | `($data): VehicleEntity` | Create a Vehicle entity instance. |

### Entity interface

All entities share the same interface.

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `($reqmatch, $ctrl): array` | Load a single entity by match criteria. |
| `list` | `($reqmatch, $ctrl): array` | List entities matching the criteria. |
| `create` | `($reqdata, $ctrl): array` | Create a new entity. |
| `update` | `($reqdata, $ctrl): array` | Update an existing entity. |
| `remove` | `($reqmatch, $ctrl): array` | Remove an entity. |
| `data_get` | `(): array` | Get entity data. |
| `data_set` | `($data): void` | Set entity data. |
| `match_get` | `(): array` | Get entity match criteria. |
| `match_set` | `($match): void` | Set entity match criteria. |
| `make` | `(): Entity` | Create a new instance with the same options. |
| `get_name` | `(): string` | Return the entity name. |

### Result shape

Entity operations return the bare result data (an `array` for single-entity
ops, a `list` for `list`) and throw on error. Wrap calls in
`try`/`catch` to handle failures.

The `direct()` escape hatch never throws — it returns a result `array`
you branch on via `$result["ok"]`:

| Key | Type | Description |
| --- | --- | --- |
| `ok` | `bool` | `true` if the HTTP status is 2xx. |
| `status` | `int` | HTTP status code. |
| `headers` | `array` | Response headers. |
| `data` | `mixed` | Parsed JSON response body. |

On error, `ok` is `false` and `$err` contains the error value.

### Entities

#### Alert

| Field | Description |
| --- | --- |

Operations: Load.

API path: `/alerts`

#### Facility

| Field | Description |
| --- | --- |

Operations: Load.

API path: `/facilities`

#### Line

| Field | Description |
| --- | --- |

Operations: Load.

API path: `/lines`

#### Prediction

| Field | Description |
| --- | --- |

Operations: Load.

API path: `/predictions`

#### Route

| Field | Description |
| --- | --- |

Operations: Load.

API path: `/routes`

#### RoutePattern

| Field | Description |
| --- | --- |

Operations: Load.

API path: `/route_patterns`

#### Schedule

| Field | Description |
| --- | --- |

Operations: Load.

API path: `/schedules`

#### Service

| Field | Description |
| --- | --- |

Operations: Load.

API path: `/services`

#### Shape

| Field | Description |
| --- | --- |

Operations: Load.

API path: `/shapes`

#### Stop

| Field | Description |
| --- | --- |

Operations: Load.

API path: `/stops`

#### Trip

| Field | Description |
| --- | --- |

Operations: Load.

API path: `/trips`

#### Vehicle

| Field | Description |
| --- | --- |

Operations: Load.

API path: `/vehicles`



## Entities


### Alert

Create an instance: `const alert = client.alert`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ts
const alert = await client.alert.load({ id: 'alert_id' })
```


### Facility

Create an instance: `const facility = client.facility`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ts
const facility = await client.facility.load({ id: 'facility_id' })
```


### Line

Create an instance: `const line = client.line`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ts
const line = await client.line.load({ id: 'line_id' })
```


### Prediction

Create an instance: `const prediction = client.prediction`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ts
const prediction = await client.prediction.load({ id: 'prediction_id' })
```


### Route

Create an instance: `const route = client.route`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ts
const route = await client.route.load({ id: 'route_id' })
```


### RoutePattern

Create an instance: `const route_pattern = client.route_pattern`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ts
const route_pattern = await client.route_pattern.load({ id: 'route_pattern_id' })
```


### Schedule

Create an instance: `const schedule = client.schedule`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ts
const schedule = await client.schedule.load({ id: 'schedule_id' })
```


### Service

Create an instance: `const service = client.service`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ts
const service = await client.service.load({ id: 'service_id' })
```


### Shape

Create an instance: `const shape = client.shape`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ts
const shape = await client.shape.load({ id: 'shape_id' })
```


### Stop

Create an instance: `const stop = client.stop`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ts
const stop = await client.stop.load({ id: 'stop_id' })
```


### Trip

Create an instance: `const trip = client.trip`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ts
const trip = await client.trip.load({ id: 'trip_id' })
```


### Vehicle

Create an instance: `const vehicle = client.vehicle`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ts
const vehicle = await client.vehicle.load({ id: 'vehicle_id' })
```


## Explanation

### The operation pipeline

Every entity operation (load, list, create, update, remove) follows a
six-stage pipeline. Each stage fires a feature hook before executing:

```
PrePoint → PreSpec → PreRequest → PreResponse → PreResult → PreDone
```

- **PrePoint**: Resolves which API endpoint to call based on the
  operation name and entity configuration.
- **PreSpec**: Builds the HTTP spec — URL, method, headers, body —
  from the resolved point and the caller's parameters.
- **PreRequest**: Sends the HTTP request. Features can intercept here
  to replace the transport (as TestFeature does with mocks).
- **PreResponse**: Parses the raw HTTP response.
- **PreResult**: Extracts the business data from the parsed response.
- **PreDone**: Final stage before returning to the caller. Entity
  state (match, data) is updated here.

If any stage returns an error, the pipeline short-circuits and the
error is returned to the caller as the second element in the return array.

### Features and hooks

Features are the extension mechanism. A feature is a PHP class
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as arrays

The PHP SDK uses plain PHP associative arrays throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `Helpers::to_map()` to safely validate that a value is an array.

### Directory structure

```
php/
├── mbtav3_sdk.php          -- Main SDK class
├── config.php                     -- Configuration
├── features.php                   -- Feature factory
├── core/                          -- Core types and context
├── entity/                        -- Entity implementations
├── feature/                       -- Built-in features (Base, Test, Log)
├── utility/                       -- Utility functions and struct library
└── test/                          -- Test suites
```

The main class (`mbtav3_sdk.php`) exports the SDK class
and test helper. Import entity or utility modules directly only
when needed.

### Entity state

Entity instances are stateful. After a successful `load`, the entity
stores the returned data and match criteria internally.

```php
$alert = $client->alert();
$alert->load(["id" => "example_id"]);

// $alert->dataGet() now returns the loaded alert data
// $alert->matchGet() returns the last match criteria
```

Call `make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

`direct()` gives full control over the HTTP request. Use it for
non-standard endpoints, bulk operations, or any path not modelled as
an entity. `prepare()` builds the request without sending it — useful
for debugging or custom transport.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
