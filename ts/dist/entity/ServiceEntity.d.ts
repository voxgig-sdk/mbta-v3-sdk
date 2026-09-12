import { MbtaV3EntityBase } from '../MbtaV3EntityBase';
import type { MbtaV3SDK } from '../MbtaV3SDK';
import type { Control } from '../types';
import type { Service, ServiceLoadMatch } from '../MbtaV3Types';
declare class ServiceEntity extends MbtaV3EntityBase<Service> {
    constructor(client: MbtaV3SDK, entopts: any);
    make(this: ServiceEntity): ServiceEntity;
    load(this: any, reqmatch?: ServiceLoadMatch, ctrl?: Control): Promise<ServiceEntity>;
}
export { ServiceEntity };
