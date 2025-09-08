"use server"

import { endpoint } from "@/api"
import { api } from "@/api/api-client"

import { type OperatorStatistics } from "@/types/api/statistics"
import { type ChainName } from "@/config/chains"
import { unstable_cache } from "@/lib/utils/unstable-cache"

export const getOperatorStatistics = async (params: { network: ChainName }) => {
  return await unstable_cache(
    async () => {
      const url = endpoint(params.network, "statistics/operators")
      return api.get<OperatorStatistics>(url)
    },
    [JSON.stringify(params)],
    {
      // revalidate: 30,
      tags: ["operators/statistics"],
    }
  )()
}
