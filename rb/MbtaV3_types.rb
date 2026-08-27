# frozen_string_literal: true

# Typed models for the MbtaV3 SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Member types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Ruby types are unenforced; these YARD
# annotations document the shapes. Do not edit by hand.

# Alert entity data model.
class Alert
end

# Request payload for Alert#load.
class AlertLoadMatch
end

# Facility entity data model.
class Facility
end

# Request payload for Facility#load.
class FacilityLoadMatch
end

# Line entity data model.
class Line
end

# Request payload for Line#load.
class LineLoadMatch
end

# Prediction entity data model.
class Prediction
end

# Request payload for Prediction#load.
class PredictionLoadMatch
end

# Route entity data model.
#
# @!attribute [rw] id
#   @return [String, nil]
Route = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for Route#load.
#
# @!attribute [rw] id
#   @return [String]
RouteLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

# RoutePattern entity data model.
class RoutePattern
end

# Request payload for RoutePattern#load.
class RoutePatternLoadMatch
end

# Schedule entity data model.
class Schedule
end

# Request payload for Schedule#load.
class ScheduleLoadMatch
end

# Service entity data model.
class Service
end

# Request payload for Service#load.
class ServiceLoadMatch
end

# Shape entity data model.
class Shape
end

# Request payload for Shape#load.
class ShapeLoadMatch
end

# Stop entity data model.
class Stop
end

# Request payload for Stop#load.
class StopLoadMatch
end

# Trip entity data model.
class Trip
end

# Request payload for Trip#load.
class TripLoadMatch
end

# Vehicle entity data model.
class Vehicle
end

# Request payload for Vehicle#load.
class VehicleLoadMatch
end

