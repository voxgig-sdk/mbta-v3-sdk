

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { MbtaV3SDK, BaseFeature, stdutil } from '../../..'

import {
  envOverride,
  liveClientOptions,
  liveDelay,
  loadEnvLocal,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


loadEnvLocal(__dirname + '/../../../.env.local')


describe('ScheduleEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when MBTA_V3_TEST_LIVE=TRUE.
  afterEach(liveDelay('MBTA_V3_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = MbtaV3SDK.test()
    const ent = testsdk.Schedule()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.MBTA_V3_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'schedule.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{},"name":"schedule","op":{"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /schedules","source":"openapi3","version":2},"g":{"query":[{"a":true,"k":"query","n":"filter_date","or":"filter_date","r":false,"t":"`$STRING`","index$":0},{"a":true,"k":"query","n":"filter_direction_id","or":"filter_direction_id","r":false,"t":"`$INTEGER`","index$":1},{"a":true,"k":"query","n":"filter_max_time","or":"filter_max_time","r":false,"t":"`$STRING`","index$":2},{"a":true,"k":"query","n":"filter_min_time","or":"filter_min_time","r":false,"t":"`$STRING`","index$":3},{"a":true,"k":"query","n":"filter_route","or":"filter_route","r":false,"t":"`$STRING`","index$":4},{"a":true,"k":"query","n":"filter_stop","or":"filter_stop","r":false,"t":"`$STRING`","index$":5},{"a":true,"k":"query","n":"filter_trip","or":"filter_trip","r":false,"t":"`$STRING`","index$":6},{"a":true,"k":"query","n":"include","or":"include","r":false,"t":"`$STRING`","index$":7},{"a":true,"k":"query","n":"sort","or":"sort","r":false,"t":"`$STRING`","index$":8}]},"k":"http","m":"GET","o":"/schedules","q":{"exist":["filter_date","filter_direction_id","filter_max_time","filter_min_time","filter_route","filter_stop","filter_trip","include","sort"]},"r":{},"s":[{"lit":"schedules"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"schedule","name__orig":"schedule","Name":"Schedule","name_":"schedule","name-":"schedule","NAME":"SCHEDULE","index$":6}, {"active":true,"entity":"schedule","key$":"BasicScheduleFlow","kind":"basic","name":"BasicScheduleFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"schedule_ref01","srcdatavar":"schedule_ref01_data","suffix":"_dt0"},"m":{},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-schedule_ref01"}}],"index$":0}]}, 'Schedule', {"GET /schedules":{"protocol":"http","operationId":"getSchedules","responses":{"200":{"description":"Successful response","content":{"application/vnd.api+json":{"schema":{"type":"object","properties":{"data":{"type":"array","items":{"type":"object","properties":{"id":{"type":"string"},"type":{"type":"string","enum":["schedule"]},"attributes":{"type":"object","properties":{"arrival_time":{"type":"string","format":"date-time","nullable":true},"departure_time":{"type":"string","format":"date-time","nullable":true},"direction_id":{"type":"integer","enum":[0,1]},"drop_off_type":{"type":"integer"},"pickup_type":{"type":"integer"},"stop_headsign":{"type":"string","nullable":true},"stop_sequence":{"type":"integer"},"timepoint":{"type":"boolean"}}},"relationships":{"type":"object","properties":{"route":{"type":"object"},"stop":{"type":"object"},"trip":{"type":"object"},"prediction":{"type":"object"}}}},"x-ref":"#/components/schemas/Schedule"}},"included":{"type":"array","items":{"type":"object"}},"jsonapi":{"type":"object","properties":{"version":{"type":"string","example":"1.0"}},"x-ref":"#/components/schemas/JsonApi"}},"x-ref":"#/components/schemas/SchedulesResponse"}}}},"400":{"description":"Bad request","content":{"application/vnd.api+json":{"schema":{"type":"object","properties":{"errors":{"type":"array","items":{"type":"object","properties":{"status":{"type":"string"},"code":{"type":"string"},"title":{"type":"string"},"detail":{"type":"string"},"source":{"type":"object","properties":{"parameter":{"type":"string"}}}}}},"jsonapi":{"type":"object","properties":{"version":{"type":"string","example":"1.0"}},"x-ref":"#/components/schemas/JsonApi"}},"x-ref":"#/components/schemas/ErrorResponse"}}}}},"parameters":[{"name":"filter[stop]","in":"query","description":"Filter by stop ID (e.g., 17094)","schema":{"type":"string"},"index$":0},{"name":"filter[route]","in":"query","description":"Filter by route ID","schema":{"type":"string"},"index$":1},{"name":"filter[trip]","in":"query","description":"Filter by trip ID","schema":{"type":"string"},"index$":2},{"name":"filter[direction_id]","in":"query","description":"Filter by direction (0 or 1)","schema":{"type":"integer","enum":[0,1]},"index$":3},{"name":"filter[min_time]","in":"query","description":"Minimum time filter (HH:MM format, e.g., 14:00)","schema":{"type":"string","pattern":"^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$"},"index$":4},{"name":"filter[max_time]","in":"query","description":"Maximum time filter (HH:MM format, e.g., 14:30)","schema":{"type":"string","pattern":"^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$"},"index$":5},{"name":"filter[date]","in":"query","description":"Filter by date (YYYY-MM-DD format)","schema":{"type":"string","format":"date"},"index$":6},{"name":"include","in":"query","description":"Include related resources (e.g., route, trip, stop, prediction)","schema":{"type":"string"},"index$":7},{"name":"sort","in":"query","description":"Sort field","schema":{"type":"string"},"index$":8}],"security":[{"ApiKeyAuth":[]}],"securitySource":"definition","securitySchemes":{"ApiKeyAuth":{"type":"apiKey","in":"header","name":"x-api-key","description":"API key required for requests. Default rate limit is 1,000 requests per minute with a valid key."}}}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let schedule_ref01_data = Object.values(setup.data.existing.schedule)[0] as any

    // LOAD
    const schedule_ref01_ent = client.Schedule()
    const schedule_ref01_match_dt0: any = {}
    const schedule_ref01_data_dt0 = (await schedule_ref01_ent.load(schedule_ref01_match_dt0)).data()
    assert(null != schedule_ref01_data_dt0)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/schedule/ScheduleTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = MbtaV3SDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['schedule01','schedule02','schedule03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'MBTA_V3_TEST_SCHEDULE_ENTID': idmap,
    'MBTA_V3_TEST_LIVE': 'FALSE',
    'MBTA_V3_TEST_EXPLAIN': 'FALSE',
    'MBTA_V3_APIKEY': '',
  })

  idmap = env['MBTA_V3_TEST_SCHEDULE_ENTID']

  const live = 'TRUE' === env.MBTA_V3_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['MBTA_V3_TEST_SCHEDULE_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new MbtaV3SDK(merge([
      // FIRST, so the generated fields below win: sdk-test-control.json's
      // test.client.options adds to the live client, it does not redirect it.
      liveClientOptions(),
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
    ]))
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
  }

  return setup
}
  
