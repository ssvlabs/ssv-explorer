"use server"

import { endpoint } from "@/api"
import { api } from "@/api/api-client"
import { omitBy } from "lodash-es"
import { type Address } from "viem"

import type {
  AccountStatsResponse,
  PaginatedAccountsResponse,
} from "@/types/api/account"
import type { AccountsSearchSchema } from "@/lib/search-parsers/accounts-search-parsers"
import { stringifyBigints } from "@/lib/utils/bigint"
import { unstable_cache } from "@/lib/utils/unstable-cache"

export const getAccounts = async (
  params: Partial<AccountsSearchSchema> & Pick<AccountsSearchSchema, "network">
): Promise<PaginatedAccountsResponse> =>
  await unstable_cache(
    async () => {
      const filtered = omitBy(
        params,
        (value) => value === undefined || value === null
      )

      const searchParams = new URLSearchParams(
        filtered as unknown as Record<string, string>
      )

      return api.get<PaginatedAccountsResponse>(
        endpoint(params.network, "accounts", `?${searchParams}`)
      )
    },
    [JSON.stringify(stringifyBigints(params))],
    {
      revalidate: 30,
      tags: ["accounts"],
    }
  )()

export const getAccountStats = async (
  params: { address: Address } & Pick<AccountsSearchSchema, "network">
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
