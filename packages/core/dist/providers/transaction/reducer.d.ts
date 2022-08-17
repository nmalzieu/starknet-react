import { GetTransactionResponse } from 'starknet';
import { List } from 'immutable';
import { Transaction, TransactionSubmitted } from './model';
export interface TransactionManagerState {
    transactions: List<Transaction>;
}
interface AddTransaction {
    type: 'add_transaction';
    transaction: TransactionSubmitted;
}
interface RemoveTransaction {
    type: 'remove_transaction';
    transactionHash: string;
}
interface UpdateTransaction {
    type: 'update_transaction';
    transactionResponse: GetTransactionResponse;
    lastUpdatedAt: number;
    transactionHash: string;
}
export declare type Action = AddTransaction | RemoveTransaction | UpdateTransaction;
export declare function transactionManagerReducer(state: TransactionManagerState, action: Action): TransactionManagerState;
export {};
