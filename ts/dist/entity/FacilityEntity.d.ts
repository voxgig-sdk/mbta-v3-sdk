import { MbtaV3EntityBase } from '../MbtaV3EntityBase';
import type { MbtaV3SDK } from '../MbtaV3SDK';
import type { Control } from '../types';
import type { Facility, FacilityLoadMatch } from '../MbtaV3Types';
declare class FacilityEntity extends MbtaV3EntityBase<Facility> {
    constructor(client: MbtaV3SDK, entopts: any);
    make(this: FacilityEntity): FacilityEntity;
    load(this: any, reqmatch?: FacilityLoadMatch, ctrl?: Control): Promise<FacilityEntity>;
}
export { FacilityEntity };
