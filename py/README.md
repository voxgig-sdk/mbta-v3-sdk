# MbtaV3 Python SDK

The Python SDK for the MbtaV3 API. Provides an entity-oriented interface following Pythonic conventions.


## Install
```bash
pip install mbta-v3-sdk
```

Or install from source:

```bash
pip install -e .
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```python
from mbtav3_sdk import MbtaV3SDK

client = MbtaV3SDK({})
```

### 3. Load a alert

```python
result, err = client.Alert(None).load({"id": "example_id"}, None)
if err:
    raise Exception(err)
print(result)
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```python
result, err = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example"},
})
if err:
    raise Exception(err)

if result["ok"]:
    print(result["status"])  # 200
    print(result["data"])    # response body
```

### Prepare a request without sending it

```python
fetchdef, err = client.prepare({
    "path": "/api/resource/{id}",
    "method": "DELETE",
    "params": {"id": "example"},
})
if err:
    raise Exception(err)

print(fetchdef["url"])
print(fetchdef["method"])
print(fetchdef["headers"])
```

### Use test mode

Create a mock client for unit testing — no server required:

```python
client = MbtaV3SDK.test(None, None)

result, err = client.MbtaV3(None).load(
    {"id": "test01"}, None
)
# result contains mock response data
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```python
def mock_fetch(url, init):
    return {
        "status": 200,
        "statusText": "OK",
        "headers": {},
        "json": lambda: {"id": "mock01"},
    }, None

client = MbtaV3SDK({
    "base": "http://localhost:8080",
    "system": {
        "fetch": mock_fetch,
    },
})
```

### Run live tests

Create a `.env.local` file at the project root:

```
MBTA-V3_TEST_LIVE=TRUE
```

Then run:

```bash
cd py && pytest test/
```


## Reference

### MbtaV3SDK

```python
from mbtav3_sdk import MbtaV3SDK

client = MbtaV3SDK(options)
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `base` | `str` | Base URL of the API server. |
| `prefix` | `str` | URL path prefix prepended to all requests. |
| `suffix` | `str` | URL path suffix appended to all requests. |
| `feature` | `dict` | Feature activation flags. |
| `extend` | `list` | Additional Feature instances to load. |
| `system` | `dict` | System overrides (e.g. custom `fetch` function). |

### test

```python
client = MbtaV3SDK.test(testopts, sdkopts)
```

Creates a test-mode client with mock transport. Both arguments may be `None`.

### MbtaV3SDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `() -> dict` | Deep copy of current SDK options. |
| `get_utility` | `() -> Utility` | Copy of the SDK utility object. |
| `prepare` | `(fetchargs) -> (dict, err)` | Build an HTTP request definition without sending. |
| `direct` | `(fetchargs) -> (dict, err)` | Build and send an HTTP request. |
| `Alert` | `(data) -> AlertEntity` | Create a Alert entity instance. |
| `Facility` | `(data) -> FacilityEntity` | Create a Facility entity instance. |
| `Line` | `(data) -> LineEntity` | Create a Line entity instance. |
| `Prediction` | `(data) -> PredictionEntity` | Create a Prediction entity instance. |
| `Route` | `(data) -> RouteEntity` | Create a Route entity instance. |
| `RoutePattern` | `(data) -> RoutePatternEntity` | Create a RoutePattern entity instance. |
| `Schedule` | `(data) -> ScheduleEntity` | Create a Schedule entity instance. |
| `Service` | `(data) -> ServiceEntity` | Create a Service entity instance. |
| `Shape` | `(data) -> ShapeEntity` | Create a Shape entity instance. |
| `Stop` | `(data) -> StopEntity` | Create a Stop entity instance. |
| `Trip` | `(data) -> TripEntity` | Create a Trip entity instance. |
| `Vehicle` | `(data) -> VehicleEntity` | Create a Vehicle entity instance. |

### Entity interface

