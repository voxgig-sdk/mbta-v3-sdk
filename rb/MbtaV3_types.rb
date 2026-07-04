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

# Match filter for Alert#load (any subset of Alert fields).
class AlertLoadMatch
end

# Facility entity data model.
class Facility
end

# Match filter for Facility#load (any subset of Facility fields).
class FacilityLoadMatch
end

# Line entity data model.
class Line
end

# Match filter for Line#load (any subset of Line fields).
class LineLoadMatch
end

# Prediction entity data model.
class Prediction
end

# Match filter for Prediction#load (any subset of Prediction fields).
class PredictionLoadMatch
end

# Route entity data model.
class Route
end

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

# Match filter for RoutePattern#load (any subset of RoutePattern fields).
class RoutePatternLoadMatch
end

# Schedule entity data model.
class Schedule
end

# Match filter for Schedule#load (any subset of Schedule fields).
class ScheduleLoadMatch
end

# Service entity data model.
class Service
end

# Match filter for Service#load (any subset of Service fields).
class ServiceLoadMatch
end

# Shape entity data model.
class Shape
end

# Match filter for Shape#load (any subset of Shape fields).
class ShapeLoadMatch
end

# Stop entity data model.
class Stop
end

# Match filter for Stop#load (any subset of Stop fields).
class StopLoadMatch
end

# Trip entity data model.
class Trip
end

# Match filter for Trip#load (any subset of Trip fields).
class TripLoadMatch
end

# Vehicle entity data model.
class Vehicle
end

# Match filter for Vehicle#load (any subset of Vehicle fields).
class VehicleLoadMatch
end

