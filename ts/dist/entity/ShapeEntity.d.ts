import { MbtaV3EntityBase } from '../MbtaV3EntityBase';
import type { MbtaV3SDK } from '../MbtaV3SDK';
import type { Control } from '../types';
import type { Shape, ShapeLoadMatch } from '../MbtaV3Types';
declare class ShapeEntity extends MbtaV3EntityBase<Shape> {
    constructor(client: MbtaV3SDK, entopts: any);
    make(this: ShapeEntity): ShapeEntity;
    load(this: any, reqmatch?: ShapeLoadMatch, ctrl?: Control): Promise<ShapeEntity>;
}
export { ShapeEntity };
