import type { Metadata } from "next"
import { searchValidators } from "@/api/validators"
import { type SearchParams } from "@/types"
import { type Address } from "viem"

import { validatorsSearchParamsCache } from "@/lib/search-parsers/validators-search-parsers"
import { ValidatorsTable } from "@/app/_components/accounts/tables/validators-table"

interface IndexPageProps {
  params: Promise<{ address: Address }>
  searchParams: Promise<SearchParams>
}

export const metadata: Metadata = {
  title: "Account",
  description: "View information about this account on the SSV Network.",
  openGraph: {
    title: "Account",
    description: "View information about this account on the SSV Network.",
    images: ["/og.png"],
  },
  twitter: {
    title: "Account",
    description: "View information about this account on the SSV Network.",
    images: ["/og.png"],
  },
}

export default async function IndexPage({
  params,
  searchParams,
}: IndexPageProps) {
  const search = validatorsSearchParamsCache.parse(await searchParams)
  const { address } = await params
  const validators = searchValidators({
    ...search,
    ownerAddress: [address],
  })
  return <ValidatorsTable dataPromise={validators} hideOwnerAddressFilter />
}
