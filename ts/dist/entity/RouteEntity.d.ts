import { MbtaV3EntityBase } from '../MbtaV3EntityBase';
import type { MbtaV3SDK } from '../MbtaV3SDK';
import type { Control } from '../types';
import type { Route, RouteLoadMatch } from '../MbtaV3Types';
declare class RouteEntity extends MbtaV3EntityBase<Route> {
    constructor(client: MbtaV3SDK, entopts: any);
    make(this: RouteEntity): RouteEntity;
    load(this: any, reqmatch?: RouteLoadMatch, ctrl?: Control): Promise<RouteEntity>;
}
export { RouteEntity };
