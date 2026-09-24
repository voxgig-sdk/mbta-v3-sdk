

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


describe('TripEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when MBTA_V3_TEST_LIVE=TRUE.
  afterEach(liveDelay('MBTA_V3_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = MbtaV3SDK.test()
    const ent = testsdk.Trip()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.MBTA_V3_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'trip.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{},"name":"trip","op":{"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /trips","source":"openapi3","version":2},"g":{"query":[{"a":true,"k":"query","n":"filter_direction_id","or":"filter_direction_id","r":false,"t":"`$INTEGER`","index$":0},{"a":true,"k":"query","n":"filter_id","or":"filter_id","r":false,"t":"`$STRING`","index$":1},{"a":true,"k":"query","n":"filter_name","or":"filter_name","r":false,"t":"`$STRING`","index$":2},{"a":true,"k":"query","n":"filter_route","or":"filter_route","r":false,"t":"`$STRING`","index$":3},{"a":true,"k":"query","n":"filter_route_pattern","or":"filter_route_pattern","r":false,"t":"`$STRING`","index$":4},{"a":true,"k":"query","n":"include","or":"include","r":false,"t":"`$STRING`","index$":5},{"a":true,"k":"query","n":"sort","or":"sort","r":false,"t":"`$STRING`","index$":6}]},"k":"http","m":"GET","o":"/trips","q":{"exist":["filter_direction_id","filter_id","filter_name","filter_route","filter_route_pattern","include","sort"]},"r":{},"s":[{"lit":"trips"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"trip","name__orig":"trip","Name":"Trip","name_":"trip","name-":"trip","NAME":"TRIP","index$":10}, {"active":true,"entity":"trip","key$":"BasicTripFlow","kind":"basic","name":"BasicTripFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"trip_ref01","srcdatavar":"trip_ref01_data","suffix":"_dt0"},"m":{},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-trip_ref01"}}],"index$":0}]}, 'Trip', {"GET /trips":{"protocol":"http","operationId":"getTrips","responses":{"200":{"description":"Successful response","content":{"application/vnd.api+json":{"schema":{"type":"object","properties":{"data":{"type":"array","items":{"type":"object","properties":{"id":{"type":"string"},"type":{"type":"string","enum":["trip"]},"attributes":{"type":"object","properties":{"bikes_allowed":{"type":"integer"},"block_id":{"type":"string","nullable":true},"direction_id":{"type":"integer","enum":[0,1]},"headsign":{"type":"string"},"name":{"type":"string"},"wheelchair_accessible":{"type":"integer"}}},"relationships":{"type":"object","properties":{"route":{"type":"object"},"route_pattern":{"type":"object"},"service":{"type":"object"},"shape":{"type":"object"}}}},"x-ref":"#/components/schemas/Trip"}},"included":{"type":"array","items":{"type":"object"}},"jsonapi":{"type":"object","properties":{"version":{"type":"string","example":"1.0"}},"x-ref":"#/components/schemas/JsonApi"}},"x-ref":"#/components/schemas/TripsResponse"}}}},"400":{"description":"Bad request","content":{"application/vnd.api+json":{"schema":{"type":"object","properties":{"errors":{"type":"array","items":{"type":"object","properties":{"status":{"type":"string"},"code":{"type":"string"},"title":{"type":"string"},"detail":{"type":"string"},"source":{"type":"object","properties":{"parameter":{"type":"string"}}}}}},"jsonapi":{"type":"object","properties":{"version":{"type":"string","example":"1.0"}},"x-ref":"#/components/schemas/JsonApi"}},"x-ref":"#/components/schemas/ErrorResponse"}}}}},"parameters":[{"name":"filter[id]","in":"query","description":"Filter by trip ID","schema":{"type":"string"},"index$":0},{"name":"filter[route]","in":"query","description":"Filter by route ID","schema":{"type":"string"},"index$":1},{"name":"filter[direction_id]","in":"query","description":"Filter by direction (0 or 1)","schema":{"type":"integer","enum":[0,1]},"index$":2},{"name":"filter[route_pattern]","in":"query","description":"Filter by route pattern ID","schema":{"type":"string"},"index$":3},{"name":"filter[name]","in":"query","description":"Filter by trip name","schema":{"type":"string"},"index$":4},{"name":"include","in":"query","description":"Include related resources (comma-separated)","schema":{"type":"string"},"index$":5},{"name":"sort","in":"query","description":"Sort field","schema":{"type":"string"},"index$":6}],"security":[{"ApiKeyAuth":[]}],"securitySource":"definition","securitySchemes":{"ApiKeyAuth":{"type":"apiKey","in":"header","name":"x-api-key","description":"API key required for requests. Default rate limit is 1,000 requests per minute with a valid key."}}}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let trip_ref01_data = Object.values(setup.data.existing.trip)[0] as any

    // LOAD
    const trip_ref01_ent = client.Trip()
    const trip_ref01_match_dt0: any = {}
    const trip_ref01_data_dt0 = (await trip_ref01_ent.load(trip_ref01_match_dt0)).data()
    assert(null != trip_ref01_data_dt0)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/trip/TripTestData.json')

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
    ['trip01','trip02','trip03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'MBTA_V3_TEST_TRIP_ENTID': idmap,
    'MBTA_V3_TEST_LIVE': 'FALSE',
    'MBTA_V3_TEST_EXPLAIN': 'FALSE',
    'MBTA_V3_APIKEY': '',
  })

  idmap = env['MBTA_V3_TEST_TRIP_ENTID']

  const live = 'TRUE' === env.MBTA_V3_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['MBTA_V3_TEST_TRIP_ENTID']
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
  
