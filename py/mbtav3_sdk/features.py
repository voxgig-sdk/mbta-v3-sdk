# MbtaV3 SDK feature factory

from mbtav3_sdk.feature.base_feature import MbtaV3BaseFeature
from mbtav3_sdk.feature.test_feature import MbtaV3TestFeature


def _make_feature(name):
    features = {
        "base": lambda: MbtaV3BaseFeature(),
        "test": lambda: MbtaV3TestFeature(),
    }
    factory = features.get(name)
    if factory is not None:
        return factory()
    return features["base"]()
