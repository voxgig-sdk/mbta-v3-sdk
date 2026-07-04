// Typed models for the MbtaV3 SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
package entity

import "encoding/json"

// Alert is the typed data model for the alert entity.
type Alert struct {
}

// AlertLoadMatch mirrors the alert fields as an all-optional match
// filter (Go analog of Partial<Alert>).
type AlertLoadMatch struct {
}

// Facility is the typed data model for the facility entity.
type Facility struct {
}

// FacilityLoadMatch mirrors the facility fields as an all-optional match
// filter (Go analog of Partial<Facility>).
type FacilityLoadMatch struct {
}

// Line is the typed data model for the line entity.
type Line struct {
}

// LineLoadMatch mirrors the line fields as an all-optional match
// filter (Go analog of Partial<Line>).
type LineLoadMatch struct {
}

// Prediction is the typed data model for the prediction entity.
type Prediction struct {
}

// PredictionLoadMatch mirrors the prediction fields as an all-optional match
// filter (Go analog of Partial<Prediction>).
type PredictionLoadMatch struct {
}

// Route is the typed data model for the route entity.
type Route struct {
}

// RouteLoadMatch is the typed request payload for Route.LoadTyped.
type RouteLoadMatch struct {
	Id string `json:"id"`
}

// RoutePattern is the typed data model for the route_pattern entity.
type RoutePattern struct {
}

// RoutePatternLoadMatch mirrors the route_pattern fields as an all-optional match
// filter (Go analog of Partial<RoutePattern>).
type RoutePatternLoadMatch struct {
}

// Schedule is the typed data model for the schedule entity.
type Schedule struct {
}

// ScheduleLoadMatch mirrors the schedule fields as an all-optional match
// filter (Go analog of Partial<Schedule>).
type ScheduleLoadMatch struct {
}

// Service is the typed data model for the service entity.
type Service struct {
}

// ServiceLoadMatch mirrors the service fields as an all-optional match
// filter (Go analog of Partial<Service>).
type ServiceLoadMatch struct {
}

// Shape is the typed data model for the shape entity.
type Shape struct {
}

// ShapeLoadMatch mirrors the shape fields as an all-optional match
// filter (Go analog of Partial<Shape>).
type ShapeLoadMatch struct {
}

// Stop is the typed data model for the stop entity.
type Stop struct {
}

// StopLoadMatch mirrors the stop fields as an all-optional match
// filter (Go analog of Partial<Stop>).
type StopLoadMatch struct {
}

// Trip is the typed data model for the trip entity.
type Trip struct {
}

// TripLoadMatch mirrors the trip fields as an all-optional match
// filter (Go analog of Partial<Trip>).
type TripLoadMatch struct {
}

// Vehicle is the typed data model for the vehicle entity.
type Vehicle struct {
}

// VehicleLoadMatch mirrors the vehicle fields as an all-optional match
// filter (Go analog of Partial<Vehicle>).
type VehicleLoadMatch struct {
}

// asMap turns a typed request/data struct into the map[string]any the
// runtime op pipeline consumes, honouring the json tags above.
func asMap(v any) map[string]any {
	out := map[string]any{}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// typedFrom decodes a runtime value (a map[string]any produced by the op
// pipeline) into a typed model T via a JSON round-trip. On any error it
// returns the zero value of T; the op's own (value, error) tuple carries the
// real error.
func typedFrom[T any](v any) T {
	var out T
	if v == nil {
		return out
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// typedSliceFrom decodes a runtime list value ([]any of maps) into a typed
// slice []T via a JSON round-trip, for list ops.
func typedSliceFrom[T any](v any) []T {
	var out []T
	if v == nil {
		return out
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}
