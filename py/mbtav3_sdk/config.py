# MbtaV3 SDK configuration


_shared_config = None


def shared_config():
    """Return the process-wide config, built once on first use.

    The SDK reads the config on every request and never writes to it, so one
    instance is shared by every client rather than rebuilt per client.

    The returned dict is shared: treat it as read-only. Callers that need to
    mutate should use make_config, which always returns a fresh copy.
    """
    global _shared_config
    if _shared_config is None:
        _shared_config = make_config()
    return _shared_config


def make_config():
    """Build a fresh, fully materialised config dict.

    Every call rebuilds the whole structure, so prefer shared_config unless
    you need a private copy you intend to mutate.
    """
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
            "auth": {
                "prefix": "",
            },
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
            "input": "data",
            "name": "load",
            "points": [
              {
                "args": {
                  "query": [
                    {
                      "kind": "query",
                      "name": "filter_activity",
                      "orig": "filter_activity",
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "query",
                      "name": "filter_route",
                      "orig": "filter_route",
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "query",
                      "name": "filter_stop",
                      "orig": "filter_stop",
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "query",
                      "name": "include",
                      "orig": "include",
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "query",
                      "name": "sort",
                      "orig": "sort",
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
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
              },
            ],
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
            "input": "data",
            "name": "load",
            "points": [
              {
                "args": {
                  "query": [
                    {
                      "kind": "query",
                      "name": "filter_stop",
                      "orig": "filter_stop",
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "query",
                      "name": "filter_type",
                      "orig": "filter_type",
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "query",
                      "name": "include",
                      "orig": "include",
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
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
              },
            ],
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
            "input": "data",
            "name": "load",
            "points": [
              {
                "args": {
                  "query": [
                    {
                      "kind": "query",
                      "name": "filter_id",
                      "orig": "filter_id",
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "query",
                      "name": "include",
                      "orig": "include",
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
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
              },
            ],
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
            "input": "data",
            "name": "load",
            "points": [
              {
                "args": {
                  "query": [
                    {
                      "kind": "query",
                      "name": "filter_direction_id",
                      "orig": "filter_direction_id",
                      "type": "`$INTEGER`",
                    },
                    {
                      "kind": "query",
                      "name": "filter_route",
                      "orig": "filter_route",
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "query",
                      "name": "filter_stop",
                      "orig": "filter_stop",
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "query",
                      "name": "filter_trip",
                      "orig": "filter_trip",
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "query",
                      "name": "include",
                      "orig": "include",
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "query",
                      "name": "sort",
                      "orig": "sort",
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
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
              },
            ],
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
            "input": "data",
            "name": "load",
            "points": [
              {
                "args": {
                  "query": [
                    {
                      "kind": "query",
                      "name": "filter_id",
                      "orig": "filter_id",
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "query",
                      "name": "filter_stop",
                      "orig": "filter_stop",
                      "type": "`$STRING`",
                    },
                    {
                      "example": "0,1",
                      "kind": "query",
                      "name": "filter_type",
                      "orig": "filter_type",
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "query",
                      "name": "include",
                      "orig": "include",
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "query",
                      "name": "sort",
                      "orig": "sort",
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
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
                    },
                  ],
                  "query": [
                    {
                      "kind": "query",
                      "name": "include",
                      "orig": "include",
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
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
              },
            ],
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
            "input": "data",
            "name": "load",
            "points": [
              {
                "args": {
                  "query": [
                    {
                      "kind": "query",
                      "name": "filter_direction_id",
                      "orig": "filter_direction_id",
                      "type": "`$INTEGER`",
                    },
                    {
                      "kind": "query",
                      "name": "filter_route",
                      "orig": "filter_route",
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "query",
                      "name": "filter_stop",
                      "orig": "filter_stop",
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "query",
                      "name": "include",
                      "orig": "include",
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
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
              },
            ],
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
            "input": "data",
            "name": "load",
            "points": [
              {
                "args": {
                  "query": [
                    {
                      "kind": "query",
                      "name": "filter_date",
                      "orig": "filter_date",
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "query",
                      "name": "filter_direction_id",
                      "orig": "filter_direction_id",
                      "type": "`$INTEGER`",
                    },
                    {
                      "kind": "query",
                      "name": "filter_max_time",
                      "orig": "filter_max_time",
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "query",
                      "name": "filter_min_time",
                      "orig": "filter_min_time",
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "query",
                      "name": "filter_route",
                      "orig": "filter_route",
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "query",
                      "name": "filter_stop",
                      "orig": "filter_stop",
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "query",
                      "name": "filter_trip",
                      "orig": "filter_trip",
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "query",
                      "name": "include",
                      "orig": "include",
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "query",
                      "name": "sort",
                      "orig": "sort",
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
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
              },
            ],
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
            "input": "data",
            "name": "load",
            "points": [
              {
                "args": {
                  "query": [
                    {
                      "kind": "query",
                      "name": "filter_id",
                      "orig": "filter_id",
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "query",
                      "name": "filter_route",
                      "orig": "filter_route",
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "query",
                      "name": "include",
                      "orig": "include",
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
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
              },
            ],
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
            "input": "data",
            "name": "load",
            "points": [
              {
                "args": {
                  "query": [
                    {
                      "kind": "query",
                      "name": "filter_direction_id",
                      "orig": "filter_direction_id",
                      "type": "`$INTEGER`",
                    },
                    {
                      "kind": "query",
                      "name": "filter_route",
                      "orig": "filter_route",
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "query",
                      "name": "include",
                      "orig": "include",
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
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
              },
            ],
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
            "input": "data",
            "name": "load",
            "points": [
              {
                "args": {
                  "query": [
                    {
                      "kind": "query",
                      "name": "filter_id",
                      "orig": "filter_id",
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "query",
                      "name": "filter_latitude",
                      "orig": "filter_latitude",
                      "type": "`$NUMBER`",
                    },
                    {
                      "kind": "query",
                      "name": "filter_location_type",
                      "orig": "filter_location_type",
                      "type": "`$INTEGER`",
                    },
                    {
                      "kind": "query",
                      "name": "filter_longitude",
                      "orig": "filter_longitude",
                      "type": "`$NUMBER`",
                    },
                    {
                      "kind": "query",
                      "name": "filter_radius",
                      "orig": "filter_radius",
                      "type": "`$NUMBER`",
                    },
                    {
                      "kind": "query",
                      "name": "filter_route",
                      "orig": "filter_route",
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "query",
                      "name": "include",
                      "orig": "include",
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "query",
                      "name": "sort",
                      "orig": "sort",
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
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
              },
            ],
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
            "input": "data",
            "name": "load",
            "points": [
              {
                "args": {
                  "query": [
                    {
                      "kind": "query",
                      "name": "filter_direction_id",
                      "orig": "filter_direction_id",
                      "type": "`$INTEGER`",
                    },
                    {
                      "kind": "query",
                      "name": "filter_id",
                      "orig": "filter_id",
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "query",
                      "name": "filter_name",
                      "orig": "filter_name",
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "query",
                      "name": "filter_route",
                      "orig": "filter_route",
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "query",
                      "name": "filter_route_pattern",
                      "orig": "filter_route_pattern",
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "query",
                      "name": "include",
                      "orig": "include",
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "query",
                      "name": "sort",
                      "orig": "sort",
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
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
              },
            ],
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
            "input": "data",
            "name": "load",
            "points": [
              {
                "args": {
                  "query": [
                    {
                      "kind": "query",
                      "name": "filter_direction_id",
                      "orig": "filter_direction_id",
                      "type": "`$INTEGER`",
                    },
                    {
                      "kind": "query",
                      "name": "filter_id",
                      "orig": "filter_id",
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "query",
                      "name": "filter_label",
                      "orig": "filter_label",
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "query",
                      "name": "filter_route",
                      "orig": "filter_route",
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "query",
                      "name": "filter_trip",
                      "orig": "filter_trip",
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "query",
                      "name": "include",
                      "orig": "include",
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "query",
                      "name": "sort",
                      "orig": "sort",
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
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
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
    },
    }
