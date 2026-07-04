# MbtaV3 PHP SDK Reference

Complete API reference for the MbtaV3 PHP SDK.


## MbtaV3SDK

### Constructor

```php
require_once __DIR__ . '/mbta-v3_sdk.php';

$client = new MbtaV3SDK($options);
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `$options` | `array` | SDK configuration options. |
| `$options["apikey"]` | `string` | API key for authentication. |
| `$options["base"]` | `string` | Base URL for API requests. |
| `$options["prefix"]` | `string` | URL prefix appended after base. |
| `$options["suffix"]` | `string` | URL suffix appended after path. |
| `$options["headers"]` | `array` | Custom headers for all requests. |
| `$options["feature"]` | `array` | Feature configuration. |
| `$options["system"]` | `array` | System overrides (e.g. custom fetch). |


### Static Methods

#### `MbtaV3SDK::test($testopts = null, $sdkopts = null)`

Create a test client with mock features active. Both arguments may be `null`.

```php
$client = MbtaV3SDK::test();
```


### Instance Methods

#### `Alert($data = null)`

Create a new `AlertEntity` instance. Pass `null` for no initial data.

#### `Facility($data = null)`

Create a new `FacilityEntity` instance. Pass `null` for no initial data.

#### `Line($data = null)`

Create a new `LineEntity` instance. Pass `null` for no initial data.

#### `Prediction($data = null)`

Create a new `PredictionEntity` instance. Pass `null` for no initial data.

#### `Route($data = null)`

Create a new `RouteEntity` instance. Pass `null` for no initial data.

#### `RoutePattern($data = null)`

Create a new `RoutePatternEntity` instance. Pass `null` for no initial data.

#### `Schedule($data = null)`

Create a new `ScheduleEntity` instance. Pass `null` for no initial data.

#### `Service($data = null)`

Create a new `ServiceEntity` instance. Pass `null` for no initial data.

#### `Shape($data = null)`

Create a new `ShapeEntity` instance. Pass `null` for no initial data.

#### `Stop($data = null)`

Create a new `StopEntity` instance. Pass `null` for no initial data.

#### `Trip($data = null)`

Create a new `TripEntity` instance. Pass `null` for no initial data.

#### `Vehicle($data = null)`

Create a new `VehicleEntity` instance. Pass `null` for no initial data.

#### `optionsMap(): array`

Return a deep copy of the current SDK options.

#### `getUtility(): ProjectNameUtility`

Return a copy of the SDK utility object.

#### `direct(array $fetchargs = []): array`

Make a direct HTTP request to any API endpoint. This is the raw-HTTP escape
hatch: it does **not** throw. It returns a result array
`["ok" => bool, "status" => int, "headers" => array, "data" => mixed]`, or
`["ok" => false, "err" => \Exception]` on failure. Branch on `$result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `$fetchargs["path"]` | `string` | URL path with optional `{param}` placeholders. |
| `$fetchargs["method"]` | `string` | HTTP method (default: `"GET"`). |
| `$fetchargs["params"]` | `array` | Path parameter values for `{param}` substitution. |
| `$fetchargs["query"]` | `array` | Query string parameters. |
| `$fetchargs["headers"]` | `array` | Request headers (merged with defaults). |
| `$fetchargs["body"]` | `mixed` | Request body (arrays are JSON-serialized). |
| `$fetchargs["ctrl"]` | `array` | Control options. |

**Returns:** `array` — the result dict (see above); never throws.

#### `prepare(array $fetchargs = []): mixed`

Prepare a fetch definition without sending the request. Returns the
`$fetchdef` array. Throws on error.


---

## AlertEntity

```php
$alert = $client->alert();
```

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->alert()->load(["id" => "alert_id"]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): AlertEntity`

Create a new `AlertEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## FacilityEntity

```php
$facility = $client->facility();
```

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->facility()->load(["id" => "facility_id"]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): FacilityEntity`

Create a new `FacilityEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## LineEntity

```php
$line = $client->line();
```

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->line()->load(["id" => "line_id"]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): LineEntity`

Create a new `LineEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## PredictionEntity

```php
$prediction = $client->prediction();
```

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->prediction()->load(["id" => "prediction_id"]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): PredictionEntity`

Create a new `PredictionEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## RouteEntity

```php
$route = $client->route();
```

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->route()->load(["id" => "route_id"]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): RouteEntity`

Create a new `RouteEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## RoutePatternEntity

```php
$route_pattern = $client->route_pattern();
```

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->route_pattern()->load(["id" => "route_pattern_id"]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): RoutePatternEntity`

Create a new `RoutePatternEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## ScheduleEntity

```php
$schedule = $client->schedule();
```

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->schedule()->load(["id" => "schedule_id"]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): ScheduleEntity`

Create a new `ScheduleEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## ServiceEntity

```php
$service = $client->service();
```

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->service()->load(["id" => "service_id"]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): ServiceEntity`

Create a new `ServiceEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## ShapeEntity

```php
$shape = $client->shape();
```

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->shape()->load(["id" => "shape_id"]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): ShapeEntity`

Create a new `ShapeEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## StopEntity

```php
$stop = $client->stop();
```

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->stop()->load(["id" => "stop_id"]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): StopEntity`

Create a new `StopEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## TripEntity

```php
$trip = $client->trip();
```

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->trip()->load(["id" => "trip_id"]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): TripEntity`

Create a new `TripEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## VehicleEntity

```php
$vehicle = $client->vehicle();
```

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->vehicle()->load(["id" => "vehicle_id"]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): VehicleEntity`

Create a new `VehicleEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```php
$client = new MbtaV3SDK([
  "feature" => [
    "test" => ["active" => true],
  ],
]);
```

