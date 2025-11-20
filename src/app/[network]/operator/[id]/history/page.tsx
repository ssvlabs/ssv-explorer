import { getOperatorHistoryEvents } from "@/api/events"

import { type ChainName } from "@/config/chains"
import { EventsOperatorHistoryTable } from "@/app/_components/events/events-operator-history-table"

interface IndexPageProps {
  params: Promise<{ id: string; network: ChainName }>
  searchParams: Promise<{ network: string }>
}

export default async function Page(props: IndexPageProps) {
  const { network, id } = await props.params

  const operatorEvents = getOperatorHistoryEvents({
    operatorId: id,
    network,
    ordering: [{ id: "createdAt", desc: true }],
  })

  return <EventsOperatorHistoryTable dataPromise={operatorEvents} />
}
