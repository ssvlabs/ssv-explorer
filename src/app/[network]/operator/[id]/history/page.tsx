import { getOperatorHistoryEvents } from "@/api/events"

import { type ChainName } from "@/config/chains"
import { EventsOperatorHistoryTable } from "@/app/_components/events/events-operator-history-table"

interface IndexPageProps {
  params: Promise<{ id: string; network: string }>
}

export default async function Page(props: IndexPageProps) {
  const { network, id } = await props.params

  const operatorEvents = getOperatorHistoryEvents({
    operatorId: id,
    network: network as ChainName,
    ordering: [{ id: "createdAt", desc: true }],
  })

  return <EventsOperatorHistoryTable dataPromise={operatorEvents} />
}
