"use client"

import { use } from "react"
import { TableProvider } from "@/context/table-context"
import { withErrorBoundary } from "react-error-boundary"

import { type PaginatedEventsResponse } from "@/types/api/events"
import { useDataTable } from "@/hooks/use-data-table"
import { Card } from "@/components/ui/card"
import { ErrorCard } from "@/components/ui/error-card"
import { Text } from "@/components/ui/text"
import { DataTable } from "@/components/data-table/data-table"
import { overviewEventsTableColumns } from "@/app/_components/events/events-table-columns"

interface EventsOverviewTableProps {
  dataPromise: Promise<PaginatedEventsResponse>
}

export const EventsOverviewTable = withErrorBoundary(
  ({ dataPromise: data }: EventsOverviewTableProps) => {
    const { data: events, pagination } = use(data)

    const { table } = useDataTable({
      name: "events-table-preview",
      data: events,
      columns: overviewEventsTableColumns,
      pageCount: pagination.pages,
      getRowId: (originalRow, index) =>
        `${originalRow.transactionHash}-${index}`,
      shallow: false,
      clearOnDefault: true,
      initialState: {
        sorting: [{ id: "id", desc: false }],
        columnVisibility: {
          name: true,
          eth1_node_client: false,
          fee: false,
          location: false,
          id: false,
          owner_address: true,
          eth2_node_client: false,
          validators_count: false,
          performance_24h: true,
          performance_30d: false,
          mev_relays: false,
          status: true,
        },
      },
      meta: {
        total: pagination.total,
      },
    })

    return (
      <TableProvider table={table}>
        <Card className="flex-1 gap-0 overflow-hidden p-0 pb-2">
          <div className="flex justify-between p-6 pb-2">
            <Text variant="body-2-bold" className="text-gray-500">
              Recent Account Events
            </Text>
          </div>

          <DataTable className="w-full" table={table} hidePagination />
        </Card>
      </TableProvider>
    )
  },
  {
    fallbackRender: ({ error }) => {
      return (
        <ErrorCard
          className="flex-1"
          errorMessage={(error as Error).message}
          title="Couldn't load  Operators"
        />
      )
    },
  }
)
