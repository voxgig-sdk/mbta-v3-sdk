# MbtaV3 SDK exists test

require "minitest/autorun"
require_relative "../MbtaV3_sdk"

class ExistsTest < Minitest::Test
  def test_create_test_sdk
    testsdk = MbtaV3SDK.test(nil, nil)
    assert !testsdk.nil?
  end
end
