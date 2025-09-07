"use server"

import { endpoint } from "@/api"
import { api } from "@/api/api-client"

import type { Country, Operator, OperatorsSearchResponse } from "@/types/api"
import { type ChainName } from "@/config/chains"
import {
  operatorSearchParamsSerializer,
  type OperatorsSearchSchema,
} from "@/lib/search-parsers/operator-search-parsers"
import { stringifyBigints } from "@/lib/utils/bigint"
import { addFallbackOperatorName } from "@/lib/utils/operator"
import { unstable_cache } from "@/lib/utils/unstable-cache"

export type OrderBy =
  | "name"
  | "id"
  | "validators_count"
  | "performance.30d"
  | "fee"
  | "mev"
export type Sort = "asc" | "desc"

export type SearchOperatorsParams = {
  search?: string
  ordering?: `${OrderBy}:${Sort}`
  type?: "verified_operator"
  has_dkg_address?: boolean
  page?: number
  perPage?: number
}

export const searchOperators = async (
  params: Partial<OperatorsSearchSchema> & { network: ChainName }
) =>
  await unstable_cache(
    async () => {
      const searchParams = operatorSearchParamsSerializer(params)
      const url = endpoint(params.network, "operators", searchParams)
      return api.get<OperatorsSearchResponse>(url).then((response) => ({
        operators: response.operators.map(addFallbackOperatorName),
        pagination: response.pagination,
      }))
    },
    [JSON.stringify(stringifyBigints(params))],
    {
      // revalidate: 30,
      tags: ["operators"],
    }
  )()

export interface OperatorMetadata {
  operatorName: string
  description: string
  location: string
  setupProvider: string
  eth1NodeClient: string
  eth2NodeClient: string
  mevRelays: string
  websiteUrl: string
  twitterUrl: string
  linkedinUrl: string
  dkgAddress: string
  logo: string
  signature: string
}

export const getOperator = async (
  params: { network: ChainName } & { id: number }
) => {
  return await unstable_cache(
    async () => {
      const url = endpoint(params.network, "operators", params.id)
      return api.get<Operator>(url).then(addFallbackOperatorName)
    },
    [JSON.stringify(params)],
    {
      // revalidate: 30,
      tags: ["operators"],
    }
  )()
}

export const getOperatorLocations = async (chain: ChainName) => {
  return await unstable_cache(
    async () => api.get<Country[]>(endpoint(chain, "operators/locations")),
    [chain.toString()],
    {
      // revalidate: 30,
      tags: ["operator-locations"],
    }
  )()
}
