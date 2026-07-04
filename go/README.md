# MbtaV3 Golang SDK



The Golang SDK for the MbtaV3 API — an entity-oriented client using standard Go conventions. No generics required; data flows as `map[string]any`.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
```bash
go get github.com/voxgig-sdk/mbta-v3-sdk/go@latest
```

The Go module proxy resolves the version from the `go/vX.Y.Z` GitHub
release tag — see [Releases](https://github.com/voxgig-sdk/mbta-v3-sdk/releases) for the available versions.

To vendor from a local checkout instead, clone this repo alongside your
project and add a `replace` directive pointing at the checked-out
`go/` directory:

```bash
go mod edit -replace github.com/voxgig-sdk/mbta-v3-sdk/go=../mbta-v3-sdk/go
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### Quickstart

A complete program: create a client, then call the entity operations.
Each operation returns `(value, error)` — the value is the data itself
(there is no `{ok, data}` wrapper), so check `err` and use the value
directly.

```go
package main

import (
    "fmt"
    "os"
    sdk "github.com/voxgig-sdk/mbta-v3-sdk/go"
)

func main() {
    client := sdk.NewMbtaV3SDK(map[string]any{
        "apikey": os.Getenv("MBTA_V3_APIKEY"),
    })

    // Load a single alert — the value is the loaded record.
    alert, err := client.Alert(nil).Load(map[string]any{"id": "example_id"}, nil)
    if err != nil {
        panic(err)
    }
    fmt.Println(alert)
}
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example"},
})
if err != nil {
    panic(err)
}

if result["ok"] == true {
    fmt.Println(result["status"]) // 200
    fmt.Println(result["data"])   // response body
}
```

### Prepare a request without sending it

```go
fetchdef, err := client.Prepare(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "DELETE",
    "params": map[string]any{"id": "example"},
})
if err != nil {
    panic(err)
}

fmt.Println(fetchdef["url"])
fmt.Println(fetchdef["method"])
fmt.Println(fetchdef["headers"])
```

### Use test mode

Create a mock client for unit testing — no server required:

```go
client := sdk.Test()

alert, err := client.Alert(nil).Load(
    map[string]any{"id": "test01"}, nil,
)
if err != nil {
    panic(err)
}
fmt.Println(alert) // the loaded mock data
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```go
mockFetch := func(url string, init map[string]any) (map[string]any, error) {
    return map[string]any{
        "status":     200,
        "statusText": "OK",
        "headers":    map[string]any{},
        "json": (func() any)(func() any {
            return map[string]any{"id": "mock01"}
        }),
    }, nil
}

client := sdk.NewMbtaV3SDK(map[string]any{
    "base": "http://localhost:8080",
    "system": map[string]any{
        "fetch": (func(string, map[string]any) (map[string]any, error))(mockFetch),
    },
})
```

### Run live tests

Create a `.env.local` file at the project root:

```
MBTA_V3_TEST_LIVE=TRUE
MBTA_V3_APIKEY=<your-key>
```

Then run:

```bash
cd go && go test ./test/...
```


## Reference

### NewMbtaV3SDK

