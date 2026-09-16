"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_path_1 = __importDefault(require("node:path"));
const Fs = __importStar(require("node:fs"));
const node_test_1 = require("node:test");
const node_assert_1 = __importDefault(require("node:assert"));
const live_runner_1 = require("../../live-runner");
const live_entity_1 = require("../../live-entity");
const __1 = require("../../..");
const utility_1 = require("../../utility");
// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
(0, utility_1.loadEnvLocal)(__dirname + '/../../../.env.local');
(0, node_test_1.describe)('RoutePatternEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when MBTA_V3_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('MBTA_V3_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.MbtaV3SDK.test();
        const ent = testsdk.RoutePattern();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.MBTA_V3_TEST_LIVE;
        for (const op of ['load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'route_pattern.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": [], "name": "route_pattern", "op": { "load": { "input": "data", "name": "load", "points": [{ "active": true, "args": { "query": [{ "active": true, "kind": "query", "name": "filter_direction_id", "orig": "filter_direction_id", "reqd": false, "type": "`$INTEGER`", "index$": 0 }, { "active": true, "kind": "query", "name": "filter_route", "orig": "filter_route", "reqd": false, "type": "`$STRING`", "index$": 1 }, { "active": true, "kind": "query", "name": "filter_stop", "orig": "filter_stop", "reqd": false, "type": "`$STRING`", "index$": 2 }, { "active": true, "kind": "query", "name": "include", "orig": "include", "reqd": false, "type": "`$STRING`", "index$": 3 }] }, "contract": { "id": "GET /route_patterns", "json": "{\"operationId\":\"getRoutePatterns\",\"parameters\":[{\"description\":\"Filter by route ID\",\"in\":\"query\",\"name\":\"filter[route]\",\"schema\":{\"type\":\"string\"}},{\"description\":\"Filter by direction (0 or 1)\",\"in\":\"query\",\"name\":\"filter[direction_id]\",\"schema\":{\"enum\":[0,1],\"type\":\"integer\"}},{\"description\":\"Filter by stop ID\",\"in\":\"query\",\"name\":\"filter[stop]\",\"schema\":{\"type\":\"string\"}},{\"description\":\"Include related resources (comma-separated)\",\"in\":\"query\",\"name\":\"include\",\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/vnd.api+json\":{\"schema\":{\"properties\":{\"data\":{\"items\":{\"properties\":{\"attributes\":{\"properties\":{\"direction_id\":{\"enum\":[0,1],\"type\":\"integer\"},\"name\":{\"type\":\"string\"},\"sort_order\":{\"type\":\"integer\"},\"time_desc\":{\"nullable\":true,\"type\":\"string\"},\"typicality\":{\"type\":\"integer\"}},\"type\":\"object\"},\"id\":{\"type\":\"string\"},\"relationships\":{\"type\":\"object\"},\"type\":{\"enum\":[\"route_pattern\"],\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"},\"included\":{\"items\":{\"type\":\"object\"},\"type\":\"array\"},\"jsonapi\":{\"properties\":{\"version\":{\"example\":\"1.0\",\"type\":\"string\"}},\"type\":\"object\"}},\"type\":\"object\"}}},\"description\":\"Successful response\"},\"400\":{\"content\":{\"application/vnd.api+json\":{\"schema\":{\"properties\":{\"errors\":{\"items\":{\"properties\":{\"code\":{\"type\":\"string\"},\"detail\":{\"type\":\"string\"},\"source\":{\"properties\":{\"parameter\":{\"type\":\"string\"}},\"type\":\"object\"},\"status\":{\"type\":\"string\"},\"title\":{\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"},\"jsonapi\":{\"properties\":{\"version\":{\"example\":\"1.0\",\"type\":\"string\"}},\"type\":\"object\"}},\"type\":\"object\"}}},\"description\":\"Bad request\"}},\"security\":[{\"ApiKeyAuth\":[]}],\"securitySchemes\":{\"ApiKeyAuth\":{\"description\":\"API key required for requests. Default rate limit is 1,000 requests per minute with a valid key.\",\"in\":\"header\",\"name\":\"x-api-key\",\"type\":\"apiKey\"}},\"securitySource\":\"definition\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/route_patterns", "segments": [{ "lit": "route_patterns" }], "select": { "exist": ["filter_direction_id", "filter_route", "filter_stop", "include"] }, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "load" } }, "relations": { "ancestors": [] }, "key$": "route_pattern", "name__orig": "route_pattern", "Name": "RoutePattern", "name_": "route_pattern", "name-": "route-pattern", "NAME": "ROUTE_PATTERN", "index$": 5 }, { "active": true, "entity": "route_pattern", "key$": "BasicRoutePatternFlow", "kind": "basic", "name": "BasicRoutePatternFlow", "param": {}, "step": [{ "active": true, "data": {}, "input": { "ref": "route_pattern_ref01", "srcdatavar": "route_pattern_ref01_data", "suffix": "_dt0" }, "match": {}, "op": "load", "spec": [], "valid": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-route_pattern_ref01" } }], "index$": 0 }] }, 'RoutePattern');
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let route_pattern_ref01_data = Object.values(setup.data.existing.route_pattern)[0];
        // LOAD
        const route_pattern_ref01_ent = client.RoutePattern();
        const route_pattern_ref01_match_dt0 = {};
        const route_pattern_ref01_data_dt0 = (await route_pattern_ref01_ent.load(route_pattern_ref01_match_dt0)).data();
        (0, node_assert_1.default)(null != route_pattern_ref01_data_dt0);
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/route_pattern/RoutePatternTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.MbtaV3SDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['route_pattern01', 'route_pattern02', 'route_pattern03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'MBTA_V3_TEST_ROUTE_PATTERN_ENTID': idmap,
        'MBTA_V3_TEST_LIVE': 'FALSE',
        'MBTA_V3_TEST_EXPLAIN': 'FALSE',
        'MBTA_V3_APIKEY': '',
    });
    idmap = env['MBTA_V3_TEST_ROUTE_PATTERN_ENTID'];
    const live = 'TRUE' === env.MBTA_V3_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['MBTA_V3_TEST_ROUTE_PATTERN_ENTID'];
        idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {};
        if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
            throw new Error('Live ENTID must be a JSON object');
        }
        client = new __1.MbtaV3SDK(merge([
            // FIRST, so the generated fields below win: sdk-test-control.json's
            // test.client.options adds to the live client, it does not redirect it.
            (0, utility_1.liveClientOptions)(),
            {
                apikey: env.MBTA_V3_APIKEY,
            },
            // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
            // last entry is undefined, and basicSetup is normally called with no
            // argument at all - so a bare 'extra' silently discarded the apikey
            // and server values above and handed the SDK undefined. Harmless
            // while there was nothing in that object; not harmless now.
            extra || {},
            { system: { fetch: transport.fetch } }
        ]));
    }
    const setup = {
        idmap,
        env,
        options,
        client,
        struct,
        data: entityData,
        explain: 'TRUE' === env.MBTA_V3_TEST_EXPLAIN,
        live,
        transport,
        now: Date.now(),
    };
    return setup;
}
//# sourceMappingURL=RoutePatternEntity.test.js.map