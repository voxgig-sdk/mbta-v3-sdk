# MbtaV3 SDK

Massachusetts Bay Transportation Authority V3 API client, generated from the OpenAPI spec.

> TypeScript, Python, PHP, Golang, Ruby, Lua SDKs, a CLI, an interactive REPL, and an MCP server for AI agents — all generated from one OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).

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

## Quickstart

### TypeScript

```ts
import { MbtaV3SDK } from 'mbta-v3'

const client = new MbtaV3SDK({
  apikey: process.env.MBTA-V3_APIKEY,
})

// Load alert data
const alert = await client.Alert().load({})
console.log(alert.data)
```

See the [TypeScript README](ts/README.md) for the full guide.

## Surfaces

| Surface | Path |
| --- | --- |
| **SDK** (TypeScript, Python, PHP, Golang, Ruby, Lua) | `ts/` `py/` `php/` `go/` `rb/` `lua/` |
| **CLI** | `go-cli/` |
| **MCP server** | `go-mcp/` |

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
| **Alert** |  | `/alerts` |
| **Facility** |  | `/facilities` |
| **Line** |  | `/lines` |
| **Prediction** |  | `/predictions` |
| **Route** |  | `/routes` |
| **RoutePattern** |  | `/route_patterns` |
| **Schedule** |  | `/schedules` |
| **Service** |  | `/services` |
| **Shape** |  | `/shapes` |
| **Stop** |  | `/stops` |
| **Trip** |  | `/trips` |
| **Vehicle** |  | `/vehicles` |

Each entity supports the following operations where available: **load**,
**list**, **create**, **update**, and **remove**.

## Quickstart in other languages

### Python

```python
import os
from mbtav3_sdk import MbtaV3SDK

client = MbtaV3SDK({
    "apikey": os.environ.get("MBTA-V3_APIKEY"),
})


# Load a specific alert
alert, err = client.Alert().load({"id": "example_id"})
print(alert)
```

### PHP

```php
<?php
require_once 'mbtav3_sdk.php';

$client = new MbtaV3SDK([
    "apikey" => getenv("MBTA-V3_APIKEY"),
]);


// Load a specific alert
[$alert, $err] = $client->Alert()->load(["id" => "example_id"]);
print_r($alert);
```

### Golang

```go
import sdk "github.com/voxgig-sdk/mbta-v3-sdk/go"

client := sdk.NewMbtaV3SDK(map[string]any{
    "apikey": os.Getenv("MBTA-V3_APIKEY"),
})

// Load alert data
alert, err := client.Alert(nil).Load(map[string]any{}, nil)
fmt.Println(alert)
```

### Ruby

```ruby
require_relative "MbtaV3_sdk"

client = MbtaV3SDK.new({
  "apikey" => ENV["MBTA-V3_APIKEY"],
})


# Load a specific alert
alert, err = client.Alert().load({ "id" => "example_id" })
puts alert
```

### Lua

```lua
local sdk = require("mbta-v3_sdk")

local client = sdk.new({
  apikey = os.getenv("MBTA-V3_APIKEY"),
})


-- Load a specific alert
local alert, err = client:Alert():load({ id = "example_id" })
print(alert)
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
client = MbtaV3SDK.test()
result, err = client.Alert().load({"id": "test01"})
```

### PHP

```php
$client = MbtaV3SDK::test();
[$result, $err] = $client->Alert()->load(["id" => "test01"]);
```

### Golang

```go
client := sdk.Test()
result, err := client.Alert(nil).Load(
    map[string]any{"id": "test01"}, nil,
)
```

### Ruby

```ruby
client = MbtaV3SDK.test
result, err = client.Alert().load({ "id" => "test01" })
```

### Lua

```lua
local client = sdk.test()
local result, err = client:Alert():load({ id = "test01" })
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

---

Generated from the Massachusetts Bay Transportation Authority V3 API OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).
