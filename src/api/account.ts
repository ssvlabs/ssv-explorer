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

const serializeEffectiveBalance = ([min, max]: [number, number]) =>
  [
    formatGwei(parseEther(min.toString())),
    formatGwei(parseEther(max.toString())),
  ].join(",")

export const searchAccounts = async (
  params: Partial<AccountsSearchSchema> & { network: ChainName }
): Promise<PaginatedAccountsResponse> =>
  await unstable_cache(
    async () => {
      const searchParams = new URLSearchParams(
        accountSearchParamsSerializer(params)
      )
      if (params.effectiveBalance) {
        searchParams.set(
          "effectiveBalance",
          serializeEffectiveBalance(params.effectiveBalance)
        )
      }
      const serializedSearchParams = searchParams.toString()
      const url = endpoint(
        params.network,
        "accounts",
        serializedSearchParams ? `?${serializedSearchParams}` : ""
      )
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
