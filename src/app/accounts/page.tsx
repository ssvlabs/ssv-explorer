import React from "react"
import { getAccounts } from "@/api/account"
import { type SearchParams } from "@/types"

import { accountsSearchParamsCache } from "@/lib/search-parsers/accounts-search-parsers"
import { Skeleton } from "@/components/ui/skeleton"
import { Shell } from "@/components/shell"

import { AccountsTable } from "../_components/accounts/accounts-table"

interface IndexPageProps {
  searchParams: Promise<SearchParams>
}

export default async function Page(props: IndexPageProps) {
  const search = accountsSearchParamsCache.parse(await props.searchParams)
  const accounts = getAccounts(search)

  return (
    <Shell className="gap-2">
      <React.Suspense fallback={<Skeleton className="h-7 w-52" />}>
        <AccountsTable dataPromise={accounts} />
      </React.Suspense>
    </Shell>
  )
}
