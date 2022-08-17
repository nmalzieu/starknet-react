"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useSignTypedData = void 0;
const react_1 = require("react");
const starknet_1 = require("../providers/starknet");
function starknetSignReducer(state, action) {
    if (action.type === 'start_signing') {
        return {
            ...state,
            loading: true,
        };
    }
    else if (action.type === 'set_signature') {
        return {
            ...state,
            data: action.data,
            loading: false,
        };
    }
    else if (action.type === 'set_error') {
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
function useSignTypedData(typedData) {
    const [state, dispatch] = (0, react_1.useReducer)(starknetSignReducer, {
        loading: false,
    });
    const { account: accountAddress, connectors } = (0, starknet_1.useStarknet)();
    const reset = (0, react_1.useCallback)(() => {
        dispatch({ type: 'reset' });
    }, [dispatch]);
    const { data, error, loading } = state;
    const signTypedData = (0, react_1.useCallback)(async () => {
        dispatch({ type: 'reset' });
        dispatch({ type: 'start_signing' });
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
            const response = await accountInterface.signMessage(typedData);
            dispatch({ type: 'set_signature', data: response });
            return response;
        }
        catch (err) {
            const errorMessage = err instanceof Error ? err.message : String(err);
            dispatch({ type: 'set_error', error: errorMessage });
            console.error(err);
        }
    }, [accountAddress, connectors, typedData]);
    return {
        data,
        error,
        loading,
        signTypedData,
        reset,
    };
}
exports.useSignTypedData = useSignTypedData;
//# sourceMappingURL=sign.js.map