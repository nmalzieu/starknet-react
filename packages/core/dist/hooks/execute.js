"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useStarknetExecute = void 0;
const react_1 = require("react");
const __1 = require("..");
function starknetExecuteReducer(state, action) {
    if (action.type === 'start_execute') {
        return {
            ...state,
            loading: true,
        };
    }
    else if (action.type === 'set_execute_response') {
        return {
            ...state,
            data: action.data.transaction_hash,
            error: undefined,
            loading: false,
        };
    }
    else if (action.type === 'set_execute_error') {
        return {
            ...state,
            error: action.error,
            loading: false,
        };
    }
    else if (action.type === 'reset') {
        return {
            ...state,
            data: undefined,
            error: undefined,
            loading: false,
        };
    }
    return state;
}
function useStarknetExecute({ calls, metadata }) {
    const { addTransaction } = (0, __1.useStarknetTransactionManager)();
    const [state, dispatch] = (0, react_1.useReducer)(starknetExecuteReducer, {
        loading: false,
    });
    const { account: accountAddress, connectors } = (0, __1.useStarknet)();
    const reset = (0, react_1.useCallback)(() => {
        dispatch({ type: 'reset' });
    }, [dispatch]);
    const execute = (0, react_1.useCallback)(async () => {
        if (calls) {
            try {
                let accountInterface = null;
                for (const connector of connectors) {
                    const account = await connector.account();
                    if (account.address === accountAddress) {
                        accountInterface = account;
                        break;
                    }
                }
                if (!accountInterface) {
                    throw new Error(`No connector for address ${accountAddress}`);
                }
                dispatch({ type: 'start_execute' });
                const response = await accountInterface.execute(calls);
                dispatch({ type: 'set_execute_response', data: response });
                // start tracking the transaction
                addTransaction({
                    status: response.code,
                    transactionHash: response.transaction_hash,
                    metadata,
                });
            }
            catch (err) {
                const message = err instanceof Error ? err.message : String(err);
                dispatch({ type: 'set_execute_error', error: message });
            }
        }
        return undefined;
    }, [accountAddress, connectors, addTransaction, calls, metadata]);
    return { data: state.data, loading: state.loading, error: state.error, reset, execute };
}
exports.useStarknetExecute = useStarknetExecute;
//# sourceMappingURL=execute.js.map