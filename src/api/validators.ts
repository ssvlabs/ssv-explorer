"use server"

import { endpoint } from "@/api"
import { api } from "@/api/api-client"
import { formatGwei, parseEther } from "viem"

import type { PaginatedValidatorsResponse, Validator } from "@/types/api"
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
      const augmentedParams = {
        ...params,
        effectiveBalance: params.effectiveBalance
          ? (params.effectiveBalance.map(
              (value) => +formatGwei(parseEther(value.toString()))
            ) as [number, number])
          : params.effectiveBalance,
      }

      const searchParams = validatorsSearchParamsSerializer(augmentedParams)
      const url = endpoint(params.network, "validators", searchParams)
      const response = await api.get<PaginatedValidatorsResponse>(url)

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

      const operators = response.operators

      // Map beacon chain status to user-friendly status
      const mappedResponse = {
        ...response,
        operators,
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

export const getTotalEffectiveBalance = async (params: {
  network: ChainName
}) =>
  await unstable_cache(
    async () => {
      const response = await api.get<{
        total_effective_balance: string
      }>(endpoint(params.network, "validators", "totalEffectiveBalance"))
      // Have to return a string, not the BigInt as cache does not know how to serialize BigInt
      return response.total_effective_balance
    },
    [`${params.network}/totalEffectiveBalance`],
    {
      revalidate: 30,
      tags: ["validator"],
    }
  )()
