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
import { useEventsSearchParams } from "@/hooks/search/use-custom-search-params"
import { ErrorCard } from "@/components/ui/error-card"
import { DataTable } from "@/components/data-table/data-table"
import { DataTableMenuButton } from "@/components/data-table/data-table-filters-button"
import { overviewEventsTableColumns } from "@/app/_components/events/events-table-columns"
import { EventsTableFilters } from "@/app/_components/events/events-table-filters"

interface EventsOperatorHistoryTableProps {
  dataPromise: Promise<AllOperatorEventsResponse>
}

export const EventsOperatorHistoryTable = withErrorBoundary(
  ({ dataPromise: data }: EventsOperatorHistoryTableProps) => {
    const events = use(data)
    const { enabledFilters } = useEventsSearchParams()

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
        <div className="flex items-center justify-end">
          <DataTableMenuButton enabledFilters={enabledFilters} />
        </div>
        <EventsTableFilters
          className="col-span-2 px-5"
          showEntity={false}
          showEvent
        />
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
