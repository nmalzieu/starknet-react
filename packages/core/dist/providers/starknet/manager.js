"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useStarknetManager = void 0;
const react_1 = require("react");
const starknet_1 = require("starknet");
const errors_1 = require("../../errors");
function reducer(state, action) {
    switch (action.type) {
        case 'set_account': {
            return { ...state, account: action.account };
        }
        case 'set_provider': {
            return { ...state, library: action.provider ?? starknet_1.defaultProvider };
        }
        case 'set_connector': {
            return { ...state, connector: action.connector };
        }
        case 'set_error': {
            return { ...state, error: action.error };
        }
        default: {
            return state;
        }
    }
}
function useStarknetManager({ defaultProvider: userDefaultProvider, connectors: userConnectors, autoConnect, }) {
    const connectors = userConnectors ?? [];
    const [state, dispatch] = (0, react_1.useReducer)(reducer, {
        library: userDefaultProvider ? userDefaultProvider : starknet_1.defaultProvider,
        connectors,
    });
    const { account, library, error } = state;
    const connect = (0, react_1.useCallback)((connector) => {
        connector.connect().then((account) => {
            dispatch({ type: 'set_account', account: account.address });
            dispatch({ type: 'set_provider', provider: account });
            dispatch({ type: 'set_connector', connector });
        }, (err) => {
            console.error(err);
            dispatch({ type: 'set_error', error: new errors_1.ConnectorNotFoundError() });
        });
    }, []);
    const disconnect = (0, react_1.useCallback)(() => {
        if (!state.connector)
            return;
        state.connector.disconnect().then(() => {
            dispatch({ type: 'set_account', account: undefined });
            dispatch({ type: 'set_provider', provider: undefined });
            dispatch({ type: 'set_connector', connector: undefined });
        }, (err) => {
            console.error(err);
            dispatch({ type: 'set_error', error: new errors_1.ConnectorNotFoundError() });
        });
    }, [state.connector]);
    (0, react_1.useEffect)(() => {
        async function tryAutoConnect(connectors) {
            // Autoconnect priority is defined by the order of the connectors.
            for (let i = 0; i < connectors.length; i++) {
                try {
                    const connector = connectors[i];
                    if (!(await connector.ready())) {
                        // Not already authorized, try next.
                        continue;
                    }
                    const account = await connector.connect();
                    dispatch({ type: 'set_account', account: account.address });
                    dispatch({ type: 'set_provider', provider: account });
                    dispatch({ type: 'set_connector', connector });
                    // Success, stop trying.
                    return;
                }
                catch {
                    // no-op, we continue trying the next connectors.
                }
            }
        }
        if (autoConnect && !account) {
            tryAutoConnect(connectors);
        }
        // Dependencies intentionally omitted since we only want
        // this executed once.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return { account, connect, disconnect, connectors, library, error };
}
exports.useStarknetManager = useStarknetManager;
//# sourceMappingURL=manager.js.map