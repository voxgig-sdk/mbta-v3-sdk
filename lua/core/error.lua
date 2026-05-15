-- MbtaV3 SDK error

local MbtaV3Error = {}
MbtaV3Error.__index = MbtaV3Error


function MbtaV3Error.new(code, msg, ctx)
  local self = setmetatable({}, MbtaV3Error)
  self.is_sdk_error = true
  self.sdk = "MbtaV3"
  self.code = code or ""
  self.msg = msg or ""
  self.ctx = ctx
  self.result = nil
  self.spec = nil
  return self
end


function MbtaV3Error:error()
  return self.msg
end


function MbtaV3Error:__tostring()
  return self.msg
end


return MbtaV3Error
