import { searchOperators } from "@/api/operator"
import { searchValidators } from "@/api/validators"
import { type SearchParams } from "@/types"

import { getNativeCurrency, type ChainName } from "@/config/chains"
import { overviewParserCache } from "@/lib/search-parsers"
import { defaultOperatorSort } from "@/lib/search-parsers/operator-search-parsers"
import { defaultValidatorSort } from "@/lib/search-parsers/validators-search-parsers"
import { numberFormatter } from "@/lib/utils/number"
import { Card } from "@/components/ui/card"
import { Stat } from "@/components/ui/stat"
import { Text } from "@/components/ui/text"
import { GlobalSearch } from "@/components/global-search/global-search"
import { Shell } from "@/components/shell"
import { OperatorsOverviewTable } from "@/app/_components/operators/operators-table-peview"
import { ValidatorsOverviewTable } from "@/app/_components/validators/validators-overview-table"

interface IndexPageProps {
  params: Promise<{ network: ChainName }>
  searchParams: Promise<SearchParams>
}

export default async function Page(props: IndexPageProps) {
  const { network } = await props.params
  const searchParams = await overviewParserCache.parse(props.searchParams)

  const [operators, validators] = await Promise.all([
    searchOperators({
      ...searchParams,
      ordering: defaultOperatorSort,
      network,
    }),
    searchValidators({
      ...searchParams,
      ordering: defaultValidatorSort,
      network,
    }),
  ])

  const totalOperators = operators.pagination.total
  const totalValidators = validators.pagination.total
  const totalStakedEth = validators.pagination.total * 32

  const nativeCurrency = getNativeCurrency(network)

  return (
    <Shell className="gap-6">
      <Text variant="headline4">Discover the SSV Network</Text>
      <GlobalSearch size="lg" />
      <Card className="flex flex-row">
        <Stat
          className="flex-1"
          title="Validators"
          tooltip="Total number of validators registered on the SSV Network"
          content={numberFormatter.format(totalValidators)}
        />
        <Stat
          className="flex-1"
          title="Operators"
          tooltip="Total number of node operators running validators on the SSV Network"
          content={numberFormatter.format(totalOperators)}
        />
        <Stat
          className="flex-1"
          title={`${nativeCurrency.symbol} Staked`}
          tooltip={`Total amount of ${nativeCurrency.symbol} staked across all validators on the network`}
          content={`${numberFormatter.format(totalStakedEth)} ${nativeCurrency.symbol}`}
        />
      </Card>
      <div className="flex max-w-full gap-6 overflow-hidden">
        <OperatorsOverviewTable dataPromise={Promise.resolve(operators)} />
        <ValidatorsOverviewTable dataPromise={Promise.resolve(validators)} />
      </div>
    </Shell>
  )
}
