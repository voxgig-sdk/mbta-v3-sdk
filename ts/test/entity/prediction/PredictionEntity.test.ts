

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


describe('PredictionEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when MBTA_V3_TEST_LIVE=TRUE.
  afterEach(liveDelay('MBTA_V3_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = MbtaV3SDK.test()
    const ent = testsdk.Prediction()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.MBTA_V3_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'prediction.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{},"name":"prediction","op":{"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /predictions","source":"openapi3","version":2},"g":{"query":[{"a":true,"k":"query","n":"filter_direction_id","or":"filter_direction_id","r":false,"t":"`$INTEGER`","index$":0},{"a":true,"k":"query","n":"filter_route","or":"filter_route","r":false,"t":"`$STRING`","index$":1},{"a":true,"k":"query","n":"filter_stop","or":"filter_stop","r":false,"t":"`$STRING`","index$":2},{"a":true,"k":"query","n":"filter_trip","or":"filter_trip","r":false,"t":"`$STRING`","index$":3},{"a":true,"k":"query","n":"include","or":"include","r":false,"t":"`$STRING`","index$":4},{"a":true,"k":"query","n":"sort","or":"sort","r":false,"t":"`$STRING`","index$":5}]},"k":"http","m":"GET","o":"/predictions","q":{"exist":["filter_direction_id","filter_route","filter_stop","filter_trip","include","sort"]},"r":{},"s":[{"lit":"predictions"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"prediction","name__orig":"prediction","Name":"Prediction","name_":"prediction","name-":"prediction","NAME":"PREDICTION","index$":3}, {"active":true,"entity":"prediction","key$":"BasicPredictionFlow","kind":"basic","name":"BasicPredictionFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"prediction_ref01","srcdatavar":"prediction_ref01_data","suffix":"_dt0"},"m":{},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-prediction_ref01"}}],"index$":0}]}, 'Prediction', {"GET /predictions":{"protocol":"http","operationId":"getPredictions","responses":{"200":{"description":"Successful response","content":{"application/vnd.api+json":{"schema":{"type":"object","properties":{"data":{"type":"array","items":{"type":"object","properties":{"id":{"type":"string"},"type":{"type":"string","enum":["prediction"]},"attributes":{"type":"object","properties":{"arrival_time":{"type":"string","format":"date-time","nullable":true},"departure_time":{"type":"string","format":"date-time","nullable":true},"direction_id":{"type":"integer","enum":[0,1]},"schedule_relationship":{"type":"string","nullable":true},"status":{"type":"string","nullable":true},"stop_sequence":{"type":"integer","nullable":true}}},"relationships":{"type":"object","properties":{"route":{"type":"object"},"stop":{"type":"object"},"trip":{"type":"object"},"vehicle":{"type":"object"}}}},"x-ref":"#/components/schemas/Prediction"}},"included":{"type":"array","items":{"type":"object"}},"jsonapi":{"type":"object","properties":{"version":{"type":"string","example":"1.0"}},"x-ref":"#/components/schemas/JsonApi"}},"x-ref":"#/components/schemas/PredictionsResponse"}}}},"400":{"description":"Bad request","content":{"application/vnd.api+json":{"schema":{"type":"object","properties":{"errors":{"type":"array","items":{"type":"object","properties":{"status":{"type":"string"},"code":{"type":"string"},"title":{"type":"string"},"detail":{"type":"string"},"source":{"type":"object","properties":{"parameter":{"type":"string"}}}}}},"jsonapi":{"type":"object","properties":{"version":{"type":"string","example":"1.0"}},"x-ref":"#/components/schemas/JsonApi"}},"x-ref":"#/components/schemas/ErrorResponse"}}}}},"parameters":[{"name":"filter[stop]","in":"query","description":"Filter by stop ID (e.g., place-sstat)","schema":{"type":"string"},"index$":0},{"name":"filter[route]","in":"query","description":"Filter by route ID","schema":{"type":"string"},"index$":1},{"name":"filter[trip]","in":"query","description":"Filter by trip ID","schema":{"type":"string"},"index$":2},{"name":"filter[direction_id]","in":"query","description":"Filter by direction (0 or 1)","schema":{"type":"integer","enum":[0,1]},"index$":3},{"name":"include","in":"query","description":"Include related resources (e.g., stop, route, trip, vehicle)","schema":{"type":"string"},"index$":4},{"name":"sort","in":"query","description":"Sort field","schema":{"type":"string"},"index$":5}],"security":[{"ApiKeyAuth":[]}],"securitySource":"definition","securitySchemes":{"ApiKeyAuth":{"type":"apiKey","in":"header","name":"x-api-key","description":"API key required for requests. Default rate limit is 1,000 requests per minute with a valid key."}}}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let prediction_ref01_data = Object.values(setup.data.existing.prediction)[0] as any

    // LOAD
    const prediction_ref01_ent = client.Prediction()
    const prediction_ref01_match_dt0: any = {}
    const prediction_ref01_data_dt0 = (await prediction_ref01_ent.load(prediction_ref01_match_dt0)).data()
    assert(null != prediction_ref01_data_dt0)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/prediction/PredictionTestData.json')

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
    ['prediction01','prediction02','prediction03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'MBTA_V3_TEST_PREDICTION_ENTID': idmap,
    'MBTA_V3_TEST_LIVE': 'FALSE',
    'MBTA_V3_TEST_EXPLAIN': 'FALSE',
    'MBTA_V3_APIKEY': '',
  })

  idmap = env['MBTA_V3_TEST_PREDICTION_ENTID']

  const live = 'TRUE' === env.MBTA_V3_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['MBTA_V3_TEST_PREDICTION_ENTID']
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
  
