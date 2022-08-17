import { ContractInterface } from 'starknet';
import { BlockIdentifier } from 'starknet/dist/provider/utils';
interface UseStarknetCallOptions {
    watch?: boolean;
    blockIdentifier?: BlockIdentifier;
}
interface UseStarknetCallArgs<T extends unknown[]> {
    contract?: ContractInterface;
    method?: string;
    args?: T;
    options?: UseStarknetCallOptions;
}
export interface UseStarknetCall {
    data?: Array<any>;
    loading: boolean;
    error?: string;
    refresh: () => void;
}
export declare function useStarknetCall<T extends unknown[]>({ contract, method, args, options, }: UseStarknetCallArgs<T>): UseStarknetCall;
export {};
