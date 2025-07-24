import { searchOperators } from "@/api/operator"
import { type SearchParams } from "@/types"
import { type Address } from "viem"

import { operatorsSearchParamsCache } from "@/lib/search-parsers/operator-search-parsers"
import { OperatorsTable } from "@/app/_components/operators/operators-table"

interface IndexPageProps {
  params: Promise<{ address: Address }>
  searchParams: Promise<SearchParams>
}

export default async function IndexPage({
  params,
  searchParams,
}: IndexPageProps) {
  const search = operatorsSearchParamsCache.parse(await searchParams)
  const { address } = await params
  const operators = searchOperators({
    ...search,
    ownerAddress: [address],
  })
  return <OperatorsTable dataPromise={operators} />
}
