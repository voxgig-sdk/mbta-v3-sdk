# Typed models for the MbtaV3 SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.

from __future__ import annotations

from dataclasses import dataclass
from typing import Optional, Any


@dataclass
class Alert:
    pass


@dataclass
class AlertLoadMatch:
    pass


@dataclass
class Facility:
    pass


@dataclass
class FacilityLoadMatch:
    pass


@dataclass
class Line:
    pass


@dataclass
class LineLoadMatch:
    pass


@dataclass
class Prediction:
    pass


@dataclass
class PredictionLoadMatch:
    pass


@dataclass
class Route:
    pass


@dataclass
class RouteLoadMatch:
    id: str


@dataclass
class RoutePattern:
    pass


@dataclass
class RoutePatternLoadMatch:
    pass


@dataclass
class Schedule:
    pass


@dataclass
class ScheduleLoadMatch:
    pass


@dataclass
class Service:
    pass


@dataclass
class ServiceLoadMatch:
    pass


@dataclass
class Shape:
    pass


@dataclass
class ShapeLoadMatch:
    pass


@dataclass
class Stop:
    pass


@dataclass
class StopLoadMatch:
    pass


@dataclass
class Trip:
    pass


@dataclass
class TripLoadMatch:
    pass


@dataclass
class Vehicle:
    pass


@dataclass
class VehicleLoadMatch:
    pass

