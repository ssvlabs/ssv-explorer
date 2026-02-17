"use server"

import { endpoint } from "@/api"
import { api } from "@/api/api-client"
import { getOperatorPerformanceV2 } from "@/api/operator"

import {
  type Operator,
  type PaginatedValidatorsResponse,
  type Validator,
} from "@/types/api"
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
      const url = endpoint(params.network, "validators", searchParams)
      const response = await api.get<PaginatedValidatorsResponse>(url)

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

      const operatorsWithPerformanceV2 = await Promise.allSettled(
        response.operators.map(async (operator) => {
          try {
            const performanceData = await getOperatorPerformanceV2({
              network: params.network,
              operatorId: operator.id,
            })
            return {
              ...operator,
              performanceV2: performanceData,
            }
          } catch {
            return operator
          }
        })
      )

      const operators = operatorsWithPerformanceV2
        .map((result, index) => {
          if (result.status === "fulfilled") {
            return result.value
          }

          const operator = response.operators[index]
          return operator || null
        })
        .filter((operator): operator is Operator => operator !== null)

      return {
        ...response,
        operators,
        status: mapBeaconChainStatus(
          response.validator_info?.status,
          response.status
        ),
      }
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
      return response.total_effective_balance
    },
    [`${params.network}/totalEffectiveBalance`],
    {
      revalidate: 30,
      tags: ["validator"],
    }
  )()
