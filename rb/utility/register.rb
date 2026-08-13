# MbtaV3 SDK utility registration
require_relative '../core/utility_type'
require_relative 'clean'
require_relative 'done'
require_relative 'make_error'
require_relative 'feature_add'
require_relative 'feature_hook'
require_relative 'feature_init'
require_relative 'fetcher'
require_relative 'make_fetch_def'
require_relative 'make_context'
require_relative 'make_options'
require_relative 'make_request'
require_relative 'make_response'
require_relative 'make_result'
require_relative 'make_point'
require_relative 'make_spec'
require_relative 'make_url'
require_relative 'param'
require_relative 'prepare_auth'
require_relative 'prepare_body'
require_relative 'prepare_headers'
require_relative 'prepare_method'
require_relative 'prepare_params'
require_relative 'prepare_path'
require_relative 'prepare_query'
require_relative 'graphql'
require_relative 'result_basic'
require_relative 'result_body'
require_relative 'result_headers'
require_relative 'transform_request'
require_relative 'transform_response'

MbtaV3Utility.registrar = ->(u) {
  u.clean = MbtaV3Utilities::Clean
  u.done = MbtaV3Utilities::Done
  u.make_error = MbtaV3Utilities::MakeError
  u.feature_add = MbtaV3Utilities::FeatureAdd
  u.feature_hook = MbtaV3Utilities::FeatureHook
  u.feature_init = MbtaV3Utilities::FeatureInit
  u.fetcher = MbtaV3Utilities::Fetcher
  u.make_fetch_def = MbtaV3Utilities::MakeFetchDef
  u.make_context = MbtaV3Utilities::MakeContext
  u.make_options = MbtaV3Utilities::MakeOptions
  u.make_request = MbtaV3Utilities::MakeRequest
  u.make_response = MbtaV3Utilities::MakeResponse
  u.make_result = MbtaV3Utilities::MakeResult
  u.make_point = MbtaV3Utilities::MakePoint
  u.make_spec = MbtaV3Utilities::MakeSpec
  u.make_url = MbtaV3Utilities::MakeUrl
  u.param = MbtaV3Utilities::Param
  u.prepare_auth = MbtaV3Utilities::PrepareAuth
  u.prepare_body = MbtaV3Utilities::PrepareBody
  u.prepare_headers = MbtaV3Utilities::PrepareHeaders
  u.prepare_method = MbtaV3Utilities::PrepareMethod
  u.prepare_params = MbtaV3Utilities::PrepareParams
  u.prepare_path = MbtaV3Utilities::PreparePath
  u.prepare_query = MbtaV3Utilities::PrepareQuery
  u.graphql_body = MbtaV3Utilities::GraphqlBody
  u.graphql_errors = MbtaV3Utilities::GraphqlErrors
  u.result_basic = MbtaV3Utilities::ResultBasic
  u.result_body = MbtaV3Utilities::ResultBody
  u.result_headers = MbtaV3Utilities::ResultHeaders
  u.transform_request = MbtaV3Utilities::TransformRequest
  u.transform_response = MbtaV3Utilities::TransformResponse
}
