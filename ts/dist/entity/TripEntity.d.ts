import { MbtaV3EntityBase } from '../MbtaV3EntityBase';
import type { MbtaV3SDK } from '../MbtaV3SDK';
import type { Control } from '../types';
import type { Trip, TripLoadMatch } from '../MbtaV3Types';
declare class TripEntity extends MbtaV3EntityBase<Trip> {
    constructor(client: MbtaV3SDK, entopts: any);
    make(this: TripEntity): TripEntity;
    load(this: any, reqmatch?: TripLoadMatch, ctrl?: Control): Promise<TripEntity>;
}
export { TripEntity };
