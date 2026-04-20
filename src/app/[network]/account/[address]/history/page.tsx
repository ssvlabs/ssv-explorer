import { getAccountEvents } from "@/api/events"
import { type SearchParams } from "@/types"
import { type Address } from "viem"

import { type ChainName } from "@/config/chains"
import { eventsSearchParamsCache } from "@/lib/search-parsers/events-search-parsers"
import {
  EventsTableContent,
  EventsTableFilters,
  EventsTableMenuButton,
  EventsTableRoot,
  EventsTableViewOptions,
} from "@/app/_components/events/events-table"

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
  return (
    <EventsTableRoot dataPromise={events}>
      <div className="flex items-center justify-end gap-2 p-5">
        <EventsTableMenuButton />
        <EventsTableViewOptions />
      </div>
      <EventsTableFilters className="col-span-2 px-5" />
      <EventsTableContent className="col-span-2" />
    </EventsTableRoot>
  )
}
