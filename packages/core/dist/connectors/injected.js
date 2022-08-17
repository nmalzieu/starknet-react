"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isWalletObj = exports.getInstalledInjectedConnectors = exports.InjectedConnector = void 0;
const base_1 = require("./base");
const errors_1 = require("../errors");
class InjectedConnector extends base_1.Connector {
    constructor({ options }) {
        super({ options });
    }
    available() {
        this.ensureWallet();
        return this._wallet !== undefined;
    }
    async ready() {
        this.ensureWallet();
        if (!this._wallet)
            return false;
        return await this._wallet.isPreauthorized();
    }
    async connect() {
        this.ensureWallet();
        if (!this._wallet) {
            throw new errors_1.ConnectorNotFoundError();
        }
        try {
            await this._wallet.enable();
        }
        catch {
            // NOTE: Argent v3.0.0 swallows the `.enable` call on reject, so this won't get hit.
            throw new errors_1.UserRejectedRequestError();
        }
        if (!this._wallet.isConnected) {
            // NOTE: Argent v3.0.0 swallows the `.enable` call on reject, so this won't get hit.
            throw new errors_1.UserRejectedRequestError();
        }
        return this._wallet.account;
    }
    async disconnect() {
        this.ensureWallet();
        if (!this.available()) {
            throw new errors_1.ConnectorNotFoundError();
        }
        if (!this._wallet?.isConnected) {
            throw new errors_1.UserNotConnectedError();
        }
    }
    async account() {
        this.ensureWallet();
        if (!this._wallet) {
            throw new errors_1.ConnectorNotConnectedError();
        }
        // FIXME This type is wrong. account can be null if user didn't connect wallet
        return this._wallet.account;
    }
    id() {
        this.ensureWallet();
        if (!this._wallet) {
            throw new errors_1.ConnectorNotConnectedError();
        }
        return this._wallet.id;
    }
    name() {
        this.ensureWallet();
        if (!this._wallet) {
            throw new errors_1.ConnectorNotConnectedError();
        }
        return this._wallet.name;
    }
    ensureWallet() {
        const installed = getInstalledWallets();
        const wallet = installed[this.options.id];
        if (wallet) {
            this._wallet = wallet;
        }
    }
}
exports.InjectedConnector = InjectedConnector;
function getInstalledInjectedConnectors() {
    const installed = Object.keys(getInstalledWallets());
    const shuffled = shuffle(installed);
    return shuffled.map((id) => new InjectedConnector({ options: { id } }));
}
exports.getInstalledInjectedConnectors = getInstalledInjectedConnectors;
// The code below comes from get-starknet and it's just to show what
// we need from that library
function getInstalledWallets() {
    // no browser wallets on server
    if (typeof window === 'undefined') {
        return {};
    }
    return Object.getOwnPropertyNames(window).reduce((wallets, key) => {
        if (key.startsWith('starknet')) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const wallet = window[key];
            if ((0, exports.isWalletObj)(key, wallet) && !wallets[wallet.id]) {
                wallets[wallet.id] = wallet;
            }
        }
        return wallets;
    }, {});
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isWalletObj = (key, wallet) => {
    try {
        if (wallet &&
            [
                // wallet's must have methods/members, see IStarknetWindowObject
                'request',
                'isConnected',
                'provider',
                'enable',
                'isPreauthorized',
                'on',
                'off',
                'version',
            ].every((key) => key in wallet)) {
            if (key === 'starknet' && (!wallet.id || !wallet.name || !wallet.icon)) {
                wallet.name = 'Argent X';
                wallet.icon = '';
            }
            // test for new fields only after attempting
            // to enrich the legacy wallet ->
            return ['id', 'name', 'icon'].every((key) => key in wallet);
        }
        // eslint-disable-next-line no-empty
    }
    catch (err) { }
    return false;
};
exports.isWalletObj = isWalletObj;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const shuffle = (arr) => {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
};
//# sourceMappingURL=injected.js.map