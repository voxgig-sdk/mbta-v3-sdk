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


class AlertLoadMatch(TypedDict, total=False):
    filter_activity: str
    filter_route: str
    filter_stop: str
    include: str
    sort: str


class Facility(TypedDict):
    pass


class FacilityLoadMatch(TypedDict, total=False):
    filter_stop: str
    filter_type: str
    include: str


class Line(TypedDict):
    pass


class LineLoadMatch(TypedDict, total=False):
    filter_id: str
    include: str


class Prediction(TypedDict):
    pass


class PredictionLoadMatch(TypedDict, total=False):
    filter_direction_id: int
    filter_route: str
    filter_stop: str
    filter_trip: str
    include: str
    sort: str


class Route(TypedDict, total=False):
    id: str


class RouteLoadMatchRequired(TypedDict):
    id: str


class RouteLoadMatch(RouteLoadMatchRequired, total=False):
    include: str


class RoutePattern(TypedDict):
    pass


class RoutePatternLoadMatch(TypedDict, total=False):
    filter_direction_id: int
    filter_route: str
    filter_stop: str
    include: str


class Schedule(TypedDict):
    pass


class ScheduleLoadMatch(TypedDict, total=False):
    filter_date: str
    filter_direction_id: int
    filter_max_time: str
    filter_min_time: str
    filter_route: str
    filter_stop: str
    filter_trip: str
    include: str
    sort: str


class Service(TypedDict):
    pass


class ServiceLoadMatch(TypedDict, total=False):
    filter_id: str
    filter_route: str
    include: str


class Shape(TypedDict):
    pass


class ShapeLoadMatch(TypedDict, total=False):
    filter_direction_id: int
    filter_route: str
    include: str


class Stop(TypedDict):
    pass


class StopLoadMatch(TypedDict, total=False):
    filter_id: str
    filter_latitude: float
    filter_location_type: int
    filter_longitude: float
    filter_radius: float
    filter_route: str
    include: str
    sort: str


class Trip(TypedDict):
    pass


class TripLoadMatch(TypedDict, total=False):
    filter_direction_id: int
    filter_id: str
    filter_name: str
    filter_route: str
    filter_route_pattern: str
    include: str
    sort: str


class Vehicle(TypedDict):
    pass


class VehicleLoadMatch(TypedDict, total=False):
    filter_direction_id: int
    filter_id: str
    filter_label: str
    filter_route: str
    filter_trip: str
    include: str
    sort: str
