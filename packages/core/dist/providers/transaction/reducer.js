"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transactionManagerReducer = void 0;
function transactionManagerReducer(state, action) {
    if (action.type === 'add_transaction') {
        return {
            ...state,
            transactions: state.transactions.push(action.transaction),
        };
    }
    else if (action.type === 'remove_transaction') {
        return {
            ...state,
            transactions: state.transactions.filter((tx) => tx.transactionHash !== action.transactionHash),
        };
    }
    else if (action.type === 'update_transaction') {
        if (action.transactionResponse.status === 'NOT_RECEIVED') {
            return state;
        }
        const entry = state.transactions.findEntry((tx) => tx.transactionHash === action.transactionHash);
        if (!entry) {
            return state;
        }
        const [transactionIndex, oldTransaction] = entry;
        const newTransaction = {
            status: action.transactionResponse.status,
            transaction: action.transactionResponse.transaction,
            transactionHash: action.transactionHash,
            lastUpdatedAt: action.lastUpdatedAt,
            metadata: oldTransaction.metadata,
        };
        return {
            ...state,
            transactions: state.transactions.set(transactionIndex, newTransaction),
        };
    }
    return state;
}
exports.transactionManagerReducer = transactionManagerReducer;
//# sourceMappingURL=reducer.js.map