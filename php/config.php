<?php
declare(strict_types=1);

// MbtaV3 SDK configuration

class MbtaV3Config
{
    /** @var array<string,mixed>|null */
    private static ?array $shared_config = null;

    /**
     * Return the process-wide config, built once on first use. The SDK reads
     * the config on every request and never writes to it, so one instance is
     * shared by every client rather than rebuilt per client.
     *
     * PHP arrays are copy-on-write, so callers that do mutate the result get
     * their own copy and cannot disturb the shared one.
     */
    public static function shared_config(): array
    {
        if (self::$shared_config === null) {
            self::$shared_config = self::make_config();
        }
        return self::$shared_config;
    }

    /**
     * Build a fresh, fully materialised config array. Every call rebuilds the
     * whole structure, so prefer shared_config unless you need a private copy.
     */
    public static function make_config(): array
    {
        return [
            "main" => [
                "name" => "MbtaV3",
                "slug" => "mbta-v3",
                "version" => "0.0.1",
                "target" => "php",
            ],
            "feature" => [
                "ratelimit" => [
          'options' => [
            'active' => false,
            'burst' => 5,
            'rate' => 5,
          ],
          'optspec' => [
            'now' => '`$FUNCTION`',
            'sleep' => '`$FUNCTION`',
          ],
          'strict' => false,
          'transport' => 'wrap',
        ],
                "retry" => [
          'options' => [
            'active' => false,
            'factor' => 2,
            'maxDelay' => 2000,
            'minDelay' => 50,
            'retries' => 2,
            'statuses' => [
              408,
              425,
              429,
              500,
              502,
              503,
              504,
            ],
          ],
          'optspec' => [
            'jitter' => '`$BOOLEAN`',
            'sleep' => '`$FUNCTION`',
          ],
          'strict' => false,
          'transport' => 'wrap',
        ],
                "test" => [
          'options' => [
            'active' => false,
          ],
          'optspec' => [
            'entity' => '`$MAP`',
            'net' => '`$MAP`',
          ],
          'strict' => false,
          'transport' => 'base',
        ],
                "timeout" => [
          'options' => [
            'active' => false,
            'ms' => 30000,
          ],
          'optspec' => [
            'clearTimer' => '`$FUNCTION`',
            'setTimer' => '`$FUNCTION`',
          ],
          'strict' => false,
          'transport' => 'wrap',
        ],
            ],
            "options" => [
                "base" => "https://api-v3.mbta.com",
                "auth" => [
                    "prefix" => "",
                    "name" => "x-api-key",
                ],
                "headers" => [
          'content-type' => 'application/json',
        ],
                "entity" => [
                    "alert" => [],
                    "facility" => [],
                    "line" => [],
                    "prediction" => [],
                    "route" => [],
                    "route_pattern" => [],
                    "schedule" => [],
                    "service" => [],
                    "shape" => [],
                    "stop" => [],
                    "trip" => [],
                    "vehicle" => [],
                ],
            ],
            "entity" => [
        'alert' => [
          'fields' => [],
          'name' => 'alert',
          'op' => [
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/alerts',
                  'segments' => [
                    [
                      'lit' => 'alerts',
                    ],
                  ],
                  'parts' => [
                    'alerts',
                  ],
                  'rename' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [
                    'query' => [
                      [
                        'name' => 'filter_activity',
                        'orig' => 'filter_activity',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                      ],
                      [
                        'name' => 'filter_route',
                        'orig' => 'filter_route',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                      ],
                      [
                        'name' => 'filter_stop',
                        'orig' => 'filter_stop',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                      ],
                      [
                        'name' => 'include',
                        'orig' => 'include',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                      ],
                      [
                        'name' => 'sort',
                        'orig' => 'sort',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                      ],
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'filter_activity',
                      'filter_route',
                      'filter_stop',
                      'include',
                      'sort',
                    ],
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'facility' => [
          'fields' => [],
          'name' => 'facility',
          'op' => [
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/facilities',
                  'segments' => [
                    [
                      'lit' => 'facilities',
                    ],
                  ],
                  'parts' => [
                    'facilities',
                  ],
                  'rename' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [
                    'query' => [
                      [
                        'name' => 'filter_stop',
                        'orig' => 'filter_stop',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                      ],
                      [
                        'name' => 'filter_type',
                        'orig' => 'filter_type',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                      ],
                      [
                        'name' => 'include',
                        'orig' => 'include',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                      ],
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'filter_stop',
                      'filter_type',
                      'include',
                    ],
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'line' => [
          'fields' => [],
          'name' => 'line',
          'op' => [
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/lines',
                  'segments' => [
                    [
                      'lit' => 'lines',
                    ],
                  ],
                  'parts' => [
                    'lines',
                  ],
                  'rename' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [
                    'query' => [
                      [
                        'name' => 'filter_id',
                        'orig' => 'filter_id',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                      ],
                      [
                        'name' => 'include',
                        'orig' => 'include',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                      ],
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'filter_id',
                      'include',
                    ],
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'prediction' => [
          'fields' => [],
          'name' => 'prediction',
          'op' => [
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/predictions',
                  'segments' => [
                    [
                      'lit' => 'predictions',
                    ],
                  ],
                  'parts' => [
                    'predictions',
                  ],
                  'rename' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [
                    'query' => [
                      [
                        'name' => 'filter_direction_id',
                        'orig' => 'filter_direction_id',
                        'type' => '`$INTEGER`',
                        'kind' => 'query',
                      ],
                      [
                        'name' => 'filter_route',
                        'orig' => 'filter_route',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                      ],
                      [
                        'name' => 'filter_stop',
                        'orig' => 'filter_stop',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                      ],
                      [
                        'name' => 'filter_trip',
                        'orig' => 'filter_trip',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                      ],
                      [
                        'name' => 'include',
                        'orig' => 'include',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                      ],
                      [
                        'name' => 'sort',
                        'orig' => 'sort',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                      ],
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'filter_direction_id',
                      'filter_route',
                      'filter_stop',
                      'filter_trip',
                      'include',
                      'sort',
                    ],
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'route' => [
          'fields' => [
            [
              'name' => 'id',
              'title' => 'Id',
              'type' => '`$STRING`',
            ],
          ],
          'id' => [
            'field' => 'id',
            'name' => 'id',
          ],
          'name' => 'route',
          'op' => [
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/routes',
                  'segments' => [
                    [
                      'lit' => 'routes',
                    ],
                  ],
                  'parts' => [
                    'routes',
                  ],
                  'rename' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [
                    'query' => [
                      [
                        'name' => 'filter_id',
                        'orig' => 'filter_id',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                      ],
                      [
                        'name' => 'filter_stop',
                        'orig' => 'filter_stop',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                      ],
                      [
                        'name' => 'filter_type',
                        'orig' => 'filter_type',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                        'example' => '0,1',
                      ],
                      [
                        'name' => 'include',
                        'orig' => 'include',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                      ],
                      [
                        'name' => 'sort',
                        'orig' => 'sort',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                      ],
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'filter_id',
                      'filter_stop',
                      'filter_type',
                      'include',
                      'sort',
                    ],
                  ],
                ],
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/routes/{id}',
                  'segments' => [
                    [
                      'lit' => 'routes',
                    ],
                    [
                      'var' => 'id',
                    ],
                  ],
                  'parts' => [
                    'routes',
                    '{id}',
                  ],
                  'rename' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [
                    'params' => [
                      [
                        'name' => 'id',
                        'orig' => 'id',
                        'type' => '`$STRING`',
                        'kind' => 'param',
                        'reqd' => true,
                      ],
                    ],
                    'query' => [
                      [
                        'name' => 'include',
                        'orig' => 'include',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                      ],
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'id',
                      'include',
                    ],
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'route_pattern' => [
          'fields' => [],
          'name' => 'route_pattern',
          'op' => [
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/route_patterns',
                  'segments' => [
                    [
                      'lit' => 'route_patterns',
                    ],
                  ],
                  'parts' => [
                    'route_patterns',
                  ],
                  'rename' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [
                    'query' => [
                      [
                        'name' => 'filter_direction_id',
                        'orig' => 'filter_direction_id',
                        'type' => '`$INTEGER`',
                        'kind' => 'query',
                      ],
                      [
                        'name' => 'filter_route',
                        'orig' => 'filter_route',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                      ],
                      [
                        'name' => 'filter_stop',
                        'orig' => 'filter_stop',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                      ],
                      [
                        'name' => 'include',
                        'orig' => 'include',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                      ],
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'filter_direction_id',
                      'filter_route',
                      'filter_stop',
                      'include',
                    ],
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'schedule' => [
          'fields' => [],
          'name' => 'schedule',
          'op' => [
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/schedules',
                  'segments' => [
                    [
                      'lit' => 'schedules',
                    ],
                  ],
                  'parts' => [
                    'schedules',
                  ],
                  'rename' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [
                    'query' => [
                      [
                        'name' => 'filter_date',
                        'orig' => 'filter_date',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                      ],
                      [
                        'name' => 'filter_direction_id',
                        'orig' => 'filter_direction_id',
                        'type' => '`$INTEGER`',
                        'kind' => 'query',
                      ],
                      [
                        'name' => 'filter_max_time',
                        'orig' => 'filter_max_time',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                      ],
                      [
                        'name' => 'filter_min_time',
                        'orig' => 'filter_min_time',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                      ],
                      [
                        'name' => 'filter_route',
                        'orig' => 'filter_route',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                      ],
                      [
                        'name' => 'filter_stop',
                        'orig' => 'filter_stop',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                      ],
                      [
                        'name' => 'filter_trip',
                        'orig' => 'filter_trip',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                      ],
                      [
                        'name' => 'include',
                        'orig' => 'include',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                      ],
                      [
                        'name' => 'sort',
                        'orig' => 'sort',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                      ],
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'filter_date',
                      'filter_direction_id',
                      'filter_max_time',
                      'filter_min_time',
                      'filter_route',
                      'filter_stop',
                      'filter_trip',
                      'include',
                      'sort',
                    ],
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'service' => [
          'fields' => [],
          'name' => 'service',
          'op' => [
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/services',
                  'segments' => [
                    [
                      'lit' => 'services',
                    ],
                  ],
                  'parts' => [
                    'services',
                  ],
                  'rename' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [
                    'query' => [
                      [
                        'name' => 'filter_id',
                        'orig' => 'filter_id',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                      ],
                      [
                        'name' => 'filter_route',
                        'orig' => 'filter_route',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                      ],
                      [
                        'name' => 'include',
                        'orig' => 'include',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                      ],
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'filter_id',
                      'filter_route',
                      'include',
                    ],
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'shape' => [
          'fields' => [],
          'name' => 'shape',
          'op' => [
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/shapes',
                  'segments' => [
                    [
                      'lit' => 'shapes',
                    ],
                  ],
                  'parts' => [
                    'shapes',
                  ],
                  'rename' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [
                    'query' => [
                      [
                        'name' => 'filter_direction_id',
                        'orig' => 'filter_direction_id',
                        'type' => '`$INTEGER`',
                        'kind' => 'query',
                      ],
                      [
                        'name' => 'filter_route',
                        'orig' => 'filter_route',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                      ],
                      [
                        'name' => 'include',
                        'orig' => 'include',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                      ],
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'filter_direction_id',
                      'filter_route',
                      'include',
                    ],
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'stop' => [
          'fields' => [],
          'name' => 'stop',
          'op' => [
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/stops',
                  'segments' => [
                    [
                      'lit' => 'stops',
                    ],
                  ],
                  'parts' => [
                    'stops',
                  ],
                  'rename' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [
                    'query' => [
                      [
                        'name' => 'filter_id',
                        'orig' => 'filter_id',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                      ],
                      [
                        'name' => 'filter_latitude',
                        'orig' => 'filter_latitude',
                        'type' => '`$NUMBER`',
                        'kind' => 'query',
                      ],
                      [
                        'name' => 'filter_location_type',
                        'orig' => 'filter_location_type',
                        'type' => '`$INTEGER`',
                        'kind' => 'query',
                      ],
                      [
                        'name' => 'filter_longitude',
                        'orig' => 'filter_longitude',
                        'type' => '`$NUMBER`',
                        'kind' => 'query',
                      ],
                      [
                        'name' => 'filter_radius',
                        'orig' => 'filter_radius',
                        'type' => '`$NUMBER`',
                        'kind' => 'query',
                      ],
                      [
                        'name' => 'filter_route',
                        'orig' => 'filter_route',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                      ],
                      [
                        'name' => 'include',
                        'orig' => 'include',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                      ],
                      [
                        'name' => 'sort',
                        'orig' => 'sort',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                      ],
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'filter_id',
                      'filter_latitude',
                      'filter_location_type',
                      'filter_longitude',
                      'filter_radius',
                      'filter_route',
                      'include',
                      'sort',
                    ],
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'trip' => [
          'fields' => [],
          'name' => 'trip',
          'op' => [
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/trips',
                  'segments' => [
                    [
                      'lit' => 'trips',
                    ],
                  ],
                  'parts' => [
                    'trips',
                  ],
                  'rename' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [
                    'query' => [
                      [
                        'name' => 'filter_direction_id',
                        'orig' => 'filter_direction_id',
                        'type' => '`$INTEGER`',
                        'kind' => 'query',
                      ],
                      [
                        'name' => 'filter_id',
                        'orig' => 'filter_id',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                      ],
                      [
                        'name' => 'filter_name',
                        'orig' => 'filter_name',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                      ],
                      [
                        'name' => 'filter_route',
                        'orig' => 'filter_route',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                      ],
                      [
                        'name' => 'filter_route_pattern',
                        'orig' => 'filter_route_pattern',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                      ],
                      [
                        'name' => 'include',
                        'orig' => 'include',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                      ],
                      [
                        'name' => 'sort',
                        'orig' => 'sort',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                      ],
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'filter_direction_id',
                      'filter_id',
                      'filter_name',
                      'filter_route',
                      'filter_route_pattern',
                      'include',
                      'sort',
                    ],
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'vehicle' => [
          'fields' => [],
          'name' => 'vehicle',
          'op' => [
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/vehicles',
                  'segments' => [
                    [
                      'lit' => 'vehicles',
                    ],
                  ],
                  'parts' => [
                    'vehicles',
                  ],
                  'rename' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [
                    'query' => [
                      [
                        'name' => 'filter_direction_id',
                        'orig' => 'filter_direction_id',
                        'type' => '`$INTEGER`',
                        'kind' => 'query',
                      ],
                      [
                        'name' => 'filter_id',
                        'orig' => 'filter_id',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                      ],
                      [
                        'name' => 'filter_label',
                        'orig' => 'filter_label',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                      ],
                      [
                        'name' => 'filter_route',
                        'orig' => 'filter_route',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                      ],
                      [
                        'name' => 'filter_trip',
                        'orig' => 'filter_trip',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                      ],
                      [
                        'name' => 'include',
                        'orig' => 'include',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                      ],
                      [
                        'name' => 'sort',
                        'orig' => 'sort',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                      ],
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'filter_direction_id',
                      'filter_id',
                      'filter_label',
                      'filter_route',
                      'filter_trip',
                      'include',
                      'sort',
                    ],
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
      ],
        ];
    }


    public static function make_feature(string $name)
    {
        require_once __DIR__ . '/features.php';
        return MbtaV3Features::make_feature($name);
    }
}
