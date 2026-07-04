# MbtaV3 SDK

from utility.voxgig_struct import voxgig_struct as vs
from core.utility_type import MbtaV3Utility
from core.spec import MbtaV3Spec
from core import helpers

# Load utility registration (populates Utility._registrar)
from utility import register

# Load features
from feature.base_feature import MbtaV3BaseFeature
from features import _make_feature


class MbtaV3SDK:

    def __init__(self, options=None):
        self.mode = "live"
        self.features = []
        self.options = None

        utility = MbtaV3Utility()
        self._utility = utility

        from config import make_config
        config = make_config()

        self._rootctx = utility.make_context({
            "client": self,
            "utility": utility,
            "config": config,
            "options": options if options is not None else {},
            "shared": {},
        }, None)

        self.options = utility.make_options(self._rootctx)

        if vs.getpath(self.options, "feature.test.active") is True:
            self.mode = "test"

        self._rootctx.options = self.options

        # Add features from config.
        feature_opts = helpers.to_map(vs.getprop(self.options, "feature"))
        if feature_opts is not None:
            feature_items = vs.items(feature_opts)
            if feature_items is not None:
                for item in feature_items:
                    fname = item[0]
                    fopts = helpers.to_map(item[1])
                    if fopts is not None and fopts.get("active") is True:
                        utility.feature_add(self._rootctx, _make_feature(fname))

        # Add extension features.
        extend = vs.getprop(self.options, "extend")
        if isinstance(extend, list):
            for f in extend:
                if isinstance(f, dict) or (hasattr(f, "get_name") and callable(f.get_name)):
                    utility.feature_add(self._rootctx, f)

        # Initialize features.
        for f in self.features:
            utility.feature_init(self._rootctx, f)

        utility.feature_hook(self._rootctx, "PostConstruct")

        # #BuildFeatures

    def options_map(self):
        out = vs.clone(self.options)
        if isinstance(out, dict):
            return out
        return {}

    def get_utility(self):
        return MbtaV3Utility.copy(self._utility)

    def get_root_ctx(self):
        return self._rootctx

    def prepare(self, fetchargs=None):
        utility = self._utility

        if fetchargs is None:
            fetchargs = {}

        ctrl = helpers.to_map(vs.getprop(fetchargs, "ctrl"))
        if ctrl is None:
            ctrl = {}

        ctx = utility.make_context({
            "opname": "prepare",
            "ctrl": ctrl,
        }, self._rootctx)

        options = self.options

        path = vs.getprop(fetchargs, "path") or ""
        if not isinstance(path, str):
            path = ""

        method = vs.getprop(fetchargs, "method") or "GET"
        if not isinstance(method, str):
            method = "GET"

        params = helpers.to_map(vs.getprop(fetchargs, "params"))
        if params is None:
            params = {}
        query = helpers.to_map(vs.getprop(fetchargs, "query"))
        if query is None:
            query = {}

        headers = utility.prepare_headers(ctx)

        base = vs.getprop(options, "base") or ""
        if not isinstance(base, str):
            base = ""
        prefix = vs.getprop(options, "prefix") or ""
        if not isinstance(prefix, str):
            prefix = ""
        suffix = vs.getprop(options, "suffix") or ""
        if not isinstance(suffix, str):
            suffix = ""

        ctx.spec = MbtaV3Spec({
            "base": base,
            "prefix": prefix,
            "suffix": suffix,
            "path": path,
            "method": method,
            "params": params,
            "query": query,
            "headers": headers,
            "body": vs.getprop(fetchargs, "body"),
            "step": "start",
        })

        # Merge user-provided headers.
        uh = vs.getprop(fetchargs, "headers")
        if isinstance(uh, dict):
            for k, v in uh.items():
                ctx.spec.headers[k] = v

        _, err = utility.prepare_auth(ctx)
        if err is not None:
            raise err

        fetchdef, err = utility.make_fetch_def(ctx)
        if err is not None:
            raise err

        return fetchdef

    def direct(self, fetchargs=None):
        utility = self._utility

        try:
            fetchdef = self.prepare(fetchargs)
        except Exception as err:
            # direct() is the raw-HTTP escape hatch: it never raises, it
            # returns a result object callers branch on via result["ok"].
            return {"ok": False, "err": err}

        if fetchargs is None:
            fetchargs = {}
        ctrl = helpers.to_map(vs.getprop(fetchargs, "ctrl"))
        if ctrl is None:
            ctrl = {}

        ctx = utility.make_context({
            "opname": "direct",
            "ctrl": ctrl,
        }, self._rootctx)

        url = fetchdef.get("url", "")
        fetched, fetch_err = utility.fetcher(ctx, url, fetchdef)

        if fetch_err is not None:
            return {"ok": False, "err": fetch_err}

        if fetched is None:
            return {
                "ok": False,
                "err": ctx.make_error("direct_no_response", "response: undefined"),
            }

        if isinstance(fetched, dict):
            status = helpers.to_int(vs.getprop(fetched, "status"))
            headers = vs.getprop(fetched, "headers") or {}

            # No-body responses (204, 304) and explicit zero content-length
            # must skip JSON parsing — calling json() on an empty body raises.
            content_length = None
            if isinstance(headers, dict):
                content_length = headers.get("content-length")
            no_body = status in (204, 304) or str(content_length) == "0"

            json_data = None
            if not no_body:
                jf = vs.getprop(fetched, "json")
                if callable(jf):
                    try:
                        json_data = jf()
                    except Exception:
                        # Non-JSON body (e.g. text/plain, text/html). Surface
                        # status + headers but leave data as None.
                        json_data = None

            return {
                "ok": status >= 200 and status < 300,
                "status": status,
                "headers": headers,
                "data": json_data,
            }

        return {
            "ok": False,
            "err": ctx.make_error("direct_invalid", "invalid response type"),
        }


    @property
    def alert(self):
        """Idiomatic facade: client.alert.list() / client.alert.load({"id": ...})."""
        from entity.alert_entity import AlertEntity
        cached = getattr(self, "_alert", None)
        if cached is None:
            cached = AlertEntity(self, None)
            self._alert = cached
        return cached

    def Alert(self, data=None):
        # Deprecated: use client.alert instead.
        from entity.alert_entity import AlertEntity
        return AlertEntity(self, data)


    @property
    def facility(self):
        """Idiomatic facade: client.facility.list() / client.facility.load({"id": ...})."""
        from entity.facility_entity import FacilityEntity
        cached = getattr(self, "_facility", None)
        if cached is None:
            cached = FacilityEntity(self, None)
            self._facility = cached
        return cached

    def Facility(self, data=None):
        # Deprecated: use client.facility instead.
        from entity.facility_entity import FacilityEntity
        return FacilityEntity(self, data)


    @property
    def line(self):
        """Idiomatic facade: client.line.list() / client.line.load({"id": ...})."""
        from entity.line_entity import LineEntity
        cached = getattr(self, "_line", None)
        if cached is None:
            cached = LineEntity(self, None)
            self._line = cached
        return cached

    def Line(self, data=None):
        # Deprecated: use client.line instead.
        from entity.line_entity import LineEntity
        return LineEntity(self, data)


    @property
    def prediction(self):
        """Idiomatic facade: client.prediction.list() / client.prediction.load({"id": ...})."""
        from entity.prediction_entity import PredictionEntity
        cached = getattr(self, "_prediction", None)
        if cached is None:
            cached = PredictionEntity(self, None)
            self._prediction = cached
        return cached

    def Prediction(self, data=None):
        # Deprecated: use client.prediction instead.
        from entity.prediction_entity import PredictionEntity
        return PredictionEntity(self, data)


    @property
    def route(self):
        """Idiomatic facade: client.route.list() / client.route.load({"id": ...})."""
        from entity.route_entity import RouteEntity
        cached = getattr(self, "_route", None)
        if cached is None:
            cached = RouteEntity(self, None)
            self._route = cached
        return cached

    def Route(self, data=None):
        # Deprecated: use client.route instead.
        from entity.route_entity import RouteEntity
        return RouteEntity(self, data)


    @property
    def route_pattern(self):
        """Idiomatic facade: client.route_pattern.list() / client.route_pattern.load({"id": ...})."""
        from entity.route_pattern_entity import RoutePatternEntity
        cached = getattr(self, "_route_pattern", None)
        if cached is None:
            cached = RoutePatternEntity(self, None)
            self._route_pattern = cached
        return cached

    def RoutePattern(self, data=None):
        # Deprecated: use client.route_pattern instead.
        from entity.route_pattern_entity import RoutePatternEntity
        return RoutePatternEntity(self, data)


    @property
    def schedule(self):
        """Idiomatic facade: client.schedule.list() / client.schedule.load({"id": ...})."""
        from entity.schedule_entity import ScheduleEntity
        cached = getattr(self, "_schedule", None)
        if cached is None:
            cached = ScheduleEntity(self, None)
            self._schedule = cached
        return cached

    def Schedule(self, data=None):
        # Deprecated: use client.schedule instead.
        from entity.schedule_entity import ScheduleEntity
        return ScheduleEntity(self, data)


    @property
    def service(self):
        """Idiomatic facade: client.service.list() / client.service.load({"id": ...})."""
        from entity.service_entity import ServiceEntity
        cached = getattr(self, "_service", None)
        if cached is None:
            cached = ServiceEntity(self, None)
            self._service = cached
        return cached

    def Service(self, data=None):
        # Deprecated: use client.service instead.
        from entity.service_entity import ServiceEntity
        return ServiceEntity(self, data)


    @property
    def shape(self):
        """Idiomatic facade: client.shape.list() / client.shape.load({"id": ...})."""
        from entity.shape_entity import ShapeEntity
        cached = getattr(self, "_shape", None)
        if cached is None:
            cached = ShapeEntity(self, None)
            self._shape = cached
        return cached

    def Shape(self, data=None):
        # Deprecated: use client.shape instead.
        from entity.shape_entity import ShapeEntity
        return ShapeEntity(self, data)


    @property
    def stop(self):
        """Idiomatic facade: client.stop.list() / client.stop.load({"id": ...})."""
        from entity.stop_entity import StopEntity
        cached = getattr(self, "_stop", None)
        if cached is None:
            cached = StopEntity(self, None)
            self._stop = cached
        return cached

    def Stop(self, data=None):
        # Deprecated: use client.stop instead.
        from entity.stop_entity import StopEntity
        return StopEntity(self, data)


    @property
    def trip(self):
        """Idiomatic facade: client.trip.list() / client.trip.load({"id": ...})."""
        from entity.trip_entity import TripEntity
        cached = getattr(self, "_trip", None)
        if cached is None:
            cached = TripEntity(self, None)
            self._trip = cached
        return cached

    def Trip(self, data=None):
        # Deprecated: use client.trip instead.
        from entity.trip_entity import TripEntity
        return TripEntity(self, data)


    @property
    def vehicle(self):
        """Idiomatic facade: client.vehicle.list() / client.vehicle.load({"id": ...})."""
        from entity.vehicle_entity import VehicleEntity
        cached = getattr(self, "_vehicle", None)
        if cached is None:
            cached = VehicleEntity(self, None)
            self._vehicle = cached
        return cached

    def Vehicle(self, data=None):
        # Deprecated: use client.vehicle instead.
        from entity.vehicle_entity import VehicleEntity
        return VehicleEntity(self, data)



    @classmethod
    def test(cls, testopts=None, sdkopts=None):
        if sdkopts is None:
            sdkopts = {}
        sdkopts = vs.clone(sdkopts)
        if not isinstance(sdkopts, dict):
            sdkopts = {}

        if testopts is None:
            testopts = {}
        testopts = vs.clone(testopts)
        if not isinstance(testopts, dict):
            testopts = {}
        testopts["active"] = True

        vs.setpath(sdkopts, "feature.test", testopts)

        sdk = cls(sdkopts)
        sdk.mode = "test"

        return sdk
