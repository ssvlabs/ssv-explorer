import { searchClusters } from "@/api/clusters"
import { type SearchParams } from "@/types"
import { type Address } from "viem"

import { type Operator } from "@/types/api"
import { clustersSearchParamsCache } from "@/lib/search-parsers/clusters-search-parsers"
import { ClustersTable } from "@/app/_components/clusters/clusters-table"

interface IndexPageProps {
  params: Promise<{ address: Address }>
  searchParams: Promise<SearchParams>
}

export default async function IndexPage({
  params,
  searchParams,
}: IndexPageProps) {
  const search = clustersSearchParamsCache.parse(await searchParams)
  const { address } = await params
  const clusters = searchClusters<Operator[]>({
    ...search,
    ownerAddress: [address],
  })
  return <ClustersTable dataPromise={clusters} />
}
