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
        <DataTable className="w-full" table={table} />
      </TableProvider>
    )
  },
  {
    fallbackRender: ({ error }) => {
      return (
        <ErrorCard
          className="bg-transparent"
          errorMessage={(error as Error).message}
          title="Couldn't load Operator History Events"
        />
      )
    },
  }
)
