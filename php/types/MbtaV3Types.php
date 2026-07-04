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

/** Match filter for Alert#load (any subset of Alert fields). */
class AlertLoadMatch
{
}

/** Facility entity data model. */
class Facility
{
}

/** Match filter for Facility#load (any subset of Facility fields). */
class FacilityLoadMatch
{
}

/** Line entity data model. */
class Line
{
}

/** Match filter for Line#load (any subset of Line fields). */
class LineLoadMatch
{
}

/** Prediction entity data model. */
class Prediction
{
}

/** Match filter for Prediction#load (any subset of Prediction fields). */
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
    public string $id;
}

/** RoutePattern entity data model. */
class RoutePattern
{
}

/** Match filter for RoutePattern#load (any subset of RoutePattern fields). */
class RoutePatternLoadMatch
{
}

/** Schedule entity data model. */
class Schedule
{
}

/** Match filter for Schedule#load (any subset of Schedule fields). */
class ScheduleLoadMatch
{
}

/** Service entity data model. */
class Service
{
}

/** Match filter for Service#load (any subset of Service fields). */
class ServiceLoadMatch
{
}

/** Shape entity data model. */
class Shape
{
}

/** Match filter for Shape#load (any subset of Shape fields). */
class ShapeLoadMatch
{
}

/** Stop entity data model. */
class Stop
{
}

/** Match filter for Stop#load (any subset of Stop fields). */
class StopLoadMatch
{
}

/** Trip entity data model. */
class Trip
{
}

/** Match filter for Trip#load (any subset of Trip fields). */
class TripLoadMatch
{
}

/** Vehicle entity data model. */
class Vehicle
{
}

/** Match filter for Vehicle#load (any subset of Vehicle fields). */
class VehicleLoadMatch
{
}

