// Typed models for the MbtaV3 SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
package entity

import (
	"encoding/json"

	"github.com/voxgig-sdk/mbta-v3-sdk/go/core"
)

// Alert is the typed data model for the alert entity.
type Alert struct {
}

// AlertLoadMatch is the typed request payload for Alert.LoadTyped.
type AlertLoadMatch struct {
	FilterActivity *string `json:"filter_activity,omitempty"`
	FilterRoute *string `json:"filter_route,omitempty"`
	FilterStop *string `json:"filter_stop,omitempty"`
	Include *string `json:"include,omitempty"`
	Sort *string `json:"sort,omitempty"`
}

// Facility is the typed data model for the facility entity.
type Facility struct {
}

// FacilityLoadMatch is the typed request payload for Facility.LoadTyped.
type FacilityLoadMatch struct {
	FilterStop *string `json:"filter_stop,omitempty"`
	FilterType *string `json:"filter_type,omitempty"`
	Include *string `json:"include,omitempty"`
}

// Line is the typed data model for the line entity.
type Line struct {
}

// LineLoadMatch is the typed request payload for Line.LoadTyped.
type LineLoadMatch struct {
	FilterId *string `json:"filter_id,omitempty"`
	Include *string `json:"include,omitempty"`
}

// Prediction is the typed data model for the prediction entity.
type Prediction struct {
}

// PredictionLoadMatch is the typed request payload for Prediction.LoadTyped.
type PredictionLoadMatch struct {
	FilterDirectionId *int `json:"filter_direction_id,omitempty"`
	FilterRoute *string `json:"filter_route,omitempty"`
	FilterStop *string `json:"filter_stop,omitempty"`
	FilterTrip *string `json:"filter_trip,omitempty"`
	Include *string `json:"include,omitempty"`
	Sort *string `json:"sort,omitempty"`
}

// Route is the typed data model for the route entity.
type Route struct {
	Id *string `json:"id,omitempty"`
}

// RouteLoadMatch is the typed request payload for Route.LoadTyped.
type RouteLoadMatch struct {
	Id string `json:"id"`
	Include *string `json:"include,omitempty"`
}

// RoutePattern is the typed data model for the route_pattern entity.
type RoutePattern struct {
}

// RoutePatternLoadMatch is the typed request payload for RoutePattern.LoadTyped.
type RoutePatternLoadMatch struct {
	FilterDirectionId *int `json:"filter_direction_id,omitempty"`
	FilterRoute *string `json:"filter_route,omitempty"`
	FilterStop *string `json:"filter_stop,omitempty"`
	Include *string `json:"include,omitempty"`
}

// Schedule is the typed data model for the schedule entity.
type Schedule struct {
}

// ScheduleLoadMatch is the typed request payload for Schedule.LoadTyped.
type ScheduleLoadMatch struct {
	FilterDate *string `json:"filter_date,omitempty"`
	FilterDirectionId *int `json:"filter_direction_id,omitempty"`
	FilterMaxTime *string `json:"filter_max_time,omitempty"`
	FilterMinTime *string `json:"filter_min_time,omitempty"`
	FilterRoute *string `json:"filter_route,omitempty"`
	FilterStop *string `json:"filter_stop,omitempty"`
	FilterTrip *string `json:"filter_trip,omitempty"`
	Include *string `json:"include,omitempty"`
	Sort *string `json:"sort,omitempty"`
}

// Service is the typed data model for the service entity.
type Service struct {
}

// ServiceLoadMatch is the typed request payload for Service.LoadTyped.
type ServiceLoadMatch struct {
	FilterId *string `json:"filter_id,omitempty"`
	FilterRoute *string `json:"filter_route,omitempty"`
	Include *string `json:"include,omitempty"`
}

// Shape is the typed data model for the shape entity.
type Shape struct {
}

// ShapeLoadMatch is the typed request payload for Shape.LoadTyped.
type ShapeLoadMatch struct {
	FilterDirectionId *int `json:"filter_direction_id,omitempty"`
	FilterRoute *string `json:"filter_route,omitempty"`
	Include *string `json:"include,omitempty"`
}

// Stop is the typed data model for the stop entity.
type Stop struct {
}

// StopLoadMatch is the typed request payload for Stop.LoadTyped.
type StopLoadMatch struct {
	FilterId *string `json:"filter_id,omitempty"`
	FilterLatitude *float64 `json:"filter_latitude,omitempty"`
	FilterLocationType *int `json:"filter_location_type,omitempty"`
	FilterLongitude *float64 `json:"filter_longitude,omitempty"`
	FilterRadius *float64 `json:"filter_radius,omitempty"`
	FilterRoute *string `json:"filter_route,omitempty"`
	Include *string `json:"include,omitempty"`
	Sort *string `json:"sort,omitempty"`
}

// Trip is the typed data model for the trip entity.
type Trip struct {
}

// TripLoadMatch is the typed request payload for Trip.LoadTyped.
type TripLoadMatch struct {
	FilterDirectionId *int `json:"filter_direction_id,omitempty"`
	FilterId *string `json:"filter_id,omitempty"`
	FilterName *string `json:"filter_name,omitempty"`
	FilterRoute *string `json:"filter_route,omitempty"`
	FilterRoutePattern *string `json:"filter_route_pattern,omitempty"`
	Include *string `json:"include,omitempty"`
	Sort *string `json:"sort,omitempty"`
}

// Vehicle is the typed data model for the vehicle entity.
type Vehicle struct {
}

// VehicleLoadMatch is the typed request payload for Vehicle.LoadTyped.
type VehicleLoadMatch struct {
	FilterDirectionId *int `json:"filter_direction_id,omitempty"`
	FilterId *string `json:"filter_id,omitempty"`
	FilterLabel *string `json:"filter_label,omitempty"`
	FilterRoute *string `json:"filter_route,omitempty"`
	FilterTrip *string `json:"filter_trip,omitempty"`
	Include *string `json:"include,omitempty"`
	Sort *string `json:"sort,omitempty"`
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

// entityData unwraps an entity to its data map.
//
// Operations resolve to the ENTITY, not the raw data (see AGENTS.md), and an
// entity's fields are UNEXPORTED — marshalling one directly yields `{}`, so
// every typed accessor would silently hand back a zero-valued struct. The
// typed boundary therefore takes the data hop first.
func entityData(v any) any {
	if ent, ok := v.(core.Entity); ok {
		return ent.Data()
	}
	return v
}

// typedFrom decodes a runtime value (an entity, or the map[string]any the op
// pipeline produced) into a typed model T via a JSON round-trip. On any error
// it returns the zero value of T; the op's own (value, error) tuple carries
// the real error.
func typedFrom[T any](v any) T {
	var out T
	v = entityData(v)
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

// typedSliceFrom decodes a runtime list value into a typed slice []T via a
// JSON round-trip, for list ops. `list` resolves to a slice of ENTITY
// instances, so each element takes the data hop.
func typedSliceFrom[T any](v any) []T {
	var out []T
	if v == nil {
		return out
	}
	if list, ok := v.([]any); ok {
		unwrapped := make([]any, 0, len(list))
		for _, item := range list {
			unwrapped = append(unwrapped, entityData(item))
		}
		v = unwrapped
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}
