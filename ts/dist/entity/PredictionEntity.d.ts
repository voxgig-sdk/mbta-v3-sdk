import { MbtaV3EntityBase } from '../MbtaV3EntityBase';
import type { MbtaV3SDK } from '../MbtaV3SDK';
import type { Control } from '../types';
import type { Prediction, PredictionLoadMatch } from '../MbtaV3Types';
declare class PredictionEntity extends MbtaV3EntityBase<Prediction> {
    constructor(client: MbtaV3SDK, entopts: any);
    make(this: PredictionEntity): PredictionEntity;
    load(this: any, reqmatch?: PredictionLoadMatch, ctrl?: Control): Promise<PredictionEntity>;
}
export { PredictionEntity };
