package voxgigmbtav3sdk

import (
	"github.com/voxgig-sdk/mbta-v3-sdk/go/core"
	"github.com/voxgig-sdk/mbta-v3-sdk/go/entity"
	"github.com/voxgig-sdk/mbta-v3-sdk/go/feature"
	_ "github.com/voxgig-sdk/mbta-v3-sdk/go/utility"
)

// Type aliases preserve external API.
type MbtaV3SDK = core.MbtaV3SDK
type Context = core.Context
type Utility = core.Utility
type Feature = core.Feature
type Entity = core.Entity
type MbtaV3Entity = core.MbtaV3Entity
type FetcherFunc = core.FetcherFunc
type Spec = core.Spec
type Result = core.Result
type Response = core.Response
type Operation = core.Operation
type Control = core.Control
type MbtaV3Error = core.MbtaV3Error

// BaseFeature from feature package.
type BaseFeature = feature.BaseFeature

func init() {
	core.NewBaseFeatureFunc = func() core.Feature {
		return feature.NewBaseFeature()
	}
	core.NewTestFeatureFunc = func() core.Feature {
		return feature.NewTestFeature()
	}
	core.NewAlertEntityFunc = func(client *core.MbtaV3SDK, entopts map[string]any) core.MbtaV3Entity {
		return entity.NewAlertEntity(client, entopts)
	}
	core.NewFacilityEntityFunc = func(client *core.MbtaV3SDK, entopts map[string]any) core.MbtaV3Entity {
		return entity.NewFacilityEntity(client, entopts)
	}
	core.NewLineEntityFunc = func(client *core.MbtaV3SDK, entopts map[string]any) core.MbtaV3Entity {
		return entity.NewLineEntity(client, entopts)
	}
	core.NewPredictionEntityFunc = func(client *core.MbtaV3SDK, entopts map[string]any) core.MbtaV3Entity {
		return entity.NewPredictionEntity(client, entopts)
	}
	core.NewRouteEntityFunc = func(client *core.MbtaV3SDK, entopts map[string]any) core.MbtaV3Entity {
		return entity.NewRouteEntity(client, entopts)
	}
	core.NewRoutePatternEntityFunc = func(client *core.MbtaV3SDK, entopts map[string]any) core.MbtaV3Entity {
		return entity.NewRoutePatternEntity(client, entopts)
	}
	core.NewScheduleEntityFunc = func(client *core.MbtaV3SDK, entopts map[string]any) core.MbtaV3Entity {
		return entity.NewScheduleEntity(client, entopts)
	}
	core.NewServiceEntityFunc = func(client *core.MbtaV3SDK, entopts map[string]any) core.MbtaV3Entity {
		return entity.NewServiceEntity(client, entopts)
	}
	core.NewShapeEntityFunc = func(client *core.MbtaV3SDK, entopts map[string]any) core.MbtaV3Entity {
		return entity.NewShapeEntity(client, entopts)
	}
	core.NewStopEntityFunc = func(client *core.MbtaV3SDK, entopts map[string]any) core.MbtaV3Entity {
		return entity.NewStopEntity(client, entopts)
	}
	core.NewTripEntityFunc = func(client *core.MbtaV3SDK, entopts map[string]any) core.MbtaV3Entity {
		return entity.NewTripEntity(client, entopts)
	}
	core.NewVehicleEntityFunc = func(client *core.MbtaV3SDK, entopts map[string]any) core.MbtaV3Entity {
		return entity.NewVehicleEntity(client, entopts)
	}
}

// Constructor re-exports.
var NewMbtaV3SDK = core.NewMbtaV3SDK
var TestSDK = core.TestSDK
var NewContext = core.NewContext
var NewSpec = core.NewSpec
var NewResult = core.NewResult
var NewResponse = core.NewResponse
var NewOperation = core.NewOperation
var MakeConfig = core.MakeConfig

// No-arg convenience constructors. Go has no default-argument syntax,
// so these aliases let callers write `sdk.New()` / `sdk.Test()`
// instead of `sdk.NewMbtaV3SDK(nil)` / `sdk.TestSDK(nil, nil)`
// for the common no-options case.
func New() *MbtaV3SDK  { return NewMbtaV3SDK(nil) }
func Test() *MbtaV3SDK { return TestSDK(nil, nil) }
var NewBaseFeature = feature.NewBaseFeature
var NewTestFeature = feature.NewTestFeature
