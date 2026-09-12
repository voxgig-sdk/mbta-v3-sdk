# MbtaV3 SDK configuration


# The sekreto plugin DEFINITIONS the model selected per feature, imported
# above by name from the modules the catalogue's active `plugin.def`
# entries declare. Handed to each feature (secrets builds its Sekreto
# with them): a provider kind not listed here is unknown to that SDK.
FEATURE_PLUGINS = {
}


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
            "slug": "mbta-v3",
            "version": "0.0.1",
            "target": "py",
        },
        "feature": {
            "test": {
        "options": {
          "active": False,
        },
        "transport": "base",
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
                "segments": [
                  {
                    "lit": "alerts",
                  },
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
                "parts": [
                  "alerts",
                ],
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
                "segments": [
                  {
                    "lit": "facilities",
                  },
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
                "parts": [
                  "facilities",
                ],
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
                "segments": [
                  {
                    "lit": "lines",
                  },
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
                "parts": [
                  "lines",
                ],
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
                "segments": [
                  {
                    "lit": "predictions",
                  },
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
                "parts": [
                  "predictions",
                ],
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "route": {
        "fields": [
          {
            "name": "id",
            "type": "`$STRING`",
          },
        ],
        "id": {
          "field": "id",
          "name": "id",
        },
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
                "segments": [
                  {
                    "lit": "routes",
                  },
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
                "parts": [
                  "routes",
                ],
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
                "segments": [
                  {
                    "lit": "routes",
                  },
                  {
                    "var": "id",
                  },
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
                "parts": [
                  "routes",
                  "{id}",
                ],
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
                "segments": [
                  {
                    "lit": "route_patterns",
                  },
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
                "parts": [
                  "route_patterns",
                ],
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
                "segments": [
                  {
                    "lit": "schedules",
                  },
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
                "parts": [
                  "schedules",
                ],
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
                "segments": [
                  {
                    "lit": "services",
                  },
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
                "parts": [
                  "services",
                ],
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
                "segments": [
                  {
                    "lit": "shapes",
                  },
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
                "parts": [
                  "shapes",
                ],
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
                "segments": [
                  {
                    "lit": "stops",
                  },
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
                "parts": [
                  "stops",
                ],
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
                "segments": [
                  {
                    "lit": "trips",
                  },
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
                "parts": [
                  "trips",
                ],
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
                "segments": [
                  {
                    "lit": "vehicles",
                  },
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
                "parts": [
                  "vehicles",
                ],
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
