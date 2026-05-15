
import { Context } from './Context'


class MbtaV3Error extends Error {

  isMbtaV3Error = true

  sdk = 'MbtaV3'

  code: string
  ctx: Context

  constructor(code: string, msg: string, ctx: Context) {
    super(msg)
    this.code = code
    this.ctx = ctx
  }

}

export {
  MbtaV3Error
}

