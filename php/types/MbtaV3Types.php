<?php
declare(strict_types=1);

// Typed models for the MbtaV3 SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
//
// These are documentation-grade value objects (PHP 8 typed properties),
// registered on the composer classmap autoload. The SDK boundary exchanges
// assoc-arrays; these classes name the shapes for tooling and typed callers.

/** Alert entity data model. */
class Alert
{
}

/** Request payload for Alert#load. */
class AlertLoadMatch
{
    public ?string $filter_activity = null;
    public ?string $filter_route = null;
    public ?string $filter_stop = null;
    public ?string $include = null;
    public ?string $sort = null;
}

/** Facility entity data model. */
class Facility
{
}

/** Request payload for Facility#load. */
class FacilityLoadMatch
{
    public ?string $filter_stop = null;
    public ?string $filter_type = null;
    public ?string $include = null;
}

/** Line entity data model. */
class Line
{
}

/** Request payload for Line#load. */
class LineLoadMatch
{
    public ?string $filter_id = null;
    public ?string $include = null;
}

/** Prediction entity data model. */
class Prediction
{
}

/** Request payload for Prediction#load. */
class PredictionLoadMatch
{
    public ?int $filter_direction_id = null;
    public ?string $filter_route = null;
    public ?string $filter_stop = null;
    public ?string $filter_trip = null;
    public ?string $include = null;
    public ?string $sort = null;
}

/** Route entity data model. */
class Route
{
    public ?string $id = null;
}

/** Request payload for Route#load. */
class RouteLoadMatch
{
    public string $id;
    public ?string $include = null;
}

/** RoutePattern entity data model. */
class RoutePattern
{
}

/** Request payload for RoutePattern#load. */
class RoutePatternLoadMatch
{
    public ?int $filter_direction_id = null;
    public ?string $filter_route = null;
    public ?string $filter_stop = null;
    public ?string $include = null;
}

/** Schedule entity data model. */
class Schedule
{
}

/** Request payload for Schedule#load. */
class ScheduleLoadMatch
{
    public ?string $filter_date = null;
    public ?int $filter_direction_id = null;
    public ?string $filter_max_time = null;
    public ?string $filter_min_time = null;
    public ?string $filter_route = null;
    public ?string $filter_stop = null;
    public ?string $filter_trip = null;
    public ?string $include = null;
    public ?string $sort = null;
}

/** Service entity data model. */
class Service
{
}

/** Request payload for Service#load. */
class ServiceLoadMatch
{
    public ?string $filter_id = null;
    public ?string $filter_route = null;
    public ?string $include = null;
}

/** Shape entity data model. */
class Shape
{
}

/** Request payload for Shape#load. */
class ShapeLoadMatch
{
    public ?int $filter_direction_id = null;
    public ?string $filter_route = null;
    public ?string $include = null;
}

/** Stop entity data model. */
class Stop
{
}

/** Request payload for Stop#load. */
class StopLoadMatch
{
    public ?string $filter_id = null;
    public ?float $filter_latitude = null;
    public ?int $filter_location_type = null;
    public ?float $filter_longitude = null;
    public ?float $filter_radius = null;
    public ?string $filter_route = null;
    public ?string $include = null;
    public ?string $sort = null;
}

/** Trip entity data model. */
class Trip
{
}

/** Request payload for Trip#load. */
class TripLoadMatch
{
    public ?int $filter_direction_id = null;
    public ?string $filter_id = null;
    public ?string $filter_name = null;
    public ?string $filter_route = null;
    public ?string $filter_route_pattern = null;
    public ?string $include = null;
    public ?string $sort = null;
}

/** Vehicle entity data model. */
class Vehicle
{
}

/** Request payload for Vehicle#load. */
class VehicleLoadMatch
{
    public ?int $filter_direction_id = null;
    public ?string $filter_id = null;
    public ?string $filter_label = null;
    public ?string $filter_route = null;
    public ?string $filter_trip = null;
    public ?string $include = null;
    public ?string $sort = null;
}

