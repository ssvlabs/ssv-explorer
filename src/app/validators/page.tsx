import type { Metadata } from "next"
import { searchValidators } from "@/api/validators"
import { type SearchParams } from "@/types"

import { validatorsSearchParamsCache } from "@/lib/search-parsers/validators-search-parsers"
import { Shell } from "@/components/shell"
import { ValidatorsTable } from "@/app/_components/validators/validators-table"

interface IndexPageProps {
  searchParams: Promise<SearchParams>
}

export const metadata: Metadata = {
  title: "Validators",
  description:
    "Explore SSV Network Validators | View key metrics, recent activity, and search for data.",
}

export default async function Page(props: IndexPageProps) {
  const search = validatorsSearchParamsCache.parse(await props.searchParams)
  const validators = searchValidators(search)

  return (
    <Shell className="gap-2">
      <ValidatorsTable dataPromise={validators} />
    </Shell>
  )
}
