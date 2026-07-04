# MbtaV3 SDK

require_relative 'utility/struct/voxgig_struct'
require_relative 'core/utility_type'
require_relative 'core/spec'
require_relative 'core/helpers'

# Load utility registration
require_relative 'utility/register'

# Load config and features
require_relative 'config'
require_relative 'feature/base_feature'
require_relative 'features'

# Load typed models (Struct value objects).
require_relative 'MbtaV3_types'


class MbtaV3SDK
  attr_accessor :mode, :features, :options

  def initialize(options = {})
    @mode = "live"
    @features = []
    @options = nil

    utility = MbtaV3Utility.new
    @_utility = utility

    config = MbtaV3Config.make_config

    @_rootctx = utility.make_context.call({
      "client" => self,
      "utility" => utility,
      "config" => config,
      "options" => options || {},
      "shared" => {},
    }, nil)

    @options = utility.make_options.call(@_rootctx)

    if VoxgigStruct.getpath(@options, "feature.test.active") == true
      @mode = "test"
    end

    @_rootctx.options = @options

    # Add features from config.
    feature_opts = MbtaV3Helpers.to_map(VoxgigStruct.getprop(@options, "feature"))
    if feature_opts
      items = VoxgigStruct.items(feature_opts)
      if items
        items.each do |item|
          fname = item[0]
          fopts = MbtaV3Helpers.to_map(item[1])
          if fopts && fopts["active"] == true
            utility.feature_add.call(@_rootctx, MbtaV3Features.make_feature(fname))
          end
        end
      end
    end

    # Add extension features.
    extend_val = VoxgigStruct.getprop(@options, "extend")
    if extend_val.is_a?(Array)
      extend_val.each do |f|
        if f.respond_to?(:get_name)
          utility.feature_add.call(@_rootctx, f)
        end
      end
    end

    # Initialize features.
    @features.each do |f|
      utility.feature_init.call(@_rootctx, f)
    end

    utility.feature_hook.call(@_rootctx, "PostConstruct")
  end

  def options_map
    out = VoxgigStruct.clone(@options)
    out.is_a?(Hash) ? out : {}
  end

  def get_utility
    MbtaV3Utility.copy(@_utility)
  end

  def get_root_ctx
    @_rootctx
  end

  def prepare(fetchargs = {})
    utility = @_utility
    fetchargs ||= {}

    ctrl = MbtaV3Helpers.to_map(VoxgigStruct.getprop(fetchargs, "ctrl")) || {}

    ctx = utility.make_context.call({
      "opname" => "prepare",
      "ctrl" => ctrl,
    }, @_rootctx)

    opts = @options
    path = VoxgigStruct.getprop(fetchargs, "path") || ""
    path = "" unless path.is_a?(String)
    method_val = VoxgigStruct.getprop(fetchargs, "method") || "GET"
    method_val = "GET" unless method_val.is_a?(String)
    params = MbtaV3Helpers.to_map(VoxgigStruct.getprop(fetchargs, "params")) || {}
    query = MbtaV3Helpers.to_map(VoxgigStruct.getprop(fetchargs, "query")) || {}
    headers = utility.prepare_headers.call(ctx)

    base = VoxgigStruct.getprop(opts, "base") || ""
    base = "" unless base.is_a?(String)
    prefix = VoxgigStruct.getprop(opts, "prefix") || ""
    prefix = "" unless prefix.is_a?(String)
    suffix = VoxgigStruct.getprop(opts, "suffix") || ""
    suffix = "" unless suffix.is_a?(String)

    ctx.spec = MbtaV3Spec.new({
      "base" => base, "prefix" => prefix, "suffix" => suffix,
      "path" => path, "method" => method_val,
      "params" => params, "query" => query, "headers" => headers,
      "body" => VoxgigStruct.getprop(fetchargs, "body"),
      "step" => "start",
    })

    # Merge user-provided headers.
    uh = VoxgigStruct.getprop(fetchargs, "headers")
    if uh.is_a?(Hash)
      uh.each { |k, v| ctx.spec.headers[k] = v }
    end

    _, err = utility.prepare_auth.call(ctx)
    raise err if err

    utility.make_fetch_def.call(ctx)
  end

  def direct(fetchargs = {})
    utility = @_utility

    # direct() is the raw-HTTP escape hatch: it always returns a result hash
    # ({ "ok" => ..., ... }) and never raises. prepare() raises on error, so
    # trap that and surface it in the hash.
    begin
      fetchdef = prepare(fetchargs)
    rescue MbtaV3Error => err
      return { "ok" => false, "err" => err }
    end

    fetchargs ||= {}
    ctrl = MbtaV3Helpers.to_map(VoxgigStruct.getprop(fetchargs, "ctrl")) || {}

    ctx = utility.make_context.call({
      "opname" => "direct",
      "ctrl" => ctrl,
    }, @_rootctx)

    url = fetchdef["url"] || ""
    fetched, fetch_err = utility.fetcher.call(ctx, url, fetchdef)

    return { "ok" => false, "err" => fetch_err } if fetch_err

    if fetched.nil?
      return {
        "ok" => false,
        "err" => ctx.make_error("direct_no_response", "response: undefined"),
      }
    end

    if fetched.is_a?(Hash)
      status = MbtaV3Helpers.to_int(VoxgigStruct.getprop(fetched, "status"))
      headers = VoxgigStruct.getprop(fetched, "headers") || {}

      # No-body responses (204, 304) and explicit zero content-length must
      # skip JSON parsing — calling json() on an empty body errors.
      content_length = headers.is_a?(Hash) ? headers["content-length"] : nil
      no_body = status == 204 || status == 304 || content_length.to_s == "0"

      json_data = nil
      unless no_body
        jf = VoxgigStruct.getprop(fetched, "json")
        if jf.is_a?(Proc)
          begin
            json_data = jf.call
          rescue StandardError
            # Non-JSON body — leave data nil, keep status/headers.
            json_data = nil
          end
        end
      end

      return {
        "ok" => status >= 200 && status < 300,
        "status" => status,
        "headers" => headers,
        "data" => json_data,
      }
    end

    return {
      "ok" => false,
      "err" => ctx.make_error("direct_invalid", "invalid response type"),
    }
  end


  # Idiomatic facade: client.alert.list / client.alert.load({ "id" => ... })
  def alert
    require_relative 'entity/alert_entity'
    @alert ||= AlertEntity.new(self, nil)
  end

  # Deprecated: use client.alert instead.
  def Alert(data = nil)
    require_relative 'entity/alert_entity'
    AlertEntity.new(self, data)
  end


  # Idiomatic facade: client.facility.list / client.facility.load({ "id" => ... })
  def facility
    require_relative 'entity/facility_entity'
    @facility ||= FacilityEntity.new(self, nil)
  end

  # Deprecated: use client.facility instead.
  def Facility(data = nil)
    require_relative 'entity/facility_entity'
    FacilityEntity.new(self, data)
  end


  # Idiomatic facade: client.line.list / client.line.load({ "id" => ... })
  def line
    require_relative 'entity/line_entity'
    @line ||= LineEntity.new(self, nil)
  end

  # Deprecated: use client.line instead.
  def Line(data = nil)
    require_relative 'entity/line_entity'
    LineEntity.new(self, data)
  end


  # Idiomatic facade: client.prediction.list / client.prediction.load({ "id" => ... })
  def prediction
    require_relative 'entity/prediction_entity'
    @prediction ||= PredictionEntity.new(self, nil)
  end

  # Deprecated: use client.prediction instead.
  def Prediction(data = nil)
    require_relative 'entity/prediction_entity'
    PredictionEntity.new(self, data)
  end


  # Idiomatic facade: client.route.list / client.route.load({ "id" => ... })
  def route
    require_relative 'entity/route_entity'
    @route ||= RouteEntity.new(self, nil)
  end

  # Deprecated: use client.route instead.
  def Route(data = nil)
    require_relative 'entity/route_entity'
    RouteEntity.new(self, data)
  end


  # Idiomatic facade: client.route_pattern.list / client.route_pattern.load({ "id" => ... })
  def route_pattern
    require_relative 'entity/route_pattern_entity'
    @route_pattern ||= RoutePatternEntity.new(self, nil)
  end

  # Deprecated: use client.route_pattern instead.
  def RoutePattern(data = nil)
    require_relative 'entity/route_pattern_entity'
    RoutePatternEntity.new(self, data)
  end


  # Idiomatic facade: client.schedule.list / client.schedule.load({ "id" => ... })
  def schedule
    require_relative 'entity/schedule_entity'
    @schedule ||= ScheduleEntity.new(self, nil)
  end

  # Deprecated: use client.schedule instead.
  def Schedule(data = nil)
    require_relative 'entity/schedule_entity'
    ScheduleEntity.new(self, data)
  end


  # Idiomatic facade: client.service.list / client.service.load({ "id" => ... })
  def service
    require_relative 'entity/service_entity'
    @service ||= ServiceEntity.new(self, nil)
  end

  # Deprecated: use client.service instead.
  def Service(data = nil)
    require_relative 'entity/service_entity'
    ServiceEntity.new(self, data)
  end


  # Idiomatic facade: client.shape.list / client.shape.load({ "id" => ... })
  def shape
    require_relative 'entity/shape_entity'
    @shape ||= ShapeEntity.new(self, nil)
  end

  # Deprecated: use client.shape instead.
  def Shape(data = nil)
    require_relative 'entity/shape_entity'
    ShapeEntity.new(self, data)
  end


  # Idiomatic facade: client.stop.list / client.stop.load({ "id" => ... })
  def stop
    require_relative 'entity/stop_entity'
    @stop ||= StopEntity.new(self, nil)
  end

  # Deprecated: use client.stop instead.
  def Stop(data = nil)
    require_relative 'entity/stop_entity'
    StopEntity.new(self, data)
  end


  # Idiomatic facade: client.trip.list / client.trip.load({ "id" => ... })
  def trip
    require_relative 'entity/trip_entity'
    @trip ||= TripEntity.new(self, nil)
  end

  # Deprecated: use client.trip instead.
  def Trip(data = nil)
    require_relative 'entity/trip_entity'
    TripEntity.new(self, data)
  end


  # Idiomatic facade: client.vehicle.list / client.vehicle.load({ "id" => ... })
  def vehicle
    require_relative 'entity/vehicle_entity'
    @vehicle ||= VehicleEntity.new(self, nil)
  end

  # Deprecated: use client.vehicle instead.
  def Vehicle(data = nil)
    require_relative 'entity/vehicle_entity'
    VehicleEntity.new(self, data)
  end



  def self.test(testopts = nil, sdkopts = nil)
    sdkopts = sdkopts || {}
    sdkopts = VoxgigStruct.clone(sdkopts)
    sdkopts = {} unless sdkopts.is_a?(Hash)

    testopts = testopts || {}
    testopts = VoxgigStruct.clone(testopts)
    testopts = {} unless testopts.is_a?(Hash)
    testopts["active"] = true

    VoxgigStruct.setpath(sdkopts, "feature.test", testopts)

    sdk = MbtaV3SDK.new(sdkopts)
    sdk.mode = "test"
    sdk
  end
end
