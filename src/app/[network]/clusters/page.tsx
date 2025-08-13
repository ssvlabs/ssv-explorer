import type { Metadata } from "next"
import { searchClusters } from "@/api/clusters"
import { type SearchParams } from "@/types"

import { type Operator } from "@/types/api"
import { type ChainName } from "@/config/chains"
import { clustersSearchParamsCache } from "@/lib/search-parsers/clusters-search-parsers"
import { Shell } from "@/components/shell"
import { ClustersTable } from "@/app/_components/clusters/clusters-table"

interface IndexPageProps {
  params: Promise<{ network: ChainName }>
  searchParams: Promise<SearchParams>
}

export const metadata: Metadata = {
  title: "Clusters",
  description:
    "Explore SSV Network Clusters | View key metrics, recent activity, and search for data.",
  openGraph: {
    title: "Clusters",
    description:
      "Explore SSV Network Clusters | View key metrics, recent activity, and search for data.",
    images: ["/og.png"],
  },
  twitter: {
    title: "Clusters",
    description:
      "Explore SSV Network Clusters | View key metrics, recent activity, and search for data.",
    images: ["/og.png"],
  },
}

export default async function Page(props: IndexPageProps) {
  const { network } = await props.params
  const search = clustersSearchParamsCache.parse(await props.searchParams)
  const clusters = searchClusters<Operator[]>({
    ...search,
    network,
  })

  return (
    <Shell className="gap-2">
      <ClustersTable dataPromise={clusters} />
    </Shell>
  )
}
