import { getOperator } from "@/api/operator"
import { searchValidators } from "@/api/validators"

import { type ChainName } from "@/config/chains"
import { validatorsSearchParamsCache } from "@/lib/search-parsers/validators-search-parsers"
import {
  ValidatorsTableContent,
  ValidatorsTableFilterButton,
  ValidatorsTableFilters,
  ValidatorsTableRoot,
  ValidatorsTableViewOptions,
} from "@/app/_components/validators/validators-table"

import { TableNavigation } from "./_components/table-navigations"

interface IndexPageProps {
  params: Promise<{ id: string; network: string }>
  searchParams: Promise<{ network: string }>
}

export default async function Page(props: IndexPageProps) {
  const { id, network } = await props.params
  const validatorsSearch = validatorsSearchParamsCache.parse(
    await props.searchParams
  )

  const operator = await getOperator({
    network: network as ChainName,
    id: +id,
  }).catch(() => null)

  const validators = searchValidators({
    ...validatorsSearch,
    operator: [+id],
    network: network as ChainName,
  })

  return (
    <ValidatorsTableRoot dataPromise={validators}>
      <div className="flex items-center gap-2 pb-5">
        <TableNavigation
          operatorId={id}
          validatorCount={operator?.validators_count}
        />
        <div className="flex-1" />
        <ValidatorsTableFilterButton />
        <ValidatorsTableViewOptions />
      </div>
      <ValidatorsTableFilters
        hideOperatorsFilter
        hideOwnerAddressFilter
        hideClusterIdFilter
      />
      <ValidatorsTableContent />
    </ValidatorsTableRoot>
  )
}
