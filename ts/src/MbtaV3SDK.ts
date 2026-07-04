// MbtaV3 Ts SDK

import { AlertEntity } from './entity/AlertEntity'
import { FacilityEntity } from './entity/FacilityEntity'
import { LineEntity } from './entity/LineEntity'
import { PredictionEntity } from './entity/PredictionEntity'
import { RouteEntity } from './entity/RouteEntity'
import { RoutePatternEntity } from './entity/RoutePatternEntity'
import { ScheduleEntity } from './entity/ScheduleEntity'
import { ServiceEntity } from './entity/ServiceEntity'
import { ShapeEntity } from './entity/ShapeEntity'
import { StopEntity } from './entity/StopEntity'
import { TripEntity } from './entity/TripEntity'
import { VehicleEntity } from './entity/VehicleEntity'

export type * from './MbtaV3Types'


import { inspect } from 'node:util'

import type { Context, Feature } from './types'

import { config } from './Config'
import { MbtaV3EntityBase } from './MbtaV3EntityBase'
import { Utility } from './utility/Utility'


import { BaseFeature } from './feature/base/BaseFeature'


const stdutil = new Utility()


class MbtaV3SDK {
  _mode: string = 'live'
  _options: any
  _utility = new Utility()
  _features: Feature[]
  _rootctx: Context

  constructor(options?: any) {

    this._rootctx = this._utility.makeContext({
      client: this,
      utility: this._utility,
      config,
      options,
      shared: new WeakMap()
    })

    this._options = this._utility.makeOptions(this._rootctx)

    const struct = this._utility.struct
    const getpath = struct.getpath
    const items = struct.items

    if (true === getpath(this._options.feature, 'test.active')) {
      this._mode = 'test'
    }

    this._rootctx.options = this._options

    this._features = []

    const featureAdd = this._utility.featureAdd
    const featureInit = this._utility.featureInit

    items(this._options.feature, (fitem: [string, any]) => {
      const fname = fitem[0]
      const fopts = fitem[1]
      if (fopts.active) {
        featureAdd(this._rootctx, this._rootctx.config.makeFeature(fname))
      }
    })

    if (null != this._options.extend) {
      for (let f of this._options.extend) {
        featureAdd(this._rootctx, f)
      }
    }

    for (let f of this._features) {
      featureInit(this._rootctx, f)
    }

    const featureHook = this._utility.featureHook
    featureHook(this._rootctx, 'PostConstruct')
  }


  options() {
    return this._utility.struct.clone(this._options)
  }


  utility() {
    return this._utility.struct.clone(this._utility)
  }


  async prepare(fetchargs?: any) {
    const utility = this._utility
    const struct = utility.struct
    const clone = struct.clone

    const {
      makeContext,
      makeFetchDef,
      prepareHeaders,
      prepareAuth,
    } = utility

    fetchargs = fetchargs || {}

    let ctx: Context = makeContext({
      opname: 'prepare',
      ctrl: fetchargs.ctrl || {},
    }, this._rootctx)

    const options = this._options

    // Build spec directly from SDK options + user-provided fetch args.
    const spec: any = {
      base: options.base,
      prefix: options.prefix,
      suffix: options.suffix,
      path: fetchargs.path || '',
      method: fetchargs.method || 'GET',
      params: fetchargs.params || {},
      query: fetchargs.query || {},
      headers: prepareHeaders(ctx),
      body: fetchargs.body,
      step: 'start',
    }

    ctx.spec = spec

    // Merge user-provided headers over SDK defaults.
    if (fetchargs.headers) {
      const uheaders = fetchargs.headers
      for (let key in uheaders) {
        spec.headers[key] = uheaders[key]
      }
    }

    // Apply SDK auth (apikey, auth prefix, etc.)
    const authResult = prepareAuth(ctx)
    if (authResult instanceof Error) {
      return authResult
    }

    return makeFetchDef(ctx)
  }


  async direct(fetchargs?: any) {
    const utility = this._utility
    const fetcher = utility.fetcher
    const makeContext = utility.makeContext

    const fetchdef = await this.prepare(fetchargs)
    if (fetchdef instanceof Error) {
      return fetchdef
    }

    let ctx: Context = makeContext({
      opname: 'direct',
      ctrl: (fetchargs || {}).ctrl || {},
    }, this._rootctx)

    try {
      const fetched = await fetcher(ctx, fetchdef.url, fetchdef)

      if (null == fetched) {
        return { ok: false, err: ctx.error('direct_no_response', 'response: undefined') }
      }
      else if (fetched instanceof Error) {
        return { ok: false, err: fetched }
      }

      const status = fetched.status

      // No body responses (204 No Content, 304 Not Modified) and explicit
      // zero content-length must skip JSON parsing — fetched.json() would
      // throw `Unexpected end of JSON input` on an empty body.
      const headers = fetched.headers
      const contentLength = headers && 'function' === typeof headers.get
        ? headers.get('content-length')
        : (headers || {})['content-length']
      const noBody = 204 === status || 304 === status || '0' === String(contentLength)

      let json: any = undefined
      if (!noBody) {
        try {
          json = 'function' === typeof fetched.json ? await fetched.json() : fetched.json
        }
        catch (parseErr) {
          // Body wasn't valid JSON — surface the raw response rather than
          // throwing. data stays undefined; callers can inspect status/headers.
          json = undefined
        }
      }

      return {
        ok: status >= 200 && status < 300,
        status,
        headers: fetched.headers,
        data: json,
      }
    }
    catch (err: any) {
      return { ok: false, err }
    }
  }



  _alert?: AlertEntity

