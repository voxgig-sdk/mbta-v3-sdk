"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_test_1 = require("node:test");
const __1 = require("..");
const definition_runner_1 = require("./definition-runner");
const utility_1 = require("./utility");
// Generated from the API definition, not from the model this SDK was built
// from: the route, the declared query parameters, the credential the security
// scheme names, and the definition's own response example.
const PLAN = [
    {
        "entity": "alert",
        "accessor": "Alert",
        "op": "load",
        "method": "GET",
        "path": "/alerts",
        "args": [],
        "select": {
            "filter_activity": "v1",
            "filter_route": "v1",
            "filter_stop": "v1",
            "include": "v1",
            "sort": "v1"
        },
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/vnd.api+json"
        ],
        "query": [
            "filter[route]",
            "filter[stop]",
            "filter[activity]",
            "include",
            "sort"
        ],
        "queryArgs": [
            {
                "name": "filter_activity",
                "wire": "filter[activity]"
            },
            {
                "name": "filter_route",
                "wire": "filter[route]"
            },
            {
                "name": "filter_stop",
                "wire": "filter[stop]"
            },
            {
                "name": "include",
                "wire": "include"
            },
            {
                "name": "sort",
                "wire": "sort"
            }
        ],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "x-api-key"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "data": [
                {
                    "id": "x",
                    "type": "alert",
                    "attributes": {
                        "active_period": [
                            {
                                "start": "2026-01-01T00:00:00Z",
                                "end": "2026-01-01T00:00:00Z"
                            }
                        ],
                        "banner": "x",
                        "cause": "x",
                        "created_at": "2026-01-01T00:00:00Z",
                        "description": "x",
                        "effect": "x",
                        "header": "x",
                        "informed_entity": [
                            {}
                        ],
                        "lifecycle": "x",
                        "severity": 1,
                        "short_header": "x",
                        "timeframe": "x",
                        "updated_at": "2026-01-01T00:00:00Z",
                        "url": "x"
                    },
                    "relationships": {}
                }
            ],
            "included": [
                {}
            ],
            "jsonapi": {
                "version": "1.0"
            }
        },
        "idField": "id"
    },
    {
        "entity": "facility",
        "accessor": "Facility",
        "op": "load",
        "method": "GET",
        "path": "/facilities",
        "args": [],
        "select": {
            "filter_stop": "v1",
            "filter_type": "v1",
            "include": "v1"
        },
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/vnd.api+json"
        ],
        "query": [
            "filter[stop]",
            "filter[type]",
            "include"
        ],
        "queryArgs": [
            {
                "name": "filter_stop",
                "wire": "filter[stop]"
            },
            {
                "name": "filter_type",
                "wire": "filter[type]"
            },
            {
                "name": "include",
                "wire": "include"
            }
        ],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "x-api-key"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "data": [
                {
                    "id": "x",
                    "type": "facility",
                    "attributes": {
                        "latitude": 1,
                        "longitude": 1,
                        "long_name": "x",
                        "short_name": "x",
                        "type": "x",
                        "properties": [
                            {}
                        ]
                    },
                    "relationships": {}
                }
            ],
            "included": [
                {}
            ],
            "jsonapi": {
                "version": "1.0"
            }
        },
        "idField": "id"
    },
    {
        "entity": "line",
        "accessor": "Line",
        "op": "load",
        "method": "GET",
        "path": "/lines",
        "args": [],
        "select": {
            "filter_id": "v1",
            "include": "v1"
        },
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/vnd.api+json"
        ],
        "query": [
            "filter[id]",
            "include"
        ],
        "queryArgs": [
            {
                "name": "filter_id",
                "wire": "filter[id]"
            },
            {
                "name": "include",
                "wire": "include"
            }
        ],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "x-api-key"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "data": [
                {
                    "id": "x",
                    "type": "line",
                    "attributes": {
                        "color": "x",
                        "long_name": "x",
                        "short_name": "x",
                        "sort_order": 1,
                        "text_color": "x"
                    },
                    "relationships": {}
                }
            ],
            "included": [
                {}
            ],
            "jsonapi": {
                "version": "1.0"
            }
        },
        "idField": "id"
    },
    {
        "entity": "prediction",
        "accessor": "Prediction",
        "op": "load",
        "method": "GET",
        "path": "/predictions",
        "args": [],
        "select": {
            "filter_direction_id": "v1",
            "filter_route": "v1",
            "filter_stop": "v1",
            "filter_trip": "v1",
            "include": "v1",
            "sort": "v1"
        },
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/vnd.api+json"
        ],
        "query": [
            "filter[stop]",
            "filter[route]",
            "filter[trip]",
            "filter[direction_id]",
            "include",
            "sort"
        ],
        "queryArgs": [
            {
                "name": "filter_direction_id",
                "wire": "filter[direction_id]"
            },
            {
                "name": "filter_route",
                "wire": "filter[route]"
            },
            {
                "name": "filter_stop",
                "wire": "filter[stop]"
            },
            {
                "name": "filter_trip",
                "wire": "filter[trip]"
            },
            {
                "name": "include",
                "wire": "include"
            },
            {
                "name": "sort",
                "wire": "sort"
            }
        ],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "x-api-key"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "data": [
                {
                    "id": "x",
                    "type": "prediction",
                    "attributes": {
                        "arrival_time": "2026-01-01T00:00:00Z",
                        "departure_time": "2026-01-01T00:00:00Z",
                        "direction_id": 0,
                        "schedule_relationship": "x",
                        "status": "x",
                        "stop_sequence": 1
                    },
                    "relationships": {
                        "route": {},
                        "stop": {},
                        "trip": {},
                        "vehicle": {}
                    }
                }
            ],
            "included": [
                {}
            ],
            "jsonapi": {
                "version": "1.0"
            }
        },
        "idField": "id"
    },
    {
        "entity": "route",
        "accessor": "Route",
        "op": "load",
        "method": "GET",
        "path": "/routes/{id}",
        "args": [
            {
                "name": "id",
                "wire": "id",
                "value": "p1"
            }
        ],
        "select": {
            "include": "v1"
        },
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/vnd.api+json"
        ],
        "query": [
            "include"
        ],
        "queryArgs": [
            {
                "name": "include",
                "wire": "include"
            }
        ],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "x-api-key"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "data": {
                "id": "x",
                "type": "route",
                "attributes": {
                    "color": "x",
                    "description": "x",
                    "direction_destinations": [
                        "x"
                    ],
                    "direction_names": [
                        "x"
                    ],
                    "fare_class": "x",
                    "long_name": "x",
                    "short_name": "x",
                    "sort_order": 1,
                    "text_color": "x",
                    "type": 1
                },
                "relationships": {}
            },
            "included": [
                {}
            ],
            "jsonapi": {
                "version": "1.0"
            }
        },
        "idField": "id"
    },
    {
        "entity": "route",
        "accessor": "Route",
        "op": "load",
        "method": "GET",
        "path": "/routes",
        "args": [],
        "select": {
            "filter_id": "v1",
            "filter_stop": "v1",
            "filter_type": "0,1",
            "include": "v1",
            "sort": "v1"
        },
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/vnd.api+json"
        ],
        "query": [
            "filter[type]",
            "filter[stop]",
            "filter[id]",
            "include",
            "sort"
        ],
        "queryArgs": [
            {
                "name": "filter_id",
                "wire": "filter[id]"
            },
            {
                "name": "filter_stop",
                "wire": "filter[stop]"
            },
            {
                "name": "filter_type",
                "wire": "filter[type]"
            },
            {
                "name": "include",
                "wire": "include"
            },
            {
                "name": "sort",
                "wire": "sort"
            }
        ],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "x-api-key"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "data": [
                {
                    "id": "x",
                    "type": "route",
                    "attributes": {
                        "color": "x",
                        "description": "x",
                        "direction_destinations": [
                            "x"
                        ],
                        "direction_names": [
                            "x"
                        ],
                        "fare_class": "x",
                        "long_name": "x",
                        "short_name": "x",
                        "sort_order": 1,
                        "text_color": "x",
                        "type": 1
                    },
                    "relationships": {}
                }
            ],
            "included": [
                {}
            ],
            "jsonapi": {
                "version": "1.0"
            }
        },
        "idField": "id"
    },
    {
        "entity": "route_pattern",
        "accessor": "RoutePattern",
        "op": "load",
        "method": "GET",
        "path": "/route_patterns",
        "args": [],
        "select": {
            "filter_direction_id": "v1",
            "filter_route": "v1",
            "filter_stop": "v1",
            "include": "v1"
        },
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/vnd.api+json"
        ],
        "query": [
            "filter[route]",
            "filter[direction_id]",
            "filter[stop]",
            "include"
        ],
        "queryArgs": [
            {
                "name": "filter_direction_id",
                "wire": "filter[direction_id]"
            },
            {
                "name": "filter_route",
                "wire": "filter[route]"
            },
            {
                "name": "filter_stop",
                "wire": "filter[stop]"
            },
            {
                "name": "include",
                "wire": "include"
            }
        ],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "x-api-key"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "data": [
                {
                    "id": "x",
                    "type": "route_pattern",
                    "attributes": {
                        "direction_id": 0,
                        "name": "x",
                        "time_desc": "x",
                        "typicality": 1,
                        "sort_order": 1
                    },
                    "relationships": {}
                }
            ],
            "included": [
                {}
            ],
            "jsonapi": {
                "version": "1.0"
            }
        },
        "idField": "id"
    },
    {
        "entity": "schedule",
        "accessor": "Schedule",
        "op": "load",
        "method": "GET",
        "path": "/schedules",
        "args": [],
        "select": {
            "filter_date": "v1",
            "filter_direction_id": "v1",
            "filter_max_time": "v1",
            "filter_min_time": "v1",
            "filter_route": "v1",
            "filter_stop": "v1",
            "filter_trip": "v1",
            "include": "v1",
            "sort": "v1"
        },
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/vnd.api+json"
        ],
        "query": [
            "filter[stop]",
            "filter[route]",
            "filter[trip]",
            "filter[direction_id]",
            "filter[min_time]",
            "filter[max_time]",
            "filter[date]",
            "include",
            "sort"
        ],
        "queryArgs": [
            {
                "name": "filter_date",
                "wire": "filter[date]"
            },
            {
                "name": "filter_direction_id",
                "wire": "filter[direction_id]"
            },
            {
                "name": "filter_max_time",
                "wire": "filter[max_time]"
            },
            {
                "name": "filter_min_time",
                "wire": "filter[min_time]"
            },
            {
                "name": "filter_route",
                "wire": "filter[route]"
            },
            {
                "name": "filter_stop",
                "wire": "filter[stop]"
            },
            {
                "name": "filter_trip",
                "wire": "filter[trip]"
            },
            {
                "name": "include",
                "wire": "include"
            },
            {
                "name": "sort",
                "wire": "sort"
            }
        ],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "x-api-key"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "data": [
                {
                    "id": "x",
                    "type": "schedule",
                    "attributes": {
                        "arrival_time": "2026-01-01T00:00:00Z",
                        "departure_time": "2026-01-01T00:00:00Z",
                        "direction_id": 0,
                        "drop_off_type": 1,
                        "pickup_type": 1,
                        "stop_headsign": "x",
                        "stop_sequence": 1,
                        "timepoint": true
                    },
                    "relationships": {
                        "route": {},
                        "stop": {},
                        "trip": {},
                        "prediction": {}
                    }
                }
            ],
            "included": [
                {}
            ],
            "jsonapi": {
                "version": "1.0"
            }
        },
        "idField": "id"
    },
    {
        "entity": "service",
        "accessor": "Service",
        "op": "load",
        "method": "GET",
        "path": "/services",
        "args": [],
        "select": {
            "filter_id": "v1",
            "filter_route": "v1",
            "include": "v1"
        },
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/vnd.api+json"
        ],
        "query": [
            "filter[id]",
            "filter[route]",
            "include"
        ],
        "queryArgs": [
            {
                "name": "filter_id",
                "wire": "filter[id]"
            },
            {
                "name": "filter_route",
                "wire": "filter[route]"
            },
            {
                "name": "include",
                "wire": "include"
            }
        ],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "x-api-key"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "data": [
                {
                    "id": "x",
                    "type": "service",
                    "attributes": {
                        "added_dates": [
                            "2026-01-01"
                        ],
                        "added_dates_notes": [
                            "x"
                        ],
                        "description": "x",
                        "end_date": "2026-01-01",
                        "removed_dates": [
                            "2026-01-01"
                        ],
                        "removed_dates_notes": [
                            "x"
                        ],
                        "schedule_name": "x",
                        "schedule_type": "x",
                        "schedule_typicality": 1,
                        "start_date": "2026-01-01",
                        "valid_days": [
                            1
                        ]
                    },
                    "relationships": {}
                }
            ],
            "included": [
                {}
            ],
            "jsonapi": {
                "version": "1.0"
            }
        },
        "idField": "id"
    },
    {
        "entity": "shape",
        "accessor": "Shape",
        "op": "load",
        "method": "GET",
        "path": "/shapes",
        "args": [],
        "select": {
            "filter_direction_id": "v1",
            "filter_route": "v1",
            "include": "v1"
        },
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/vnd.api+json"
        ],
        "query": [
            "filter[route]",
            "filter[direction_id]",
            "include"
        ],
        "queryArgs": [
            {
                "name": "filter_direction_id",
                "wire": "filter[direction_id]"
            },
            {
                "name": "filter_route",
                "wire": "filter[route]"
            },
            {
                "name": "include",
                "wire": "include"
            }
        ],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "x-api-key"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "data": [
                {
                    "id": "x",
                    "type": "shape",
                    "attributes": {
                        "direction_id": 0,
                        "name": "x",
                        "polyline": "x",
                        "priority": 1
                    },
                    "relationships": {}
                }
            ],
            "included": [
                {}
            ],
            "jsonapi": {
                "version": "1.0"
            }
        },
        "idField": "id"
    },
    {
        "entity": "stop",
        "accessor": "Stop",
        "op": "load",
        "method": "GET",
        "path": "/stops",
        "args": [],
        "select": {
            "filter_id": "v1",
            "filter_latitude": "v1",
            "filter_location_type": "v1",
            "filter_longitude": "v1",
            "filter_radius": "v1",
            "filter_route": "v1",
            "include": "v1",
            "sort": "v1"
        },
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/vnd.api+json"
        ],
        "query": [
            "filter[id]",
            "filter[route]",
            "filter[location_type]",
            "filter[latitude]",
            "filter[longitude]",
            "filter[radius]",
            "include",
            "sort"
        ],
        "queryArgs": [
            {
                "name": "filter_id",
                "wire": "filter[id]"
            },
            {
                "name": "filter_latitude",
                "wire": "filter[latitude]"
            },
            {
                "name": "filter_location_type",
                "wire": "filter[location_type]"
            },
            {
                "name": "filter_longitude",
                "wire": "filter[longitude]"
            },
            {
                "name": "filter_radius",
                "wire": "filter[radius]"
            },
            {
                "name": "filter_route",
                "wire": "filter[route]"
            },
            {
                "name": "include",
                "wire": "include"
            },
            {
                "name": "sort",
                "wire": "sort"
            }
        ],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "x-api-key"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "data": [
                {
                    "id": "x",
                    "type": "stop",
                    "attributes": {
                        "address": "x",
                        "at_street": "x",
                        "description": "x",
                        "latitude": 1,
                        "location_type": 1,
                        "longitude": 1,
                        "municipality": "x",
                        "name": "x",
                        "on_street": "x",
                        "platform_code": "x",
                        "platform_name": "x",
                        "vehicle_type": 1,
                        "wheelchair_boarding": 1
                    },
                    "relationships": {
                        "parent_station": {},
                        "child_stops": {},
                        "facilities": {}
                    }
                }
            ],
            "included": [
                {}
            ],
            "jsonapi": {
                "version": "1.0"
            }
        },
        "idField": "id"
    },
    {
        "entity": "trip",
        "accessor": "Trip",
        "op": "load",
        "method": "GET",
        "path": "/trips",
        "args": [],
        "select": {
            "filter_direction_id": "v1",
            "filter_id": "v1",
            "filter_name": "v1",
            "filter_route": "v1",
            "filter_route_pattern": "v1",
            "include": "v1",
            "sort": "v1"
        },
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/vnd.api+json"
        ],
        "query": [
            "filter[id]",
            "filter[route]",
            "filter[direction_id]",
            "filter[route_pattern]",
            "filter[name]",
            "include",
            "sort"
        ],
        "queryArgs": [
            {
                "name": "filter_direction_id",
                "wire": "filter[direction_id]"
            },
            {
                "name": "filter_id",
                "wire": "filter[id]"
            },
            {
                "name": "filter_name",
                "wire": "filter[name]"
            },
            {
                "name": "filter_route",
                "wire": "filter[route]"
            },
            {
                "name": "filter_route_pattern",
                "wire": "filter[route_pattern]"
            },
            {
                "name": "include",
                "wire": "include"
            },
            {
                "name": "sort",
                "wire": "sort"
            }
        ],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "x-api-key"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "data": [
                {
                    "id": "x",
                    "type": "trip",
                    "attributes": {
                        "bikes_allowed": 1,
                        "block_id": "x",
                        "direction_id": 0,
                        "headsign": "x",
                        "name": "x",
                        "wheelchair_accessible": 1
                    },
                    "relationships": {
                        "route": {},
                        "route_pattern": {},
                        "service": {},
                        "shape": {}
                    }
                }
            ],
            "included": [
                {}
            ],
            "jsonapi": {
                "version": "1.0"
            }
        },
        "idField": "id"
    },
    {
        "entity": "vehicle",
        "accessor": "Vehicle",
        "op": "load",
        "method": "GET",
        "path": "/vehicles",
        "args": [],
        "select": {
            "filter_direction_id": "v1",
            "filter_id": "v1",
            "filter_label": "v1",
            "filter_route": "v1",
            "filter_trip": "v1",
            "include": "v1",
            "sort": "v1"
        },
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/vnd.api+json"
        ],
        "query": [
            "filter[id]",
            "filter[route]",
            "filter[trip]",
            "filter[label]",
            "filter[direction_id]",
            "include",
            "sort"
        ],
        "queryArgs": [
            {
                "name": "filter_direction_id",
                "wire": "filter[direction_id]"
            },
            {
                "name": "filter_id",
                "wire": "filter[id]"
            },
            {
                "name": "filter_label",
                "wire": "filter[label]"
            },
            {
                "name": "filter_route",
                "wire": "filter[route]"
            },
            {
                "name": "filter_trip",
                "wire": "filter[trip]"
            },
            {
                "name": "include",
                "wire": "include"
            },
            {
                "name": "sort",
                "wire": "sort"
            }
        ],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "x-api-key"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "data": [
                {
                    "id": "x",
                    "type": "vehicle",
                    "attributes": {
                        "bearing": 1,
                        "current_status": "x",
                        "current_stop_sequence": 1,
                        "direction_id": 0,
                        "label": "x",
                        "latitude": 1,
                        "longitude": 1,
                        "speed": 1,
                        "updated_at": "2026-01-01T00:00:00Z"
                    },
                    "relationships": {
                        "route": {},
                        "stop": {},
                        "trip": {}
                    }
                }
            ],
            "included": [
                {}
            ],
            "jsonapi": {
                "version": "1.0"
            }
        },
        "idField": "id"
    }
];
(0, node_test_1.describe)('definition', () => {
    for (const point of PLAN) {
        (0, node_test_1.test)(point.entity + '.' + point.op + ' ' + point.method + ' ' + point.path, async (t) => {
            const control = (0, utility_1.isControlSkipped)('entityOp', point.entity + '.' + point.op, 'definition');
            if (control.skip) {
                t.skip(control.reason || 'skipped via sdk-test-control.json');
                return;
            }
            await (0, definition_runner_1.runDefinitionPoint)(__1.SDK, point);
        });
    }
});
//# sourceMappingURL=definition.test.js.map