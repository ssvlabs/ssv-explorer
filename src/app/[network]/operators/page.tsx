import React from "react"
import type { Metadata } from "next"
import { searchOperators } from "@/api/operator"
import { type SearchParams } from "@/types"

import { type ChainName } from "@/config/chains"
import { operatorsSearchParamsCache } from "@/lib/search-parsers/operator-search-parsers"
import { Skeleton } from "@/components/ui/skeleton"
import { Shell } from "@/components/shell"

import { OperatorsTable } from "../../_components/operators/operators-table"

interface IndexPageProps {
  params: Promise<{ network: ChainName }>
  searchParams: Promise<SearchParams>
}

export const metadata: Metadata = {
  title: "Operators",
  description:
    "Explore SSV Network Operators | View key metrics, recent activity, and search for data.",
  openGraph: {
    title: "Operators",
    description:
      "Explore SSV Network Operators | View key metrics, recent activity, and search for data.",
    images: ["/og.png"],
  },
  twitter: {
    title: "Operators",
    description:
      "Explore SSV Network Operators | View key metrics, recent activity, and search for data.",
    images: ["/og.png"],
  },
}

export default async function Page(props: IndexPageProps) {
  const { network } = await props.params
  const search = operatorsSearchParamsCache.parse(await props.searchParams)
  const operators = searchOperators({ ...search, network })
  return (
    <Shell className="gap-2">
      <React.Suspense fallback={<Skeleton className="h-7 w-52" />}>
        {/* <pre>{JSON.stringify(stringifyBigints(search), null, 2)}</pre> */}
        <OperatorsTable dataPromise={operators} />
      </React.Suspense>
    </Shell>
  )
}
