import { MbtaV3EntityBase } from '../MbtaV3EntityBase';
import type { MbtaV3SDK } from '../MbtaV3SDK';
import type { Control } from '../types';
import type { Alert, AlertLoadMatch } from '../MbtaV3Types';
declare class AlertEntity extends MbtaV3EntityBase<Alert> {
    constructor(client: MbtaV3SDK, entopts: any);
    make(this: AlertEntity): AlertEntity;
    load(this: any, reqmatch?: AlertLoadMatch, ctrl?: Control): Promise<AlertEntity>;
}
export { AlertEntity };
