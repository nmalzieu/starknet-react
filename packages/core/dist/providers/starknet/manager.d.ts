import { ProviderInterface } from 'starknet';
import { StarknetState } from './model';
import { Connector } from '../../connectors';
interface UseStarknetManagerProps {
    defaultProvider?: ProviderInterface;
    connectors?: Connector[];
    autoConnect?: boolean;
}
export declare function useStarknetManager({ defaultProvider: userDefaultProvider, connectors: userConnectors, autoConnect, }: UseStarknetManagerProps): StarknetState;
export {};
