# MbtaV3 SDK utility: make_context
require_relative '../core/context'
module MbtaV3Utilities
  MakeContext = ->(ctxmap, basectx) {
    MbtaV3Context.new(ctxmap, basectx)
  }
end
