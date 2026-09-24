

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


describe('RouteEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when MBTA_V3_TEST_LIVE=TRUE.
  afterEach(liveDelay('MBTA_V3_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = MbtaV3SDK.test()
    const ent = testsdk.Route()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.MBTA_V3_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'route.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"id":{"a":true,"h":"Id","n":"id","r":false,"t":"`$STRING`","key$":"id","index$":0}},"id":{"field":"id","name":"id"},"name":"route","op":{"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /routes","source":"openapi3","version":2},"g":{"query":[{"a":true,"k":"query","n":"filter_id","or":"filter_id","r":false,"t":"`$STRING`","index$":0},{"a":true,"k":"query","n":"filter_stop","or":"filter_stop","r":false,"t":"`$STRING`","index$":1},{"a":true,"ex":"0,1","k":"query","n":"filter_type","or":"filter_type","r":false,"t":"`$STRING`","index$":2},{"a":true,"k":"query","n":"include","or":"include","r":false,"t":"`$STRING`","index$":3},{"a":true,"k":"query","n":"sort","or":"sort","r":false,"t":"`$STRING`","index$":4}]},"k":"http","m":"GET","o":"/routes","q":{"exist":["filter_id","filter_stop","filter_type","include","sort"]},"r":{},"s":[{"lit":"routes"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0},{"a":true,"co":{"id":"GET /routes/{id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":0}],"query":[{"a":true,"k":"query","n":"include","or":"include","r":false,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/routes/{id}","q":{"exist":["id","include"]},"r":{},"s":[{"lit":"routes"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"route","name__orig":"route","Name":"Route","name_":"route","name-":"route","NAME":"ROUTE","index$":4}, {"active":true,"entity":"route","key$":"BasicRouteFlow","kind":"basic","name":"BasicRouteFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"route_ref01","srcdatavar":"route_ref01_data","suffix":"_dt0"},"m":{"id":"route01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-route_ref01"}}],"index$":0}]}, 'Route', {"GET /routes":{"protocol":"http","operationId":"getRoutes","responses":{"200":{"description":"Successful response","content":{"application/vnd.api+json":{"schema":{"type":"object","properties":{"data":{"type":"array","items":{"type":"object","properties":{"id":{"type":"string"},"type":{"type":"string","enum":["route"]},"attributes":{"type":"object","properties":{"color":{"type":"string"},"description":{"type":"string"},"direction_destinations":{"type":"array","items":{"type":"string"}},"direction_names":{"type":"array","items":{"type":"string"}},"fare_class":{"type":"string"},"long_name":{"type":"string"},"short_name":{"type":"string"},"sort_order":{"type":"integer"},"text_color":{"type":"string"},"type":{"type":"integer","description":"0=light rail, 1=subway, 2=commuter rail, 3=bus, 4=ferry"}}},"relationships":{"type":"object"}},"x-ref":"#/components/schemas/Route"}},"included":{"type":"array","items":{"type":"object"}},"jsonapi":{"type":"object","properties":{"version":{"type":"string","example":"1.0"}},"x-ref":"#/components/schemas/JsonApi"}},"x-ref":"#/components/schemas/RoutesResponse"}}}},"400":{"description":"Bad request","content":{"application/vnd.api+json":{"schema":{"type":"object","properties":{"errors":{"type":"array","items":{"type":"object","properties":{"status":{"type":"string"},"code":{"type":"string"},"title":{"type":"string"},"detail":{"type":"string"},"source":{"type":"object","properties":{"parameter":{"type":"string"}}}}}},"jsonapi":{"type":"object","properties":{"version":{"type":"string","example":"1.0"}},"x-ref":"#/components/schemas/JsonApi"}},"x-ref":"#/components/schemas/ErrorResponse"}}}}},"parameters":[{"name":"filter[type]","in":"query","description":"Filter by route type (0=light rail, 1=subway, 2=commuter rail, 3=bus, 4=ferry)","schema":{"type":"string"},"example":"0,1","index$":0},{"name":"filter[stop]","in":"query","description":"Filter by stop ID (e.g., place-north)","schema":{"type":"string"},"index$":1},{"name":"filter[id]","in":"query","description":"Filter by route ID","schema":{"type":"string"},"index$":2},{"name":"include","in":"query","description":"Include related resources (comma-separated)","schema":{"type":"string"},"index$":3},{"name":"sort","in":"query","description":"Sort field","schema":{"type":"string"},"index$":4}],"security":[{"ApiKeyAuth":[]}],"securitySource":"definition","securitySchemes":{"ApiKeyAuth":{"type":"apiKey","in":"header","name":"x-api-key","description":"API key required for requests. Default rate limit is 1,000 requests per minute with a valid key."}}},"GET /routes/{id}":{"protocol":"http","operationId":"getRouteById","responses":{"200":{"description":"Successful response","content":{"application/vnd.api+json":{"schema":{"type":"object","properties":{"data":{"type":"object","properties":{"id":{"type":"string"},"type":{"type":"string","enum":["route"]},"attributes":{"type":"object","properties":{"color":{"type":"string"},"description":{"type":"string"},"direction_destinations":{"type":"array","items":{"type":"string"}},"direction_names":{"type":"array","items":{"type":"string"}},"fare_class":{"type":"string"},"long_name":{"type":"string"},"short_name":{"type":"string"},"sort_order":{"type":"integer"},"text_color":{"type":"string"},"type":{"type":"integer","description":"0=light rail, 1=subway, 2=commuter rail, 3=bus, 4=ferry"}}},"relationships":{"type":"object"}},"x-ref":"#/components/schemas/Route"},"included":{"type":"array","items":{"type":"object"}},"jsonapi":{"type":"object","properties":{"version":{"type":"string","example":"1.0"}},"x-ref":"#/components/schemas/JsonApi"}},"x-ref":"#/components/schemas/RouteResponse"}}}},"404":{"description":"Route not found","content":{"application/vnd.api+json":{"schema":{"type":"object","properties":{"errors":{"type":"array","items":{"type":"object","properties":{"status":{"type":"string"},"code":{"type":"string"},"title":{"type":"string"},"detail":{"type":"string"},"source":{"type":"object","properties":{"parameter":{"type":"string"}}}}}},"jsonapi":{"type":"object","properties":{"version":{"type":"string","example":"1.0"}},"x-ref":"#/components/schemas/JsonApi"}},"x-ref":"#/components/schemas/ErrorResponse"}}}}},"parameters":[{"name":"id","in":"path","required":true,"description":"Route ID (e.g., Orange)","schema":{"type":"string"},"index$":0},{"name":"include","in":"query","description":"Include related resources (comma-separated)","schema":{"type":"string"},"index$":1}],"security":[{"ApiKeyAuth":[]}],"securitySource":"definition","securitySchemes":{"ApiKeyAuth":{"type":"apiKey","in":"header","name":"x-api-key","description":"API key required for requests. Default rate limit is 1,000 requests per minute with a valid key."}}}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let route_ref01_data = Object.values(setup.data.existing.route)[0] as any

    // LOAD
    const route_ref01_ent = client.Route()
    const route_ref01_match_dt0: any = {}
    route_ref01_match_dt0.id = route_ref01_data.id
    const route_ref01_data_dt0 = (await route_ref01_ent.load(route_ref01_match_dt0)).data()
    assert(route_ref01_data_dt0.id === route_ref01_data.id)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/route/RouteTestData.json')

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
    ['route01','route02','route03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'MBTA_V3_TEST_ROUTE_ENTID': idmap,
    'MBTA_V3_TEST_LIVE': 'FALSE',
    'MBTA_V3_TEST_EXPLAIN': 'FALSE',
    'MBTA_V3_APIKEY': '',
  })

  idmap = env['MBTA_V3_TEST_ROUTE_ENTID']

  const live = 'TRUE' === env.MBTA_V3_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['MBTA_V3_TEST_ROUTE_ENTID']
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
  
