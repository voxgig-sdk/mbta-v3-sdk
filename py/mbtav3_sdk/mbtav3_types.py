# Typed models for the MbtaV3 SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.
#
# These are TypedDicts, not dataclasses: the SDK ops return/accept plain dicts
# at runtime, and a TypedDict IS a dict shape, so the types match the runtime.
# Optional (req:false) keys are modelled as TypedDict key-optionality
# (total=False), split into a required base + total=False subclass when a type
# has both required and optional keys.

from __future__ import annotations

from typing import TypedDict, Any


class Alert(TypedDict):
    pass


class AlertLoadMatch(TypedDict):
    pass


class Facility(TypedDict):
    pass


class FacilityLoadMatch(TypedDict):
    pass


class Line(TypedDict):
    pass


class LineLoadMatch(TypedDict):
    pass


class Prediction(TypedDict):
    pass


class PredictionLoadMatch(TypedDict):
    pass


class Route(TypedDict, total=False):
    id: str


class RouteLoadMatch(TypedDict):
    id: str


class RoutePattern(TypedDict):
    pass


class RoutePatternLoadMatch(TypedDict):
    pass


class Schedule(TypedDict):
    pass


class ScheduleLoadMatch(TypedDict):
    pass


class Service(TypedDict):
    pass


class ServiceLoadMatch(TypedDict):
    pass


class Shape(TypedDict):
    pass


class ShapeLoadMatch(TypedDict):
    pass


class Stop(TypedDict):
    pass


class StopLoadMatch(TypedDict):
    pass


class Trip(TypedDict):
    pass


class TripLoadMatch(TypedDict):
    pass


class Vehicle(TypedDict):
    pass


class VehicleLoadMatch(TypedDict):
    pass
