

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


describe('StopEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when MBTA_V3_TEST_LIVE=TRUE.
  afterEach(liveDelay('MBTA_V3_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = MbtaV3SDK.test()
    const ent = testsdk.Stop()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.MBTA_V3_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'stop.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{},"name":"stop","op":{"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /stops","source":"openapi3","version":2},"g":{"query":[{"a":true,"k":"query","n":"filter_id","or":"filter_id","r":false,"t":"`$STRING`","index$":0},{"a":true,"k":"query","n":"filter_latitude","or":"filter_latitude","r":false,"t":"`$NUMBER`","index$":1},{"a":true,"k":"query","n":"filter_location_type","or":"filter_location_type","r":false,"t":"`$INTEGER`","index$":2},{"a":true,"k":"query","n":"filter_longitude","or":"filter_longitude","r":false,"t":"`$NUMBER`","index$":3},{"a":true,"k":"query","n":"filter_radius","or":"filter_radius","r":false,"t":"`$NUMBER`","index$":4},{"a":true,"k":"query","n":"filter_route","or":"filter_route","r":false,"t":"`$STRING`","index$":5},{"a":true,"k":"query","n":"include","or":"include","r":false,"t":"`$STRING`","index$":6},{"a":true,"k":"query","n":"sort","or":"sort","r":false,"t":"`$STRING`","index$":7}]},"k":"http","m":"GET","o":"/stops","q":{"exist":["filter_id","filter_latitude","filter_location_type","filter_longitude","filter_radius","filter_route","include","sort"]},"r":{},"s":[{"lit":"stops"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"stop","name__orig":"stop","Name":"Stop","name_":"stop","name-":"stop","NAME":"STOP","index$":9}, {"active":true,"entity":"stop","key$":"BasicStopFlow","kind":"basic","name":"BasicStopFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"stop_ref01","srcdatavar":"stop_ref01_data","suffix":"_dt0"},"m":{},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-stop_ref01"}}],"index$":0}]}, 'Stop', {"GET /stops":{"protocol":"http","operationId":"getStops","responses":{"200":{"description":"Successful response","content":{"application/vnd.api+json":{"schema":{"type":"object","properties":{"data":{"type":"array","items":{"type":"object","properties":{"id":{"type":"string"},"type":{"type":"string","enum":["stop"]},"attributes":{"type":"object","properties":{"address":{"type":"string","nullable":true},"at_street":{"type":"string","nullable":true},"description":{"type":"string","nullable":true},"latitude":{"type":"number","format":"double"},"location_type":{"type":"integer"},"longitude":{"type":"number","format":"double"},"municipality":{"type":"string","nullable":true},"name":{"type":"string"},"on_street":{"type":"string","nullable":true},"platform_code":{"type":"string","nullable":true},"platform_name":{"type":"string","nullable":true},"vehicle_type":{"type":"integer","nullable":true},"wheelchair_boarding":{"type":"integer"}}},"relationships":{"type":"object","properties":{"parent_station":{"type":"object"},"child_stops":{"type":"object"},"facilities":{"type":"object"}}}},"x-ref":"#/components/schemas/Stop"}},"included":{"type":"array","items":{"type":"object"}},"jsonapi":{"type":"object","properties":{"version":{"type":"string","example":"1.0"}},"x-ref":"#/components/schemas/JsonApi"}},"x-ref":"#/components/schemas/StopsResponse"}}}},"400":{"description":"Bad request","content":{"application/vnd.api+json":{"schema":{"type":"object","properties":{"errors":{"type":"array","items":{"type":"object","properties":{"status":{"type":"string"},"code":{"type":"string"},"title":{"type":"string"},"detail":{"type":"string"},"source":{"type":"object","properties":{"parameter":{"type":"string"}}}}}},"jsonapi":{"type":"object","properties":{"version":{"type":"string","example":"1.0"}},"x-ref":"#/components/schemas/JsonApi"}},"x-ref":"#/components/schemas/ErrorResponse"}}}}},"parameters":[{"name":"filter[id]","in":"query","description":"Filter by stop ID","schema":{"type":"string"},"index$":0},{"name":"filter[route]","in":"query","description":"Filter by route ID","schema":{"type":"string"},"index$":1},{"name":"filter[location_type]","in":"query","description":"Filter by location type","schema":{"type":"integer"},"index$":2},{"name":"filter[latitude]","in":"query","description":"Filter by latitude","schema":{"type":"number","format":"double"},"index$":3},{"name":"filter[longitude]","in":"query","description":"Filter by longitude","schema":{"type":"number","format":"double"},"index$":4},{"name":"filter[radius]","in":"query","description":"Filter by radius (requires latitude and longitude)","schema":{"type":"number","format":"double"},"index$":5},{"name":"include","in":"query","description":"Include related resources (comma-separated)","schema":{"type":"string"},"index$":6},{"name":"sort","in":"query","description":"Sort field","schema":{"type":"string"},"index$":7}],"security":[{"ApiKeyAuth":[]}],"securitySource":"definition","securitySchemes":{"ApiKeyAuth":{"type":"apiKey","in":"header","name":"x-api-key","description":"API key required for requests. Default rate limit is 1,000 requests per minute with a valid key."}}}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let stop_ref01_data = Object.values(setup.data.existing.stop)[0] as any

    // LOAD
    const stop_ref01_ent = client.Stop()
    const stop_ref01_match_dt0: any = {}
    const stop_ref01_data_dt0 = (await stop_ref01_ent.load(stop_ref01_match_dt0)).data()
    assert(null != stop_ref01_data_dt0)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/stop/StopTestData.json')

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
    ['stop01','stop02','stop03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'MBTA_V3_TEST_STOP_ENTID': idmap,
    'MBTA_V3_TEST_LIVE': 'FALSE',
    'MBTA_V3_TEST_EXPLAIN': 'FALSE',
    'MBTA_V3_APIKEY': '',
  })

  idmap = env['MBTA_V3_TEST_STOP_ENTID']

  const live = 'TRUE' === env.MBTA_V3_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['MBTA_V3_TEST_STOP_ENTID']
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
  
