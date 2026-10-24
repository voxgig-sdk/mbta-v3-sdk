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
(0, node_test_1.describe)('ScheduleEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when MBTA_V3_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('MBTA_V3_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.MbtaV3SDK.test();
        const ent = testsdk.Schedule();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.MbtaV3SDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.Schedule().load({ "filter_date": 1 }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.MBTA_V3_TEST_LIVE;
        for (const op of ['load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'schedule.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": {}, "name": "schedule", "op": { "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /schedules", "source": "openapi3", "version": 2 }, "g": { "query": [{ "a": true, "k": "query", "n": "filter_date", "or": "filter[date]", "r": false, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "query", "n": "filter_direction_id", "or": "filter[direction_id]", "r": false, "t": "`$INTEGER`", "index$": 1 }, { "a": true, "k": "query", "n": "filter_max_time", "or": "filter[max_time]", "r": false, "t": "`$STRING`", "index$": 2 }, { "a": true, "k": "query", "n": "filter_min_time", "or": "filter[min_time]", "r": false, "t": "`$STRING`", "index$": 3 }, { "a": true, "k": "query", "n": "filter_route", "or": "filter[route]", "r": false, "t": "`$STRING`", "index$": 4 }, { "a": true, "k": "query", "n": "filter_stop", "or": "filter[stop]", "r": false, "t": "`$STRING`", "index$": 5 }, { "a": true, "k": "query", "n": "filter_trip", "or": "filter[trip]", "r": false, "t": "`$STRING`", "index$": 6 }, { "a": true, "k": "query", "n": "include", "or": "include", "r": false, "t": "`$STRING`", "index$": 7 }, { "a": true, "k": "query", "n": "sort", "or": "sort", "r": false, "t": "`$STRING`", "index$": 8 }] }, "k": "http", "m": "GET", "o": "/schedules", "q": {}, "r": {}, "rs": { "kind": "json", "media": "application/vnd.api+json" }, "s": [{ "lit": "schedules" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "load" } }, "relations": { "ancestors": [] }, "key$": "schedule", "name__orig": "schedule", "Name": "Schedule", "name_": "schedule", "name-": "schedule", "NAME": "SCHEDULE", "index$": 6 }, { "active": true, "entity": "schedule", "key$": "BasicScheduleFlow", "kind": "basic", "name": "BasicScheduleFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "schedule_ref01", "srcdatavar": "schedule_ref01_data", "suffix": "_dt0" }, "m": {}, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-schedule_ref01" } }], "index$": 0 }] }, 'Schedule', { "GET /schedules": { "protocol": "http", "parameters": [{ "name": "filter[stop]", "in": "query", "description": "Filter by stop ID (e.g., 17094)", "schema": { "type": "string" }, "index$": 0 }, { "name": "filter[route]", "in": "query", "description": "Filter by route ID", "schema": { "type": "string" }, "index$": 1 }, { "name": "filter[trip]", "in": "query", "description": "Filter by trip ID", "schema": { "type": "string" }, "index$": 2 }, { "name": "filter[direction_id]", "in": "query", "description": "Filter by direction (0 or 1)", "schema": { "type": "integer", "enum": [0, 1] }, "index$": 3 }, { "name": "filter[min_time]", "in": "query", "description": "Minimum time filter (HH:MM format, e.g., 14:00)", "schema": { "type": "string", "pattern": "^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$" }, "index$": 4 }, { "name": "filter[max_time]", "in": "query", "description": "Maximum time filter (HH:MM format, e.g., 14:30)", "schema": { "type": "string", "pattern": "^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$" }, "index$": 5 }, { "name": "filter[date]", "in": "query", "description": "Filter by date (YYYY-MM-DD format)", "schema": { "type": "string", "format": "date" }, "index$": 6 }, { "name": "include", "in": "query", "description": "Include related resources (e.g., route, trip, stop, prediction)", "schema": { "type": "string" }, "index$": 7 }, { "name": "sort", "in": "query", "description": "Sort field", "schema": { "type": "string" }, "index$": 8 }] } }, { strict: LIVE_STRICT, t });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let schedule_ref01_data = Object.values(setup.data.existing.schedule)[0];
        // LOAD
        const schedule_ref01_ent = client.Schedule();
        const schedule_ref01_match_dt0 = {};
        const schedule_ref01_data_dt0 = (await schedule_ref01_ent.load(schedule_ref01_match_dt0)).data();
        (0, node_assert_1.default)(null != schedule_ref01_data_dt0);
    });
});
// main.kit.test.live.strict is true (the default is true): a live
// request that fails, or a live test missing an input it needs,
// fails the test.
// An account with no record for a test to read skips it either way.
const LIVE_STRICT = true;
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/schedule/ScheduleTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.MbtaV3SDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['schedule01', 'schedule02', 'schedule03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'MBTA_V3_TEST_SCHEDULE_ENTID': idmap,
        'MBTA_V3_TEST_LIVE': 'FALSE',
        'MBTA_V3_TEST_EXPLAIN': 'FALSE',
        'MBTA_V3_APIKEY': '',
    });
    idmap = env['MBTA_V3_TEST_SCHEDULE_ENTID'];
    const live = 'TRUE' === env.MBTA_V3_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['MBTA_V3_TEST_SCHEDULE_ENTID'];
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
//# sourceMappingURL=ScheduleEntity.test.js.map