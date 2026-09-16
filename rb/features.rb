# MbtaV3 SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/ratelimit_feature'
require_relative 'feature/retry_feature'
require_relative 'feature/test_feature'
require_relative 'feature/timeout_feature'


module MbtaV3Features
  def self.make_feature(name)
    case name
    when "base"
      MbtaV3BaseFeature.new
    when "ratelimit"
      MbtaV3RatelimitFeature.new
    when "retry"
      MbtaV3RetryFeature.new
    when "test"
      MbtaV3TestFeature.new
    when "timeout"
      MbtaV3TimeoutFeature.new
    else
      MbtaV3BaseFeature.new
    end
  end
end
