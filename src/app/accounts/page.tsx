import React from "react"
import type { Metadata } from "next"
import { getAccounts } from "@/api/account"
import { type SearchParams } from "@/types"

import { accountsSearchParamsCache } from "@/lib/search-parsers/accounts-search-parsers"
import { Skeleton } from "@/components/ui/skeleton"
import { Shell } from "@/components/shell"

import { AccountsTable } from "../_components/accounts/accounts-table"

interface IndexPageProps {
  searchParams: Promise<SearchParams>
}

export const metadata: Metadata = {
  title: "Accounts",
  description:
    "Explore SSV Network Accounts | View key metrics, recent activity, and search for data.",
  openGraph: {
    title: "Accounts",
    description:
      "Explore SSV Network Accounts | View key metrics, recent activity, and search for data.",
    images: ["/og.png"],
  },
  twitter: {
    title: "Accounts",
    description:
      "Explore SSV Network Accounts | View key metrics, recent activity, and search for data.",
    images: ["/og.png"],
  },
}

// const accountsMockData = Promise.resolve({
//   type: "accounts",
//   accounts: [],
//   pagination: {
//     total: 0,
//     page: 1,
//     per_page: 10,
//     pages: 1,
//   },
// })

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
