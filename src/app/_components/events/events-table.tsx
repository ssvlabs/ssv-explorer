"use client"

import { use } from "react"
import { TableProvider } from "@/context/table-context"
import { withErrorBoundary } from "react-error-boundary"

import {
  type AccountEvent,
  type PaginatedEventsResponse,
} from "@/types/api/events"
import { useEventsSearchParams } from "@/hooks/search/use-custom-search-params"
import { useDataTable } from "@/hooks/use-data-table"
import { ErrorCard } from "@/components/ui/error-card"
import { Text } from "@/components/ui/text"
import { DataTable } from "@/components/data-table/data-table"
import { DataTableMenuButton } from "@/components/data-table/data-table-filters-button"
import { DataTableViewOptions } from "@/components/data-table/data-table-view-options"
import { EventsTableFilters } from "@/app/_components/events/events-table-filters"

import {
  eventsDefaultColumnVisibility,
  eventsTableColumns,
} from "./events-table-columns"

interface OperatorsTableProps {
  dataPromise: Promise<PaginatedEventsResponse>
}

export const AccountEventsTable = withErrorBoundary(
  ({ dataPromise: data }: OperatorsTableProps) => {
    const { data: events, pagination } = use(data)

    const { table } = useDataTable<AccountEvent>({
      name: "events-table",
      data: events,
      columns: eventsTableColumns,
      pageCount: pagination.pages,
      getRowId: (originalRow, index) => `${originalRow.createdAt}-${index}`,
      shallow: false,
      clearOnDefault: true,
      initialState: {
        columnVisibility: eventsDefaultColumnVisibility,
      },
      meta: {
        total: pagination.total,
        defaultColumns: eventsDefaultColumnVisibility,
      },
    })

    const { enabledFilters } = useEventsSearchParams()

    return (
      <>
        <TableProvider table={table}>
          <div className="flex items-center gap-2">
            <Text variant="headline4">Account History</Text>
            <div className="flex-1" />
            <DataTableMenuButton enabledFilters={enabledFilters} />
            <DataTableViewOptions table={table} tableName="events" />
          </div>
          <EventsTableFilters />
          <DataTable table={table} />
        </TableProvider>
      </>
    )
  },
  {
    fallbackRender: ({ error }) => {
      return (
        <ErrorCard
          className="bg-transparent"
          errorMessage={(error as Error).message}
          title="Couldn't load Account Events"
        />
      )
    },
  }
)
