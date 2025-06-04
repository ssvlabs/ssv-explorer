import { searchOperators } from "@/api/operator"
import { getSSVRates } from "@/api/ssv"
import { searchValidators } from "@/api/validators"
import { type SearchParams } from "@/types"

import { overviewParserCache } from "@/lib/search-parsers"
import { defaultOperatorSort } from "@/lib/search-parsers/operator-search-parsers"
import { defaultValidatorSort } from "@/lib/search-parsers/validators-search-parsers"
import { numberFormatter } from "@/lib/utils/number"
import { Card } from "@/components/ui/card"
import { Stat } from "@/components/ui/stat"
import { Text } from "@/components/ui/text"
import { GlobalSearch } from "@/components/global-search/global-search"
import { Shell } from "@/components/shell"
import { OperatorsTablePreview } from "@/app/_components/operators/operators-table-peview"
import { ValidatorsTablePreview } from "@/app/_components/validators/validators-table-preview"

interface IndexPageProps {
  searchParams: Promise<SearchParams>
}

export default async function Page(props: IndexPageProps) {
  const searchParams = await overviewParserCache.parse(props.searchParams)

  const [operators, validators] = await Promise.all([
    searchOperators({
      ...searchParams,
      ordering: defaultOperatorSort,
    }),
    searchValidators({
      ...searchParams,
      ordering: defaultValidatorSort,
    })
  ])

  const totalOperators = operators.pagination.total
  const totalValidators = validators.pagination.total
  const totalStakedEth = validators.pagination.total * 32

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
          title="ETH Staked"
          tooltip="Total amount of ETH staked across all validators on the network (32 ETH per validator)"
          content={`${numberFormatter.format(totalStakedEth)} ETH`}
        />
      </Card>
      <div className="flex max-w-full gap-6 overflow-hidden">
        <OperatorsTablePreview dataPromise={Promise.resolve(operators)} />
        <ValidatorsTablePreview dataPromise={Promise.resolve(validators)} />
      </div>
    </Shell>
  )
}
