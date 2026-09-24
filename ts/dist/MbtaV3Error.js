"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MbtaV3Error = void 0;
class MbtaV3Error extends Error {
    isMbtaV3Error = true;
    sdk = 'MbtaV3';
    code;
    ctx;
    status = -1;
    // `err.notFound` rather than a magic number at every call site.
    get notFound() { return 404 === this.status; }
    constructor(code, msg, ctx) {
        super(msg);
        this.code = code;
        this.ctx = ctx;
    }
}
exports.MbtaV3Error = MbtaV3Error;
//# sourceMappingURL=MbtaV3Error.js.map