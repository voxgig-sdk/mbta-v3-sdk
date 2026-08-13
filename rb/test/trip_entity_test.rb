# Trip entity test

require "minitest/autorun"
require "json"
require_relative "../MbtaV3_sdk"
require_relative "runner"

class TripEntityTest < Minitest::Test
  def test_create_instance
    testsdk = MbtaV3SDK.test(nil, nil)
    ent = testsdk.Trip(nil)
    assert !ent.nil?
  end

  def test_basic_flow
    setup = trip_basic_setup(nil)
    # Per-op sdk-test-control.json skip.
    _live = setup[:live] || false
    ["load"].each do |_op|
      _should_skip, _reason = Runner.is_control_skipped("entityOp", "trip." + _op, _live ? "live" : "unit")
      if _should_skip
        skip(_reason || "skipped via sdk-test-control.json")
        return
      end
    end
    # The basic flow consumes synthetic IDs from the fixture. In live mode
    # without an *_ENTID env override, those IDs hit the live API and 4xx.
    if setup[:synthetic_only]
      skip "live entity test uses synthetic IDs from fixture — set MBTA_V3_TEST_TRIP_ENTID JSON to run live"
      return
    end
    client = setup[:client]

    # Bootstrap entity data from existing test data.
    trip_ref01_data_raw = Vs.items(Helpers.to_map(
      Vs.getpath(setup[:data], "existing.trip")))
    trip_ref01_data = nil
    if trip_ref01_data_raw.length > 0
      trip_ref01_data = Helpers.to_map(trip_ref01_data_raw[0][1])
    end

    # LOAD
    trip_ref01_ent = client.Trip(nil)
    trip_ref01_match_dt0 = {}
    trip_ref01_data_dt0_loaded = trip_ref01_ent.load(trip_ref01_match_dt0, nil)
    assert !trip_ref01_data_dt0_loaded.nil?

  end
end

def trip_basic_setup(extra)
  Runner.load_env_local

  entity_data_file = File.join(__dir__, "..", "..", ".sdk", "test", "entity", "trip", "TripTestData.json")
  entity_data_source = File.read(entity_data_file)
  entity_data = JSON.parse(entity_data_source)

  options = {}
  options["entity"] = entity_data["existing"]

  client = MbtaV3SDK.test(options, extra)

  # Generate idmap via transform.
  idmap = Vs.transform(
    ["trip01", "trip02", "trip03"],
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
  entid_env_raw = ENV["MBTA_V3_TEST_TRIP_ENTID"]
  idmap_overridden = !entid_env_raw.nil? && entid_env_raw.strip.start_with?("{")

  env = Runner.env_override({
    "MBTA_V3_TEST_TRIP_ENTID" => idmap,
    "MBTA_V3_TEST_LIVE" => "FALSE",
    "MBTA_V3_TEST_EXPLAIN" => "FALSE",
    "MBTA_V3_APIKEY" => "NONE",
  })

  idmap_resolved = Helpers.to_map(
    env["MBTA_V3_TEST_TRIP_ENTID"])
  if idmap_resolved.nil?
    idmap_resolved = Helpers.to_map(idmap)
  end

  if env["MBTA_V3_TEST_LIVE"] == "TRUE"
    merged_opts = Vs.merge([
      {
        "apikey" => env["MBTA_V3_APIKEY"],
      },
      extra || {},
    ])
    client = MbtaV3SDK.new(Helpers.to_map(merged_opts))
  end

  live = env["MBTA_V3_TEST_LIVE"] == "TRUE"
  {
    client: client,
    data: entity_data,
    idmap: idmap_resolved,
    env: env,
    explain: env["MBTA_V3_TEST_EXPLAIN"] == "TRUE",
    live: live,
    synthetic_only: live && !idmap_overridden,
    now: (Time.now.to_f * 1000).to_i,
  }
end
