
import { BaseFeature } from './feature/base/BaseFeature'
import { RatelimitFeature } from './feature/ratelimit/RatelimitFeature'
import { RetryFeature } from './feature/retry/RetryFeature'
import { TestFeature } from './feature/test/TestFeature'
import { TimeoutFeature } from './feature/timeout/TimeoutFeature'



const FEATURE_CLASS: Record<string, typeof BaseFeature> = {
   ratelimit: RatelimitFeature,
 retry: RetryFeature,
 test: TestFeature,
 timeout: TimeoutFeature,

}


// Per-feature plugin DEFINITIONS (voxgig/plugin `Definition` values), from
// the model's active plugin groups. A feature that takes a `plugins` option
// (secrets over sekreto) reads its own entry; a feature with no plugins has
// none. Named imports above make each definition statically reachable, so
// an SDK carries exactly the plugin modules its model selects — the same
// leanness the old side-effect registry imports bought, without a registry.
const FEATURE_PLUGINS: Record<string, any[]> = {
  
}


class Config {

  makeFeature(this: any, fn: string) {
    const fc = FEATURE_CLASS[fn]
    const fi = new fc()
    // TODO: errors etc
    return fi
  }

  // False for a feature added at runtime via options.extend (station's
  // adopt path) - the constructor uses this to skip makeFeature for names
  // no generated class backs.
  hasFeature(this: any, fn: string) {
    return null != FEATURE_CLASS[fn]
  }


  main = {
    name: 'MbtaV3',
        slug: "mbta-v3",
    version: "0.0.1",
    target: "ts",

  }


  feature = {
     ratelimit:     {
      "options": {
        "active": false,
        "burst": 5,
        "rate": 5
      },
      "optspec": {
        "now": "`$FUNCTION`",
        "sleep": "`$FUNCTION`"
      },
      "strict": false,
      "transport": "wrap"
    },
 retry:     {
      "options": {
        "active": false,
        "factor": 2,
        "maxDelay": 2000,
        "minDelay": 50,
        "retries": 2,
        "statuses": [
          408,
          425,
          429,
          500,
          502,
          503,
          504
        ]
      },
      "optspec": {
        "jitter": "`$BOOLEAN`",
        "sleep": "`$FUNCTION`"
      },
      "strict": false,
      "transport": "wrap"
    },
 test:     {
      "options": {
        "active": false
      },
      "optspec": {
        "entity": "`$MAP`",
        "net": "`$MAP`"
      },
      "strict": false,
      "transport": "base"
    },
 timeout:     {
      "options": {
        "active": false,
        "ms": 30000
      },
      "optspec": {
        "clearTimer": "`$FUNCTION`",
        "setTimer": "`$FUNCTION`"
      },
      "strict": false,
      "transport": "wrap"
    },

  }


  options = {
    base: "https://api-v3.mbta.com",

    auth: {
      prefix: '',
      name: 'x-api-key',
    },

    headers: {
      "content-type": "application/json"
    },

    entity: {
      
        alert: {
        },
  
        facility: {
        },
  
        line: {
        },
  
        prediction: {
        },
  
        route: {
        },
  
        route_pattern: {
        },
  
        schedule: {
        },
  
        service: {
        },
  
        shape: {
        },
  
        stop: {
        },
  
        trip: {
        },
  
        vehicle: {
        },
  
    }
  }


