"use server"

import { endpoint } from "@/api"
import { api } from "@/api/api-client"
import { omitBy } from "lodash-es"

import { type DutiesResponse } from "@/types/api/duties"
import { type DutyDetailsResponse } from "@/types/api/duty-details"
import { type ChainName } from "@/config/chains"
import { type DutiesSearchSchema } from "@/lib/search-parsers/duties-search-parsers"
import { stringifyBigints } from "@/lib/utils/bigint"
import { serializeSortingState } from "@/lib/utils/parsers"
import { remove0x } from "@/lib/utils/strings"
import { unstable_cache } from "@/lib/utils/unstable-cache"

export const searchDuties = async (
  params: Partial<DutiesSearchSchema> &
    Required<Pick<DutiesSearchSchema, "validatorPublicKey">> & {
      network: ChainName
    }
): Promise<DutiesResponse> =>
  await unstable_cache(
    async () => {
      const filtered = omitBy(
        {
          ...params,
          sort: params.sort ? serializeSortingState(params.sort) : undefined,
        },
        (value) => value === undefined || value === null
      )

      const searchParams = new URLSearchParams(
        filtered as unknown as Record<string, string>
      )

      return await api.get<DutiesResponse>(
        endpoint(
          params.network,
          `duties/${remove0x(params.validatorPublicKey || "")}`,
          `?${searchParams}&includeFailed=true`
        )
      )
    },
    [JSON.stringify(stringifyBigints(params))],
    {
      revalidate: 30,
      tags: ["duties"],
    }
  )()

export const getDutyDetails = async (params: {
  publicKey: string
  slot: number
  role: string
  network: ChainName
}): Promise<DutyDetailsResponse> =>
  await unstable_cache(
    async () => {
      const searchParams = new URLSearchParams({
        slot: params.slot.toString(),
        role: params.role.toLowerCase(),
      })

      return await api.get<DutyDetailsResponse>(
        endpoint(
          params.network,
          `hoodi/duties/details/${remove0x(params.publicKey)}`,
          `?${searchParams}`
        )
      )
    },
    [JSON.stringify(params)],
    {
      revalidate: 30,
      tags: ["duty-details"],
    }
  )()
