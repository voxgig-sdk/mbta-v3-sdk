# MbtaV3 SDK configuration


def make_config():
    return {
        "main": {
            "name": "MbtaV3",
        },
        "feature": {
            "test": {
        "options": {
          "active": False,
        },
      },
        },
        "options": {
            "base": "https://api-v3.mbta.com",
            "headers": {
        "content-type": "application/json",
      },
            "entity": {
                "alert": {},
                "facility": {},
                "line": {},
                "prediction": {},
                "route": {},
                "route_pattern": {},
                "schedule": {},
                "service": {},
                "shape": {},
                "stop": {},
                "trip": {},
                "vehicle": {},
            },
        },
        "entity": {
      "alert": {
        "fields": [],
        "name": "alert",
        "op": {
          "load": {
            "name": "load",
            "points": [
              {
                "args": {
                  "query": [
                    {
                      "kind": "query",
                      "name": "filter_activity",
                      "orig": "filter_activity",
                      "reqd": False,
                      "type": "`$STRING`",
                      "active": True,
                    },
                    {
                      "kind": "query",
                      "name": "filter_route",
                      "orig": "filter_route",
                      "reqd": False,
                      "type": "`$STRING`",
                      "active": True,
                    },
                    {
                      "kind": "query",
                      "name": "filter_stop",
                      "orig": "filter_stop",
                      "reqd": False,
                      "type": "`$STRING`",
                      "active": True,
                    },
                    {
                      "kind": "query",
                      "name": "include",
                      "orig": "include",
                      "reqd": False,
                      "type": "`$STRING`",
                      "active": True,
                    },
                    {
                      "kind": "query",
                      "name": "sort",
                      "orig": "sort",
                      "reqd": False,
                      "type": "`$STRING`",
                      "active": True,
                    },
                  ],
                },
                "method": "GET",
                "orig": "/alerts",
                "parts": [
                  "alerts",
                ],
                "select": {
                  "exist": [
                    "filter_activity",
                    "filter_route",
                    "filter_stop",
                    "include",
                    "sort",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "active": True,
                "index$": 0,
              },
            ],
            "input": "data",
            "key$": "load",
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "facility": {
        "fields": [],
        "name": "facility",
        "op": {
          "load": {
            "name": "load",
            "points": [
              {
                "args": {
                  "query": [
                    {
                      "kind": "query",
                      "name": "filter_stop",
                      "orig": "filter_stop",
                      "reqd": False,
                      "type": "`$STRING`",
                      "active": True,
                    },
                    {
                      "kind": "query",
                      "name": "filter_type",
                      "orig": "filter_type",
                      "reqd": False,
                      "type": "`$STRING`",
                      "active": True,
                    },
                    {
                      "kind": "query",
                      "name": "include",
                      "orig": "include",
                      "reqd": False,
                      "type": "`$STRING`",
                      "active": True,
                    },
                  ],
                },
                "method": "GET",
                "orig": "/facilities",
                "parts": [
                  "facilities",
                ],
                "select": {
                  "exist": [
                    "filter_stop",
                    "filter_type",
                    "include",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "active": True,
                "index$": 0,
              },
            ],
            "input": "data",
            "key$": "load",
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "line": {
        "fields": [],
        "name": "line",
        "op": {
          "load": {
            "name": "load",
            "points": [
              {
                "args": {
                  "query": [
                    {
                      "kind": "query",
                      "name": "filter_id",
                      "orig": "filter_id",
                      "reqd": False,
                      "type": "`$STRING`",
                      "active": True,
                    },
                    {
                      "kind": "query",
                      "name": "include",
                      "orig": "include",
                      "reqd": False,
                      "type": "`$STRING`",
                      "active": True,
                    },
                  ],
                },
                "method": "GET",
                "orig": "/lines",
                "parts": [
                  "lines",
                ],
                "select": {
                  "exist": [
                    "filter_id",
                    "include",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "active": True,
                "index$": 0,
              },
            ],
            "input": "data",
            "key$": "load",
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "prediction": {
        "fields": [],
        "name": "prediction",
        "op": {
          "load": {
            "name": "load",
            "points": [
              {
                "args": {
                  "query": [
                    {
                      "kind": "query",
                      "name": "filter_direction_id",
                      "orig": "filter_direction_id",
                      "reqd": False,
                      "type": "`$INTEGER`",
                      "active": True,
                    },
                    {
                      "kind": "query",
                      "name": "filter_route",
                      "orig": "filter_route",
                      "reqd": False,
                      "type": "`$STRING`",
                      "active": True,
                    },
                    {
                      "kind": "query",
                      "name": "filter_stop",
                      "orig": "filter_stop",
                      "reqd": False,
                      "type": "`$STRING`",
                      "active": True,
                    },
                    {
                      "kind": "query",
                      "name": "filter_trip",
                      "orig": "filter_trip",
                      "reqd": False,
                      "type": "`$STRING`",
                      "active": True,
                    },
                    {
                      "kind": "query",
                      "name": "include",
                      "orig": "include",
                      "reqd": False,
                      "type": "`$STRING`",
                      "active": True,
                    },
                    {
                      "kind": "query",
                      "name": "sort",
                      "orig": "sort",
                      "reqd": False,
                      "type": "`$STRING`",
                      "active": True,
                    },
                  ],
                },
                "method": "GET",
                "orig": "/predictions",
                "parts": [
                  "predictions",
                ],
                "select": {
                  "exist": [
                    "filter_direction_id",
                    "filter_route",
                    "filter_stop",
                    "filter_trip",
                    "include",
                    "sort",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "active": True,
                "index$": 0,
              },
            ],
            "input": "data",
            "key$": "load",
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "route": {
        "fields": [],
        "name": "route",
        "op": {
          "load": {
            "name": "load",
            "points": [
              {
                "args": {
                  "query": [
                    {
                      "kind": "query",
                      "name": "filter_id",
                      "orig": "filter_id",
                      "reqd": False,
                      "type": "`$STRING`",
                      "active": True,
                    },
                    {
                      "kind": "query",
                      "name": "filter_stop",
                      "orig": "filter_stop",
                      "reqd": False,
                      "type": "`$STRING`",
                      "active": True,
                    },
                    {
                      "example": "0,1",
                      "kind": "query",
                      "name": "filter_type",
                      "orig": "filter_type",
                      "reqd": False,
                      "type": "`$STRING`",
                      "active": True,
                    },
                    {
                      "kind": "query",
                      "name": "include",
                      "orig": "include",
                      "reqd": False,
                      "type": "`$STRING`",
                      "active": True,
                    },
                    {
                      "kind": "query",
                      "name": "sort",
                      "orig": "sort",
                      "reqd": False,
                      "type": "`$STRING`",
                      "active": True,
                    },
                  ],
                },
                "method": "GET",
                "orig": "/routes",
                "parts": [
                  "routes",
                ],
                "select": {
                  "exist": [
                    "filter_id",
                    "filter_stop",
                    "filter_type",
                    "include",
                    "sort",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "active": True,
                "index$": 0,
              },
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "id",
                      "orig": "id",
                      "reqd": True,
                      "type": "`$STRING`",
                      "active": True,
                    },
                  ],
                  "query": [
                    {
                      "kind": "query",
                      "name": "include",
                      "orig": "include",
                      "reqd": False,
                      "type": "`$STRING`",
                      "active": True,
                    },
                  ],
                },
                "method": "GET",
                "orig": "/routes/{id}",
                "parts": [
                  "routes",
                  "{id}",
                ],
                "select": {
                  "exist": [
                    "id",
                    "include",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "active": True,
                "index$": 1,
              },
            ],
            "input": "data",
            "key$": "load",
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "route_pattern": {
        "fields": [],
        "name": "route_pattern",
        "op": {
          "load": {
            "name": "load",
            "points": [
              {
                "args": {
                  "query": [
                    {
                      "kind": "query",
                      "name": "filter_direction_id",
                      "orig": "filter_direction_id",
                      "reqd": False,
                      "type": "`$INTEGER`",
                      "active": True,
                    },
                    {
                      "kind": "query",
                      "name": "filter_route",
                      "orig": "filter_route",
                      "reqd": False,
                      "type": "`$STRING`",
                      "active": True,
                    },
                    {
                      "kind": "query",
                      "name": "filter_stop",
                      "orig": "filter_stop",
                      "reqd": False,
                      "type": "`$STRING`",
                      "active": True,
                    },
                    {
                      "kind": "query",
                      "name": "include",
                      "orig": "include",
                      "reqd": False,
                      "type": "`$STRING`",
                      "active": True,
                    },
                  ],
                },
                "method": "GET",
                "orig": "/route_patterns",
                "parts": [
                  "route_patterns",
                ],
                "select": {
                  "exist": [
                    "filter_direction_id",
                    "filter_route",
                    "filter_stop",
                    "include",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "active": True,
                "index$": 0,
              },
            ],
            "input": "data",
            "key$": "load",
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "schedule": {
        "fields": [],
        "name": "schedule",
        "op": {
          "load": {
            "name": "load",
            "points": [
              {
                "args": {
                  "query": [
                    {
                      "kind": "query",
                      "name": "filter_date",
                      "orig": "filter_date",
                      "reqd": False,
                      "type": "`$STRING`",
                      "active": True,
                    },
                    {
                      "kind": "query",
                      "name": "filter_direction_id",
                      "orig": "filter_direction_id",
                      "reqd": False,
                      "type": "`$INTEGER`",
                      "active": True,
                    },
                    {
                      "kind": "query",
                      "name": "filter_max_time",
                      "orig": "filter_max_time",
                      "reqd": False,
                      "type": "`$STRING`",
                      "active": True,
                    },
                    {
                      "kind": "query",
                      "name": "filter_min_time",
                      "orig": "filter_min_time",
                      "reqd": False,
                      "type": "`$STRING`",
                      "active": True,
                    },
                    {
                      "kind": "query",
                      "name": "filter_route",
                      "orig": "filter_route",
                      "reqd": False,
                      "type": "`$STRING`",
                      "active": True,
                    },
                    {
                      "kind": "query",
                      "name": "filter_stop",
                      "orig": "filter_stop",
                      "reqd": False,
                      "type": "`$STRING`",
                      "active": True,
                    },
                    {
                      "kind": "query",
                      "name": "filter_trip",
                      "orig": "filter_trip",
                      "reqd": False,
                      "type": "`$STRING`",
                      "active": True,
                    },
                    {
                      "kind": "query",
                      "name": "include",
                      "orig": "include",
                      "reqd": False,
                      "type": "`$STRING`",
                      "active": True,
                    },
                    {
                      "kind": "query",
                      "name": "sort",
                      "orig": "sort",
                      "reqd": False,
                      "type": "`$STRING`",
                      "active": True,
                    },
                  ],
                },
                "method": "GET",
                "orig": "/schedules",
                "parts": [
                  "schedules",
                ],
                "select": {
                  "exist": [
                    "filter_date",
                    "filter_direction_id",
                    "filter_max_time",
                    "filter_min_time",
                    "filter_route",
                    "filter_stop",
                    "filter_trip",
                    "include",
                    "sort",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "active": True,
                "index$": 0,
              },
            ],
            "input": "data",
            "key$": "load",
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "service": {
        "fields": [],
        "name": "service",
        "op": {
          "load": {
            "name": "load",
            "points": [
              {
                "args": {
                  "query": [
                    {
                      "kind": "query",
                      "name": "filter_id",
                      "orig": "filter_id",
                      "reqd": False,
                      "type": "`$STRING`",
                      "active": True,
                    },
                    {
                      "kind": "query",
                      "name": "filter_route",
                      "orig": "filter_route",
                      "reqd": False,
                      "type": "`$STRING`",
                      "active": True,
                    },
                    {
                      "kind": "query",
                      "name": "include",
                      "orig": "include",
                      "reqd": False,
                      "type": "`$STRING`",
                      "active": True,
                    },
                  ],
                },
                "method": "GET",
                "orig": "/services",
                "parts": [
                  "services",
                ],
                "select": {
                  "exist": [
                    "filter_id",
                    "filter_route",
                    "include",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "active": True,
                "index$": 0,
              },
            ],
            "input": "data",
            "key$": "load",
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "shape": {
        "fields": [],
        "name": "shape",
        "op": {
          "load": {
            "name": "load",
            "points": [
              {
                "args": {
                  "query": [
                    {
                      "kind": "query",
                      "name": "filter_direction_id",
                      "orig": "filter_direction_id",
                      "reqd": False,
                      "type": "`$INTEGER`",
                      "active": True,
                    },
                    {
                      "kind": "query",
                      "name": "filter_route",
                      "orig": "filter_route",
                      "reqd": False,
                      "type": "`$STRING`",
                      "active": True,
                    },
                    {
                      "kind": "query",
                      "name": "include",
                      "orig": "include",
                      "reqd": False,
                      "type": "`$STRING`",
                      "active": True,
                    },
                  ],
                },
                "method": "GET",
                "orig": "/shapes",
                "parts": [
                  "shapes",
                ],
                "select": {
                  "exist": [
                    "filter_direction_id",
                    "filter_route",
                    "include",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "active": True,
                "index$": 0,
              },
            ],
            "input": "data",
            "key$": "load",
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "stop": {
        "fields": [],
        "name": "stop",
        "op": {
          "load": {
            "name": "load",
            "points": [
              {
                "args": {
                  "query": [
                    {
                      "kind": "query",
                      "name": "filter_id",
                      "orig": "filter_id",
                      "reqd": False,
                      "type": "`$STRING`",
                      "active": True,
                    },
                    {
                      "kind": "query",
                      "name": "filter_latitude",
                      "orig": "filter_latitude",
                      "reqd": False,
                      "type": "`$NUMBER`",
                      "active": True,
                    },
                    {
                      "kind": "query",
                      "name": "filter_location_type",
                      "orig": "filter_location_type",
                      "reqd": False,
                      "type": "`$INTEGER`",
                      "active": True,
                    },
                    {
                      "kind": "query",
                      "name": "filter_longitude",
                      "orig": "filter_longitude",
                      "reqd": False,
                      "type": "`$NUMBER`",
                      "active": True,
                    },
                    {
                      "kind": "query",
                      "name": "filter_radius",
                      "orig": "filter_radius",
                      "reqd": False,
                      "type": "`$NUMBER`",
                      "active": True,
                    },
                    {
                      "kind": "query",
                      "name": "filter_route",
                      "orig": "filter_route",
                      "reqd": False,
                      "type": "`$STRING`",
                      "active": True,
                    },
                    {
                      "kind": "query",
                      "name": "include",
                      "orig": "include",
                      "reqd": False,
                      "type": "`$STRING`",
                      "active": True,
                    },
                    {
                      "kind": "query",
                      "name": "sort",
                      "orig": "sort",
                      "reqd": False,
                      "type": "`$STRING`",
                      "active": True,
                    },
                  ],
                },
                "method": "GET",
                "orig": "/stops",
                "parts": [
                  "stops",
                ],
                "select": {
                  "exist": [
                    "filter_id",
                    "filter_latitude",
                    "filter_location_type",
                    "filter_longitude",
                    "filter_radius",
                    "filter_route",
                    "include",
                    "sort",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "active": True,
                "index$": 0,
              },
            ],
            "input": "data",
            "key$": "load",
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "trip": {
        "fields": [],
        "name": "trip",
        "op": {
          "load": {
            "name": "load",
            "points": [
              {
                "args": {
                  "query": [
                    {
                      "kind": "query",
                      "name": "filter_direction_id",
                      "orig": "filter_direction_id",
                      "reqd": False,
                      "type": "`$INTEGER`",
                      "active": True,
                    },
                    {
                      "kind": "query",
                      "name": "filter_id",
                      "orig": "filter_id",
                      "reqd": False,
                      "type": "`$STRING`",
                      "active": True,
                    },
                    {
                      "kind": "query",
                      "name": "filter_name",
                      "orig": "filter_name",
                      "reqd": False,
                      "type": "`$STRING`",
                      "active": True,
                    },
                    {
                      "kind": "query",
                      "name": "filter_route",
                      "orig": "filter_route",
                      "reqd": False,
                      "type": "`$STRING`",
                      "active": True,
                    },
                    {
                      "kind": "query",
                      "name": "filter_route_pattern",
                      "orig": "filter_route_pattern",
                      "reqd": False,
                      "type": "`$STRING`",
                      "active": True,
                    },
                    {
                      "kind": "query",
                      "name": "include",
                      "orig": "include",
                      "reqd": False,
                      "type": "`$STRING`",
                      "active": True,
                    },
                    {
                      "kind": "query",
                      "name": "sort",
                      "orig": "sort",
                      "reqd": False,
                      "type": "`$STRING`",
                      "active": True,
                    },
                  ],
                },
                "method": "GET",
                "orig": "/trips",
                "parts": [
                  "trips",
                ],
                "select": {
                  "exist": [
                    "filter_direction_id",
                    "filter_id",
                    "filter_name",
                    "filter_route",
                    "filter_route_pattern",
                    "include",
                    "sort",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "active": True,
                "index$": 0,
              },
            ],
            "input": "data",
            "key$": "load",
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "vehicle": {
        "fields": [],
        "name": "vehicle",
        "op": {
          "load": {
            "name": "load",
            "points": [
              {
                "args": {
                  "query": [
                    {
                      "kind": "query",
                      "name": "filter_direction_id",
                      "orig": "filter_direction_id",
                      "reqd": False,
                      "type": "`$INTEGER`",
                      "active": True,
                    },
                    {
                      "kind": "query",
                      "name": "filter_id",
                      "orig": "filter_id",
                      "reqd": False,
                      "type": "`$STRING`",
                      "active": True,
                    },
                    {
                      "kind": "query",
                      "name": "filter_label",
                      "orig": "filter_label",
                      "reqd": False,
                      "type": "`$STRING`",
                      "active": True,
                    },
                    {
                      "kind": "query",
                      "name": "filter_route",
                      "orig": "filter_route",
                      "reqd": False,
                      "type": "`$STRING`",
                      "active": True,
                    },
                    {
                      "kind": "query",
                      "name": "filter_trip",
                      "orig": "filter_trip",
                      "reqd": False,
                      "type": "`$STRING`",
                      "active": True,
                    },
                    {
                      "kind": "query",
                      "name": "include",
                      "orig": "include",
                      "reqd": False,
                      "type": "`$STRING`",
                      "active": True,
                    },
                    {
                      "kind": "query",
                      "name": "sort",
                      "orig": "sort",
                      "reqd": False,
                      "type": "`$STRING`",
                      "active": True,
                    },
                  ],
                },
                "method": "GET",
                "orig": "/vehicles",
                "parts": [
                  "vehicles",
                ],
                "select": {
                  "exist": [
                    "filter_direction_id",
                    "filter_id",
                    "filter_label",
                    "filter_route",
                    "filter_trip",
                    "include",
                    "sort",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "active": True,
                "index$": 0,
              },
            ],
            "input": "data",
            "key$": "load",
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
    },
    }
