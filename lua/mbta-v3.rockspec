package = "voxgig-sdk-mbta-v3"
version = "0.0-1"
source = {
  url = "git://github.com/voxgig-sdk/mbta-v3-sdk.git"
}
description = {
  summary = "MbtaV3 SDK for Lua",
  license = "MIT"
}
dependencies = {
  "lua >= 5.3",
  "dkjson >= 2.5",
  "dkjson >= 2.5",
}
build = {
  type = "builtin",
  modules = {
    ["mbta-v3_sdk"] = "mbta-v3_sdk.lua",
    ["config"] = "config.lua",
    ["features"] = "features.lua",
  }
}
