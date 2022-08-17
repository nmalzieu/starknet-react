import { Abi, Contract } from 'starknet';
interface UseContractArgs {
    abi?: Abi;
    address?: string;
}
interface UseContract {
    contract?: Contract;
}
export declare function useContract({ abi, address }: UseContractArgs): UseContract;
export {};
