

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


describe('ServiceEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when MBTA_V3_TEST_LIVE=TRUE.
  afterEach(liveDelay('MBTA_V3_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = MbtaV3SDK.test()
    const ent = testsdk.Service()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.MBTA_V3_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'service.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[],"name":"service","op":{"load":{"input":"data","name":"load","points":[{"active":true,"args":{"query":[{"active":true,"kind":"query","name":"filter_id","orig":"filter_id","reqd":false,"type":"`$STRING`","index$":0},{"active":true,"kind":"query","name":"filter_route","orig":"filter_route","reqd":false,"type":"`$STRING`","index$":1},{"active":true,"kind":"query","name":"include","orig":"include","reqd":false,"type":"`$STRING`","index$":2}]},"contract":{"id":"GET /services","json":"{\"operationId\":\"getServices\",\"parameters\":[{\"description\":\"Filter by service ID\",\"in\":\"query\",\"name\":\"filter[id]\",\"schema\":{\"type\":\"string\"}},{\"description\":\"Filter by route ID\",\"in\":\"query\",\"name\":\"filter[route]\",\"schema\":{\"type\":\"string\"}},{\"description\":\"Include related resources (comma-separated)\",\"in\":\"query\",\"name\":\"include\",\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/vnd.api+json\":{\"schema\":{\"properties\":{\"data\":{\"items\":{\"properties\":{\"attributes\":{\"properties\":{\"added_dates\":{\"items\":{\"format\":\"date\",\"type\":\"string\"},\"type\":\"array\"},\"added_dates_notes\":{\"items\":{\"type\":\"string\"},\"type\":\"array\"},\"description\":{\"type\":\"string\"},\"end_date\":{\"format\":\"date\",\"type\":\"string\"},\"removed_dates\":{\"items\":{\"format\":\"date\",\"type\":\"string\"},\"type\":\"array\"},\"removed_dates_notes\":{\"items\":{\"type\":\"string\"},\"type\":\"array\"},\"schedule_name\":{\"type\":\"string\"},\"schedule_type\":{\"type\":\"string\"},\"schedule_typicality\":{\"type\":\"integer\"},\"start_date\":{\"format\":\"date\",\"type\":\"string\"},\"valid_days\":{\"items\":{\"type\":\"integer\"},\"type\":\"array\"}},\"type\":\"object\"},\"id\":{\"type\":\"string\"},\"relationships\":{\"type\":\"object\"},\"type\":{\"enum\":[\"service\"],\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"},\"included\":{\"items\":{\"type\":\"object\"},\"type\":\"array\"},\"jsonapi\":{\"properties\":{\"version\":{\"example\":\"1.0\",\"type\":\"string\"}},\"type\":\"object\"}},\"type\":\"object\"}}},\"description\":\"Successful response\"},\"400\":{\"content\":{\"application/vnd.api+json\":{\"schema\":{\"properties\":{\"errors\":{\"items\":{\"properties\":{\"code\":{\"type\":\"string\"},\"detail\":{\"type\":\"string\"},\"source\":{\"properties\":{\"parameter\":{\"type\":\"string\"}},\"type\":\"object\"},\"status\":{\"type\":\"string\"},\"title\":{\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"},\"jsonapi\":{\"properties\":{\"version\":{\"example\":\"1.0\",\"type\":\"string\"}},\"type\":\"object\"}},\"type\":\"object\"}}},\"description\":\"Bad request\"}},\"security\":[{\"ApiKeyAuth\":[]}],\"securitySchemes\":{\"ApiKeyAuth\":{\"description\":\"API key required for requests. Default rate limit is 1,000 requests per minute with a valid key.\",\"in\":\"header\",\"name\":\"x-api-key\",\"type\":\"apiKey\"}},\"securitySource\":\"definition\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/services","segments":[{"lit":"services"}],"select":{"exist":["filter_id","filter_route","include"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"service","name__orig":"service","Name":"Service","name_":"service","name-":"service","NAME":"SERVICE","index$":7}, {"active":true,"entity":"service","key$":"BasicServiceFlow","kind":"basic","name":"BasicServiceFlow","param":{},"step":[{"active":true,"data":{},"input":{"ref":"service_ref01","srcdatavar":"service_ref01_data","suffix":"_dt0"},"match":{},"op":"load","spec":[],"valid":[{"apply":"TextFieldMark","def":{"mark":"Mark01-service_ref01"}}],"index$":0}]}, 'Service')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let service_ref01_data = Object.values(setup.data.existing.service)[0] as any

    // LOAD
    const service_ref01_ent = client.Service()
    const service_ref01_match_dt0: any = {}
    const service_ref01_data_dt0 = (await service_ref01_ent.load(service_ref01_match_dt0)).data()
    assert(null != service_ref01_data_dt0)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/service/ServiceTestData.json')

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
    ['service01','service02','service03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'MBTA_V3_TEST_SERVICE_ENTID': idmap,
    'MBTA_V3_TEST_LIVE': 'FALSE',
    'MBTA_V3_TEST_EXPLAIN': 'FALSE',
    'MBTA_V3_APIKEY': '',
  })

  idmap = env['MBTA_V3_TEST_SERVICE_ENTID']

  const live = 'TRUE' === env.MBTA_V3_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['MBTA_V3_TEST_SERVICE_ENTID']
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
  
