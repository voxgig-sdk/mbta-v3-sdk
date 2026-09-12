import { MbtaV3EntityBase } from '../MbtaV3EntityBase';
import type { MbtaV3SDK } from '../MbtaV3SDK';
import type { Control } from '../types';
import type { Stop, StopLoadMatch } from '../MbtaV3Types';
declare class StopEntity extends MbtaV3EntityBase<Stop> {
    constructor(client: MbtaV3SDK, entopts: any);
    make(this: StopEntity): StopEntity;
    load(this: any, reqmatch?: StopLoadMatch, ctrl?: Control): Promise<StopEntity>;
}
export { StopEntity };
