# Prediction entity test

require "minitest/autorun"
require "json"
require_relative "../MbtaV3_sdk"
require_relative "runner"

class PredictionEntityTest < Minitest::Test
  def test_create_instance
    testsdk = MbtaV3SDK.test(nil, nil)
    ent = testsdk.Prediction(nil)
    assert !ent.nil?
  end

  def test_basic_flow
    setup = prediction_basic_setup(nil)
    # Per-op sdk-test-control.json skip.
    _live = setup[:live] || false
    ["load"].each do |_op|
      _should_skip, _reason = Runner.is_control_skipped("entityOp", "prediction." + _op, _live ? "live" : "unit")
      if _should_skip
        skip(_reason || "skipped via sdk-test-control.json")
        return
      end
    end
    # The basic flow consumes synthetic IDs from the fixture. In live mode
    # without an *_ENTID env override, those IDs hit the live API and 4xx.
    if setup[:synthetic_only]
      skip "live entity test uses synthetic IDs from fixture — set MBTAV__TEST_PREDICTION_ENTID JSON to run live"
      return
    end
    client = setup[:client]

    # Bootstrap entity data from existing test data.
    prediction_ref01_data_raw = Vs.items(Helpers.to_map(
      Vs.getpath(setup[:data], "existing.prediction")))
    prediction_ref01_data = nil
    if prediction_ref01_data_raw.length > 0
      prediction_ref01_data = Helpers.to_map(prediction_ref01_data_raw[0][1])
    end

    # LOAD
    prediction_ref01_ent = client.Prediction(nil)
    prediction_ref01_match_dt0 = {}
    prediction_ref01_data_dt0_loaded = prediction_ref01_ent.load(prediction_ref01_match_dt0, nil)
    assert !prediction_ref01_data_dt0_loaded.nil?

  end
end

def prediction_basic_setup(extra)
  Runner.load_env_local

  entity_data_file = File.join(__dir__, "..", "..", ".sdk", "test", "entity", "prediction", "PredictionTestData.json")
  entity_data_source = File.read(entity_data_file)
  entity_data = JSON.parse(entity_data_source)

  options = {}
  options["entity"] = entity_data["existing"]

  client = MbtaV3SDK.test(options, extra)

  # Generate idmap via transform.
  idmap = Vs.transform(
    ["prediction01", "prediction02", "prediction03"],
    {
      "`$PACK`" => ["", {
        "`$KEY`" => "`$COPY`",
        "`$VAL`" => ["`$FORMAT`", "upper", "`$COPY`"],
      }],
    }
  )

  # Detect ENTID env override before envOverride consumes it. When live
  # mode is on without a real override, the basic test runs against synthetic
  # IDs from the fixture and 4xx's. Surface this so the test can skip.
  entid_env_raw = ENV["MBTAV__TEST_PREDICTION_ENTID"]
  idmap_overridden = !entid_env_raw.nil? && entid_env_raw.strip.start_with?("{")

  env = Runner.env_override({
    "MBTAV__TEST_PREDICTION_ENTID" => idmap,
    "MBTAV__TEST_LIVE" => "FALSE",
    "MBTAV__TEST_EXPLAIN" => "FALSE",
    "MBTAV__APIKEY" => "NONE",
  })

  idmap_resolved = Helpers.to_map(
    env["MBTAV__TEST_PREDICTION_ENTID"])
  if idmap_resolved.nil?
    idmap_resolved = Helpers.to_map(idmap)
  end

  if env["MBTAV__TEST_LIVE"] == "TRUE"
    merged_opts = Vs.merge([
      {
        "apikey" => env["MBTAV__APIKEY"],
      },
      extra || {},
    ])
    client = MbtaV3SDK.new(Helpers.to_map(merged_opts))
  end

  live = env["MBTAV__TEST_LIVE"] == "TRUE"
  {
    client: client,
    data: entity_data,
    idmap: idmap_resolved,
    env: env,
    explain: env["MBTAV__TEST_EXPLAIN"] == "TRUE",
    live: live,
    synthetic_only: live && !idmap_overridden,
    now: (Time.now.to_f * 1000).to_i,
  }
end
