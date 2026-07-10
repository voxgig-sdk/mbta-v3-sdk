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
}

/** Facility entity data model. */
class Facility
{
}

/** Request payload for Facility#load. */
class FacilityLoadMatch
{
}

/** Line entity data model. */
class Line
{
}

/** Request payload for Line#load. */
class LineLoadMatch
{
}

/** Prediction entity data model. */
class Prediction
{
}

/** Request payload for Prediction#load. */
class PredictionLoadMatch
{
}

/** Route entity data model. */
class Route
{
}

/** Request payload for Route#load. */
class RouteLoadMatch
{
    public ?string $id = null;
}

/** RoutePattern entity data model. */
class RoutePattern
{
}

/** Request payload for RoutePattern#load. */
class RoutePatternLoadMatch
{
}

/** Schedule entity data model. */
class Schedule
{
}

/** Request payload for Schedule#load. */
class ScheduleLoadMatch
{
}

/** Service entity data model. */
class Service
{
}

/** Request payload for Service#load. */
class ServiceLoadMatch
{
}

/** Shape entity data model. */
class Shape
{
}

/** Request payload for Shape#load. */
class ShapeLoadMatch
{
}

/** Stop entity data model. */
class Stop
{
}

/** Request payload for Stop#load. */
class StopLoadMatch
{
}

/** Trip entity data model. */
class Trip
{
}

/** Request payload for Trip#load. */
class TripLoadMatch
{
}

/** Vehicle entity data model. */
class Vehicle
{
}

/** Request payload for Vehicle#load. */
class VehicleLoadMatch
{
}

