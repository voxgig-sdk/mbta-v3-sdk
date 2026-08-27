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
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
				"transport": "base",
			},
		},
		"options": map[string]any{
			"base": "https://api-v3.mbta.com",
			"auth": map[string]any{
				"prefix": "",
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
								"parts": []any{
									"alerts",
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
								"parts": []any{
									"facilities",
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
								"parts": []any{
									"lines",
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
								"parts": []any{
									"predictions",
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
								"parts": []any{
									"routes",
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
								"parts": []any{
									"routes",
									"{id}",
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
								"parts": []any{
									"route_patterns",
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
								"parts": []any{
									"schedules",
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
								"parts": []any{
									"services",
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
								"parts": []any{
									"shapes",
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
								"parts": []any{
									"stops",
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
								"parts": []any{
									"trips",
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
								"parts": []any{
									"vehicles",
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
	case "test":
		if NewTestFeatureFunc != nil {
			return NewTestFeatureFunc()
		}
	default:
		if NewBaseFeatureFunc != nil {
			return NewBaseFeatureFunc()
		}
	}
	return nil
}
