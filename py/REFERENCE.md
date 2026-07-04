# MbtaV3 Python SDK Reference

Complete API reference for the MbtaV3 Python SDK.


## MbtaV3SDK

### Constructor

```python
from mbta-v3_sdk import MbtaV3SDK

client = MbtaV3SDK(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `dict` | SDK configuration options. |
| `options["apikey"]` | `str` | API key for authentication. |
| `options["base"]` | `str` | Base URL for API requests. |
| `options["prefix"]` | `str` | URL prefix appended after base. |
| `options["suffix"]` | `str` | URL suffix appended after path. |
| `options["headers"]` | `dict` | Custom headers for all requests. |
| `options["feature"]` | `dict` | Feature configuration. |
| `options["system"]` | `dict` | System overrides (e.g. custom fetch). |


### Static Methods

#### `MbtaV3SDK.test(testopts=None, sdkopts=None)`

Create a test client with mock features active. Both arguments may be `None`.

```python
client = MbtaV3SDK.test()
```


### Instance Methods

#### `Alert(data=None)`

Create a new `AlertEntity` instance. Pass `None` for no initial data.

#### `Facility(data=None)`

Create a new `FacilityEntity` instance. Pass `None` for no initial data.

#### `Line(data=None)`

Create a new `LineEntity` instance. Pass `None` for no initial data.

#### `Prediction(data=None)`

Create a new `PredictionEntity` instance. Pass `None` for no initial data.

#### `Route(data=None)`

Create a new `RouteEntity` instance. Pass `None` for no initial data.

#### `RoutePattern(data=None)`

Create a new `RoutePatternEntity` instance. Pass `None` for no initial data.

#### `Schedule(data=None)`

Create a new `ScheduleEntity` instance. Pass `None` for no initial data.

#### `Service(data=None)`

Create a new `ServiceEntity` instance. Pass `None` for no initial data.

#### `Shape(data=None)`

Create a new `ShapeEntity` instance. Pass `None` for no initial data.

#### `Stop(data=None)`

Create a new `StopEntity` instance. Pass `None` for no initial data.

#### `Trip(data=None)`

Create a new `TripEntity` instance. Pass `None` for no initial data.

#### `Vehicle(data=None)`

Create a new `VehicleEntity` instance. Pass `None` for no initial data.

#### `options_map() -> dict`

Return a deep copy of the current SDK options.

#### `get_utility() -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs=None) -> dict`

Make a direct HTTP request to any API endpoint. Returns a result `dict` with `ok`, `status`, `headers`, and `data` (or `err` on failure). This escape hatch never raises — branch on `result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `str` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `str` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `dict` | Path parameter values. |
| `fetchargs["query"]` | `dict` | Query string parameters. |
| `fetchargs["headers"]` | `dict` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (dicts are JSON-serialized). |

**Returns:** `result_dict`

#### `prepare(fetchargs=None) -> dict`

Prepare a fetch definition without sending. Returns the `fetchdef` and raises on error.


---

## AlertEntity

```python
alert = client.alert
```

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.alert.load({"id": "alert_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `AlertEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## FacilityEntity

```python
facility = client.facility
```

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.facility.load({"id": "facility_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `FacilityEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## LineEntity

```python
line = client.line
```

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.line.load({"id": "line_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `LineEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## PredictionEntity

```python
prediction = client.prediction
```

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.prediction.load({"id": "prediction_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `PredictionEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## RouteEntity

```python
route = client.route
```

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.route.load({"id": "route_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `RouteEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## RoutePatternEntity

```python
route_pattern = client.route_pattern
```

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.route_pattern.load({"id": "route_pattern_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `RoutePatternEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ScheduleEntity

```python
schedule = client.schedule
```

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.schedule.load({"id": "schedule_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ScheduleEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ServiceEntity

```python
service = client.service
```

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.service.load({"id": "service_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ServiceEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ShapeEntity

```python
shape = client.shape
```

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.shape.load({"id": "shape_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ShapeEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## StopEntity

```python
stop = client.stop
```

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.stop.load({"id": "stop_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `StopEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## TripEntity

```python
trip = client.trip
```

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.trip.load({"id": "trip_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `TripEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## VehicleEntity

```python
vehicle = client.vehicle
```

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.vehicle.load({"id": "vehicle_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `VehicleEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```python
client = MbtaV3SDK({
    "feature": {
        "test": {"active": True},
    },
})
```

