import { getCluster } from "@/api/clusters"
import { searchValidators } from "@/api/validators"
import { type Hex } from "viem"

import { type ChainName } from "@/config/chains"
import { validatorsSearchParamsCache } from "@/lib/search-parsers/validators-search-parsers"
import {
  ValidatorsTableContent,
  ValidatorsTableFilterButton,
  ValidatorsTableFilters,
  ValidatorsTableRoot,
} from "@/app/_components/validators/validators-table"

import { TableNavigation } from "./_components/table-navigations"

interface IndexPageProps {
  params: Promise<{ id: Hex; network: ChainName }>
  searchParams: Promise<{}>
}

export default async function Page(props: IndexPageProps) {
  const { id, network } = await props.params
  const searchParams = validatorsSearchParamsCache.parse(
    await props.searchParams
  )

  const cluster = await getCluster({ id, network }).catch(() => null)
  const validators = searchValidators({
    ...searchParams,
    cluster: [id],
    network,
  })

  return (
    <ValidatorsTableRoot
      dataPromise={validators}
      columns={["publicKey", "status", "createdAt", "effectiveBalance"]}
    >
      <div className="flex items-center gap-2 py-5 pl-6 pr-5">
        <TableNavigation
          clusterId={id}
          validatorCount={cluster ? +cluster.validatorCount : undefined}
        />
        <div className="flex-1" />
        <ValidatorsTableFilterButton />
      </div>
      <ValidatorsTableFilters
        className="px-5"
        hideOperatorsFilter
        hideOwnerAddressFilter
        hideClusterIdFilter
      />
      <ValidatorsTableContent className="px-6 pb-6" />
    </ValidatorsTableRoot>
  )
}
