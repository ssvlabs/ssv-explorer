import { getOperatorHistoryEvents } from "@/api/events"
import { type SearchParams } from "@/types"

import { type ChainName } from "@/config/chains"
import { eventsSearchParamsCache } from "@/lib/search-parsers/events-search-parsers"
import { EventsOperatorHistoryTable } from "@/app/_components/events/events-operator-history-table"

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
    ordering: [{ id: "createdAt", desc: true }],
  })

  return <EventsOperatorHistoryTable dataPromise={operatorEvents} />
}
