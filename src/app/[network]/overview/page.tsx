import { getRecentSSVEvents } from "@/api/events"
import { searchOperators } from "@/api/operator"
import { getOperatorStatistics } from "@/api/statistics"
import { getTotalEffectiveBalance, searchValidators } from "@/api/validators"
import { type SearchParams } from "@/types"

import { getNativeCurrency, type ChainName } from "@/config/chains"
import { operatorsSearchParamsCache } from "@/lib/search-parsers/operator-search-parsers"
import { validatorsSearchParamsCache } from "@/lib/search-parsers/validators-search-parsers"
import {
  formatGwei,
  numberFormatter,
  percentageFormatter,
} from "@/lib/utils/number"
import { Card } from "@/components/ui/card"
import { ErrorCard } from "@/components/ui/error-card"
import { Stat } from "@/components/ui/stat"
import { Text } from "@/components/ui/text"
import { Layer } from "@/components/charts/layers/layer"
import { GeoLegend } from "@/components/charts/worldmap/geo-legend/geo-legend"
import StandardMap from "@/components/charts/worldmap/standard-map"
import { GlobalSearch } from "@/components/global-search/global-search"
import { Shell } from "@/components/shell"
import { EventsOverviewTable } from "@/app/_components/events/events-table-peview"
import { OperatorsOverviewTable } from "@/app/_components/operators/operators-table-peview"
import { ValidatorsOverviewTable } from "@/app/_components/validators/validators-overview-table"

interface IndexPageProps {
  params: Promise<{ network: ChainName }>
  searchParams: Promise<SearchParams>
}

const getValue = <T,>(promise: PromiseSettledResult<T>): T | undefined => {
  return promise.status === "fulfilled" ? promise.value : undefined
}

export default async function Page(props: IndexPageProps) {
  const { network } = await props.params

  const [
    operatorsPromise,
    updatedOperatorsFrom7DaysAgoPromise,
    validatorsPromise,
    updatedValidatorsFrom7DaysAgoPromise,
    operatorStatisticsPromise,
    totalEffectiveBalancePromise,
  ] = await Promise.allSettled([
    searchOperators({
      ...operatorsSearchParamsCache.parse({}), // add default search params
      network,
    }),
    searchOperators({
      ...operatorsSearchParamsCache.parse({}), // add default search params
      network,
      updatedAt: 7,
    }),
    searchValidators({
      ...validatorsSearchParamsCache.parse({}), // add default search params
      network,
    }),
    searchValidators({
      ...validatorsSearchParamsCache.parse({}), // add default search params
      network,
      updatedAt: 7,
    }),
    getOperatorStatistics({ network }),
    getTotalEffectiveBalance({ network }),
  ] as const)

  const operators = getValue(operatorsPromise)
  const operators7daysAgo = getValue(updatedOperatorsFrom7DaysAgoPromise)
  const validators = getValue(validatorsPromise)
  const validators7daysAgo = getValue(updatedValidatorsFrom7DaysAgoPromise)
  const operatorStatistics = getValue(operatorStatisticsPromise)
  const totalEffectiveBalance = getValue(totalEffectiveBalancePromise)

  const recentSSVEvents = getRecentSSVEvents({
    network,
    ordering: [{ id: "createdAt", desc: true }],
  })

  const totalOperators = operators?.pagination.total ?? 0
  const updatedOperatorsFrom7DaysAgo = operators7daysAgo?.pagination.total ?? 0

  const totalValidators = validators?.pagination.total ?? 0
  const updatedValidatorsFrom7DaysAgo =
    validators7daysAgo?.pagination.total ?? 0
  const validatorsIncreasePercent =
    (100 * updatedValidatorsFrom7DaysAgo) / totalValidators

  const totalStakedEth = totalEffectiveBalance
    ? BigInt(totalEffectiveBalance)
    : 0n

  const nativeCurrency = getNativeCurrency(network)

  return (
    <Shell className="gap-6">
      <Text variant="headline4">Discover the SSV Network</Text>
      <GlobalSearch size="lg" />

      <div className="flex flex-col gap-3 sm:flex-row">
        <Card className="grow">
          <Stat
            className="flex-1"
            title="Validators"
            tooltip="Total number of validators registered on the SSV Network"
            content={
              <div className="flex flex-row items-end justify-between">
                <Text variant="headline4">
                  {numberFormatter.format(totalValidators)}
                </Text>
                <Text variant="caption-bold" className="text-gray-500">
                  {percentageFormatter.format(validatorsIncreasePercent)} (
                  {numberFormatter.format(updatedValidatorsFrom7DaysAgo)})
                </Text>
              </div>
            }
          />
        </Card>
        <Card className="grow">
          <Stat
            className="flex-1"
            title="Operators"
            tooltip="Total number of node operators running validators on the SSV Network"
            content={
              <div className="flex flex-row items-end justify-between">
                <Text variant="headline4">
                  {numberFormatter.format(totalOperators)}
                </Text>
                <div className="flex flex-row">
                  <Text variant="caption-medium" className="text-gray-500">
                    Added Last 7 Days:
                  </Text>{" "}
                  <Text variant="caption-bold" className="text-gray-500">
                    {numberFormatter.format(updatedOperatorsFrom7DaysAgo)}
                  </Text>
                </div>
              </div>
            }
          />
        </Card>
        <Card className="grow">
          <Stat
            className="flex-1"
            title={`${nativeCurrency.symbol} Staked`}
            tooltip={`Total amount of ${nativeCurrency.symbol} staked across all validators on the network`}
            content={`${formatGwei(totalStakedEth)} ${nativeCurrency.symbol}`}
          />
        </Card>
      </div>

      <div className="flex max-w-full flex-col gap-6 overflow-hidden md:flex-row">
        <OperatorsOverviewTable dataPromise={Promise.resolve(operators!)} />
        <ValidatorsOverviewTable dataPromise={Promise.resolve(validators!)} />
      </div>
      {operatorStatistics ? (
        <>
          <Card className="flex flex-col gap-6">
            <Text variant="body-2-bold" className="text-gray-500">
              Geographical Distribution
            </Text>
            <div className="flex flex-col gap-6 lg:flex-row">
              <div className="flex flex-1 flex-col p-6 lg:py-0">
                <StandardMap
                  data={operatorStatistics.geolocation}
                  className="max-h-[270px]"
                />
              </div>
              <GeoLegend
                className="lg:px-6"
                items={operatorStatistics.geolocation}
                totalCount={operatorStatistics.total_count}
              />
            </div>
          </Card>
          <div className="flex max-w-full flex-col gap-6 overflow-hidden md:flex-row">
            <Layer
              className="flex-1"
              title="Execution Layer"
              items={operatorStatistics.execution_client}
              colorScheme="success"
            />
            <Layer
              className="flex-1"
              title="Consensus Layer"
              items={operatorStatistics.consensus_client}
              colorScheme="violeta"
            />
          </div>
        </>
      ) : (
        <Card>
          <ErrorCard
            className="bg-transparent"
            errorMessage="Something went wrong while fetching the statistics"
            title="Failed to Statistics"
          />
        </Card>
      )}

      <EventsOverviewTable dataPromise={recentSSVEvents} />
    </Shell>
  )
}
