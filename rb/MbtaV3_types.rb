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
#
# @!attribute [rw] filter_activity
#   @return [String, nil]
#
# @!attribute [rw] filter_route
#   @return [String, nil]
#
# @!attribute [rw] filter_stop
#   @return [String, nil]
#
# @!attribute [rw] include
#   @return [String, nil]
#
# @!attribute [rw] sort
#   @return [String, nil]
AlertLoadMatch = Struct.new(
  :filter_activity,
  :filter_route,
  :filter_stop,
  :include,
  :sort,
  keyword_init: true
)

# Facility entity data model.
class Facility
end

# Request payload for Facility#load.
#
# @!attribute [rw] filter_stop
#   @return [String, nil]
#
# @!attribute [rw] filter_type
#   @return [String, nil]
#
# @!attribute [rw] include
#   @return [String, nil]
FacilityLoadMatch = Struct.new(
  :filter_stop,
  :filter_type,
  :include,
  keyword_init: true
)

# Line entity data model.
class Line
end

# Request payload for Line#load.
#
# @!attribute [rw] filter_id
#   @return [String, nil]
#
# @!attribute [rw] include
#   @return [String, nil]
LineLoadMatch = Struct.new(
  :filter_id,
  :include,
  keyword_init: true
)

# Prediction entity data model.
class Prediction
end

# Request payload for Prediction#load.
#
# @!attribute [rw] filter_direction_id
#   @return [Integer, nil]
#
# @!attribute [rw] filter_route
#   @return [String, nil]
#
# @!attribute [rw] filter_stop
#   @return [String, nil]
#
# @!attribute [rw] filter_trip
#   @return [String, nil]
#
# @!attribute [rw] include
#   @return [String, nil]
#
# @!attribute [rw] sort
#   @return [String, nil]
PredictionLoadMatch = Struct.new(
  :filter_direction_id,
  :filter_route,
  :filter_stop,
  :filter_trip,
  :include,
  :sort,
  keyword_init: true
)

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
#
# @!attribute [rw] include
#   @return [String, nil]
RouteLoadMatch = Struct.new(
  :id,
  :include,
  keyword_init: true
)

# RoutePattern entity data model.
class RoutePattern
end

# Request payload for RoutePattern#load.
#
# @!attribute [rw] filter_direction_id
#   @return [Integer, nil]
#
# @!attribute [rw] filter_route
#   @return [String, nil]
#
# @!attribute [rw] filter_stop
#   @return [String, nil]
#
# @!attribute [rw] include
#   @return [String, nil]
RoutePatternLoadMatch = Struct.new(
  :filter_direction_id,
  :filter_route,
  :filter_stop,
  :include,
  keyword_init: true
)

# Schedule entity data model.
class Schedule
end

# Request payload for Schedule#load.
#
# @!attribute [rw] filter_date
#   @return [String, nil]
#
# @!attribute [rw] filter_direction_id
#   @return [Integer, nil]
#
# @!attribute [rw] filter_max_time
#   @return [String, nil]
#
# @!attribute [rw] filter_min_time
#   @return [String, nil]
#
# @!attribute [rw] filter_route
#   @return [String, nil]
#
# @!attribute [rw] filter_stop
#   @return [String, nil]
#
# @!attribute [rw] filter_trip
#   @return [String, nil]
#
# @!attribute [rw] include
#   @return [String, nil]
#
# @!attribute [rw] sort
#   @return [String, nil]
ScheduleLoadMatch = Struct.new(
  :filter_date,
  :filter_direction_id,
  :filter_max_time,
  :filter_min_time,
  :filter_route,
  :filter_stop,
  :filter_trip,
  :include,
  :sort,
  keyword_init: true
)

# Service entity data model.
class Service
end

# Request payload for Service#load.
#
# @!attribute [rw] filter_id
#   @return [String, nil]
#
# @!attribute [rw] filter_route
#   @return [String, nil]
#
# @!attribute [rw] include
#   @return [String, nil]
ServiceLoadMatch = Struct.new(
  :filter_id,
  :filter_route,
  :include,
  keyword_init: true
)

# Shape entity data model.
class Shape
end

# Request payload for Shape#load.
#
# @!attribute [rw] filter_direction_id
#   @return [Integer, nil]
#
# @!attribute [rw] filter_route
#   @return [String, nil]
#
# @!attribute [rw] include
#   @return [String, nil]
ShapeLoadMatch = Struct.new(
  :filter_direction_id,
  :filter_route,
  :include,
  keyword_init: true
)

# Stop entity data model.
class Stop
end

# Request payload for Stop#load.
#
# @!attribute [rw] filter_id
#   @return [String, nil]
#
# @!attribute [rw] filter_latitude
#   @return [Float, nil]
#
# @!attribute [rw] filter_location_type
#   @return [Integer, nil]
#
# @!attribute [rw] filter_longitude
#   @return [Float, nil]
#
# @!attribute [rw] filter_radius
#   @return [Float, nil]
#
# @!attribute [rw] filter_route
#   @return [String, nil]
#
# @!attribute [rw] include
#   @return [String, nil]
#
# @!attribute [rw] sort
#   @return [String, nil]
StopLoadMatch = Struct.new(
  :filter_id,
  :filter_latitude,
  :filter_location_type,
  :filter_longitude,
  :filter_radius,
  :filter_route,
  :include,
  :sort,
  keyword_init: true
)

# Trip entity data model.
class Trip
end

# Request payload for Trip#load.
#
# @!attribute [rw] filter_direction_id
#   @return [Integer, nil]
#
# @!attribute [rw] filter_id
#   @return [String, nil]
#
# @!attribute [rw] filter_name
#   @return [String, nil]
#
# @!attribute [rw] filter_route
#   @return [String, nil]
#
# @!attribute [rw] filter_route_pattern
#   @return [String, nil]
#
# @!attribute [rw] include
#   @return [String, nil]
#
# @!attribute [rw] sort
#   @return [String, nil]
TripLoadMatch = Struct.new(
  :filter_direction_id,
  :filter_id,
  :filter_name,
  :filter_route,
  :filter_route_pattern,
  :include,
  :sort,
  keyword_init: true
)

# Vehicle entity data model.
class Vehicle
end

# Request payload for Vehicle#load.
#
# @!attribute [rw] filter_direction_id
#   @return [Integer, nil]
#
# @!attribute [rw] filter_id
#   @return [String, nil]
#
# @!attribute [rw] filter_label
#   @return [String, nil]
#
# @!attribute [rw] filter_route
#   @return [String, nil]
#
# @!attribute [rw] filter_trip
#   @return [String, nil]
#
# @!attribute [rw] include
#   @return [String, nil]
#
# @!attribute [rw] sort
#   @return [String, nil]
VehicleLoadMatch = Struct.new(
  :filter_direction_id,
  :filter_id,
  :filter_label,
  :filter_route,
  :filter_trip,
  :include,
  :sort,
  keyword_init: true
)

