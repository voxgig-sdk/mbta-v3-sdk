

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


// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
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
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"id","req":false,"type":"`$STRING`","index$":0}],"id":{"field":"id","name":"id"},"name":"route","op":{"load":{"input":"data","name":"load","points":[{"active":true,"args":{"query":[{"active":true,"kind":"query","name":"filter_id","orig":"filter_id","reqd":false,"type":"`$STRING`","index$":0},{"active":true,"kind":"query","name":"filter_stop","orig":"filter_stop","reqd":false,"type":"`$STRING`","index$":1},{"active":true,"example":"0,1","kind":"query","name":"filter_type","orig":"filter_type","reqd":false,"type":"`$STRING`","index$":2},{"active":true,"kind":"query","name":"include","orig":"include","reqd":false,"type":"`$STRING`","index$":3},{"active":true,"kind":"query","name":"sort","orig":"sort","reqd":false,"type":"`$STRING`","index$":4}]},"contract":{"id":"GET /routes","json":"{\"operationId\":\"getRoutes\",\"parameters\":[{\"description\":\"Filter by route type (0=light rail, 1=subway, 2=commuter rail, 3=bus, 4=ferry)\",\"example\":\"0,1\",\"in\":\"query\",\"name\":\"filter[type]\",\"schema\":{\"type\":\"string\"}},{\"description\":\"Filter by stop ID (e.g., place-north)\",\"in\":\"query\",\"name\":\"filter[stop]\",\"schema\":{\"type\":\"string\"}},{\"description\":\"Filter by route ID\",\"in\":\"query\",\"name\":\"filter[id]\",\"schema\":{\"type\":\"string\"}},{\"description\":\"Include related resources (comma-separated)\",\"in\":\"query\",\"name\":\"include\",\"schema\":{\"type\":\"string\"}},{\"description\":\"Sort field\",\"in\":\"query\",\"name\":\"sort\",\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/vnd.api+json\":{\"schema\":{\"properties\":{\"data\":{\"items\":{\"properties\":{\"attributes\":{\"properties\":{\"color\":{\"type\":\"string\"},\"description\":{\"type\":\"string\"},\"direction_destinations\":{\"items\":{\"type\":\"string\"},\"type\":\"array\"},\"direction_names\":{\"items\":{\"type\":\"string\"},\"type\":\"array\"},\"fare_class\":{\"type\":\"string\"},\"long_name\":{\"type\":\"string\"},\"short_name\":{\"type\":\"string\"},\"sort_order\":{\"type\":\"integer\"},\"text_color\":{\"type\":\"string\"},\"type\":{\"description\":\"0=light rail, 1=subway, 2=commuter rail, 3=bus, 4=ferry\",\"type\":\"integer\"}},\"type\":\"object\"},\"id\":{\"type\":\"string\"},\"relationships\":{\"type\":\"object\"},\"type\":{\"enum\":[\"route\"],\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"},\"included\":{\"items\":{\"type\":\"object\"},\"type\":\"array\"},\"jsonapi\":{\"properties\":{\"version\":{\"example\":\"1.0\",\"type\":\"string\"}},\"type\":\"object\"}},\"type\":\"object\"}}},\"description\":\"Successful response\"},\"400\":{\"content\":{\"application/vnd.api+json\":{\"schema\":{\"properties\":{\"errors\":{\"items\":{\"properties\":{\"code\":{\"type\":\"string\"},\"detail\":{\"type\":\"string\"},\"source\":{\"properties\":{\"parameter\":{\"type\":\"string\"}},\"type\":\"object\"},\"status\":{\"type\":\"string\"},\"title\":{\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"},\"jsonapi\":{\"properties\":{\"version\":{\"example\":\"1.0\",\"type\":\"string\"}},\"type\":\"object\"}},\"type\":\"object\"}}},\"description\":\"Bad request\"}},\"security\":[{\"ApiKeyAuth\":[]}],\"securitySchemes\":{\"ApiKeyAuth\":{\"description\":\"API key required for requests. Default rate limit is 1,000 requests per minute with a valid key.\",\"in\":\"header\",\"name\":\"x-api-key\",\"type\":\"apiKey\"}},\"securitySource\":\"definition\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/routes","segments":[{"lit":"routes"}],"select":{"exist":["filter_id","filter_stop","filter_type","include","sort"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0},{"active":true,"args":{"params":[{"active":true,"kind":"param","name":"id","orig":"id","reqd":true,"type":"`$STRING`","index$":0}],"query":[{"active":true,"kind":"query","name":"include","orig":"include","reqd":false,"type":"`$STRING`","index$":0}]},"contract":{"id":"GET /routes/{id}","json":"{\"operationId\":\"getRouteById\",\"parameters\":[{\"description\":\"Route ID (e.g., Orange)\",\"in\":\"path\",\"name\":\"id\",\"required\":true,\"schema\":{\"type\":\"string\"}},{\"description\":\"Include related resources (comma-separated)\",\"in\":\"query\",\"name\":\"include\",\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/vnd.api+json\":{\"schema\":{\"properties\":{\"data\":{\"properties\":{\"attributes\":{\"properties\":{\"color\":{\"type\":\"string\"},\"description\":{\"type\":\"string\"},\"direction_destinations\":{\"items\":{\"type\":\"string\"},\"type\":\"array\"},\"direction_names\":{\"items\":{\"type\":\"string\"},\"type\":\"array\"},\"fare_class\":{\"type\":\"string\"},\"long_name\":{\"type\":\"string\"},\"short_name\":{\"type\":\"string\"},\"sort_order\":{\"type\":\"integer\"},\"text_color\":{\"type\":\"string\"},\"type\":{\"description\":\"0=light rail, 1=subway, 2=commuter rail, 3=bus, 4=ferry\",\"type\":\"integer\"}},\"type\":\"object\"},\"id\":{\"type\":\"string\"},\"relationships\":{\"type\":\"object\"},\"type\":{\"enum\":[\"route\"],\"type\":\"string\"}},\"type\":\"object\"},\"included\":{\"items\":{\"type\":\"object\"},\"type\":\"array\"},\"jsonapi\":{\"properties\":{\"version\":{\"example\":\"1.0\",\"type\":\"string\"}},\"type\":\"object\"}},\"type\":\"object\"}}},\"description\":\"Successful response\"},\"404\":{\"content\":{\"application/vnd.api+json\":{\"schema\":{\"properties\":{\"errors\":{\"items\":{\"properties\":{\"code\":{\"type\":\"string\"},\"detail\":{\"type\":\"string\"},\"source\":{\"properties\":{\"parameter\":{\"type\":\"string\"}},\"type\":\"object\"},\"status\":{\"type\":\"string\"},\"title\":{\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"},\"jsonapi\":{\"properties\":{\"version\":{\"example\":\"1.0\",\"type\":\"string\"}},\"type\":\"object\"}},\"type\":\"object\"}}},\"description\":\"Route not found\"}},\"security\":[{\"ApiKeyAuth\":[]}],\"securitySchemes\":{\"ApiKeyAuth\":{\"description\":\"API key required for requests. Default rate limit is 1,000 requests per minute with a valid key.\",\"in\":\"header\",\"name\":\"x-api-key\",\"type\":\"apiKey\"}},\"securitySource\":\"definition\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/routes/{id}","segments":[{"lit":"routes"},{"var":"id"}],"select":{"exist":["id","include"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"route","name__orig":"route","Name":"Route","name_":"route","name-":"route","NAME":"ROUTE","index$":4}, {"active":true,"entity":"route","key$":"BasicRouteFlow","kind":"basic","name":"BasicRouteFlow","param":{},"step":[{"active":true,"data":{},"input":{"ref":"route_ref01","srcdatavar":"route_ref01_data","suffix":"_dt0"},"match":{"id":"route01"},"op":"load","spec":[],"valid":[{"apply":"TextFieldMark","def":{"mark":"Mark01-route_ref01"}}],"index$":0}]}, 'Route')
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
  
