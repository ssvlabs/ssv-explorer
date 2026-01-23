import { NetworkFeeParams } from "@/api/network-fee"
import { isNumber, merge } from "lodash-es"
import type { Address } from "viem"
import { encodePacked, keccak256 } from "viem"

import type {
  Cluster,
  Operator,
  SearchValidator,
  SolidityCluster,
} from "@/types/api"
import { globals } from "@/config/globals"
import { bigintMax } from "@/lib/utils/bigint"
import { numberFormatter, sortNumbers } from "@/lib/utils/number"
import { sumOperatorsEthFees, sumOperatorsFees } from "@/lib/utils/operator"
import { add0x } from "@/lib/utils/strings"

export const createClusterHash = (
  account: Address,
  operators: readonly (Pick<Operator, "id"> | number)[]
) =>
  keccak256(
    encodePacked(
      ["address", "uint256[]"],
      [
        account,
        sortNumbers(
          operators.map((o) => {
            return BigInt(isNumber(o) ? o : o.id)
          })
        ),
      ]
    )
  )

export const getDefaultClusterData = (
  cluster: Partial<SolidityCluster> = {}
): SolidityCluster =>
  merge(
    {
      validatorCount: 0,
      networkFeeIndex: 0n,
      index: 0n,
      balance: 0n,
      active: true,
    },
    cluster
  )

export const formatClusterData = (cluster?: Partial<Cluster> | null) => ({
  active: cluster?.active ?? true,
  balance: BigInt(cluster?.balance ?? 0),
  index: BigInt(cluster?.index ?? 0),
  networkFeeIndex: BigInt(cluster?.networkFeeIndex ?? 0),
  validatorCount: cluster?.validatorCount ?? 0,
})

export const filterOutRemovedValidators = (
  fetchedValidators: SearchValidator[],
  removedOptimisticValidatorsPKs: string[]
) =>
  fetchedValidators.filter(
    (validator) =>
      !removedOptimisticValidatorsPKs.some(
        (pk) =>
          add0x(pk).toLowerCase() === add0x(validator.public_key).toLowerCase()
      )
  )

export type ClusterRunwayInput = {
  cluster: Pick<
    Cluster,
    | "migrated"
    | "validatorCount"
    | "effectiveBalance"
    | "operators"
    | "balance"
    | "ethBalance"
  >
  networkFeesParams: NetworkFeeParams
}

export const calculateRunway = ({
  cluster,
  networkFeesParams,
}: ClusterRunwayInput): bigint | null => {
  const isEthMode = cluster.migrated

  const liquidationThresholdBlocks = BigInt(
    isEthMode
      ? networkFeesParams.liquidationThresholdBlocks
      : networkFeesParams.liquidationThresholdBlocksSSV
  )
  const minimumLiquidationCollateral = BigInt(
    isEthMode
      ? networkFeesParams.minimumLiquidationCollateral
      : networkFeesParams.minimumLiquidationCollateralSSV
  )

  const operatorFees = isEthMode
    ? sumOperatorsEthFees(cluster.operators)
    : sumOperatorsFees(cluster.operators)

  const networkFee = BigInt(
    isEthMode
      ? networkFeesParams.ethNetworkFee
      : networkFeesParams.ssvNetworkFee
  )
  const balance = BigInt(
    isEthMode ? (cluster.ethBalance ?? 0) : (cluster.balance ?? 0)
  )

  const clusterEffectiveBalance = BigInt(cluster.effectiveBalance ?? 0)
  const minClusterEffectiveBalance = BigInt(cluster.validatorCount ?? 1) * 32n
  const effectiveBalance = bigintMax(
    clusterEffectiveBalance,
    minClusterEffectiveBalance
  )
  const validators = effectiveBalance / 32n
  const validatorMultiplier = validators === 0n ? 1n : validators

  const feesPerBlock = operatorFees + networkFee
  const burnRate = feesPerBlock * validatorMultiplier

  const collateral = bigintMax(
    burnRate * liquidationThresholdBlocks,
    minimumLiquidationCollateral
  )
  const burnRatePerDay = burnRate * globals.BLOCKS_PER_DAY
  const safeBurnRatePerDay = burnRatePerDay === 0n ? 1n : burnRatePerDay

  return bigintMax((balance - collateral) / safeBurnRatePerDay, 0n)
}

export const formatRunway = (days: bigint | null) => {
  return `${numberFormatter.format(days || 0n)} Days`
}
