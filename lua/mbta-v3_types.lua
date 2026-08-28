-- Typed models for the MbtaV3 SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
-- params (op.<name>.points[].args.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class Alert

---@class AlertLoadMatch
---@field filter_activity? string
---@field filter_route? string
---@field filter_stop? string
---@field include? string
---@field sort? string

---@class Facility

---@class FacilityLoadMatch
---@field filter_stop? string
---@field filter_type? string
---@field include? string

---@class Line

---@class LineLoadMatch
---@field filter_id? string
---@field include? string

---@class Prediction

---@class PredictionLoadMatch
---@field filter_direction_id? number
---@field filter_route? string
---@field filter_stop? string
---@field filter_trip? string
---@field include? string
---@field sort? string

---@class Route
---@field id? string

---@class RouteLoadMatch
---@field id string
---@field include? string

---@class RoutePattern

---@class RoutePatternLoadMatch
---@field filter_direction_id? number
---@field filter_route? string
---@field filter_stop? string
---@field include? string

---@class Schedule

---@class ScheduleLoadMatch
---@field filter_date? string
---@field filter_direction_id? number
---@field filter_max_time? string
---@field filter_min_time? string
---@field filter_route? string
---@field filter_stop? string
---@field filter_trip? string
---@field include? string
---@field sort? string

---@class Service

---@class ServiceLoadMatch
---@field filter_id? string
---@field filter_route? string
---@field include? string

---@class Shape

---@class ShapeLoadMatch
---@field filter_direction_id? number
---@field filter_route? string
---@field include? string

---@class Stop

---@class StopLoadMatch
---@field filter_id? string
---@field filter_latitude? number
---@field filter_location_type? number
---@field filter_longitude? number
---@field filter_radius? number
---@field filter_route? string
---@field include? string
---@field sort? string

---@class Trip

---@class TripLoadMatch
---@field filter_direction_id? number
---@field filter_id? string
---@field filter_name? string
---@field filter_route? string
---@field filter_route_pattern? string
---@field include? string
---@field sort? string

---@class Vehicle

---@class VehicleLoadMatch
---@field filter_direction_id? number
---@field filter_id? string
---@field filter_label? string
---@field filter_route? string
---@field filter_trip? string
---@field include? string
---@field sort? string

local M = {}

return M
