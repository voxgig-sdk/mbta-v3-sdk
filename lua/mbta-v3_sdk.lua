-- MbtaV3 SDK

local vs = require("utility.struct.struct")
local Utility = require("core.utility_type")
local Spec = require("core.spec")
local helpers = require("core.helpers")

-- Load utility registration (populates Utility._registrar)
require("utility.register")

-- Load features
local BaseFeature = require("feature.base_feature")
local features_factory = require("features")


local MbtaV3SDK = {}
MbtaV3SDK.__index = MbtaV3SDK


local function _make_feature(name)
  local factory = features_factory[name]
  if factory ~= nil then
    return factory()
  end
  return features_factory.base()
end

MbtaV3SDK._make_feature = _make_feature


function MbtaV3SDK.new(options)
  local self = setmetatable({}, MbtaV3SDK)
  self.mode = "live"
  self.features = {}
  self.options = nil

  local utility = Utility.new()
  self._utility = utility

  local config = require("config")()

  self._rootctx = utility.make_context({
    client = self,
    utility = utility,
    config = config,
    options = options or {},
    shared = {},
  }, nil)

  self.options = utility.make_options(self._rootctx)

  if vs.getpath(self.options, "feature.test.active") == true then
    self.mode = "test"
  end

  self._rootctx.options = self.options

  -- Add features from config.
  local feature_opts = helpers.to_map(vs.getprop(self.options, "feature"))
  if feature_opts ~= nil then
    local feature_items = vs.items(feature_opts)
    if feature_items ~= nil then
      for _, item in ipairs(feature_items) do
        local fname = item[1]
        local fopts = helpers.to_map(item[2])
        if fopts ~= nil and fopts["active"] == true then
          utility.feature_add(self._rootctx, _make_feature(fname))
        end
      end
    end
  end

  -- Add extension features.
  local extend = vs.getprop(self.options, "extend")
  if type(extend) == "table" then
    for _, f in ipairs(extend) do
      if type(f) == "table" and type(f.get_name) == "function" then
        utility.feature_add(self._rootctx, f)
      end
    end
  end

  -- Initialize features.
  for _, f in ipairs(self.features) do
    utility.feature_init(self._rootctx, f)
  end

  utility.feature_hook(self._rootctx, "PostConstruct")

  -- #BuildFeatures

  return self
end


function MbtaV3SDK:options_map()
  local out = vs.clone(self.options)
  if type(out) == "table" then
    return out
  end
  return {}
end


function MbtaV3SDK:get_utility()
  return Utility.copy(self._utility)
end


function MbtaV3SDK:get_root_ctx()
  return self._rootctx
end


function MbtaV3SDK:prepare(fetchargs)
  local utility = self._utility

  fetchargs = fetchargs or {}

  local ctrl = helpers.to_map(vs.getprop(fetchargs, "ctrl")) or {}

  local ctx = utility.make_context({
    opname = "prepare",
    ctrl = ctrl,
  }, self._rootctx)

  local options = self.options

  local path = vs.getprop(fetchargs, "path") or ""
  if type(path) ~= "string" then path = "" end

  local method = vs.getprop(fetchargs, "method") or "GET"
  if type(method) ~= "string" then method = "GET" end

  local params = helpers.to_map(vs.getprop(fetchargs, "params")) or {}
  local query = helpers.to_map(vs.getprop(fetchargs, "query")) or {}

  local headers = utility.prepare_headers(ctx)

  local base = vs.getprop(options, "base") or ""
  if type(base) ~= "string" then base = "" end
  local prefix = vs.getprop(options, "prefix") or ""
  if type(prefix) ~= "string" then prefix = "" end
  local suffix = vs.getprop(options, "suffix") or ""
  if type(suffix) ~= "string" then suffix = "" end

  ctx.spec = Spec.new({
    base = base,
    prefix = prefix,
    suffix = suffix,
    path = path,
    method = method,
    params = params,
    query = query,
    headers = headers,
    body = vs.getprop(fetchargs, "body"),
    step = "start",
  })

  -- Merge user-provided headers.
  local uh = vs.getprop(fetchargs, "headers")
  if type(uh) == "table" then
    for k, v in pairs(uh) do
      ctx.spec.headers[k] = v
    end
  end

  local _, err = utility.prepare_auth(ctx)
  if err ~= nil then
    return nil, err
  end

  return utility.make_fetch_def(ctx)
