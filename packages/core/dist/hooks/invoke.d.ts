import { AddTransactionResponse, ContractInterface, Overrides } from 'starknet';
interface UseStarknetInvokeArgs {
    contract?: ContractInterface;
    method?: string;
}
export interface InvokeArgs<T extends unknown[]> {
    args: T;
    overrides?: Overrides;
    metadata?: any;
}
export interface UseStarknetInvoke<T extends unknown[]> {
    data?: string;
    loading: boolean;
    error?: string;
    reset: () => void;
    invoke: ({ args, metadata }: InvokeArgs<T>) => Promise<AddTransactionResponse | undefined>;
}
export declare function useStarknetInvoke<T extends unknown[]>({ contract, method, }: UseStarknetInvokeArgs): UseStarknetInvoke<T>;
export {};
