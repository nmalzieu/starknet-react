import { TypedData } from 'starknet/utils/typedData';
import type { Signature } from 'starknet';
export interface UseSignTypedData {
    data?: string[];
    error?: string;
    loading: boolean;
    signTypedData: () => Promise<Signature | undefined>;
    reset: () => void;
}
export declare function useSignTypedData(typedData: TypedData): UseSignTypedData;
