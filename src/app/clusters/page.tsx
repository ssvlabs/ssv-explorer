import { searchClusters } from "@/api/clusters"
import { type SearchParams } from "@/types"

import { type Operator } from "@/types/api"
import { clustersSearchParamsCache } from "@/lib/search-parsers/clusters-search-parsers"
import { Shell } from "@/components/shell"
import { ClustersTable } from "@/app/_components/clusters/clusters-table"

interface IndexPageProps {
  searchParams: Promise<SearchParams>
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
