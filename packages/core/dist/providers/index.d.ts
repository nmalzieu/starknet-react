import React from 'react';
import { ProviderInterface } from 'starknet';
import { Connector } from '../connectors';
interface StarknetProviderProps {
    children?: React.ReactNode;
    defaultProvider?: ProviderInterface;
    connectors?: Connector[];
    autoConnect?: boolean;
}
export declare function StarknetProvider({ children, defaultProvider, connectors, autoConnect, }: StarknetProviderProps): JSX.Element;
export {};
