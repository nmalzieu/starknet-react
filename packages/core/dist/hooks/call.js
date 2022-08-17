"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useStarknetCall = void 0;
const react_1 = require("react");
const block_1 = require("../providers/block");
function starknetCallReducer(state, action) {
    if (action.type === 'set_call_response') {
        return {
            ...state,
            data: action.data,
            error: undefined,
            loading: false,
        };
    }
    else if (action.type === 'set_call_error') {
        return {
            ...state,
            error: action.error,
            loading: false,
        };
    }
    else if (action.type === 'set_last_updated_at') {
        return {
            ...state,
            loading: false,
            lastUpdatedAt: action.blockHash,
        };
    }
    return state;
}
function useStarknetCall({ contract, method, args, options, }) {
    const [state, dispatch] = (0, react_1.useReducer)(starknetCallReducer, {
        loading: true,
        lastUpdatedAt: '',
    });
    const { data: block } = (0, block_1.useStarknetBlock)();
    // default to true
    const watch = options?.watch !== undefined ? options.watch : true;
    const blockIdentifier = options?.blockIdentifier || 'pending';
    const callContract = (0, react_1.useCallback)(async () => {
        if (contract && method && args) {
            return await contract.call(method, args, { blockIdentifier });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [contract, method, JSON.stringify(args)]);
    const refresh = (0, react_1.useCallback)(() => {
        callContract()
            .then((response) => {
            if (response) {
                dispatch({ type: 'set_call_response', data: response });
            }
        })
            .catch((err) => {
            if (err.message) {
                dispatch({ type: 'set_call_error', error: err.message });
            }
            else {
                dispatch({ type: 'set_call_error', error: 'call failed' });
            }
        });
    }, [callContract]);
    (0, react_1.useEffect)(() => {
        if (block?.block_hash) {
            if (block?.block_hash == state.lastUpdatedAt)
                return;
            // if not watching never refresh, but fetch at least once
            if (!watch && state.lastUpdatedAt !== '')
                return;
            refresh();
            dispatch({ type: 'set_last_updated_at', blockHash: block.block_hash });
        }
    }, [block?.block_hash, state.lastUpdatedAt, refresh, watch]);
    // always refresh on contract, method, or args change
    (0, react_1.useEffect)(() => {
        refresh();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [contract?.address, method, JSON.stringify(args)]);
    return { data: state.data, loading: state.loading, error: state.error, refresh };
}
exports.useStarknetCall = useStarknetCall;
//# sourceMappingURL=call.js.map