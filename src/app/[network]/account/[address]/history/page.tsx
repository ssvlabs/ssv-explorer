import { getAccountEvents } from "@/api/events"
import { type SearchParams } from "@/types"
import { type Address } from "viem"

import { type ChainName } from "@/config/chains"
import { eventsSearchParamsCache } from "@/lib/search-parsers/events-search-parsers"
import { EventsAccountTable } from "@/app/_components/events/events-account-table"

interface IndexPageProps {
  params: Promise<{ address: Address; network: ChainName }>
  searchParams: Promise<SearchParams>
}

export default async function IndexPage({
  params,
  searchParams,
}: IndexPageProps) {
  const search = eventsSearchParamsCache.parse(await searchParams)
  const { address, network } = await params
  const events = getAccountEvents({
    ...search,
    ownerAddress: address,
    network: network,
  })
  return <EventsAccountTable dataPromise={events} />
}
