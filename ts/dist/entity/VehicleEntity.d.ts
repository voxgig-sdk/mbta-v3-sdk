import { MbtaV3EntityBase } from '../MbtaV3EntityBase';
import type { MbtaV3SDK } from '../MbtaV3SDK';
import type { Control } from '../types';
import type { Vehicle, VehicleLoadMatch } from '../MbtaV3Types';
declare class VehicleEntity extends MbtaV3EntityBase<Vehicle> {
    constructor(client: MbtaV3SDK, entopts: any);
    make(this: VehicleEntity): VehicleEntity;
    load(this: any, reqmatch?: VehicleLoadMatch, ctrl?: Control): Promise<VehicleEntity>;
}
export { VehicleEntity };