All entities share the same interface.

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `(reqmatch, ctrl) -> (any, err)` | Load a single entity by match criteria. |
| `list` | `(reqmatch, ctrl) -> (any, err)` | List entities matching the criteria. |
| `create` | `(reqdata, ctrl) -> (any, err)` | Create a new entity. |
| `update` | `(reqdata, ctrl) -> (any, err)` | Update an existing entity. |
| `remove` | `(reqmatch, ctrl) -> (any, err)` | Remove an entity. |
| `data_get` | `() -> dict` | Get entity data. |
| `data_set` | `(data)` | Set entity data. |
| `match_get` | `() -> dict` | Get entity match criteria. |
| `match_set` | `(match)` | Set entity match criteria. |
| `make` | `() -> Entity` | Create a new instance with the same options. |
| `get_name` | `() -> str` | Return the entity name. |

### Result shape

Entity operations return `(any, err)`. The first value is a
`dict` with these keys:

| Key | Type | Description |
| --- | --- | --- |
| `ok` | `bool` | `True` if the HTTP status is 2xx. |
| `status` | `int` | HTTP status code. |
| `headers` | `dict` | Response headers. |
| `data` | `any` | Parsed JSON response body. |

On error, `ok` is `False` and `err` contains the error value.

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

Create an instance: `const alert = client.Alert()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ts
const alert = await client.Alert().load({ id: 'alert_id' })
```


### Facility

Create an instance: `const facility = client.Facility()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ts
const facility = await client.Facility().load({ id: 'facility_id' })
```


### Line

Create an instance: `const line = client.Line()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ts
const line = await client.Line().load({ id: 'line_id' })
```


### Prediction

Create an instance: `const prediction = client.Prediction()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ts
const prediction = await client.Prediction().load({ id: 'prediction_id' })
```


### Route

Create an instance: `const route = client.Route()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ts
const route = await client.Route().load({ id: 'route_id' })
```


### RoutePattern

Create an instance: `const route_pattern = client.RoutePattern()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ts
const route_pattern = await client.RoutePattern().load({ id: 'route_pattern_id' })
```


### Schedule

Create an instance: `const schedule = client.Schedule()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ts
const schedule = await client.Schedule().load({ id: 'schedule_id' })
```


### Service

Create an instance: `const service = client.Service()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ts
const service = await client.Service().load({ id: 'service_id' })
```


### Shape

Create an instance: `const shape = client.Shape()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ts
const shape = await client.Shape().load({ id: 'shape_id' })
```


### Stop

Create an instance: `const stop = client.Stop()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ts
const stop = await client.Stop().load({ id: 'stop_id' })
```


### Trip

Create an instance: `const trip = client.Trip()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ts
const trip = await client.Trip().load({ id: 'trip_id' })
```


### Vehicle

Create an instance: `const vehicle = client.Vehicle()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ts
const vehicle = await client.Vehicle().load({ id: 'vehicle_id' })
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
error is returned to the caller as the second element in the return tuple.

### Features and hooks

Features are the extension mechanism. A feature is a Python class
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as dicts

The Python SDK uses plain dicts throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `helpers.to_map()` to safely validate that a value is a dict.

### Module structure

```
py/
├── mbtav3_sdk.py         -- Main SDK module
├── config.py                    -- Configuration
├── features.py                  -- Feature factory
├── core/                        -- Core types and context
├── entity/                      -- Entity implementations
├── feature/                     -- Built-in features (Base, Test, Log)
├── utility/                     -- Utility functions and struct library
└── test/                        -- Test suites
```

The main module (`mbtav3_sdk`) exports the SDK class.
Import entity or utility modules directly only when needed.

### Entity state

Entity instances are stateful. After a successful `load`, the entity
stores the returned data and match criteria internally.

```python
moon = client.Moon()
moon.load({"planet_id": "earth", "id": "luna"})

# moon.data_get() now returns the loaded moon data
# moon.match_get() returns the last match criteria
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
