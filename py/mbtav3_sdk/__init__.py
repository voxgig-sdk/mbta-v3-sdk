# MbtaV3 SDK

from mbtav3_sdk.utility.voxgig_struct import voxgig_struct as vs
from mbtav3_sdk.core.utility_type import MbtaV3Utility
from mbtav3_sdk.core.spec import MbtaV3Spec
from mbtav3_sdk.core import helpers

# Load utility registration (populates Utility._registrar)
from mbtav3_sdk.utility import register

# Load features
from mbtav3_sdk.feature.base_feature import MbtaV3BaseFeature
from mbtav3_sdk.features import _make_feature


class MbtaV3SDK:

    def __init__(self, options=None):
        self.mode = "live"
        self.features = []
        self.options = None

        utility = MbtaV3Utility()
        self._utility = utility

        from mbtav3_sdk.config import shared_config
        config = shared_config()

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

        # Add features in the resolved order (make_options puts an explicit
        # list order first, else defaults to test-first). Ordering matters: the
        # `test` feature installs the base mock transport and the transport
        # features (retry/cache/netsim/proxy/ratelimit) wrap whatever is
        # current, so `test` must be added before them to sit at the base.
        feature_opts = helpers.to_map(vs.getprop(self.options, "feature"))
        if feature_opts is not None:
            featureorder = vs.getpath(self.options, "__derived__.featureorder")
            if isinstance(featureorder, list):
                for fname in featureorder:
                    fopts = helpers.to_map(feature_opts.get(fname))
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

    # Raw endpoint access is operator-controllable, like every entity op.
    # Blocking it means denying BOTH the 'direct' and 'graphql' tokens, since
    # either one reaches the same endpoint.
    def direct(self, fetchargs=None):
        if not self._op_allowed("direct"):
            return self._op_denied("direct")

        return self._raw_request(fetchargs)

    # Is this raw-access op permitted by the SDK's allow.op option?
    def _op_allowed(self, op):
        allow_op = vs.getpath(self.options, "allow.op")
        return isinstance(allow_op, str) and op in allow_op

    def _op_denied(self, op):
        allow_op = vs.getpath(self.options, "allow.op")
        return {
            "ok": False,
            "err": Exception(
                "MbtaV3SDK: " + op + ": operation not allowed by"
                ' SDK option allow.op value: "' + str(allow_op) + '"'),
        }

    # Ungated request path shared by direct and graphql, each of which checks
    # its own allow.op token first. Private, rather than a flag on fetchargs:
    # a caller-supplied marker would let anyone opt straight back out of the
    # gate by passing it.
    def _raw_request(self, fetchargs=None):
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

    # Raw GraphQL access: the pressure valve that makes the generated
    # surface's deliberate omissions (per-call selection sets, typed filter
    # builders, batching, subscriptions) livable — the whole schema stays
    # reachable.
    #
    # Thin wrapper over the same prepare/fetch path direct uses, with the one
    # thing raw direct cannot do for GraphQL: a GraphQL failure rides HTTP 200
    # as a top-level `errors` array, so status alone would report a failed
    # query as ok.
    #
    # NOTE: like direct, this bypasses the feature pipeline — no retry,
    # ratelimit or paging features apply.
    def graphql(self, query, variables=None, ctrl=None):
        if not self._op_allowed("graphql"):
            return self._op_denied("graphql")

        res = self._raw_request({
            "method": "POST",
            "headers": {"content-type": "application/json"},
            "body": {"query": query, "variables": variables or {}},
            "ctrl": ctrl or {},
        })

        # Errors are read BEFORE any status check: a GraphQL parse or
        # validation failure comes back as HTTP 400 carrying the standard
        # { errors: [...] } body, and the raw path represents a non-2xx as
        # ok:False with no err — so returning early on status would discard
        # the server's own diagnostics, which are the only useful part of
        # that response.
        errors = vs.getpath(res, "data.errors")

        if isinstance(errors, list) and 0 < len(errors):
            first = errors[0] if isinstance(errors[0], dict) else {}
            msg = first.get("message") or "graphql error"
            res["ok"] = False
            res["err"] = Exception("MbtaV3SDK: graphql: " + str(msg))
            res["graphql"] = errors

        return res


    def Alert(self, data=None) -> "AlertEntity":
        """Entity factory: client.Alert().list() / client.Alert().load({"id": ...})."""
        from mbtav3_sdk.entity.alert_entity import AlertEntity
        return AlertEntity(self, data)


    def Facility(self, data=None) -> "FacilityEntity":
        """Entity factory: client.Facility().list() / client.Facility().load({"id": ...})."""
        from mbtav3_sdk.entity.facility_entity import FacilityEntity
        return FacilityEntity(self, data)


    def Line(self, data=None) -> "LineEntity":
        """Entity factory: client.Line().list() / client.Line().load({"id": ...})."""
        from mbtav3_sdk.entity.line_entity import LineEntity
        return LineEntity(self, data)


    def Prediction(self, data=None) -> "PredictionEntity":
        """Entity factory: client.Prediction().list() / client.Prediction().load({"id": ...})."""
        from mbtav3_sdk.entity.prediction_entity import PredictionEntity
        return PredictionEntity(self, data)


    def Route(self, data=None) -> "RouteEntity":
        """Entity factory: client.Route().list() / client.Route().load({"id": ...})."""
        from mbtav3_sdk.entity.route_entity import RouteEntity
        return RouteEntity(self, data)


    def RoutePattern(self, data=None) -> "RoutePatternEntity":
        """Entity factory: client.RoutePattern().list() / client.RoutePattern().load({"id": ...})."""
        from mbtav3_sdk.entity.route_pattern_entity import RoutePatternEntity
        return RoutePatternEntity(self, data)


    def Schedule(self, data=None) -> "ScheduleEntity":
        """Entity factory: client.Schedule().list() / client.Schedule().load({"id": ...})."""
        from mbtav3_sdk.entity.schedule_entity import ScheduleEntity
        return ScheduleEntity(self, data)


    def Service(self, data=None) -> "ServiceEntity":
        """Entity factory: client.Service().list() / client.Service().load({"id": ...})."""
        from mbtav3_sdk.entity.service_entity import ServiceEntity
        return ServiceEntity(self, data)


    def Shape(self, data=None) -> "ShapeEntity":
        """Entity factory: client.Shape().list() / client.Shape().load({"id": ...})."""
        from mbtav3_sdk.entity.shape_entity import ShapeEntity
        return ShapeEntity(self, data)


    def Stop(self, data=None) -> "StopEntity":
        """Entity factory: client.Stop().list() / client.Stop().load({"id": ...})."""
        from mbtav3_sdk.entity.stop_entity import StopEntity
        return StopEntity(self, data)


    def Trip(self, data=None) -> "TripEntity":
        """Entity factory: client.Trip().list() / client.Trip().load({"id": ...})."""
        from mbtav3_sdk.entity.trip_entity import TripEntity
        return TripEntity(self, data)


    def Vehicle(self, data=None) -> "VehicleEntity":
        """Entity factory: client.Vehicle().list() / client.Vehicle().load({"id": ...})."""
        from mbtav3_sdk.entity.vehicle_entity import VehicleEntity
        return VehicleEntity(self, data)



    @classmethod
    def test(cls, testopts=None, sdkopts=None) -> "MbtaV3SDK":
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


from typing import TYPE_CHECKING

if TYPE_CHECKING:
    from mbtav3_sdk.entity.alert_entity import AlertEntity
    from mbtav3_sdk.entity.facility_entity import FacilityEntity
    from mbtav3_sdk.entity.line_entity import LineEntity
    from mbtav3_sdk.entity.prediction_entity import PredictionEntity
    from mbtav3_sdk.entity.route_entity import RouteEntity
    from mbtav3_sdk.entity.route_pattern_entity import RoutePatternEntity
    from mbtav3_sdk.entity.schedule_entity import ScheduleEntity
    from mbtav3_sdk.entity.service_entity import ServiceEntity
    from mbtav3_sdk.entity.shape_entity import ShapeEntity
    from mbtav3_sdk.entity.stop_entity import StopEntity
    from mbtav3_sdk.entity.trip_entity import TripEntity
    from mbtav3_sdk.entity.vehicle_entity import VehicleEntity
