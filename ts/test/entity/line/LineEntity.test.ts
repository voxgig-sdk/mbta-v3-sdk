

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


describe('LineEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when MBTA_V3_TEST_LIVE=TRUE.
  afterEach(liveDelay('MBTA_V3_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = MbtaV3SDK.test()
    const ent = testsdk.Line()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.MBTA_V3_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'line.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[],"name":"line","op":{"load":{"input":"data","name":"load","points":[{"active":true,"args":{"query":[{"active":true,"kind":"query","name":"filter_id","orig":"filter_id","reqd":false,"type":"`$STRING`","index$":0},{"active":true,"kind":"query","name":"include","orig":"include","reqd":false,"type":"`$STRING`","index$":1}]},"contract":{"id":"GET /lines","json":"{\"operationId\":\"getLines\",\"parameters\":[{\"description\":\"Filter by line ID\",\"in\":\"query\",\"name\":\"filter[id]\",\"schema\":{\"type\":\"string\"}},{\"description\":\"Include related resources (comma-separated)\",\"in\":\"query\",\"name\":\"include\",\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/vnd.api+json\":{\"schema\":{\"properties\":{\"data\":{\"items\":{\"properties\":{\"attributes\":{\"properties\":{\"color\":{\"type\":\"string\"},\"long_name\":{\"type\":\"string\"},\"short_name\":{\"type\":\"string\"},\"sort_order\":{\"type\":\"integer\"},\"text_color\":{\"type\":\"string\"}},\"type\":\"object\"},\"id\":{\"type\":\"string\"},\"relationships\":{\"type\":\"object\"},\"type\":{\"enum\":[\"line\"],\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"},\"included\":{\"items\":{\"type\":\"object\"},\"type\":\"array\"},\"jsonapi\":{\"properties\":{\"version\":{\"example\":\"1.0\",\"type\":\"string\"}},\"type\":\"object\"}},\"type\":\"object\"}}},\"description\":\"Successful response\"},\"400\":{\"content\":{\"application/vnd.api+json\":{\"schema\":{\"properties\":{\"errors\":{\"items\":{\"properties\":{\"code\":{\"type\":\"string\"},\"detail\":{\"type\":\"string\"},\"source\":{\"properties\":{\"parameter\":{\"type\":\"string\"}},\"type\":\"object\"},\"status\":{\"type\":\"string\"},\"title\":{\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"},\"jsonapi\":{\"properties\":{\"version\":{\"example\":\"1.0\",\"type\":\"string\"}},\"type\":\"object\"}},\"type\":\"object\"}}},\"description\":\"Bad request\"}},\"security\":[{\"ApiKeyAuth\":[]}],\"securitySchemes\":{\"ApiKeyAuth\":{\"description\":\"API key required for requests. Default rate limit is 1,000 requests per minute with a valid key.\",\"in\":\"header\",\"name\":\"x-api-key\",\"type\":\"apiKey\"}},\"securitySource\":\"definition\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/lines","segments":[{"lit":"lines"}],"select":{"exist":["filter_id","include"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"line","name__orig":"line","Name":"Line","name_":"line","name-":"line","NAME":"LINE","index$":2}, {"active":true,"entity":"line","key$":"BasicLineFlow","kind":"basic","name":"BasicLineFlow","param":{},"step":[{"active":true,"data":{},"input":{"ref":"line_ref01","srcdatavar":"line_ref01_data","suffix":"_dt0"},"match":{},"op":"load","spec":[],"valid":[{"apply":"TextFieldMark","def":{"mark":"Mark01-line_ref01"}}],"index$":0}]}, 'Line')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let line_ref01_data = Object.values(setup.data.existing.line)[0] as any

    // LOAD
    const line_ref01_ent = client.Line()
    const line_ref01_match_dt0: any = {}
    const line_ref01_data_dt0 = (await line_ref01_ent.load(line_ref01_match_dt0)).data()
    assert(null != line_ref01_data_dt0)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/line/LineTestData.json')

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
    ['line01','line02','line03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'MBTA_V3_TEST_LINE_ENTID': idmap,
    'MBTA_V3_TEST_LIVE': 'FALSE',
    'MBTA_V3_TEST_EXPLAIN': 'FALSE',
    'MBTA_V3_APIKEY': '',
  })

  idmap = env['MBTA_V3_TEST_LINE_ENTID']

  const live = 'TRUE' === env.MBTA_V3_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['MBTA_V3_TEST_LINE_ENTID']
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
  
