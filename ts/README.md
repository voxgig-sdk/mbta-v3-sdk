# MbtaV3 TypeScript SDK



The TypeScript SDK for the MbtaV3 API — a type-safe, entity-oriented client with full async/await support.

The API is exposed as capitalised, semantic **Entities** — e.g.
`client.Alert()` — each with a small set of operations (`load`)
instead of raw URL paths and query parameters. This keeps the surface
predictable and low-friction for both humans and AI agents.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to npm. Install it from the GitHub
release tag (`ts/vX.Y.Z`):

- Releases: [https://github.com/voxgig-sdk/mbta-v3-sdk/releases](https://github.com/voxgig-sdk/mbta-v3-sdk/releases)


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```ts
import { MbtaV3SDK } from '@voxgig-sdk/mbta-v3'

const client = new MbtaV3SDK({
  apikey: process.env.MBTA_V3_APIKEY,
})
```

### 3. Load an alert

`load()` returns the entity directly and throws on failure:

```ts
try {
  const alert = await client.Alert().load()
  console.log(alert)
} catch (err) {
  console.error('load failed:', err)
}
```


## Error handling

Entity operations reject on failure, so wrap them in `try` / `catch`:

```ts
try {
  const alert = await client.Alert().load()
  console.log(alert)
} catch (err) {
  console.error('load failed:', err)
}
```

The low-level `direct()` method does **not** throw — it returns the
value or an `Error`, so check the result before using it:

```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example_id' },
})

if (result instanceof Error) {
  throw result
}
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example' },
})

if (result instanceof Error) {
  throw result
}
if (result.ok) {
  console.log(result.status)  // 200
  console.log(result.data)    // response body
}
```

### Prepare a request without sending it

```ts
const fetchdef = await client.prepare({
  path: '/api/resource/{id}',
  method: 'DELETE',
  params: { id: 'example' },
})

// Inspect before sending
console.log(fetchdef.url)
console.log(fetchdef.method)
console.log(fetchdef.headers)
```

### Use test mode

Create a mock client for unit testing — no server required:

```ts
const client = MbtaV3SDK.test()

const alert = await client.Alert().load()
// alert is a bare entity populated with mock response data
console.log(alert)
```

You can also use the instance method:

```ts
const client = new MbtaV3SDK({ apikey: '...' })
const testClient = client.tester()
```

### Retain entity state across calls

Entity instances remember their last match and data:

```ts
const entity = client.Alert()

// First call runs the operation and stores its result
await entity.load()

// Subsequent calls reuse the stored state
const data = entity.data()
console.log(data)
```

### Add custom middleware

Pass features via the `extend` option:

```ts
const logger = {
  hooks: {
    PreRequest: (ctx: any) => {
      console.log('Requesting:', ctx.spec.method, ctx.spec.path)
    },
    PreResponse: (ctx: any) => {
      console.log('Status:', ctx.out.request?.status)
    },
  },
}

const client = new MbtaV3SDK({
  apikey: '...',
  extend: [logger],
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
cd ts && npm test
```


## Reference

### MbtaV3SDK

#### Constructor

```ts
new MbtaV3SDK(options?: {
  apikey?: string
  base?: string
  prefix?: string
  suffix?: string
  feature?: Record<string, { active: boolean }>
  extend?: Feature[]
})
```

| Option | Type | Description |
| --- | --- | --- |
| `apikey` | `string` | API key for authentication. |
| `base` | `string` | Base URL of the API server. |
| `prefix` | `string` | URL path prefix prepended to all requests. |
| `suffix` | `string` | URL path suffix appended to all requests. |
| `feature` | `object` | Feature activation flags (e.g. `{ test: { active: true } }`). |
| `extend` | `Feature[]` | Additional feature instances to load. |

#### Methods

| Method | Returns | Description |
| --- | --- | --- |
| `options()` | `object` | Deep copy of current SDK options. |
| `utility()` | `Utility` | Deep copy of the SDK utility object. |
| `prepare(fetchargs?)` | `Promise<FetchDef>` | Build an HTTP request definition without sending it. |
| `direct(fetchargs?)` | `Promise<DirectResult>` | Build and send an HTTP request. |
| `Alert(data?)` | `AlertEntity` | Create an Alert entity instance. |
| `Facility(data?)` | `FacilityEntity` | Create a Facility entity instance. |
| `Line(data?)` | `LineEntity` | Create a Line entity instance. |
| `Prediction(data?)` | `PredictionEntity` | Create a Prediction entity instance. |
| `Route(data?)` | `RouteEntity` | Create a Route entity instance. |
| `RoutePattern(data?)` | `RoutePatternEntity` | Create a RoutePattern entity instance. |
| `Schedule(data?)` | `ScheduleEntity` | Create a Schedule entity instance. |
| `Service(data?)` | `ServiceEntity` | Create a Service entity instance. |
| `Shape(data?)` | `ShapeEntity` | Create a Shape entity instance. |
| `Stop(data?)` | `StopEntity` | Create a Stop entity instance. |
| `Trip(data?)` | `TripEntity` | Create a Trip entity instance. |
| `Vehicle(data?)` | `VehicleEntity` | Create a Vehicle entity instance. |
| `tester(testopts?, sdkopts?)` | `MbtaV3SDK` | Create a test-mode client instance. |

#### Static methods

| Method | Returns | Description |
| --- | --- | --- |
| `MbtaV3SDK.test(testopts?, sdkopts?)` | `MbtaV3SDK` | Create a test-mode client. |

### Entity interface

All entities share the same interface.

#### Methods

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `load(reqmatch?, ctrl?): Promise<Entity>` | Load a single entity by match criteria. |
| `data` | `data(data?: Partial<Entity>): Entity` | Get or set entity data. |
| `match` | `match(match?: Partial<Entity>): Partial<Entity>` | Get or set entity match criteria. |
| `make` | `make(): Entity` | Create a new instance with the same options. |
| `client` | `client(): MbtaV3SDK` | Return the parent SDK client. |
| `entopts` | `entopts(): object` | Return a copy of the entity options. |

#### Return values

Entity operations resolve to the entity data directly — there is no
result envelope:

- `load` resolves to a single entity object.

On a failed request these methods **throw**, so wrap calls in
`try`/`catch` to handle errors. Only `direct()` returns the result
envelope described below.

### DirectResult shape

The `direct()` method returns:

```ts
{
  ok: boolean
  status: number
  headers: object
  data: any
}
```

On error, `ok` is `false` and an `err` property contains the error.

### FetchDef shape

The `prepare()` method returns:

```ts
{
  url: string
  method: string
  headers: Record<string, string>
  body?: any
}
```

### Entities

#### Alert

| Field | Description |
| --- | --- |

Operations: load.

API path: `/alerts`

#### Facility

| Field | Description |
| --- | --- |

Operations: load.

API path: `/facilities`

#### Line

| Field | Description |
| --- | --- |

Operations: load.

API path: `/lines`

#### Prediction

| Field | Description |
| --- | --- |

Operations: load.

API path: `/predictions`

#### Route

| Field | Description |
| --- | --- |

Operations: load.

API path: `/routes`

#### RoutePattern

| Field | Description |
| --- | --- |

Operations: load.

API path: `/route_patterns`

#### Schedule

| Field | Description |
| --- | --- |

Operations: load.

API path: `/schedules`

#### Service

| Field | Description |
| --- | --- |

Operations: load.

API path: `/services`

#### Shape

| Field | Description |
| --- | --- |

Operations: load.

API path: `/shapes`

#### Stop

| Field | Description |
| --- | --- |

Operations: load.

API path: `/stops`

#### Trip

| Field | Description |
| --- | --- |

Operations: load.

API path: `/trips`

#### Vehicle

| Field | Description |
| --- | --- |

Operations: load.

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
const alert = await client.Alert().load()
```


### Facility

Create an instance: `const facility = client.Facility()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ts
const facility = await client.Facility().load()
```


### Line

Create an instance: `const line = client.Line()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ts
const line = await client.Line().load()
```


### Prediction

Create an instance: `const prediction = client.Prediction()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ts
const prediction = await client.Prediction().load()
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
const route_pattern = await client.RoutePattern().load()
```


### Schedule

Create an instance: `const schedule = client.Schedule()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ts
const schedule = await client.Schedule().load()
```


### Service

Create an instance: `const service = client.Service()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ts
const service = await client.Service().load()
```


### Shape

Create an instance: `const shape = client.Shape()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ts
const shape = await client.Shape().load()
```


### Stop

Create an instance: `const stop = client.Stop()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ts
const stop = await client.Stop().load()
```


### Trip

Create an instance: `const trip = client.Trip()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ts
const trip = await client.Trip().load()
```


### Vehicle

Create an instance: `const vehicle = client.Vehicle()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ts
const vehicle = await client.Vehicle().load()
```


## Advanced

> The sections above cover everyday use. The material below explains the
> SDK's internals — useful when extending it with custom features, but not
> needed for normal use.

### The operation pipeline

Every entity operation follows a six-stage pipeline. Each stage fires a
feature hook before executing:

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

If any stage errors, the pipeline short-circuits and the error surfaces
to the caller — see [Error handling](#error-handling) for how that looks
in this language.

### Features and hooks

Features are the extension mechanism. A feature is an object with a
`hooks` map. Each hook key is a pipeline stage name, and the value is
a function that receives the context.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Module structure

```
mbta-v3/
├── src/
│   ├── MbtaV3SDK.ts        # Main SDK class
│   ├── entity/             # Entity implementations
│   ├── feature/            # Built-in features (Base, Test, Log)
│   └── utility/            # Utility functions
├── test/                   # Test suites
└── dist/                   # Compiled output
```

Import the SDK from the package root:

```ts
import { MbtaV3SDK } from '@voxgig-sdk/mbta-v3'
```

### Entity state

Entity instances are stateful. After a successful `load`, the entity
stores the returned data and match criteria internally. Subsequent
calls on the same instance can rely on this state.

```ts
const alert = client.Alert()
await alert.load()

// alert.data() now returns the alert data from the last `load`
// alert.match() returns the last match criteria
```

Call `make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

The `direct` method gives full control over the HTTP request. Use it
for non-standard endpoints, bulk operations, or any path not modelled
as an entity. The `prepare` method is useful for debugging — it
shows exactly what `direct` would send.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
