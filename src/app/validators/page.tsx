import { searchValidators } from "@/api/validators"
import { type SearchParams } from "@/types"

import { validatorsSearchParamsCache } from "@/lib/search-parsers/validators-search-parsers"
import { Shell } from "@/components/shell"
import { ValidatorsTable } from "@/app/_components/validators/validators-table"

interface IndexPageProps {
  searchParams: Promise<SearchParams>
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
