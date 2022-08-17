import { Connector } from '~/connectors';
export interface UseConnectors {
    connectors: Connector[];
    available: Connector[];
    connect: (conn: Connector) => void;
    disconnect: () => void;
}
export declare function useConnectors(): UseConnectors;
