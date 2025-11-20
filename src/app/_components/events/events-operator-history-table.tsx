"use client"

import { use } from "react"
import { TableProvider } from "@/context/table-context"
import {
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { withErrorBoundary } from "react-error-boundary"

import {
  type AccountEvent,
  type AllOperatorEventsResponse,
} from "@/types/api/events"
import { Card } from "@/components/ui/card"
import { ErrorCard } from "@/components/ui/error-card"
import { DataTable } from "@/components/data-table/data-table"
import { overviewEventsTableColumns } from "@/app/_components/events/events-table-columns"

interface EventsOperatorHistoryTableProps {
  dataPromise: Promise<AllOperatorEventsResponse>
}

export const EventsOperatorHistoryTable = withErrorBoundary(
  ({ dataPromise: data }: EventsOperatorHistoryTableProps) => {
    const events = use(data)

    const table = useReactTable<AccountEvent>({
      data: events,
      columns: overviewEventsTableColumns,
      getRowId: (originalRow, index) =>
        `${originalRow.transactionHash}-${index}`,
      getCoreRowModel: getCoreRowModel(),
      getPaginationRowModel: getPaginationRowModel(),
    })

    return (
      <TableProvider table={table}>
        <Card className="flex-1 gap-0 overflow-hidden p-0 pb-2">
          <DataTable className="w-full" table={table} />
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
          title="Failed to load  Recent Account Events"
        />
      )
    },
  }
)
