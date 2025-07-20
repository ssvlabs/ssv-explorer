"use server"

import { endpoint } from "@/api"
import { api } from "@/api/api-client"

import { type PaginatedValidatorsResponse, type Validator } from "@/types/api"
import {
  validatorsSearchParamsSerializer,
  type ValidatorsSearchSchema,
} from "@/lib/search-parsers/validators-search-parsers"
import { stringifyBigints } from "@/lib/utils/bigint"
import { unstable_cache } from "@/lib/utils/unstable-cache"

export const searchValidators = async (
  params: Partial<ValidatorsSearchSchema> &
    Pick<ValidatorsSearchSchema, "network">
) =>
  await unstable_cache(
    async () => {
      const searchParams = validatorsSearchParamsSerializer(params)
      const response = await api.get<PaginatedValidatorsResponse>(
        endpoint(params.network, "validators", `?${searchParams}`)
      )
      return response
    },
    [JSON.stringify(stringifyBigints(params))],
    {
      revalidate: 30,
      tags: ["validators"],
    }
  )()

export const getValidator = async (
  params: Pick<ValidatorsSearchSchema, "network"> & {
    publicKey: string
  }
) =>
  await unstable_cache(
    async () => {
      const response = await api.get<Validator>(
        endpoint(params.network, "validators", params.publicKey)
      )
      if (!response) {
        throw new Error("Validator not found")
      }
      return response
    },
    [JSON.stringify(stringifyBigints(params))],
    {
      revalidate: 30,
      tags: ["validator"],
    }
  )()
