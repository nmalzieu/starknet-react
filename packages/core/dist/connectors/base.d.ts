import { AccountInterface } from 'starknet'
export declare abstract class Connector<Options = any> {
  /** Options to use with connector */
  readonly options: Options
  constructor({ options }: { options: Options })
  /** Whether connector is available for use */
  abstract available(): boolean
  /** Whether connector is already authorized */
  abstract ready(): Promise<boolean>
  abstract connect(): Promise<AccountInterface>
  abstract disconnect(): Promise<void>
  abstract account(): Promise<AccountInterface>
  /** Unique connector id */
  abstract id(): string
  /** Connector name */
  abstract name(): string
}