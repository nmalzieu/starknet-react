import { GetBlockResponse } from 'starknet';
export interface StarknetBlock {
    data?: GetBlockResponse;
    loading?: boolean;
    error?: string;
}
export declare const StarknetBlockContext: import("react").Context<StarknetBlock>;
export declare function useStarknetBlock(): StarknetBlock;
