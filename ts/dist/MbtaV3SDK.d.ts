import { AlertEntity } from './entity/AlertEntity';
import { FacilityEntity } from './entity/FacilityEntity';
import { LineEntity } from './entity/LineEntity';
import { PredictionEntity } from './entity/PredictionEntity';
import { RouteEntity } from './entity/RouteEntity';
import { RoutePatternEntity } from './entity/RoutePatternEntity';
import { ScheduleEntity } from './entity/ScheduleEntity';
import { ServiceEntity } from './entity/ServiceEntity';
import { ShapeEntity } from './entity/ShapeEntity';
import { StopEntity } from './entity/StopEntity';
import { TripEntity } from './entity/TripEntity';
import { VehicleEntity } from './entity/VehicleEntity';
export type * from './MbtaV3Types';
import { inspect } from 'node:util';
import type { Context, Feature } from './types';
import { config } from './Config';
import { MbtaV3EntityBase } from './MbtaV3EntityBase';
import { Utility } from './utility/Utility';
import { BaseFeature } from './feature/base/BaseFeature';
declare const stdutil: Utility;
declare class MbtaV3SDK {
    _mode: string;
    _options: any;
    _utility: Utility;
    _features: Feature[];
    _rootctx: Context;
    constructor(options?: any);
    options(): any;
    utility(): any;
    prepare(fetchargs?: any): Promise<any>;
    direct(fetchargs?: any): Promise<Error | {
        ok: boolean;
        status: number;
        headers: any;
        data: any;
        err?: undefined;
    } | {
        ok: boolean;
        err: any;
        status?: undefined;
        headers?: undefined;
        data?: undefined;
    }>;
    _rawRequest(fetchargs?: any): Promise<Error | {
        ok: boolean;
        status: number;
        headers: any;
        data: any;
        err?: undefined;
    } | {
        ok: boolean;
        err: any;
        status?: undefined;
        headers?: undefined;
        data?: undefined;
    }>;
    graphql(query: string, variables?: any, ctrl?: any): Promise<any>;
    Alert(entopts?: Record<string, any>): AlertEntity;
    Facility(entopts?: Record<string, any>): FacilityEntity;
    Line(entopts?: Record<string, any>): LineEntity;
    Prediction(entopts?: Record<string, any>): PredictionEntity;
    Route(entopts?: Record<string, any>): RouteEntity;
    RoutePattern(entopts?: Record<string, any>): RoutePatternEntity;
    Schedule(entopts?: Record<string, any>): ScheduleEntity;
    Service(entopts?: Record<string, any>): ServiceEntity;
    Shape(entopts?: Record<string, any>): ShapeEntity;
    Stop(entopts?: Record<string, any>): StopEntity;
    Trip(entopts?: Record<string, any>): TripEntity;
    Vehicle(entopts?: Record<string, any>): VehicleEntity;
    static test(testoptsarg?: any, sdkoptsarg?: any): MbtaV3SDK;
    tester(testopts?: any, sdkopts?: any): MbtaV3SDK;
    toJSON(): {
        name: string;
    };
    toString(): string;
    [inspect.custom](): string;
}
declare const SDK: typeof MbtaV3SDK;
export { stdutil, config, BaseFeature, MbtaV3EntityBase, MbtaV3SDK, SDK, };
