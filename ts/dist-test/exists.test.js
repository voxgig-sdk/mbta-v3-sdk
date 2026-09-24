"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_test_1 = require("node:test");
const node_assert_1 = require("node:assert");
const __1 = require("..");
(0, node_test_1.describe)('exists', async () => {
    (0, node_test_1.test)('test-mode', () => {
        const testsdk = __1.MbtaV3SDK.test();
        (0, node_assert_1.equal)(testsdk instanceof __1.MbtaV3SDK, true, 'MbtaV3SDK.test() must return a client synchronously');
    });
});
//# sourceMappingURL=exists.test.js.map