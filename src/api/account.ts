"use server"

import { endpoint } from "@/api"
import { api } from "@/api/api-client"
import { formatGwei, parseEther, type Address } from "viem"

import type {
  AccountStatsResponse,
  PaginatedAccountsResponse,
} from "@/types/api/account"
import { type ChainName } from "@/config/chains"
import {
  accountSearchParamsSerializer,
  type AccountsSearchSchema,
} from "@/lib/search-parsers/accounts-search-parsers"
import { stringifyBigints } from "@/lib/utils/bigint"
import { unstable_cache } from "@/lib/utils/unstable-cache"

export const searchAccounts = async (
  params: Partial<AccountsSearchSchema> & { network: ChainName }
): Promise<PaginatedAccountsResponse> =>
  await unstable_cache(
    async () => {
      const augmentedParams = {
        ...params,
        effectiveBalance: params.effectiveBalance
          ? (params.effectiveBalance.map(
              (value) => +formatGwei(parseEther(value.toString()))
            ) as [number, number])
          : params.effectiveBalance,
      }

      const searchParams = accountSearchParamsSerializer(augmentedParams)
      const url = endpoint(params.network, "accounts", searchParams)
      return api.get<PaginatedAccountsResponse>(url)
    },
    [JSON.stringify(stringifyBigints(params))],
    {
      revalidate: 30,
      tags: ["accounts"],
    }
  )()

export const getAccountStats = async (
  params: { address: Address } & { network: ChainName }
) =>
  await unstable_cache(
    async () => {
      return api.get<AccountStatsResponse>(
        endpoint(params.network, "accounts/counts", params.address)
      )
    },
    [JSON.stringify(stringifyBigints(params))],
    {
      revalidate: 30,
      tags: ["account-stats"],
    }
  )()
