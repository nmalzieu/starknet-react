"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useStarknetTransactionManager = exports.TransactionManagerContext = void 0;
const react_1 = require("react");
const model_1 = require("./model");
exports.TransactionManagerContext = (0, react_1.createContext)(model_1.TRANSACTION_MANAGER_INITIAL_STATE);
function useStarknetTransactionManager() {
    return (0, react_1.useContext)(exports.TransactionManagerContext);
}
exports.useStarknetTransactionManager = useStarknetTransactionManager;
//# sourceMappingURL=context.js.map