"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StarknetBlockProvider = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const starknet_1 = require("../starknet");
const context_1 = require("./context");
function StarknetBlockProvider({ interval, children, }) {
    const { library } = (0, starknet_1.useStarknet)();
    const [block, setBlock] = (0, react_1.useState)(undefined);
    const [loading, setLoading] = (0, react_1.useState)(undefined);
    const [error, setError] = (0, react_1.useState)(undefined);
    const fetchBlock = (0, react_1.useCallback)(() => {
        if (library) {
            library
                .getBlock()
                .then((newBlock) => {
                setBlock((oldBlock) => {
                    // The new block is a different object from the old one
                    // so simply updating the value of block would cause the state
                    // to change and trigger a re-render.
                    // This is especially bad because the block is used to trigger
                    // state updates downstream.
                    // Compare the new and old block hashes and update only if
                    // they changed. Notice we use hashes and not block numbers
                    // because we want to update the block in case of rollbacks.
                    if (oldBlock?.block_hash === newBlock.block_hash) {
                        return oldBlock;
                    }
                    // Reset error and return new block.
                    setError(undefined);
                    return newBlock;
                });
            })
                .catch(() => {
                setError('failed fetching block');
            })
                .finally(() => setLoading(false));
        }
    }, [library, setLoading, setError, setBlock]);
    (0, react_1.useEffect)(() => {
        // Set to loading on first load
        setLoading(true);
        // Fetch block immediately
        fetchBlock();
        const intervalId = setInterval(() => {
            fetchBlock();
        }, interval ?? 5000);
        return () => clearInterval(intervalId);
    }, [fetchBlock, interval]);
    return ((0, jsx_runtime_1.jsx)(context_1.StarknetBlockContext.Provider, { value: { data: block, loading, error }, children: children }));
}
exports.StarknetBlockProvider = StarknetBlockProvider;
//# sourceMappingURL=provider.js.map