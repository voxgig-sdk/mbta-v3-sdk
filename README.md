# MbtaV3 SDK

Schedules, real-time predictions, and service alerts for the Massachusetts Bay Transportation Authority in JSON:API format

> TypeScript, Python, PHP, Golang, Ruby, Lua SDKs, a CLI, an interactive REPL, and an MCP server for AI agents — all generated from one OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).

## About Massachusetts Bay Transportation Authority V3 API

The V3 API is the official developer interface for the [Massachusetts Bay Transportation Authority](https://www.mbta.com/) (MBTA), the public transit agency serving the Greater Boston region. It exposes static schedule data, real-time vehicle positions and predictions, and service alerts via a single [JSON:API](https://jsonapi.org/) endpoint at `https://api-v3.mbta.com`.

What you get from the API:

- General Transit Feed Specification (GTFS) reference data: routes, stops, trips, shapes, schedules, and services.
- GTFS Realtime feeds reshaped as predictions, vehicle positions, and alerts.
- MBTA-specific extensions covering lines, route patterns, and station facilities (elevators, bike racks, parking).
- JSON:API features for filtering, sparse fieldsets, sorting, pagination, and including related resources in one request.

An API key is recommended: anonymous use is rate-limited, while a free registered key raises the default cap to roughly 1,000 requests per minute and is also required for versioning and streaming requests. Keys can be requested at [api-v3.mbta.com](https://api-v3.mbta.com/). Source code and issue tracking live in the [mbta/api](https://github.com/mbta/api) GitHub repository.

## Try it

**TypeScript**
```bash
npm install mbta-v3
```

**Python**
```bash
pip install mbta-v3-sdk
```

**PHP**
```bash
composer require voxgig/mbta-v3-sdk
```

**Golang**
```bash
go get github.com/voxgig-sdk/mbta-v3-sdk/go
```

**Ruby**
```bash
gem install mbta-v3-sdk
```

**Lua**
```bash
luarocks install mbta-v3-sdk
```

## 30-second quickstart

### TypeScript

```ts
import { MbtaV3SDK } from 'mbta-v3'

const client = new MbtaV3SDK({})

```

See the [TypeScript README](ts/README.md) for the
full guide, or scroll down for the same example in other languages.

## What's in the box

| Surface | Use it for | Path |
| --- | --- | --- |
| **SDK** (TypeScript, Python, PHP, Golang, Ruby, Lua) | App integration | `ts/` `py/` `php/` `go/` `rb/` `lua/` |
| **CLI** | Scripts, CI, ops, one-off API calls | `go-cli/` |
| **MCP server** | AI agents (Claude, Cursor, Cline) | `go-mcp/` |

## Use it from an AI agent (MCP)

The generated MCP server exposes every operation in this SDK as an
[MCP](https://modelcontextprotocol.io) tool that Claude, Cursor or Cline
can call directly. Build and register it:

```bash
cd go-mcp && go build -o mbta-v3-mcp .
```

Then add it to your agent's MCP config (Claude Desktop, Cursor, etc.):

```json
{
  "mcpServers": {
    "mbta-v3": {
      "command": "/abs/path/to/mbta-v3-mcp"
    }
  }
}
```

## Entities

The API exposes 12 entities:

| Entity | Description | API path |
| --- | --- | --- |
| **Alert** | Service disruption and advisory notices affecting routes, stops, trips, or facilities, served from `/alerts`. | `/alerts` |
| **Facility** | Station amenities such as elevators, escalators, bike racks, and parking lots, served from `/facilities`. | `/facilities` |
| **Line** | A grouping of related routes presented to riders as a single line (e.g. the Red Line), served from `/lines`. | `/lines` |
| **Prediction** | Real-time arrival and departure estimates for upcoming trips at stops, served from `/predictions`. | `/predictions` |
| **Route** | A named transit route across bus, subway, commuter rail, ferry, or trolley modes, served from `/routes`. | `/routes` |
| **RoutePattern** | A specific travel pattern (sequence of stops and direction) within a route, served from `/route_patterns`. | `/route_patterns` |
| **Schedule** | Scheduled arrival and departure times for stops along trips, served from `/schedules`. | `/schedules` |
| **Service** | Operating-day definitions describing when trips run (weekdays, weekends, holidays), served from `/services`. | `/services` |
| **Shape** | Polyline geometry used to draw a trip's path on a map, served from `/shapes`. | `/shapes` |
| **Stop** | Boarding and alighting locations including stations, platforms, and stop areas, served from `/stops`. | `/stops` |
| **Trip** | An individual scheduled vehicle run along a route pattern, served from `/trips`. | `/trips` |
| **Vehicle** | Real-time position, bearing, and status of in-service vehicles, served from `/vehicles`. | `/vehicles` |

Each entity supports the following operations where available: **load**,
**list**, **create**, **update**, and **remove**.

## Quickstart in other languages

### Python

```python
from mbtav3_sdk import MbtaV3SDK

client = MbtaV3SDK({})


# Load a specific alert
alert, err = client.Alert(None).load(
    {"id": "example_id"}, None
)
```

### PHP

```php
<?php
require_once 'mbtav3_sdk.php';

$client = new MbtaV3SDK([]);


// Load a specific alert
[$alert, $err] = $client->Alert(null)->load(
    ["id" => "example_id"], null
);
```

### Golang

```go
import sdk "github.com/voxgig-sdk/mbta-v3-sdk/go"

client := sdk.NewMbtaV3SDK(map[string]any{})

```

### Ruby

```ruby
require_relative "MbtaV3_sdk"

client = MbtaV3SDK.new({})


# Load a specific alert
alert, err = client.Alert(nil).load(
  { "id" => "example_id" }, nil
)
```

### Lua

```lua
local sdk = require("mbta-v3_sdk")

local client = sdk.new({})


-- Load a specific alert
local alert, err = client:Alert(nil):load(
  { id = "example_id" }, nil
)
```

## Unit testing in offline mode

Every SDK ships a test mode that swaps the HTTP transport for an
in-memory mock, so unit tests run offline.

### TypeScript

```ts
const client = MbtaV3SDK.test()
const result = await client.Alert().load({ id: 'test01' })
// result.ok === true, result.data contains mock data
```

### Python

```python
client = MbtaV3SDK.test(None, None)
result, err = client.Alert(None).load(
    {"id": "test01"}, None
)
```

### PHP

```php
$client = MbtaV3SDK::test(null, null);
[$result, $err] = $client->Alert(null)->load(
    ["id" => "test01"], null
);
```

### Golang

```go
client := sdk.TestSDK(nil, nil)
result, err := client.Alert(nil).Load(
    map[string]any{"id": "test01"}, nil,
)
```

### Ruby

```ruby
client = MbtaV3SDK.test(nil, nil)
result, err = client.Alert(nil).load(
  { "id" => "test01" }, nil
)
```

### Lua

```lua
local client = sdk.test(nil, nil)
local result, err = client:Alert(nil):load(
  { id = "test01" }, nil
)
```

## How it works

Every SDK call runs the same five-stage pipeline:

1. **Point** — resolve the API endpoint from the operation definition.
2. **Spec** — build the HTTP specification (URL, method, headers, body).
3. **Request** — send the HTTP request.
4. **Response** — receive and parse the response.
5. **Result** — extract the result data for the caller.

A feature hook fires at each stage (e.g. `PrePoint`, `PreSpec`,
`PreRequest`), so features can inspect or modify the pipeline without
forking the SDK.

### Features

| Feature | Purpose |
| --- | --- |
| **TestFeature** | In-memory mock transport for testing without a live server |

Pass custom features via the `extend` option at construction time.

### Direct and Prepare

For endpoints the entity model doesn't cover, use the low-level methods:

- **`direct(fetchargs)`** — build and send an HTTP request in one step.
- **`prepare(fetchargs)`** — build the request without sending it.

Both accept a map with `path`, `method`, `params`, `query`,
`headers`, and `body`. See the [How-to guides](#how-to-guides) below.

## How-to guides

### Make a direct API call

When the entity interface does not cover an endpoint, use `direct`:

**TypeScript:**
```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example' },
})
console.log(result.data)
```

**Python:**
```python
result, err = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example"},
})
```

**PHP:**
```php
[$result, $err] = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example"],
]);
```

**Go:**
```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example"},
})
```

**Ruby:**
```ruby
result, err = client.direct({
  "path" => "/api/resource/{id}",
  "method" => "GET",
  "params" => { "id" => "example" },
})
```

**Lua:**
```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example" },
})
```

## Per-language documentation

- [TypeScript](ts/README.md)
- [Python](py/README.md)
- [PHP](php/README.md)
- [Golang](go/README.md)
- [Ruby](rb/README.md)
- [Lua](lua/README.md)

## Using the Massachusetts Bay Transportation Authority V3 API

- Upstream: [https://www.mbta.com/developers/v3-api](https://www.mbta.com/developers/v3-api)
- API docs: [https://api-v3.mbta.com/docs/swagger](https://api-v3.mbta.com/docs/swagger)

- Data is provided under the [MassDOT Developers License Agreement](https://www.mbta.com/developers/v3-api).
- Underlying transit data follows the [GTFS](https://gtfs.org/) and GTFS Realtime specifications.
- Free API keys are issued per application; attribution to the MBTA is expected for redistributed data.
- Check the official agreement for caveats on commercial use and liability before shipping.

---

Generated from the Massachusetts Bay Transportation Authority V3 API OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).