  // Idiomatic facade: `client.alert.list()` / `client.alert.load({ id })`.
  get alert(): AlertEntity {
    return (this._alert ??= new AlertEntity(this, undefined))
  }

  /** @deprecated Use `client.alert` instead. */
  Alert(data?: any) {
    const self = this
    return new AlertEntity(self,data)
  }


  _facility?: FacilityEntity

  // Idiomatic facade: `client.facility.list()` / `client.facility.load({ id })`.
  get facility(): FacilityEntity {
    return (this._facility ??= new FacilityEntity(this, undefined))
  }

  /** @deprecated Use `client.facility` instead. */
  Facility(data?: any) {
    const self = this
    return new FacilityEntity(self,data)
  }


  _line?: LineEntity

  // Idiomatic facade: `client.line.list()` / `client.line.load({ id })`.
  get line(): LineEntity {
    return (this._line ??= new LineEntity(this, undefined))
  }

  /** @deprecated Use `client.line` instead. */
  Line(data?: any) {
    const self = this
    return new LineEntity(self,data)
  }


  _prediction?: PredictionEntity

  // Idiomatic facade: `client.prediction.list()` / `client.prediction.load({ id })`.
  get prediction(): PredictionEntity {
    return (this._prediction ??= new PredictionEntity(this, undefined))
  }

  /** @deprecated Use `client.prediction` instead. */
  Prediction(data?: any) {
    const self = this
    return new PredictionEntity(self,data)
  }


  _route?: RouteEntity

  // Idiomatic facade: `client.route.list()` / `client.route.load({ id })`.
  get route(): RouteEntity {
    return (this._route ??= new RouteEntity(this, undefined))
  }

  /** @deprecated Use `client.route` instead. */
  Route(data?: any) {
    const self = this
    return new RouteEntity(self,data)
  }


  _route_pattern?: RoutePatternEntity

  // Idiomatic facade: `client.route_pattern.list()` / `client.route_pattern.load({ id })`.
  get route_pattern(): RoutePatternEntity {
    return (this._route_pattern ??= new RoutePatternEntity(this, undefined))
  }

  /** @deprecated Use `client.route_pattern` instead. */
  RoutePattern(data?: any) {
    const self = this
    return new RoutePatternEntity(self,data)
  }


  _schedule?: ScheduleEntity

  // Idiomatic facade: `client.schedule.list()` / `client.schedule.load({ id })`.
  get schedule(): ScheduleEntity {
    return (this._schedule ??= new ScheduleEntity(this, undefined))
  }

  /** @deprecated Use `client.schedule` instead. */
  Schedule(data?: any) {
    const self = this
    return new ScheduleEntity(self,data)
  }


  _service?: ServiceEntity

  // Idiomatic facade: `client.service.list()` / `client.service.load({ id })`.
  get service(): ServiceEntity {
    return (this._service ??= new ServiceEntity(this, undefined))
  }

  /** @deprecated Use `client.service` instead. */
  Service(data?: any) {
    const self = this
    return new ServiceEntity(self,data)
  }


  _shape?: ShapeEntity

  // Idiomatic facade: `client.shape.list()` / `client.shape.load({ id })`.
  get shape(): ShapeEntity {
    return (this._shape ??= new ShapeEntity(this, undefined))
  }

  /** @deprecated Use `client.shape` instead. */
  Shape(data?: any) {
    const self = this
    return new ShapeEntity(self,data)
  }


  _stop?: StopEntity

  // Idiomatic facade: `client.stop.list()` / `client.stop.load({ id })`.
  get stop(): StopEntity {
    return (this._stop ??= new StopEntity(this, undefined))
  }

  /** @deprecated Use `client.stop` instead. */
  Stop(data?: any) {
    const self = this
    return new StopEntity(self,data)
  }


  _trip?: TripEntity

  // Idiomatic facade: `client.trip.list()` / `client.trip.load({ id })`.
  get trip(): TripEntity {
    return (this._trip ??= new TripEntity(this, undefined))
  }

  /** @deprecated Use `client.trip` instead. */
  Trip(data?: any) {
    const self = this
    return new TripEntity(self,data)
  }


  _vehicle?: VehicleEntity

  // Idiomatic facade: `client.vehicle.list()` / `client.vehicle.load({ id })`.
  get vehicle(): VehicleEntity {
    return (this._vehicle ??= new VehicleEntity(this, undefined))
  }

  /** @deprecated Use `client.vehicle` instead. */
  Vehicle(data?: any) {
    const self = this
    return new VehicleEntity(self,data)
  }




  static test(testoptsarg?: any, sdkoptsarg?: any) {
    const struct = stdutil.struct
    const setpath = struct.setpath
    const getdef = struct.getdef
    const clone = struct.clone
    const setprop = struct.setprop

    const sdkopts = getdef(clone(sdkoptsarg), {})
    const testopts = getdef(clone(testoptsarg), {})
    setprop(testopts, 'active', true)
    setpath(sdkopts, 'feature.test', testopts)

    const testsdk = new MbtaV3SDK(sdkopts)
    testsdk._mode = 'test'

    return testsdk
  }


  tester(testopts?: any, sdkopts?: any) {
    return MbtaV3SDK.test(testopts, sdkopts)
  }


  toJSON() {
    return { name: 'MbtaV3' }
  }

  toString() {
    return 'MbtaV3 ' + this._utility.struct.jsonify(this.toJSON())
  }

  [inspect.custom]() {
    return this.toString()
  }

}




const SDK = MbtaV3SDK


export {
  stdutil,

  BaseFeature,
  MbtaV3EntityBase,

  MbtaV3SDK,
  SDK,
}


