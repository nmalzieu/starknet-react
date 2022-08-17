"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StarknetTransactionManagerProvider = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const immutable_1 = require("immutable");
const starknet_1 = require("../starknet");
const context_1 = require("./context");
const reducer_1 = require("./reducer");
function shouldRefreshTransaction(transaction, now) {
    // try to get transaction data as soon as possible
    if (transaction.status === 'TRANSACTION_RECEIVED') {
        return true;
    }
    // wont' be updated anymore
    if (transaction.status === 'ACCEPTED_ON_L1' || transaction.status === 'REJECTED') {
        return false;
    }
    // every couple of minutes is enough. Blocks finalized infrequently.
    if (transaction.status === 'ACCEPTED_ON_L2') {
        return now - transaction.lastUpdatedAt > 120000;
    }
    return now - transaction.lastUpdatedAt > 15000;
}
function StarknetTransactionManagerProvider({ children, interval, }) {
    const { library } = (0, starknet_1.useStarknet)();
    const [state, dispatch] = (0, react_1.useReducer)(reducer_1.transactionManagerReducer, {
        transactions: (0, immutable_1.List)(),
    });
    const refresh = (0, react_1.useCallback)(async (transactionHash) => {
        try {
            const transactionResponse = await library.getTransaction(transactionHash);
            const lastUpdatedAt = Date.now();
            dispatch({
                type: 'update_transaction',
                transactionResponse,
                lastUpdatedAt,
                transactionHash,
            });
        }
        catch (err) {
            // TODO(fra): somehow should track the error
            console.error(err);
        }
    }, [library, dispatch]);
    const refreshAllTransactions = (0, react_1.useCallback)(() => {
        const now = Date.now();
        for (const transaction of state.transactions) {
            if (shouldRefreshTransaction(transaction, now)) {
                refresh(transaction.transactionHash);
            }
        }
    }, [state.transactions, refresh]);
    const addTransaction = (0, react_1.useCallback)((transaction) => {
        dispatch({ type: 'add_transaction', transaction });
    }, [dispatch]);
    const removeTransaction = (0, react_1.useCallback)((transactionHash) => {
        dispatch({ type: 'remove_transaction', transactionHash });
    }, [dispatch]);
    const refreshTransaction = (0, react_1.useCallback)((transactionHash) => {
        refresh(transactionHash);
    }, [refresh]);
    // periodically refresh all transactions.
    // do this more often than once per block since there are
    // different stages of "accepted" transactions.
    (0, react_1.useEffect)(() => {
        refreshAllTransactions();
        const intervalId = setInterval(() => {
            refreshAllTransactions();
        }, interval ?? 5000);
        return () => clearInterval(intervalId);
    }, [interval, refreshAllTransactions]);
    return ((0, jsx_runtime_1.jsx)(context_1.TransactionManagerContext.Provider, { value: {
            transactions: state.transactions.toArray(),
            addTransaction,
            removeTransaction,
            refreshTransaction,
        }, children: children }));
}
exports.StarknetTransactionManagerProvider = StarknetTransactionManagerProvider;
//# sourceMappingURL=provider.js.map