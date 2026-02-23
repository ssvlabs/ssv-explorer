import { searchValidators } from "@/api/validators"

import { type ChainName } from "@/config/chains"
import { validatorsSearchParamsCache } from "@/lib/search-parsers/validators-search-parsers"
import { ValidatorsTable } from "@/app/_components/validators/validators-table"

interface IndexPageProps {
  params: Promise<{ id: string; network: string }>
  searchParams: Promise<{ network: string }>
}

export default async function Page(props: IndexPageProps) {
  const { id, network } = await props.params
  const validatorsSearch = validatorsSearchParamsCache.parse(
    await props.searchParams
  )

  const validators = searchValidators({
    ...validatorsSearch,
    operator: [+id],
    network: network as ChainName,
  })

  return <ValidatorsTable dataPromise={validators} hideOperatorsFilter />
}
