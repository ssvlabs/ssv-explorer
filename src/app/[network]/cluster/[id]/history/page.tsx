import { getClusterEvents } from "@/api/events"
import { type SearchParams } from "@/types"
import { type Hex } from "viem"

import { type ChainName } from "@/config/chains"
import {
  clusterHistoryEventTypes,
  eventsSearchParamsCache,
} from "@/lib/search-parsers/events-search-parsers"
import {
  EventsTableContent,
  EventsTableFilters,
  EventsTableMenuButton,
  EventsTableRoot,
  EventsTableViewOptions,
} from "@/app/_components/events/events-table"

import { TableNavigation } from "../_components/table-navigations"

interface IndexPageProps {
  params: Promise<{ id: Hex; network: ChainName }>
  searchParams: Promise<SearchParams>
}

export default async function Page(props: IndexPageProps) {
  const { id, network } = await props.params
  const search = eventsSearchParamsCache.parse(await props.searchParams)

  const events = getClusterEvents({
    ...search,
    clusterHash: id,
    network,
  })

  return (
    <EventsTableRoot dataPromise={events}>
      <div className="flex items-center gap-2 py-5 pl-6 pr-5">
        <TableNavigation clusterId={id} />
        <div className="flex-1" />
        <EventsTableMenuButton />
        <EventsTableViewOptions />
      </div>
      <EventsTableFilters
        className="col-span-2 px-5"
        showEntity={false}
        showEvent
        eventTypes={clusterHistoryEventTypes}
      />
      <EventsTableContent className="col-span-2 px-6 pb-6" />
    </EventsTableRoot>
  )
}
