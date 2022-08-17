"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useConnectors = void 0;
const react_1 = require("react");
const context_1 = require("./context");
function useConnectors() {
    const { connectors, connect, disconnect } = (0, context_1.useStarknet)();
    const available = (0, react_1.useMemo)(() => {
        return connectors.filter((c) => c.available());
    }, [connectors]);
    return { available, connectors, connect, disconnect };
}
exports.useConnectors = useConnectors;
//# sourceMappingURL=connectors.js.map