end


function MbtaV3SDK:direct(fetchargs)
  local utility = self._utility

  local fetchdef, err = self:prepare(fetchargs)
  if err ~= nil then
    return { ok = false, err = err }, nil
  end

  fetchargs = fetchargs or {}
  local ctrl = helpers.to_map(vs.getprop(fetchargs, "ctrl")) or {}

  local ctx = utility.make_context({
    opname = "direct",
    ctrl = ctrl,
  }, self._rootctx)

  local url = fetchdef["url"] or ""
  local fetched, fetch_err = utility.fetcher(ctx, url, fetchdef)

  if fetch_err ~= nil then
    return { ok = false, err = fetch_err }, nil
  end

  if fetched == nil then
    return {
      ok = false,
      err = ctx:make_error("direct_no_response", "response: undefined"),
    }, nil
  end

  if type(fetched) == "table" then
    local status = helpers.to_int(vs.getprop(fetched, "status"))
    local headers = vs.getprop(fetched, "headers") or {}

    -- No-body responses (204, 304) and explicit zero content-length
    -- must skip JSON parsing — calling json() on an empty body errors.
    local content_length = nil
    if type(headers) == "table" then
      content_length = headers["content-length"]
    end
    local no_body = status == 204 or status == 304 or tostring(content_length) == "0"

    local json_data = nil
    if not no_body then
      local jf = vs.getprop(fetched, "json")
      if type(jf) == "function" then
        local ok, result = pcall(jf)
        if ok then
          json_data = result
        end
        -- Non-JSON body: json_data stays nil, status/headers preserved.
      end
    end

    return {
      ok = status >= 200 and status < 300,
      status = status,
      headers = headers,
      data = json_data,
    }, nil
  end

  return {
    ok = false,
    err = ctx:make_error("direct_invalid", "invalid response type"),
  }, nil
end



-- Idiomatic facade: client:alert():list() / client:alert():load({ id = ... })
function MbtaV3SDK:alert(data)
  local EntityMod = require("entity.alert_entity")
  if data == nil then
    if self._alert == nil then
      self._alert = EntityMod.new(self, nil)
    end
    return self._alert
  end
  return EntityMod.new(self, data)
end

-- Deprecated: use client:alert() instead.
function MbtaV3SDK:Alert(data)
  local EntityMod = require("entity.alert_entity")
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:facility():list() / client:facility():load({ id = ... })
function MbtaV3SDK:facility(data)
  local EntityMod = require("entity.facility_entity")
  if data == nil then
    if self._facility == nil then
      self._facility = EntityMod.new(self, nil)
    end
    return self._facility
  end
  return EntityMod.new(self, data)
end

-- Deprecated: use client:facility() instead.
function MbtaV3SDK:Facility(data)
  local EntityMod = require("entity.facility_entity")
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:line():list() / client:line():load({ id = ... })
function MbtaV3SDK:line(data)
  local EntityMod = require("entity.line_entity")
  if data == nil then
    if self._line == nil then
      self._line = EntityMod.new(self, nil)
    end
    return self._line
  end
  return EntityMod.new(self, data)
end

-- Deprecated: use client:line() instead.
function MbtaV3SDK:Line(data)
  local EntityMod = require("entity.line_entity")
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:prediction():list() / client:prediction():load({ id = ... })
function MbtaV3SDK:prediction(data)
  local EntityMod = require("entity.prediction_entity")
  if data == nil then
    if self._prediction == nil then
      self._prediction = EntityMod.new(self, nil)
    end
    return self._prediction
  end
  return EntityMod.new(self, data)
end

-- Deprecated: use client:prediction() instead.
function MbtaV3SDK:Prediction(data)
  local EntityMod = require("entity.prediction_entity")
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:route():list() / client:route():load({ id = ... })
function MbtaV3SDK:route(data)
  local EntityMod = require("entity.route_entity")
  if data == nil then
    if self._route == nil then
      self._route = EntityMod.new(self, nil)
    end
    return self._route
  end
  return EntityMod.new(self, data)
