"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.STARKNET_INITIAL_STATE = void 0;
const starknet_1 = require("starknet");
exports.STARKNET_INITIAL_STATE = {
    account: undefined,
    connect: () => undefined,
    disconnect: () => undefined,
    library: starknet_1.defaultProvider,
    connectors: [],
};
//# sourceMappingURL=model.js.map