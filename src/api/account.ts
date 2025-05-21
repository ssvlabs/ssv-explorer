"use server"

import { endpoint } from "@/api"
import { api } from "@/api/api-client"
import { isUndefined, omitBy } from "lodash-es"

import type {
  FilteredAccountsResponse,
  PaginatedAccountsResponse,
} from "@/types/api/account"
import { type ClustersSearchSchema } from "@/lib/search-parsers/clusters-search-parsers"
import { stringifyBigints } from "@/lib/utils/bigint"
import { unstable_cache } from "@/lib/utils/unstable-cache"

export const getAccounts = async (
  params: Partial<ClustersSearchSchema> & Pick<ClustersSearchSchema, "network">
): Promise<PaginatedAccountsResponse> =>
  await unstable_cache(
    async () => {
      const filtered = omitBy(params, isUndefined)

      const searchParams = new URLSearchParams(
        filtered as unknown as Record<string, string>
      )
      const data = await api.get<FilteredAccountsResponse>(
        endpoint(params.network, "accounts", `?${searchParams}`)
      )

      return {
        type: "accounts",
        accounts: data.data,
        pagination: {
          page: data.filter.page,
          per_page: data.filter.perPage,
          total: 1000,
          pages: 100,
        },
      } satisfies PaginatedAccountsResponse
    },
    [JSON.stringify(stringifyBigints(params))],
    {
      revalidate: 30,
      tags: ["accounts"],
    }
  )()
