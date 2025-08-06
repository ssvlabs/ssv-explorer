import type { Metadata } from "next"
import { searchValidators } from "@/api/validators"
import { type SearchParams } from "@/types"

import { type ChainName } from "@/config/chains"
import { validatorsSearchParamsCache } from "@/lib/search-parsers/validators-search-parsers"
import { Shell } from "@/components/shell"
import { ValidatorsTable } from "@/app/_components/validators/validators-table"

interface IndexPageProps {
  params: Promise<{ network: ChainName }>
  searchParams: Promise<SearchParams>
}

export const metadata: Metadata = {
  title: "Validators",
  description:
    "Explore SSV Network Validators | View key metrics, recent activity, and search for data.",
  openGraph: {
    title: "Validators",
    description:
      "Explore SSV Network Validators | View key metrics, recent activity, and search for data.",
    images: ["/og.png"],
  },
  twitter: {
    title: "Validators",
    description:
      "Explore SSV Network Validators | View key metrics, recent activity, and search for data.",
    images: ["/og.png"],
  },
}

export default async function Page(props: IndexPageProps) {
  const { network } = await props.params
  const search = validatorsSearchParamsCache.parse(await props.searchParams)
  const validators = searchValidators({ ...search, network })

  return (
    <Shell className="gap-2">
      <ValidatorsTable dataPromise={validators} />
    </Shell>
  )
}
