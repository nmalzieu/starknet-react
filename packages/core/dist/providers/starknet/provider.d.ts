import React from 'react';
import { ProviderInterface } from 'starknet';
import { Connector } from '../../connectors';
export interface StarknetProviderProps {
    children: React.ReactNode;
    defaultProvider?: ProviderInterface;
    connectors?: Connector[];
    autoConnect?: boolean;
}
export declare function StarknetLibraryProvider({ children, defaultProvider, connectors, autoConnect, }: StarknetProviderProps): JSX.Element;
