"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useStarknet = exports.StarknetContext = void 0;
const react_1 = require("react");
const model_1 = require("./model");
exports.StarknetContext = (0, react_1.createContext)(model_1.STARKNET_INITIAL_STATE);
function useStarknet() {
    return (0, react_1.useContext)(exports.StarknetContext);
}
exports.useStarknet = useStarknet;
//# sourceMappingURL=context.js.map