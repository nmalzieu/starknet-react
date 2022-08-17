"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StarknetLibraryProvider = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const context_1 = require("./context");
const manager_1 = require("./manager");
function StarknetLibraryProvider({ children, defaultProvider, connectors, autoConnect, }) {
    const state = (0, manager_1.useStarknetManager)({ defaultProvider, connectors, autoConnect });
    return (0, jsx_runtime_1.jsx)(context_1.StarknetContext.Provider, { value: state, children: children });
}
exports.StarknetLibraryProvider = StarknetLibraryProvider;
//# sourceMappingURL=provider.js.map