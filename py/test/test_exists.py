# MbtaV3 SDK exists test

import pytest
from mbtav3_sdk import MbtaV3SDK


class TestExists:

    def test_should_create_test_sdk(self):
        testsdk = MbtaV3SDK.test(None, None)
        assert testsdk is not None
