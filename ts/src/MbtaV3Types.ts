// Typed models for the MbtaV3 SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface Alert {
}

export interface AlertLoadMatch {
  filter_activity?: string
  filter_route?: string
  filter_stop?: string
  include?: string
  sort?: string
}

export interface Facility {
}

export interface FacilityLoadMatch {
  filter_stop?: string
  filter_type?: string
  include?: string
}

export interface Line {
}

export interface LineLoadMatch {
  filter_id?: string
  include?: string
}

export interface Prediction {
}

export interface PredictionLoadMatch {
  filter_direction_id?: number
  filter_route?: string
  filter_stop?: string
  filter_trip?: string
  include?: string
  sort?: string
}

export interface Route {
  id?: string
}

export interface RouteLoadMatch {
  id: string
  include?: string
}

export interface RoutePattern {
}

export interface RoutePatternLoadMatch {
  filter_direction_id?: number
  filter_route?: string
  filter_stop?: string
  include?: string
}

export interface Schedule {
}

export interface ScheduleLoadMatch {
  filter_date?: string
  filter_direction_id?: number
  filter_max_time?: string
  filter_min_time?: string
  filter_route?: string
  filter_stop?: string
  filter_trip?: string
  include?: string
  sort?: string
}

export interface Service {
}

export interface ServiceLoadMatch {
  filter_id?: string
  filter_route?: string
  include?: string
}

export interface Shape {
}

export interface ShapeLoadMatch {
  filter_direction_id?: number
  filter_route?: string
  include?: string
}

export interface Stop {
}

export interface StopLoadMatch {
  filter_id?: string
  filter_latitude?: number
  filter_location_type?: number
  filter_longitude?: number
  filter_radius?: number
  filter_route?: string
  include?: string
  sort?: string
}

export interface Trip {
}

export interface TripLoadMatch {
  filter_direction_id?: number
  filter_id?: string
  filter_name?: string
  filter_route?: string
  filter_route_pattern?: string
  include?: string
  sort?: string
}

export interface Vehicle {
}

export interface VehicleLoadMatch {
  filter_direction_id?: number
  filter_id?: string
  filter_label?: string
  filter_route?: string
  filter_trip?: string
  include?: string
  sort?: string
}

