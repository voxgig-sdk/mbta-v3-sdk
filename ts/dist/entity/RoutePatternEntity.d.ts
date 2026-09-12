import { MbtaV3EntityBase } from '../MbtaV3EntityBase';
import type { MbtaV3SDK } from '../MbtaV3SDK';
import type { Control } from '../types';
import type { RoutePattern, RoutePatternLoadMatch } from '../MbtaV3Types';
declare class RoutePatternEntity extends MbtaV3EntityBase<RoutePattern> {
    constructor(client: MbtaV3SDK, entopts: any);
    make(this: RoutePatternEntity): RoutePatternEntity;
    load(this: any, reqmatch?: RoutePatternLoadMatch, ctrl?: Control): Promise<RoutePatternEntity>;
}
export { RoutePatternEntity };
