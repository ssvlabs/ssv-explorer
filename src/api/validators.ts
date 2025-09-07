"use server"

import { endpoint } from "@/api"
import { api } from "@/api/api-client"

import { type PaginatedValidatorsResponse, type Validator } from "@/types/api"
import { type ChainName } from "@/config/chains"
import {
  validatorsSearchParamsSerializer,
  type ValidatorsSearchSchema,
} from "@/lib/search-parsers/validators-search-parsers"
import { stringifyBigints } from "@/lib/utils/bigint"
import { unstable_cache } from "@/lib/utils/unstable-cache"
import { mapBeaconChainStatus } from "@/lib/utils/validator-status-mapping"

export const searchValidators = async (
  params: Partial<ValidatorsSearchSchema> & { network: ChainName }
) =>
  await unstable_cache(
    async () => {
      const searchParams = validatorsSearchParamsSerializer(params)
      const response = await api.get<PaginatedValidatorsResponse>(
        endpoint(params.network, "validators", `?${searchParams}`)
      )

      // Map beacon chain status to user-friendly status
      if (response?.validators) {
        response.validators = response.validators.map((validator) => ({
          ...validator,
          status: mapBeaconChainStatus(
            validator.validator_info?.status,
            validator.status
          ),
        }))
      }

      return response
    },
    [JSON.stringify(stringifyBigints(params))],
    {
      revalidate: 30,
      tags: ["validators"],
    }
  )()

export const getValidator = async (
  params: { network: ChainName } & {
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
      // Map beacon chain status to user-friendly status
      const mappedResponse = {
        ...response,
        status: mapBeaconChainStatus(
          response.validator_info?.status,
          response.status
        ),
      }
      return mappedResponse
    },
    [JSON.stringify(stringifyBigints(params))],
    {
      revalidate: 30,
      tags: ["validator"],
    }
  )()
