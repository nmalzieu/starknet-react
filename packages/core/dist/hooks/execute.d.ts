import { AddTransactionResponse } from 'starknet';
interface Call {
    contractAddress: string;
    entrypoint: string;
    calldata: unknown[];
}
interface UseStarknetExecuteArgs {
    calls?: Call | Call[];
    metadata?: any;
}
export interface UseStarknetExecute {
    data?: string;
    loading: boolean;
    error?: string;
    reset: () => void;
    execute: () => Promise<AddTransactionResponse | undefined>;
}
export declare function useStarknetExecute({ calls, metadata }: UseStarknetExecuteArgs): {
    data: string | undefined;
    loading: boolean;
    error: string | undefined;
    reset: () => void;
    execute: () => Promise<undefined>;
};
export {};
