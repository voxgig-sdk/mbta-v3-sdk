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
					"now": "`$FUNCTION`",
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
								"kind": "http",
								"method": "GET",
								"orig": "/alerts",
								"segments": []any{
									map[string]any{
										"lit": "alerts",
									},
								},
								"parts": []any{
									"alerts",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "filter_activity",
											"orig": "filter[activity]",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "filter_route",
											"orig": "filter[route]",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "filter_stop",
											"orig": "filter[stop]",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "include",
											"orig": "include",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "sort",
											"orig": "sort",
											"type": "`$STRING`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{},
								"response": map[string]any{
									"kind": "json",
									"media": "application/vnd.api+json",
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
								"kind": "http",
								"method": "GET",
								"orig": "/facilities",
								"segments": []any{
									map[string]any{
										"lit": "facilities",
									},
								},
								"parts": []any{
									"facilities",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "filter_stop",
											"orig": "filter[stop]",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "filter_type",
											"orig": "filter[type]",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "include",
											"orig": "include",
											"type": "`$STRING`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{},
								"response": map[string]any{
									"kind": "json",
									"media": "application/vnd.api+json",
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
								"kind": "http",
								"method": "GET",
								"orig": "/lines",
								"segments": []any{
									map[string]any{
										"lit": "lines",
									},
								},
								"parts": []any{
									"lines",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "filter_id",
											"orig": "filter[id]",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "include",
											"orig": "include",
											"type": "`$STRING`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{},
								"response": map[string]any{
									"kind": "json",
									"media": "application/vnd.api+json",
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
								"kind": "http",
								"method": "GET",
								"orig": "/predictions",
								"segments": []any{
									map[string]any{
										"lit": "predictions",
									},
								},
								"parts": []any{
									"predictions",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "filter_direction_id",
											"orig": "filter[direction_id]",
											"type": "`$INTEGER`",
											"kind": "query",
										},
										map[string]any{
											"name": "filter_route",
											"orig": "filter[route]",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "filter_stop",
											"orig": "filter[stop]",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "filter_trip",
											"orig": "filter[trip]",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "include",
											"orig": "include",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "sort",
											"orig": "sort",
											"type": "`$STRING`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{},
								"response": map[string]any{
									"kind": "json",
									"media": "application/vnd.api+json",
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
						"title": "Id",
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
								"parts": []any{
									"routes",
									"{id}",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
									"query": []any{
										map[string]any{
											"name": "include",
											"orig": "include",
											"type": "`$STRING`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/vnd.api+json",
								},
							},
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/routes",
								"segments": []any{
									map[string]any{
										"lit": "routes",
									},
								},
								"parts": []any{
									"routes",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "filter_id",
											"orig": "filter[id]",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "filter_stop",
											"orig": "filter[stop]",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "filter_type",
											"orig": "filter[type]",
											"type": "`$STRING`",
											"kind": "query",
											"example": "0,1",
										},
										map[string]any{
											"name": "include",
											"orig": "include",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "sort",
											"orig": "sort",
											"type": "`$STRING`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{},
								"response": map[string]any{
									"kind": "json",
									"media": "application/vnd.api+json",
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
								"kind": "http",
								"method": "GET",
								"orig": "/route_patterns",
								"segments": []any{
									map[string]any{
										"lit": "route_patterns",
									},
								},
								"parts": []any{
									"route_patterns",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "filter_direction_id",
											"orig": "filter[direction_id]",
											"type": "`$INTEGER`",
											"kind": "query",
										},
										map[string]any{
											"name": "filter_route",
											"orig": "filter[route]",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "filter_stop",
											"orig": "filter[stop]",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "include",
											"orig": "include",
											"type": "`$STRING`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{},
								"response": map[string]any{
									"kind": "json",
									"media": "application/vnd.api+json",
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
								"kind": "http",
								"method": "GET",
								"orig": "/schedules",
								"segments": []any{
									map[string]any{
										"lit": "schedules",
									},
								},
								"parts": []any{
									"schedules",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "filter_date",
											"orig": "filter[date]",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "filter_direction_id",
											"orig": "filter[direction_id]",
											"type": "`$INTEGER`",
											"kind": "query",
										},
										map[string]any{
											"name": "filter_max_time",
											"orig": "filter[max_time]",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "filter_min_time",
											"orig": "filter[min_time]",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "filter_route",
											"orig": "filter[route]",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "filter_stop",
											"orig": "filter[stop]",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "filter_trip",
											"orig": "filter[trip]",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "include",
											"orig": "include",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "sort",
											"orig": "sort",
											"type": "`$STRING`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{},
								"response": map[string]any{
									"kind": "json",
									"media": "application/vnd.api+json",
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
								"kind": "http",
								"method": "GET",
								"orig": "/services",
								"segments": []any{
									map[string]any{
										"lit": "services",
									},
								},
								"parts": []any{
									"services",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "filter_id",
											"orig": "filter[id]",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "filter_route",
											"orig": "filter[route]",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "include",
											"orig": "include",
											"type": "`$STRING`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{},
								"response": map[string]any{
									"kind": "json",
									"media": "application/vnd.api+json",
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
								"kind": "http",
								"method": "GET",
								"orig": "/shapes",
								"segments": []any{
									map[string]any{
										"lit": "shapes",
									},
								},
								"parts": []any{
									"shapes",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "filter_direction_id",
											"orig": "filter[direction_id]",
											"type": "`$INTEGER`",
											"kind": "query",
										},
										map[string]any{
											"name": "filter_route",
											"orig": "filter[route]",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "include",
											"orig": "include",
											"type": "`$STRING`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{},
								"response": map[string]any{
									"kind": "json",
									"media": "application/vnd.api+json",
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
								"kind": "http",
								"method": "GET",
								"orig": "/stops",
								"segments": []any{
									map[string]any{
										"lit": "stops",
									},
								},
								"parts": []any{
									"stops",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "filter_id",
											"orig": "filter[id]",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "filter_latitude",
											"orig": "filter[latitude]",
											"type": "`$NUMBER`",
											"kind": "query",
										},
										map[string]any{
											"name": "filter_location_type",
											"orig": "filter[location_type]",
											"type": "`$INTEGER`",
											"kind": "query",
										},
										map[string]any{
											"name": "filter_longitude",
											"orig": "filter[longitude]",
											"type": "`$NUMBER`",
											"kind": "query",
										},
										map[string]any{
											"name": "filter_radius",
											"orig": "filter[radius]",
											"type": "`$NUMBER`",
											"kind": "query",
										},
										map[string]any{
											"name": "filter_route",
											"orig": "filter[route]",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "include",
											"orig": "include",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "sort",
											"orig": "sort",
											"type": "`$STRING`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{},
								"response": map[string]any{
									"kind": "json",
									"media": "application/vnd.api+json",
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
								"kind": "http",
								"method": "GET",
								"orig": "/trips",
								"segments": []any{
									map[string]any{
										"lit": "trips",
									},
								},
								"parts": []any{
									"trips",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "filter_direction_id",
											"orig": "filter[direction_id]",
											"type": "`$INTEGER`",
											"kind": "query",
										},
										map[string]any{
											"name": "filter_id",
											"orig": "filter[id]",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "filter_name",
											"orig": "filter[name]",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "filter_route",
											"orig": "filter[route]",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "filter_route_pattern",
											"orig": "filter[route_pattern]",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "include",
											"orig": "include",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "sort",
											"orig": "sort",
											"type": "`$STRING`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{},
								"response": map[string]any{
									"kind": "json",
									"media": "application/vnd.api+json",
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
								"kind": "http",
								"method": "GET",
								"orig": "/vehicles",
								"segments": []any{
									map[string]any{
										"lit": "vehicles",
									},
								},
								"parts": []any{
									"vehicles",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "filter_direction_id",
											"orig": "filter[direction_id]",
											"type": "`$INTEGER`",
											"kind": "query",
										},
										map[string]any{
											"name": "filter_id",
											"orig": "filter[id]",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "filter_label",
											"orig": "filter[label]",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "filter_route",
											"orig": "filter[route]",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "filter_trip",
											"orig": "filter[trip]",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "include",
											"orig": "include",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "sort",
											"orig": "sort",
											"type": "`$STRING`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{},
								"response": map[string]any{
									"kind": "json",
									"media": "application/vnd.api+json",
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
