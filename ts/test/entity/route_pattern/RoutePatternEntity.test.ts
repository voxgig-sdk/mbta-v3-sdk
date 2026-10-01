

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


describe('RoutePatternEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when MBTA_V3_TEST_LIVE=TRUE.
  afterEach(liveDelay('MBTA_V3_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = MbtaV3SDK.test()
    const ent = testsdk.RoutePattern()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.MBTA_V3_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'route_pattern.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{},"name":"route_pattern","op":{"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /route_patterns","source":"openapi3","version":2},"g":{"query":[{"a":true,"k":"query","n":"filter_direction_id","or":"filter[direction_id]","r":false,"t":"`$INTEGER`","index$":0},{"a":true,"k":"query","n":"filter_route","or":"filter[route]","r":false,"t":"`$STRING`","index$":1},{"a":true,"k":"query","n":"filter_stop","or":"filter[stop]","r":false,"t":"`$STRING`","index$":2},{"a":true,"k":"query","n":"include","or":"include","r":false,"t":"`$STRING`","index$":3}]},"k":"http","m":"GET","o":"/route_patterns","q":{"exist":["filter_direction_id","filter_route","filter_stop","include"]},"r":{},"s":[{"lit":"route_patterns"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"route_pattern","name__orig":"route_pattern","Name":"RoutePattern","name_":"route_pattern","name-":"route-pattern","NAME":"ROUTE_PATTERN","index$":5}, {"active":true,"entity":"route_pattern","key$":"BasicRoutePatternFlow","kind":"basic","name":"BasicRoutePatternFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"route_pattern_ref01","srcdatavar":"route_pattern_ref01_data","suffix":"_dt0"},"m":{},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-route_pattern_ref01"}}],"index$":0}]}, 'RoutePattern', {"GET /route_patterns":{"protocol":"http","parameters":[{"name":"filter[route]","in":"query","description":"Filter by route ID","schema":{"type":"string"},"index$":0},{"name":"filter[direction_id]","in":"query","description":"Filter by direction (0 or 1)","schema":{"type":"integer","enum":[0,1]},"index$":1},{"name":"filter[stop]","in":"query","description":"Filter by stop ID","schema":{"type":"string"},"index$":2},{"name":"include","in":"query","description":"Include related resources (comma-separated)","schema":{"type":"string"},"index$":3}]}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let route_pattern_ref01_data = Object.values(setup.data.existing.route_pattern)[0] as any

    // LOAD
    const route_pattern_ref01_ent = client.RoutePattern()
    const route_pattern_ref01_match_dt0: any = {}
    const route_pattern_ref01_data_dt0 = (await route_pattern_ref01_ent.load(route_pattern_ref01_match_dt0)).data()
    assert(null != route_pattern_ref01_data_dt0)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/route_pattern/RoutePatternTestData.json')

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
    ['route_pattern01','route_pattern02','route_pattern03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'MBTA_V3_TEST_ROUTE_PATTERN_ENTID': idmap,
    'MBTA_V3_TEST_LIVE': 'FALSE',
    'MBTA_V3_TEST_EXPLAIN': 'FALSE',
    'MBTA_V3_APIKEY': '',
  })

  idmap = env['MBTA_V3_TEST_ROUTE_PATTERN_ENTID']

  const live = 'TRUE' === env.MBTA_V3_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['MBTA_V3_TEST_ROUTE_PATTERN_ENTID']
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
  
