-- MbtaV3 SDK exists test

local sdk = require("mbta-v3_sdk")

describe("MbtaV3SDK", function()
  it("should create test SDK", function()
    local testsdk = sdk.test(nil, nil)
    assert.is_not_nil(testsdk)
  end)
end)
