import { MbtaV3EntityBase } from '../MbtaV3EntityBase';
import type { MbtaV3SDK } from '../MbtaV3SDK';
import type { Control } from '../types';
import type { Line, LineLoadMatch } from '../MbtaV3Types';
declare class LineEntity extends MbtaV3EntityBase<Line> {
    constructor(client: MbtaV3SDK, entopts: any);
    make(this: LineEntity): LineEntity;
    load(this: any, reqmatch?: LineLoadMatch, ctrl?: Control): Promise<LineEntity>;
}
export { LineEntity };
