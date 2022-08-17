"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StarknetProvider = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const block_1 = require("./block");
const transaction_1 = require("./transaction");
const starknet_1 = require("./starknet");
function StarknetProvider({ children, defaultProvider, connectors, autoConnect, }) {
    return ((0, jsx_runtime_1.jsx)(starknet_1.StarknetLibraryProvider, { defaultProvider: defaultProvider, autoConnect: autoConnect, connectors: connectors, children: (0, jsx_runtime_1.jsx)(block_1.StarknetBlockProvider, { children: (0, jsx_runtime_1.jsx)(transaction_1.StarknetTransactionManagerProvider, { children: children }) }) }));
}
exports.StarknetProvider = StarknetProvider;
//# sourceMappingURL=index.js.map