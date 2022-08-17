"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useStarknetInvoke = void 0;
const react_1 = require("react");
const __1 = require("..");
function starknetInvokeReducer(state, action) {
    if (action.type === 'start_invoke') {
        return {
            ...state,
            loading: true,
        };
    }
    else if (action.type === 'set_invoke_response') {
        return {
            ...state,
            data: action.data.transaction_hash,
            error: undefined,
            loading: false,
        };
    }
    else if (action.type === 'set_invoke_error') {
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
function useStarknetInvoke({ contract, method, }) {
    const { addTransaction } = (0, __1.useStarknetTransactionManager)();
    const [state, dispatch] = (0, react_1.useReducer)(starknetInvokeReducer, {
        loading: false,
    });
    const reset = (0, react_1.useCallback)(() => {
        dispatch({ type: 'reset' });
    }, [dispatch]);
    const invoke = (0, react_1.useCallback)(async ({ args, overrides, metadata }) => {
        if (contract && method && args) {
            try {
                dispatch({ type: 'start_invoke' });
                const response = await contract.invoke(method, args, overrides);
                dispatch({ type: 'set_invoke_response', data: response });
                // start tracking the transaction
                addTransaction({
                    status: response.code,
                    transactionHash: response.transaction_hash,
                    metadata,
                });
            }
            catch (err) {
                const message = err instanceof Error ? err.message : String(err);
                dispatch({ type: 'set_invoke_error', error: message });
            }
        }
        return undefined;
    }, [contract, method, addTransaction]);
    return { data: state.data, loading: state.loading, error: state.error, reset, invoke };
}
exports.useStarknetInvoke = useStarknetInvoke;
//# sourceMappingURL=invoke.js.map