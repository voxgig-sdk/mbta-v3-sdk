import { MbtaV3EntityBase } from '../MbtaV3EntityBase';
import type { MbtaV3SDK } from '../MbtaV3SDK';
import type { Control } from '../types';
import type { Schedule, ScheduleLoadMatch } from '../MbtaV3Types';
declare class ScheduleEntity extends MbtaV3EntityBase<Schedule> {
    constructor(client: MbtaV3SDK, entopts: any);
    make(this: ScheduleEntity): ScheduleEntity;
    load(this: any, reqmatch?: ScheduleLoadMatch, ctrl?: Control): Promise<ScheduleEntity>;
}
export { ScheduleEntity };
