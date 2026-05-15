package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewAlertEntityFunc func(client *MbtaV3SDK, entopts map[string]any) MbtaV3Entity

var NewFacilityEntityFunc func(client *MbtaV3SDK, entopts map[string]any) MbtaV3Entity

var NewLineEntityFunc func(client *MbtaV3SDK, entopts map[string]any) MbtaV3Entity

var NewPredictionEntityFunc func(client *MbtaV3SDK, entopts map[string]any) MbtaV3Entity

var NewRouteEntityFunc func(client *MbtaV3SDK, entopts map[string]any) MbtaV3Entity

var NewRoutePatternEntityFunc func(client *MbtaV3SDK, entopts map[string]any) MbtaV3Entity

var NewScheduleEntityFunc func(client *MbtaV3SDK, entopts map[string]any) MbtaV3Entity

var NewServiceEntityFunc func(client *MbtaV3SDK, entopts map[string]any) MbtaV3Entity

var NewShapeEntityFunc func(client *MbtaV3SDK, entopts map[string]any) MbtaV3Entity

var NewStopEntityFunc func(client *MbtaV3SDK, entopts map[string]any) MbtaV3Entity

var NewTripEntityFunc func(client *MbtaV3SDK, entopts map[string]any) MbtaV3Entity

var NewVehicleEntityFunc func(client *MbtaV3SDK, entopts map[string]any) MbtaV3Entity

