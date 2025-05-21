import React from "react"
import { searchOperators } from "@/api/operator"
import { type SearchParams } from "@/types"

import { operatorsSearchParamsCache } from "@/lib/search-parsers/operator-search-parsers"
import { Skeleton } from "@/components/ui/skeleton"
import { Shell } from "@/components/shell"

import { OperatorsTable } from "../_components/operators/operators-table"

interface IndexPageProps {
  searchParams: Promise<SearchParams>
}

export default async function Page(props: IndexPageProps) {
  const search = operatorsSearchParamsCache.parse(await props.searchParams)
  const operators = searchOperators(search)
  return (
    <Shell className="gap-2">
      <React.Suspense fallback={<Skeleton className="h-7 w-52" />}>
        {/* <pre>{JSON.stringify(stringifyBigints(search), null, 2)}</pre> */}
        <OperatorsTable dataPromise={operators} />
      </React.Suspense>
    </Shell>
  )
}
