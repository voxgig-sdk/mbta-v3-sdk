# MbtaV3 SDK utility: prepare_body
require_relative 'media'
module MbtaV3Utilities
  PrepareBody = ->(ctx) {
    return nil unless ctx.op.input == "data"
    return MbtaV3Utilities.raw_body(ctx.reqdata) if MbtaV3Utilities.raw_request?(ctx.point)
    ctx.utility.transform_request.call(ctx)
  }
end
