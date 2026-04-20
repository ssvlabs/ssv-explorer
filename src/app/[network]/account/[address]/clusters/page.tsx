import { searchClusters } from "@/api/clusters"
import { type SearchParams } from "@/types"
import { type Address } from "viem"

import { type Operator } from "@/types/api"
import { type ChainName } from "@/config/chains"
import { clustersSearchParamsCache } from "@/lib/search-parsers/clusters-search-parsers"
import {
  ClustersTableContent,
  ClustersTableFilters,
  ClustersTableMenuButton,
  ClustersTableRoot,
  ClustersTableViewOptions,
} from "@/app/_components/clusters/clusters-table"

interface IndexPageProps {
  params: Promise<{ address: Address; network: ChainName }>
  searchParams: Promise<SearchParams>
}

export default async function IndexPage({
  params,
  searchParams,
}: IndexPageProps) {
  const search = clustersSearchParamsCache.parse(await searchParams)
  const { address, network } = await params
  const clusters = searchClusters<Operator[]>({
    ...search,
    ownerAddress: [address],
    network: network,
  })
  return (
    <ClustersTableRoot dataPromise={clusters} hideColumns={["ownerAddress"]}>
      <div className="flex items-center justify-end gap-2 p-5">
        <ClustersTableMenuButton />
        <ClustersTableViewOptions />
      </div>
      <ClustersTableFilters
        className="col-span-2 px-5"
        hideOwnerAddressFilter
      />
      <ClustersTableContent className="col-span-2" />
    </ClustersTableRoot>
  )
}
