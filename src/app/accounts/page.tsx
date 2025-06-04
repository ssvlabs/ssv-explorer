import React from "react"
import { getAccounts } from "@/api/account"
import { type SearchParams } from "@/types"

import { accountsSearchParamsCache } from "@/lib/search-parsers/accounts-search-parsers"
import { Skeleton } from "@/components/ui/skeleton"
import { Shell } from "@/components/shell"

import { AccountsTable } from "../_components/accounts/accounts-table"
import type { Metadata } from "next"

interface IndexPageProps {
  searchParams: Promise<SearchParams>
}

export const metadata: Metadata = {
  title: "Accounts",
  description:
    "Explore SSV Network Accounts | View key metrics, recent activity, and search for data.",
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
