import { getValidatorEvents } from "@/api/events"
import { type SearchParams } from "@/types"

import { type ChainName } from "@/config/chains"
import {
  eventsSearchParamsCache,
  validatorHistoryEventTypes,
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
  params: Promise<{ publicKey: string; network: ChainName }>
  searchParams: Promise<SearchParams>
}

export default async function Page(props: IndexPageProps) {
  const { publicKey, network } = await props.params
  const search = eventsSearchParamsCache.parse(await props.searchParams)

  const events = getValidatorEvents({
    ...search,
    publicKey,
    network,
  })

  return (
    <EventsTableRoot dataPromise={events}>
      <div className="flex items-center gap-2 pb-5">
        <TableNavigation publicKey={publicKey} />
        <div className="flex-1" />
        <EventsTableMenuButton />
        <EventsTableViewOptions />
      </div>
      <EventsTableFilters
        className="col-span-2"
        showEntity={false}
        showEvent
        eventTypes={validatorHistoryEventTypes}
      />
      <EventsTableContent className="col-span-2" />
    </EventsTableRoot>
  )
}