```go
func NewMbtaV3SDK(options map[string]any) *MbtaV3SDK
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `"apikey"` | `string` | API key for authentication. |
| `"base"` | `string` | Base URL of the API server. |
| `"prefix"` | `string` | URL path prefix prepended to all requests. |
| `"suffix"` | `string` | URL path suffix appended to all requests. |
| `"feature"` | `map[string]any` | Feature activation flags. |
| `"extend"` | `[]any` | Additional Feature instances to load. |
| `"system"` | `map[string]any` | System overrides (e.g. custom `"fetch"` function). |

### TestSDK

```go
func TestSDK(testopts map[string]any, sdkopts map[string]any) *MbtaV3SDK
```

Creates a test-mode client with mock transport. Both arguments may be `nil`.

### MbtaV3SDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `OptionsMap` | `() map[string]any` | Deep copy of current SDK options. |
| `GetUtility` | `() *Utility` | Copy of the SDK utility object. |
| `Prepare` | `(fetchargs map[string]any) (map[string]any, error)` | Build an HTTP request definition without sending. |
| `Direct` | `(fetchargs map[string]any) (map[string]any, error)` | Build and send an HTTP request. |
| `Alert` | `(data map[string]any) MbtaV3Entity` | Create an Alert entity instance. |
| `Facility` | `(data map[string]any) MbtaV3Entity` | Create a Facility entity instance. |
| `Line` | `(data map[string]any) MbtaV3Entity` | Create a Line entity instance. |
| `Prediction` | `(data map[string]any) MbtaV3Entity` | Create a Prediction entity instance. |
| `Route` | `(data map[string]any) MbtaV3Entity` | Create a Route entity instance. |
| `RoutePattern` | `(data map[string]any) MbtaV3Entity` | Create a RoutePattern entity instance. |
| `Schedule` | `(data map[string]any) MbtaV3Entity` | Create a Schedule entity instance. |
| `Service` | `(data map[string]any) MbtaV3Entity` | Create a Service entity instance. |
| `Shape` | `(data map[string]any) MbtaV3Entity` | Create a Shape entity instance. |
| `Stop` | `(data map[string]any) MbtaV3Entity` | Create a Stop entity instance. |
| `Trip` | `(data map[string]any) MbtaV3Entity` | Create a Trip entity instance. |
| `Vehicle` | `(data map[string]any) MbtaV3Entity` | Create a Vehicle entity instance. |

### Entity interface (MbtaV3Entity)

All entities implement the `MbtaV3Entity` interface.

| Method | Signature | Description |
| --- | --- | --- |
| `Load` | `(reqmatch, ctrl map[string]any) (any, error)` | Load a single entity by match criteria. |
| `List` | `(reqmatch, ctrl map[string]any) (any, error)` | List entities matching the criteria. |
| `Create` | `(reqdata, ctrl map[string]any) (any, error)` | Create a new entity. |
| `Update` | `(reqdata, ctrl map[string]any) (any, error)` | Update an existing entity. |
| `Remove` | `(reqmatch, ctrl map[string]any) (any, error)` | Remove an entity. |
| `Data` | `(args ...any) any` | Get or set entity data. |
| `Match` | `(args ...any) any` | Get or set entity match criteria. |
| `Make` | `() Entity` | Create a new instance with the same options. |
| `GetName` | `() string` | Return the entity name. |

### Result shape

Entity operations return `(value, error)`. The `value` is the
operation's data **directly** — there is no wrapper:

| Operation | `value` |
| --- | --- |
| `Load` / `Create` / `Update` / `Remove` | the entity record (`map[string]any`) |
| `List` | a `[]any` of entity records |

Check `err` first, then use the value directly (or the typed
`...Typed` variants, which return the entity's model struct and a typed
slice):

    alert, err := client.Alert(nil).Load(map[string]any{"id": "example_id"}, nil)
    if err != nil { /* handle */ }
    // alert is the loaded record

Only `Direct()` returns a response envelope — a `map[string]any` with
`"ok"`, `"status"`, `"headers"`, and `"data"` keys.

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

Create an instance: `alert := client.Alert(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Example: Load

```go
alert, err := client.Alert(nil).Load(map[string]any{"id": "alert_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(alert) // the loaded record
```


### Facility

Create an instance: `facility := client.Facility(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Example: Load

```go
facility, err := client.Facility(nil).Load(map[string]any{"id": "facility_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(facility) // the loaded record
```


### Line

Create an instance: `line := client.Line(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Example: Load

```go
line, err := client.Line(nil).Load(map[string]any{"id": "line_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(line) // the loaded record
```


### Prediction

Create an instance: `prediction := client.Prediction(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Example: Load

```go
prediction, err := client.Prediction(nil).Load(map[string]any{"id": "prediction_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(prediction) // the loaded record
```


### Route

Create an instance: `route := client.Route(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Example: Load

```go
route, err := client.Route(nil).Load(map[string]any{"id": "route_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(route) // the loaded record
```


### RoutePattern

Create an instance: `route_pattern := client.RoutePattern(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Example: Load

```go
route_pattern, err := client.RoutePattern(nil).Load(map[string]any{"id": "route_pattern_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(route_pattern) // the loaded record
```


### Schedule

Create an instance: `schedule := client.Schedule(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Example: Load

```go
schedule, err := client.Schedule(nil).Load(map[string]any{"id": "schedule_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(schedule) // the loaded record
```


### Service

Create an instance: `service := client.Service(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Example: Load

```go
service, err := client.Service(nil).Load(map[string]any{"id": "service_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(service) // the loaded record
```


### Shape

Create an instance: `shape := client.Shape(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Example: Load

```go
shape, err := client.Shape(nil).Load(map[string]any{"id": "shape_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(shape) // the loaded record
```


### Stop

Create an instance: `stop := client.Stop(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Example: Load

```go
stop, err := client.Stop(nil).Load(map[string]any{"id": "stop_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(stop) // the loaded record
```


### Trip

Create an instance: `trip := client.Trip(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Example: Load

```go
trip, err := client.Trip(nil).Load(map[string]any{"id": "trip_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(trip) // the loaded record
```


### Vehicle

Create an instance: `vehicle := client.Vehicle(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Example: Load

```go
vehicle, err := client.Vehicle(nil).Load(map[string]any{"id": "vehicle_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(vehicle) // the loaded record
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
error is returned to the caller. An unexpected panic triggers the
`PreUnexpected` hook.

### Features and hooks

Features are the extension mechanism. A feature implements the
`Feature` interface and provides hooks — functions keyed by pipeline
stage names.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as maps

The Go SDK uses `map[string]any` throughout rather than typed structs.
This mirrors the dynamic nature of the API and keeps the SDK
flexible — no code generation is needed when the API schema changes.

Use `core.ToMapAny()` to safely cast results and nested data.

### Package structure

```
github.com/voxgig-sdk/mbta-v3-sdk/go/
├── mbta-v3.go        # Root package — type aliases and constructors
├── core/               # SDK core — client, types, pipeline
├── entity/             # Entity implementations
├── feature/            # Built-in features (Base, Test, Log)
├── utility/            # Utility functions and struct library
└── test/               # Test suites
```

The root package (`github.com/voxgig-sdk/mbta-v3-sdk/go`) re-exports everything needed
for normal use. Import sub-packages only when you need specific types
like `core.ToMapAny`.

### Entity state

Entity instances are stateful. After a successful `Load`, the entity
stores the returned data and match criteria internally.

```go
alert := client.Alert(nil)
alert.Load(map[string]any{"id": "example_id"}, nil)

// alert.Data() now returns the loaded alert data
// alert.Match() returns the last match criteria
```

Call `Make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

`Direct()` gives full control over the HTTP request. Use it for
non-standard endpoints, bulk operations, or any path not modelled as
an entity. `Prepare()` builds the request without sending it — useful
for debugging or custom transport.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