  entity = {
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
                    "type": "`$STRING`"
                  },
                  {
                    "kind": "query",
                    "name": "filter_route",
                    "orig": "filter_route",
                    "type": "`$STRING`"
                  },
                  {
                    "kind": "query",
                    "name": "filter_stop",
                    "orig": "filter_stop",
                    "type": "`$STRING`"
                  },
                  {
                    "kind": "query",
                    "name": "include",
                    "orig": "include",
                    "type": "`$STRING`"
                  },
                  {
                    "kind": "query",
                    "name": "sort",
                    "orig": "sort",
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/alerts",
              "segments": [
                {
                  "lit": "alerts"
                }
              ],
              "select": {
                "exist": [
                  "filter_activity",
                  "filter_route",
                  "filter_stop",
                  "include",
                  "sort"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "parts": [
                "alerts"
              ]
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
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
                    "type": "`$STRING`"
                  },
                  {
                    "kind": "query",
                    "name": "filter_type",
                    "orig": "filter_type",
                    "type": "`$STRING`"
                  },
                  {
                    "kind": "query",
                    "name": "include",
                    "orig": "include",
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/facilities",
              "segments": [
                {
                  "lit": "facilities"
                }
              ],
              "select": {
                "exist": [
                  "filter_stop",
                  "filter_type",
                  "include"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "parts": [
                "facilities"
              ]
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
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
                    "type": "`$STRING`"
                  },
                  {
                    "kind": "query",
                    "name": "include",
                    "orig": "include",
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/lines",
              "segments": [
                {
                  "lit": "lines"
                }
              ],
              "select": {
                "exist": [
                  "filter_id",
                  "include"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "parts": [
                "lines"
              ]
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
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
                    "type": "`$INTEGER`"
                  },
                  {
                    "kind": "query",
                    "name": "filter_route",
                    "orig": "filter_route",
                    "type": "`$STRING`"
                  },
                  {
                    "kind": "query",
                    "name": "filter_stop",
                    "orig": "filter_stop",
                    "type": "`$STRING`"
                  },
                  {
                    "kind": "query",
                    "name": "filter_trip",
                    "orig": "filter_trip",
                    "type": "`$STRING`"
                  },
                  {
                    "kind": "query",
                    "name": "include",
                    "orig": "include",
                    "type": "`$STRING`"
                  },
                  {
                    "kind": "query",
                    "name": "sort",
                    "orig": "sort",
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/predictions",
              "segments": [
                {
                  "lit": "predictions"
                }
              ],
              "select": {
                "exist": [
                  "filter_direction_id",
                  "filter_route",
                  "filter_stop",
                  "filter_trip",
                  "include",
                  "sort"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "parts": [
                "predictions"
              ]
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "route": {
      "fields": [
        {
          "name": "id",
          "type": "`$STRING`"
        }
      ],
      "id": {
        "field": "id",
        "name": "id"
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
                    "type": "`$STRING`"
                  },
                  {
                    "kind": "query",
                    "name": "filter_stop",
                    "orig": "filter_stop",
                    "type": "`$STRING`"
                  },
                  {
                    "example": "0,1",
                    "kind": "query",
                    "name": "filter_type",
                    "orig": "filter_type",
                    "type": "`$STRING`"
                  },
                  {
                    "kind": "query",
                    "name": "include",
                    "orig": "include",
                    "type": "`$STRING`"
                  },
                  {
                    "kind": "query",
                    "name": "sort",
                    "orig": "sort",
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/routes",
              "segments": [
                {
                  "lit": "routes"
                }
              ],
              "select": {
                "exist": [
                  "filter_id",
                  "filter_stop",
                  "filter_type",
                  "include",
                  "sort"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "parts": [
                "routes"
              ]
            },
            {
              "args": {
                "params": [
                  {
                    "kind": "param",
                    "name": "id",
                    "orig": "id",
                    "reqd": true,
                    "type": "`$STRING`"
                  }
                ],
                "query": [
                  {
                    "kind": "query",
                    "name": "include",
                    "orig": "include",
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/routes/{id}",
              "segments": [
                {
                  "lit": "routes"
                },
                {
                  "var": "id"
                }
              ],
              "select": {
                "exist": [
                  "id",
                  "include"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "parts": [
                "routes",
                "{id}"
              ]
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
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
                    "type": "`$INTEGER`"
                  },
                  {
                    "kind": "query",
                    "name": "filter_route",
                    "orig": "filter_route",
                    "type": "`$STRING`"
                  },
                  {
                    "kind": "query",
                    "name": "filter_stop",
                    "orig": "filter_stop",
                    "type": "`$STRING`"
                  },
                  {
                    "kind": "query",
                    "name": "include",
                    "orig": "include",
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/route_patterns",
              "segments": [
                {
                  "lit": "route_patterns"
                }
              ],
              "select": {
                "exist": [
                  "filter_direction_id",
                  "filter_route",
                  "filter_stop",
                  "include"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "parts": [
                "route_patterns"
              ]
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
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
                    "type": "`$STRING`"
                  },
                  {
                    "kind": "query",
                    "name": "filter_direction_id",
                    "orig": "filter_direction_id",
                    "type": "`$INTEGER`"
                  },
                  {
                    "kind": "query",
                    "name": "filter_max_time",
                    "orig": "filter_max_time",
                    "type": "`$STRING`"
                  },
                  {
                    "kind": "query",
                    "name": "filter_min_time",
                    "orig": "filter_min_time",
                    "type": "`$STRING`"
                  },
                  {
                    "kind": "query",
                    "name": "filter_route",
                    "orig": "filter_route",
                    "type": "`$STRING`"
                  },
                  {
                    "kind": "query",
                    "name": "filter_stop",
                    "orig": "filter_stop",
                    "type": "`$STRING`"
                  },
                  {
                    "kind": "query",
                    "name": "filter_trip",
                    "orig": "filter_trip",
                    "type": "`$STRING`"
                  },
                  {
                    "kind": "query",
                    "name": "include",
                    "orig": "include",
                    "type": "`$STRING`"
                  },
                  {
                    "kind": "query",
                    "name": "sort",
                    "orig": "sort",
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/schedules",
              "segments": [
                {
                  "lit": "schedules"
                }
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
                  "sort"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "parts": [
                "schedules"
              ]
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
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
                    "type": "`$STRING`"
                  },
                  {
                    "kind": "query",
                    "name": "filter_route",
                    "orig": "filter_route",
                    "type": "`$STRING`"
                  },
                  {
                    "kind": "query",
                    "name": "include",
                    "orig": "include",
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/services",
              "segments": [
                {
                  "lit": "services"
                }
              ],
              "select": {
                "exist": [
                  "filter_id",
                  "filter_route",
                  "include"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "parts": [
                "services"
              ]
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
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
                    "type": "`$INTEGER`"
                  },
                  {
                    "kind": "query",
                    "name": "filter_route",
                    "orig": "filter_route",
                    "type": "`$STRING`"
                  },
                  {
                    "kind": "query",
                    "name": "include",
                    "orig": "include",
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/shapes",
              "segments": [
                {
                  "lit": "shapes"
                }
              ],
              "select": {
                "exist": [
                  "filter_direction_id",
                  "filter_route",
                  "include"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "parts": [
                "shapes"
              ]
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
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
                    "type": "`$STRING`"
                  },
                  {
                    "kind": "query",
                    "name": "filter_latitude",
                    "orig": "filter_latitude",
                    "type": "`$NUMBER`"
                  },
                  {
                    "kind": "query",
                    "name": "filter_location_type",
                    "orig": "filter_location_type",
                    "type": "`$INTEGER`"
                  },
                  {
                    "kind": "query",
                    "name": "filter_longitude",
                    "orig": "filter_longitude",
                    "type": "`$NUMBER`"
                  },
                  {
                    "kind": "query",
                    "name": "filter_radius",
                    "orig": "filter_radius",
                    "type": "`$NUMBER`"
                  },
                  {
                    "kind": "query",
                    "name": "filter_route",
                    "orig": "filter_route",
                    "type": "`$STRING`"
                  },
                  {
                    "kind": "query",
                    "name": "include",
                    "orig": "include",
                    "type": "`$STRING`"
                  },
                  {
                    "kind": "query",
                    "name": "sort",
                    "orig": "sort",
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/stops",
              "segments": [
                {
                  "lit": "stops"
                }
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
                  "sort"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "parts": [
                "stops"
              ]
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
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
                    "type": "`$INTEGER`"
                  },
                  {
                    "kind": "query",
                    "name": "filter_id",
                    "orig": "filter_id",
                    "type": "`$STRING`"
                  },
                  {
                    "kind": "query",
                    "name": "filter_name",
                    "orig": "filter_name",
                    "type": "`$STRING`"
                  },
                  {
                    "kind": "query",
                    "name": "filter_route",
                    "orig": "filter_route",
                    "type": "`$STRING`"
                  },
                  {
                    "kind": "query",
                    "name": "filter_route_pattern",
                    "orig": "filter_route_pattern",
                    "type": "`$STRING`"
                  },
                  {
                    "kind": "query",
                    "name": "include",
                    "orig": "include",
                    "type": "`$STRING`"
                  },
                  {
                    "kind": "query",
                    "name": "sort",
                    "orig": "sort",
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/trips",
              "segments": [
                {
                  "lit": "trips"
                }
              ],
              "select": {
                "exist": [
                  "filter_direction_id",
                  "filter_id",
                  "filter_name",
                  "filter_route",
                  "filter_route_pattern",
                  "include",
                  "sort"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "parts": [
                "trips"
              ]
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
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
                    "type": "`$INTEGER`"
                  },
                  {
                    "kind": "query",
                    "name": "filter_id",
                    "orig": "filter_id",
                    "type": "`$STRING`"
                  },
                  {
                    "kind": "query",
                    "name": "filter_label",
                    "orig": "filter_label",
                    "type": "`$STRING`"
                  },
                  {
                    "kind": "query",
                    "name": "filter_route",
                    "orig": "filter_route",
                    "type": "`$STRING`"
                  },
                  {
                    "kind": "query",
                    "name": "filter_trip",
                    "orig": "filter_trip",
                    "type": "`$STRING`"
                  },
                  {
                    "kind": "query",
                    "name": "include",
                    "orig": "include",
                    "type": "`$STRING`"
                  },
                  {
                    "kind": "query",
                    "name": "sort",
                    "orig": "sort",
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/vehicles",
              "segments": [
                {
                  "lit": "vehicles"
                }
              ],
              "select": {
                "exist": [
                  "filter_direction_id",
                  "filter_id",
                  "filter_label",
                  "filter_route",
                  "filter_trip",
                  "include",
                  "sort"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "parts": [
                "vehicles"
              ]
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    }
  }
}


const config = new Config()

export {
  config,
  FEATURE_PLUGINS,
}

