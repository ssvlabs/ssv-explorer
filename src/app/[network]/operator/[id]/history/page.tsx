import { getOperatorHistoryEvents } from "@/api/events"
import { type SearchParams } from "@/types"

import { type ChainName } from "@/config/chains"
import {
  eventsSearchParamsCache,
  operatorHistoryEventTypes,
} from "@/lib/search-parsers/events-search-parsers"
import {
  EventsOperatorHistoryMenuButton,
  EventsOperatorHistoryTableContent,
  EventsOperatorHistoryTableRoot,
} from "@/app/_components/events/events-operator-history-table"
import { EventsTableFilters } from "@/app/_components/events/events-table"

import { TableNavigation } from "../_components/table-navigations"

interface IndexPageProps {
  params: Promise<{ id: string; network: string }>
  searchParams: Promise<SearchParams>
}

export default async function Page(props: IndexPageProps) {
  const { network, id } = await props.params
  const search = eventsSearchParamsCache.parse(await props.searchParams)

  const operatorEvents = getOperatorHistoryEvents({
    ...search,
    operatorId: id,
    network: network as ChainName,
    ordering: [{ id: "blockNumber", desc: true }],
  })

  return (
    <EventsOperatorHistoryTableRoot dataPromise={operatorEvents}>
      <div className="flex items-center gap-2 pb-5">
        <TableNavigation operatorId={id} />
        <div className="flex-1" />
        <EventsOperatorHistoryMenuButton />
      </div>
      <EventsTableFilters
        className="col-span-2"
        showEntity={false}
        showEvent
        eventTypes={operatorHistoryEventTypes}
      />
      <EventsOperatorHistoryTableContent />
    </EventsOperatorHistoryTableRoot>
  )
}
