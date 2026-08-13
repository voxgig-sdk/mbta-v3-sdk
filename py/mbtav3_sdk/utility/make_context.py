# MbtaV3 SDK utility: make_context

from mbtav3_sdk.core.context import MbtaV3Context


def make_context_util(ctxmap, basectx):
    return MbtaV3Context(ctxmap, basectx)
