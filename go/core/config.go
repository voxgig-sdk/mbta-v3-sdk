package core

import (
	"sync"
)

// MakeConfig builds a fresh, fully materialised config map. Every call
// rebuilds the whole structure, so prefer SharedConfig unless you need a
// private copy you intend to mutate.
func MakeConfig() map[string]any {
	return map[string]any{
		"main": map[string]any{
			"name": "MbtaV3",
			"slug": "mbta-v3",
			"version": "0.0.1",
			"target": "go",
		},
		"feature": map[string]any{
			"ratelimit": map[string]any{
				"options": map[string]any{
					"active": false,
					"burst": 5,
					"rate": 5,
				},
				"optspec": map[string]any{
					"now": "`$FUNCTION`",
					"sleep": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
			"retry": map[string]any{
				"options": map[string]any{
					"active": false,
					"factor": 2,
					"maxDelay": 2000,
					"minDelay": 50,
					"retries": 2,
					"statuses": []any{
						408,
						425,
						429,
						500,
						502,
						503,
						504,
					},
				},
				"optspec": map[string]any{
					"jitter": "`$BOOLEAN`",
					"sleep": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
				"optspec": map[string]any{
					"entity": "`$MAP`",
					"net": "`$MAP`",
				},
				"strict": false,
				"transport": "base",
			},
			"timeout": map[string]any{
				"options": map[string]any{
					"active": false,
					"ms": 30000,
				},
				"optspec": map[string]any{
					"clearTimer": "`$FUNCTION`",
					"setTimer": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
		},
		"options": map[string]any{
			"base": "https://api-v3.mbta.com",
			"auth": map[string]any{
				"prefix": "",
				"name": "x-api-key",
			},
			"headers": map[string]any{
				"content-type": "application/json",
			},
			"entity": map[string]any{
				"alert": map[string]any{},
				"facility": map[string]any{},
				"line": map[string]any{},
				"prediction": map[string]any{},
				"route": map[string]any{},
				"route_pattern": map[string]any{},
				"schedule": map[string]any{},
				"service": map[string]any{},
				"shape": map[string]any{},
				"stop": map[string]any{},
				"trip": map[string]any{},
				"vehicle": map[string]any{},
			},
		},
		"entity": map[string]any{
			"alert": map[string]any{
				"fields": []any{},
				"name": "alert",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "filter_activity",
											"orig": "filter_activity",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "filter_route",
											"orig": "filter_route",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "filter_stop",
											"orig": "filter_stop",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "include",
											"orig": "include",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "sort",
											"orig": "sort",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/alerts",
								"segments": []any{
									map[string]any{
										"lit": "alerts",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"filter_activity",
										"filter_route",
										"filter_stop",
										"include",
										"sort",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"alerts",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"facility": map[string]any{
				"fields": []any{},
				"name": "facility",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "filter_stop",
											"orig": "filter_stop",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "filter_type",
											"orig": "filter_type",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "include",
											"orig": "include",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/facilities",
								"segments": []any{
									map[string]any{
										"lit": "facilities",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"filter_stop",
										"filter_type",
										"include",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"facilities",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"line": map[string]any{
				"fields": []any{},
				"name": "line",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "filter_id",
											"orig": "filter_id",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "include",
											"orig": "include",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/lines",
								"segments": []any{
									map[string]any{
										"lit": "lines",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"filter_id",
										"include",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"lines",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"prediction": map[string]any{
				"fields": []any{},
				"name": "prediction",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "filter_direction_id",
											"orig": "filter_direction_id",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"kind": "query",
											"name": "filter_route",
											"orig": "filter_route",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "filter_stop",
											"orig": "filter_stop",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "filter_trip",
											"orig": "filter_trip",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "include",
											"orig": "include",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "sort",
											"orig": "sort",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/predictions",
								"segments": []any{
									map[string]any{
										"lit": "predictions",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"filter_direction_id",
										"filter_route",
										"filter_stop",
										"filter_trip",
										"include",
										"sort",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"predictions",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"route": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "id",
						"type": "`$STRING`",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "route",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "filter_id",
											"orig": "filter_id",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "filter_stop",
											"orig": "filter_stop",
											"type": "`$STRING`",
										},
										map[string]any{
											"example": "0,1",
											"kind": "query",
											"name": "filter_type",
											"orig": "filter_type",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "include",
											"orig": "include",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "sort",
											"orig": "sort",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/routes",
								"segments": []any{
									map[string]any{
										"lit": "routes",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"filter_id",
										"filter_stop",
										"filter_type",
										"include",
										"sort",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"routes",
								},
							},
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "id",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "include",
											"orig": "include",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/routes/{id}",
								"segments": []any{
									map[string]any{
										"lit": "routes",
									},
									map[string]any{
										"var": "id",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
										"include",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"routes",
									"{id}",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"route_pattern": map[string]any{
				"fields": []any{},
				"name": "route_pattern",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "filter_direction_id",
											"orig": "filter_direction_id",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"kind": "query",
											"name": "filter_route",
											"orig": "filter_route",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "filter_stop",
											"orig": "filter_stop",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "include",
											"orig": "include",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/route_patterns",
								"segments": []any{
									map[string]any{
										"lit": "route_patterns",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"filter_direction_id",
										"filter_route",
										"filter_stop",
										"include",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"route_patterns",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"schedule": map[string]any{
				"fields": []any{},
				"name": "schedule",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "filter_date",
											"orig": "filter_date",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "filter_direction_id",
											"orig": "filter_direction_id",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"kind": "query",
											"name": "filter_max_time",
											"orig": "filter_max_time",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "filter_min_time",
											"orig": "filter_min_time",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "filter_route",
											"orig": "filter_route",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "filter_stop",
											"orig": "filter_stop",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "filter_trip",
											"orig": "filter_trip",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "include",
											"orig": "include",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "sort",
											"orig": "sort",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/schedules",
								"segments": []any{
									map[string]any{
										"lit": "schedules",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"filter_date",
										"filter_direction_id",
										"filter_max_time",
										"filter_min_time",
										"filter_route",
										"filter_stop",
										"filter_trip",
										"include",
										"sort",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"schedules",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"service": map[string]any{
				"fields": []any{},
				"name": "service",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "filter_id",
											"orig": "filter_id",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "filter_route",
											"orig": "filter_route",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "include",
											"orig": "include",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/services",
								"segments": []any{
									map[string]any{
										"lit": "services",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"filter_id",
										"filter_route",
										"include",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"services",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"shape": map[string]any{
				"fields": []any{},
				"name": "shape",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "filter_direction_id",
											"orig": "filter_direction_id",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"kind": "query",
											"name": "filter_route",
											"orig": "filter_route",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "include",
											"orig": "include",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/shapes",
								"segments": []any{
									map[string]any{
										"lit": "shapes",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"filter_direction_id",
										"filter_route",
										"include",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"shapes",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"stop": map[string]any{
				"fields": []any{},
				"name": "stop",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "filter_id",
											"orig": "filter_id",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "filter_latitude",
											"orig": "filter_latitude",
											"type": "`$NUMBER`",
										},
										map[string]any{
											"kind": "query",
											"name": "filter_location_type",
											"orig": "filter_location_type",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"kind": "query",
											"name": "filter_longitude",
											"orig": "filter_longitude",
											"type": "`$NUMBER`",
										},
										map[string]any{
											"kind": "query",
											"name": "filter_radius",
											"orig": "filter_radius",
											"type": "`$NUMBER`",
										},
										map[string]any{
											"kind": "query",
											"name": "filter_route",
											"orig": "filter_route",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "include",
											"orig": "include",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "sort",
											"orig": "sort",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/stops",
								"segments": []any{
									map[string]any{
										"lit": "stops",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"filter_id",
										"filter_latitude",
										"filter_location_type",
										"filter_longitude",
										"filter_radius",
										"filter_route",
										"include",
										"sort",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"stops",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"trip": map[string]any{
				"fields": []any{},
				"name": "trip",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "filter_direction_id",
											"orig": "filter_direction_id",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"kind": "query",
											"name": "filter_id",
											"orig": "filter_id",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "filter_name",
											"orig": "filter_name",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "filter_route",
											"orig": "filter_route",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "filter_route_pattern",
											"orig": "filter_route_pattern",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "include",
											"orig": "include",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "sort",
											"orig": "sort",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/trips",
								"segments": []any{
									map[string]any{
										"lit": "trips",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"filter_direction_id",
										"filter_id",
										"filter_name",
										"filter_route",
										"filter_route_pattern",
										"include",
										"sort",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"trips",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"vehicle": map[string]any{
				"fields": []any{},
				"name": "vehicle",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "filter_direction_id",
											"orig": "filter_direction_id",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"kind": "query",
											"name": "filter_id",
											"orig": "filter_id",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "filter_label",
											"orig": "filter_label",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "filter_route",
											"orig": "filter_route",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "filter_trip",
											"orig": "filter_trip",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "include",
											"orig": "include",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "sort",
											"orig": "sort",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/vehicles",
								"segments": []any{
									map[string]any{
										"lit": "vehicles",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"filter_direction_id",
										"filter_id",
										"filter_label",
										"filter_route",
										"filter_trip",
										"include",
										"sort",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"vehicles",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
		},
	}
}

// The plugin definitions the model selected per feature, as []any so a
// feature package can consume them without core naming its types. Empty
// when no active feature declares active plugin groups for this target.
var featurePlugins = map[string][]any{
}

// FeaturePlugins is the definitions list for one feature's chain.
func FeaturePlugins(name string) []any {
	return featurePlugins[name]
}

var (
	sharedConfigOnce sync.Once
	sharedConfigVal  map[string]any
)

// SharedConfig returns the process-wide config, built once on first use.
// The SDK reads the config on every request and never writes to it, so one
// instance is shared by every client rather than rebuilt per client.
//
// The returned map is shared: treat it as read-only. Callers that need to
// mutate should use MakeConfig, which always returns a fresh copy.
func SharedConfig() map[string]any {
	sharedConfigOnce.Do(func() {
		sharedConfigVal = MakeConfig()
	})
	return sharedConfigVal
}

func makeFeature(name string) Feature {
	switch name {
	case "ratelimit":
		if NewRatelimitFeatureFunc != nil {
			return NewRatelimitFeatureFunc()
		}
	case "retry":
		if NewRetryFeatureFunc != nil {
			return NewRetryFeatureFunc()
		}
	case "test":
		if NewTestFeatureFunc != nil {
			return NewTestFeatureFunc()
		}
	case "timeout":
		if NewTimeoutFeatureFunc != nil {
			return NewTimeoutFeatureFunc()
		}
	default:
		if NewBaseFeatureFunc != nil {
			return NewBaseFeatureFunc()
		}
	}
	return nil
}
