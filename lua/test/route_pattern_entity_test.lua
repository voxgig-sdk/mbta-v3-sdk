-- RoutePattern entity test

local json = require("dkjson")
local vs = require("utility.struct.struct")
local sdk = require("mbta-v3_sdk")
local helpers = require("core.helpers")
local runner = require("test.runner")

local _test_dir = debug.getinfo(1, "S").source:match("^@(.+/)")  or "./"

describe("RoutePatternEntity", function()
  it("should create instance", function()
    local testsdk = sdk.test(nil, nil)
    local ent = testsdk:RoutePattern(nil)
    assert.is_not_nil(ent)
  end)

  it("should run basic flow", function()
    local setup = route_pattern_basic_setup(nil)
    -- Per-op sdk-test-control.json skip.
    local _live = setup.live or false
    for _, _op in ipairs({"load"}) do
      local _should_skip, _reason = runner.is_control_skipped("entityOp", "route_pattern." .. _op, _live and "live" or "unit")
      if _should_skip then
        pending(_reason or "skipped via sdk-test-control.json")
        return
      end
    end
    -- The basic flow consumes synthetic IDs from the fixture. In live mode
    -- without an *_ENTID env override, those IDs hit the live API and 4xx.
    if setup.synthetic_only then
      pending("live entity test uses synthetic IDs from fixture — set MBTAV__TEST_ROUTE_PATTERN_ENTID JSON to run live")
      return
    end
    local client = setup.client

    -- Bootstrap entity data from existing test data.
    local route_pattern_ref01_data_raw = vs.items(helpers.to_map(
      vs.getpath(setup.data, "existing.route_pattern")))
    local route_pattern_ref01_data = nil
    if #route_pattern_ref01_data_raw > 0 then
      route_pattern_ref01_data = helpers.to_map(route_pattern_ref01_data_raw[1][2])
    end

    -- LOAD
    local route_pattern_ref01_ent = client:RoutePattern(nil)
    local route_pattern_ref01_match_dt0 = {}
    local route_pattern_ref01_data_dt0_loaded, err = route_pattern_ref01_ent:load(route_pattern_ref01_match_dt0, nil)
    assert.is_nil(err)
    assert.is_not_nil(route_pattern_ref01_data_dt0_loaded)

  end)
end)

function route_pattern_basic_setup(extra)
  runner.load_env_local()

  local entity_data_file = _test_dir .. "../../.sdk/test/entity/route_pattern/RoutePatternTestData.json"
  local f = io.open(entity_data_file, "r")
  if f == nil then
    error("failed to read route_pattern test data: " .. entity_data_file)
  end
  local entity_data_source = f:read("*a")
  f:close()

  local entity_data = json.decode(entity_data_source)

  local options = {}
  options["entity"] = entity_data["existing"]

  local client = sdk.test(options, extra)

  -- Generate idmap via transform.
  local idmap = vs.transform(
    { "route_pattern01", "route_pattern02", "route_pattern03" },
    {
      ["`$PACK`"] = { "", {
        ["`$KEY`"] = "`$COPY`",
        ["`$VAL`"] = { "`$FORMAT`", "upper", "`$COPY`" },
      }},
    }
  )

  -- Detect ENTID env override before envOverride consumes it. When live
  -- mode is on without a real override, the basic test runs against synthetic
  -- IDs from the fixture and 4xx's. Surface this so the test can skip.
  local entid_env_raw = os.getenv("MBTAV__TEST_ROUTE_PATTERN_ENTID")
  local idmap_overridden = entid_env_raw ~= nil and entid_env_raw:match("^%s*{") ~= nil

  local env = runner.env_override({
    ["MBTAV__TEST_ROUTE_PATTERN_ENTID"] = idmap,
    ["MBTAV__TEST_LIVE"] = "FALSE",
    ["MBTAV__TEST_EXPLAIN"] = "FALSE",
    ["MBTAV__APIKEY"] = "NONE",
  })

  local idmap_resolved = helpers.to_map(
    env["MBTAV__TEST_ROUTE_PATTERN_ENTID"])
  if idmap_resolved == nil then
    idmap_resolved = helpers.to_map(idmap)
  end

  if env["MBTAV__TEST_LIVE"] == "TRUE" then
    local merged_opts = vs.merge({
      {
        apikey = env["MBTAV__APIKEY"],
      },
      extra or {},
    })
    client = sdk.new(helpers.to_map(merged_opts))
  end

  local live = env["MBTAV__TEST_LIVE"] == "TRUE"
  return {
    client = client,
    data = entity_data,
    idmap = idmap_resolved,
    env = env,
    explain = env["MBTAV__TEST_EXPLAIN"] == "TRUE",
    live = live,
    synthetic_only = live and not idmap_overridden,
    now = os.time() * 1000,
  }
end
