import { searchDuties } from "@/api/duties"
import { type SearchParams } from "nuqs"

import { type ChainName } from "@/config/chains"
import { dutiesSearchParamsCache } from "@/lib/search-parsers/duties-search-parsers"
import { DutiesTable } from "@/app/_components/duties/duties-table"

import { TableNavigation } from "./_components/table-navigations"

interface IndexPageProps {
  params: Promise<{ publicKey: string; network: ChainName }>
  searchParams: Promise<SearchParams>
}

export default async function Page(props: IndexPageProps) {
  const { publicKey, network } = await props.params
  const searchParams = dutiesSearchParamsCache.parse(await props.searchParams)

  const duties = searchDuties({
    ...searchParams,
    validatorPublicKey: publicKey,
    network,
  })

  return (
    <>
      <div className="flex items-center gap-2 pb-5">
        <TableNavigation publicKey={publicKey} />
      </div>
      <DutiesTable dataPromise={duties} network={network} />
    </>
  )
}
