import { ProviderInterface } from 'starknet';
import { Connector } from '../../connectors';
export interface StarknetState {
    account?: string;
    connect: (connector: Connector) => void;
    disconnect: () => void;
    library: ProviderInterface;
    connectors: Connector[];
    error?: Error;
}
export declare const STARKNET_INITIAL_STATE: StarknetState;
