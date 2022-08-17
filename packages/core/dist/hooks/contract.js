"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useContract = void 0;
const react_1 = require("react");
const starknet_1 = require("starknet");
const starknet_2 = require("../providers/starknet");
function useContract({ abi, address }) {
    const { library } = (0, starknet_2.useStarknet)();
    const contract = (0, react_1.useMemo)(() => {
        if (abi && address && library) {
            return new starknet_1.Contract(abi, address, library);
        }
    }, [abi, address, library]);
    return { contract };
}
exports.useContract = useContract;
//# sourceMappingURL=contract.js.map