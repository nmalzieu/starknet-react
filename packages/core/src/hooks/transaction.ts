import { useQueries, useQuery } from '@tanstack/react-query'
import { GetTransactionResponse, ProviderInterface } from 'starknet'
import { useStarknet } from '~/providers'

/** Arguments for the `useTransaction` hook. */
export interface UseTransactionProps {
  /** The transaction hash. */
  hash?: string
}

/** Value returned from `useTransaction`. */
export interface UseTransactionResult {
  /** The transaction data. */
  data?: GetTransactionResponse
  /** True if fetching data. */
  loading: boolean
  /** Error while fetching the transaction. */
  error?: unknown
}

/** Hook to fetch a single transaction. */
export function useTransaction({ hash }: UseTransactionProps): UseTransactionResult {
  const { library } = useStarknet()
  const { data, isLoading, error } = useQuery(
    queryKey({ library, hash }),
    fetchTransaction({ library, hash })
  )
  return { data, loading: isLoading, error: error ?? undefined }
}

/** Arguments for the `useTransactions` hook. */
export interface UseTransactionsProps {
  /** The transactions hashes. */
  hashes: string[]
}

/** Hook to fetch a list of transactions in parallel. */
export function useTransactions({ hashes }: UseTransactionsProps): UseTransactionResult[] {
  const { library } = useStarknet()
  const result = useQueries({
    queries: hashes.map((hash) => ({
      queryKey: queryKey({ library, hash }),
      queryFn: fetchTransaction({ library, hash }),
    })),
  })

  return result.map(({ data, isLoading, error }) => ({
    data,
    loading: isLoading,
    error: error ?? undefined,
  }))
}

function queryKey({ library, hash }: { library: ProviderInterface; hash?: string }) {
  return [
    {
      entity: 'transaction',
      chainId: library.chainId,
      hash: hash,
    },
  ] as const
}

function fetchTransaction({ library, hash }: { library: ProviderInterface; hash?: string }) {
  return async () => {
    if (!hash) throw new Error('hash is required')
    return await library.getTransaction(hash)
  }
}