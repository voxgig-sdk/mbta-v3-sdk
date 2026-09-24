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
(0, utility_1.loadEnvLocal)(__dirname + '/../../../.env.local');
(0, node_test_1.describe)('RouteEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when MBTA_V3_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('MBTA_V3_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.MbtaV3SDK.test();
        const ent = testsdk.Route();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.MBTA_V3_TEST_LIVE;
        for (const op of ['load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'route.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "id": { "a": true, "h": "Id", "n": "id", "r": false, "t": "`$STRING`", "key$": "id", "index$": 0 } }, "id": { "field": "id", "name": "id" }, "name": "route", "op": { "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /routes", "source": "openapi3", "version": 2 }, "g": { "query": [{ "a": true, "k": "query", "n": "filter_id", "or": "filter_id", "r": false, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "query", "n": "filter_stop", "or": "filter_stop", "r": false, "t": "`$STRING`", "index$": 1 }, { "a": true, "ex": "0,1", "k": "query", "n": "filter_type", "or": "filter_type", "r": false, "t": "`$STRING`", "index$": 2 }, { "a": true, "k": "query", "n": "include", "or": "include", "r": false, "t": "`$STRING`", "index$": 3 }, { "a": true, "k": "query", "n": "sort", "or": "sort", "r": false, "t": "`$STRING`", "index$": 4 }] }, "k": "http", "m": "GET", "o": "/routes", "q": { "exist": ["filter_id", "filter_stop", "filter_type", "include", "sort"] }, "r": {}, "s": [{ "lit": "routes" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }, { "a": true, "co": { "id": "GET /routes/{id}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "id", "r": true, "t": "`$STRING`", "index$": 0 }], "query": [{ "a": true, "k": "query", "n": "include", "or": "include", "r": false, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/routes/{id}", "q": { "exist": ["id", "include"] }, "r": {}, "s": [{ "lit": "routes" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "load" } }, "relations": { "ancestors": [] }, "key$": "route", "name__orig": "route", "Name": "Route", "name_": "route", "name-": "route", "NAME": "ROUTE", "index$": 4 }, { "active": true, "entity": "route", "key$": "BasicRouteFlow", "kind": "basic", "name": "BasicRouteFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "route_ref01", "srcdatavar": "route_ref01_data", "suffix": "_dt0" }, "m": { "id": "route01" }, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-route_ref01" } }], "index$": 0 }] }, 'Route', { "GET /routes": { "protocol": "http", "operationId": "getRoutes", "responses": { "200": { "description": "Successful response", "content": { "application/vnd.api+json": { "schema": { "type": "object", "properties": { "data": { "type": "array", "items": { "type": "object", "properties": { "id": { "type": "string" }, "type": { "type": "string", "enum": ["route"] }, "attributes": { "type": "object", "properties": { "color": { "type": "string" }, "description": { "type": "string" }, "direction_destinations": { "type": "array", "items": { "type": "string" } }, "direction_names": { "type": "array", "items": { "type": "string" } }, "fare_class": { "type": "string" }, "long_name": { "type": "string" }, "short_name": { "type": "string" }, "sort_order": { "type": "integer" }, "text_color": { "type": "string" }, "type": { "type": "integer", "description": "0=light rail, 1=subway, 2=commuter rail, 3=bus, 4=ferry" } } }, "relationships": { "type": "object" } }, "x-ref": "#/components/schemas/Route" } }, "included": { "type": "array", "items": { "type": "object" } }, "jsonapi": { "type": "object", "properties": { "version": { "type": "string", "example": "1.0" } }, "x-ref": "#/components/schemas/JsonApi" } }, "x-ref": "#/components/schemas/RoutesResponse" } } } }, "400": { "description": "Bad request", "content": { "application/vnd.api+json": { "schema": { "type": "object", "properties": { "errors": { "type": "array", "items": { "type": "object", "properties": { "status": { "type": "string" }, "code": { "type": "string" }, "title": { "type": "string" }, "detail": { "type": "string" }, "source": { "type": "object", "properties": { "parameter": { "type": "string" } } } } } }, "jsonapi": { "type": "object", "properties": { "version": { "type": "string", "example": "1.0" } }, "x-ref": "#/components/schemas/JsonApi" } }, "x-ref": "#/components/schemas/ErrorResponse" } } } } }, "parameters": [{ "name": "filter[type]", "in": "query", "description": "Filter by route type (0=light rail, 1=subway, 2=commuter rail, 3=bus, 4=ferry)", "schema": { "type": "string" }, "example": "0,1", "index$": 0 }, { "name": "filter[stop]", "in": "query", "description": "Filter by stop ID (e.g., place-north)", "schema": { "type": "string" }, "index$": 1 }, { "name": "filter[id]", "in": "query", "description": "Filter by route ID", "schema": { "type": "string" }, "index$": 2 }, { "name": "include", "in": "query", "description": "Include related resources (comma-separated)", "schema": { "type": "string" }, "index$": 3 }, { "name": "sort", "in": "query", "description": "Sort field", "schema": { "type": "string" }, "index$": 4 }], "security": [{ "ApiKeyAuth": [] }], "securitySource": "definition", "securitySchemes": { "ApiKeyAuth": { "type": "apiKey", "in": "header", "name": "x-api-key", "description": "API key required for requests. Default rate limit is 1,000 requests per minute with a valid key." } } }, "GET /routes/{id}": { "protocol": "http", "operationId": "getRouteById", "responses": { "200": { "description": "Successful response", "content": { "application/vnd.api+json": { "schema": { "type": "object", "properties": { "data": { "type": "object", "properties": { "id": { "type": "string" }, "type": { "type": "string", "enum": ["route"] }, "attributes": { "type": "object", "properties": { "color": { "type": "string" }, "description": { "type": "string" }, "direction_destinations": { "type": "array", "items": { "type": "string" } }, "direction_names": { "type": "array", "items": { "type": "string" } }, "fare_class": { "type": "string" }, "long_name": { "type": "string" }, "short_name": { "type": "string" }, "sort_order": { "type": "integer" }, "text_color": { "type": "string" }, "type": { "type": "integer", "description": "0=light rail, 1=subway, 2=commuter rail, 3=bus, 4=ferry" } } }, "relationships": { "type": "object" } }, "x-ref": "#/components/schemas/Route" }, "included": { "type": "array", "items": { "type": "object" } }, "jsonapi": { "type": "object", "properties": { "version": { "type": "string", "example": "1.0" } }, "x-ref": "#/components/schemas/JsonApi" } }, "x-ref": "#/components/schemas/RouteResponse" } } } }, "404": { "description": "Route not found", "content": { "application/vnd.api+json": { "schema": { "type": "object", "properties": { "errors": { "type": "array", "items": { "type": "object", "properties": { "status": { "type": "string" }, "code": { "type": "string" }, "title": { "type": "string" }, "detail": { "type": "string" }, "source": { "type": "object", "properties": { "parameter": { "type": "string" } } } } } }, "jsonapi": { "type": "object", "properties": { "version": { "type": "string", "example": "1.0" } }, "x-ref": "#/components/schemas/JsonApi" } }, "x-ref": "#/components/schemas/ErrorResponse" } } } } }, "parameters": [{ "name": "id", "in": "path", "required": true, "description": "Route ID (e.g., Orange)", "schema": { "type": "string" }, "index$": 0 }, { "name": "include", "in": "query", "description": "Include related resources (comma-separated)", "schema": { "type": "string" }, "index$": 1 }], "security": [{ "ApiKeyAuth": [] }], "securitySource": "definition", "securitySchemes": { "ApiKeyAuth": { "type": "apiKey", "in": "header", "name": "x-api-key", "description": "API key required for requests. Default rate limit is 1,000 requests per minute with a valid key." } } } });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let route_ref01_data = Object.values(setup.data.existing.route)[0];
        // LOAD
        const route_ref01_ent = client.Route();
        const route_ref01_match_dt0 = {};
        route_ref01_match_dt0.id = route_ref01_data.id;
        const route_ref01_data_dt0 = (await route_ref01_ent.load(route_ref01_match_dt0)).data();
        (0, node_assert_1.default)(route_ref01_data_dt0.id === route_ref01_data.id);
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/route/RouteTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.MbtaV3SDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['route01', 'route02', 'route03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'MBTA_V3_TEST_ROUTE_ENTID': idmap,
        'MBTA_V3_TEST_LIVE': 'FALSE',
        'MBTA_V3_TEST_EXPLAIN': 'FALSE',
        'MBTA_V3_APIKEY': '',
    });
    idmap = env['MBTA_V3_TEST_ROUTE_ENTID'];
    const live = 'TRUE' === env.MBTA_V3_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['MBTA_V3_TEST_ROUTE_ENTID'];
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
//# sourceMappingURL=RouteEntity.test.js.map