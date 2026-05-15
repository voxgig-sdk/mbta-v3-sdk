# MbtaV3 SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/test_feature'


module MbtaV3Features
  def self.make_feature(name)
    case name
    when "base"
      MbtaV3BaseFeature.new
    when "test"
      MbtaV3TestFeature.new
    else
      MbtaV3BaseFeature.new
    end
  end
end
