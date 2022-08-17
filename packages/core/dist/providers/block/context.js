"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useStarknetBlock = exports.StarknetBlockContext = void 0;
const react_1 = require("react");
exports.StarknetBlockContext = (0, react_1.createContext)({});
function useStarknetBlock() {
    return (0, react_1.useContext)(exports.StarknetBlockContext);
}
exports.useStarknetBlock = useStarknetBlock;
//# sourceMappingURL=context.js.map