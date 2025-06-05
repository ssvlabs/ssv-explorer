import { searchClusters } from "@/api/clusters"
import { type SearchParams } from "@/types"

import { type Operator } from "@/types/api"
import { clustersSearchParamsCache } from "@/lib/search-parsers/clusters-search-parsers"
import { Shell } from "@/components/shell"
import { ClustersTable } from "@/app/_components/clusters/clusters-table"
import type { Metadata } from "next"

interface IndexPageProps {
  searchParams: Promise<SearchParams>
}

export const metadata: Metadata = {
  title: "Clusters",
  description:
    "Explore SSV Network Clusters | View key metrics, recent activity, and search for data.",
}

export default async function Page(props: IndexPageProps) {
  const search = clustersSearchParamsCache.parse(await props.searchParams)
  const clusters = searchClusters<Operator[]>(search)

  return (
    <Shell className="gap-2">
      <ClustersTable dataPromise={clusters} />
    </Shell>
  )
}
