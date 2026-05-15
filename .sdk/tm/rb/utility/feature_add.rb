# MbtaV3 SDK utility: feature_add
module MbtaV3Utilities
  FeatureAdd = ->(ctx, f) {
    ctx.client.features << f
  }
end