end

-- Deprecated: use client:route() instead.
function MbtaV3SDK:Route(data)
  local EntityMod = require("entity.route_entity")
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:route_pattern():list() / client:route_pattern():load({ id = ... })
function MbtaV3SDK:route_pattern(data)
  local EntityMod = require("entity.route_pattern_entity")
  if data == nil then
    if self._route_pattern == nil then
      self._route_pattern = EntityMod.new(self, nil)
    end
    return self._route_pattern
  end
  return EntityMod.new(self, data)
end

-- Deprecated: use client:route_pattern() instead.
function MbtaV3SDK:RoutePattern(data)
  local EntityMod = require("entity.route_pattern_entity")
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:schedule():list() / client:schedule():load({ id = ... })
function MbtaV3SDK:schedule(data)
  local EntityMod = require("entity.schedule_entity")
  if data == nil then
    if self._schedule == nil then
      self._schedule = EntityMod.new(self, nil)
    end
    return self._schedule
  end
  return EntityMod.new(self, data)
end

-- Deprecated: use client:schedule() instead.
function MbtaV3SDK:Schedule(data)
  local EntityMod = require("entity.schedule_entity")
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:service():list() / client:service():load({ id = ... })
function MbtaV3SDK:service(data)
  local EntityMod = require("entity.service_entity")
  if data == nil then
    if self._service == nil then
      self._service = EntityMod.new(self, nil)
    end
    return self._service
  end
  return EntityMod.new(self, data)
end

-- Deprecated: use client:service() instead.
function MbtaV3SDK:Service(data)
  local EntityMod = require("entity.service_entity")
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:shape():list() / client:shape():load({ id = ... })
function MbtaV3SDK:shape(data)
  local EntityMod = require("entity.shape_entity")
  if data == nil then
    if self._shape == nil then
      self._shape = EntityMod.new(self, nil)
    end
    return self._shape
  end
  return EntityMod.new(self, data)
end

-- Deprecated: use client:shape() instead.
function MbtaV3SDK:Shape(data)
  local EntityMod = require("entity.shape_entity")
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:stop():list() / client:stop():load({ id = ... })
function MbtaV3SDK:stop(data)
  local EntityMod = require("entity.stop_entity")
  if data == nil then
    if self._stop == nil then
      self._stop = EntityMod.new(self, nil)
    end
    return self._stop
  end
  return EntityMod.new(self, data)
end

-- Deprecated: use client:stop() instead.
function MbtaV3SDK:Stop(data)
  local EntityMod = require("entity.stop_entity")
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:trip():list() / client:trip():load({ id = ... })
function MbtaV3SDK:trip(data)
  local EntityMod = require("entity.trip_entity")
  if data == nil then
    if self._trip == nil then
      self._trip = EntityMod.new(self, nil)
    end
    return self._trip
  end
  return EntityMod.new(self, data)
end

-- Deprecated: use client:trip() instead.
function MbtaV3SDK:Trip(data)
  local EntityMod = require("entity.trip_entity")
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:vehicle():list() / client:vehicle():load({ id = ... })
function MbtaV3SDK:vehicle(data)
  local EntityMod = require("entity.vehicle_entity")
  if data == nil then
    if self._vehicle == nil then
      self._vehicle = EntityMod.new(self, nil)
    end
    return self._vehicle
  end
  return EntityMod.new(self, data)
end

-- Deprecated: use client:vehicle() instead.
function MbtaV3SDK:Vehicle(data)
  local EntityMod = require("entity.vehicle_entity")
  return EntityMod.new(self, data)
end




function MbtaV3SDK.test(testopts, sdkopts)
  sdkopts = sdkopts or {}
  sdkopts = vs.clone(sdkopts)
  if type(sdkopts) ~= "table" then
    sdkopts = {}
  end

  testopts = testopts or {}
  testopts = vs.clone(testopts)
  if type(testopts) ~= "table" then
    testopts = {}
  end
  testopts["active"] = true

  vs.setpath(sdkopts, "feature.test", testopts)

  local sdk = MbtaV3SDK.new(sdkopts)
  sdk.mode = "test"

  return sdk
end


return MbtaV3SDK
