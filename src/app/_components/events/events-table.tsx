"use client"

import {
  use,
  type ComponentPropsWithoutRef,
  type FC,
  type ReactNode,
} from "react"
import { TableProvider, useTable } from "@/context/table-context"
import { withErrorBoundary } from "react-error-boundary"

import {
  type AccountEvent,
  type PaginatedEventsResponse,
} from "@/types/api/events"
import { cn } from "@/lib/utils"
import { useEventsSearchParams } from "@/hooks/search/use-custom-search-params"
import { useDataTable } from "@/hooks/use-data-table"
import { ErrorCard } from "@/components/ui/error-card"
import { Text } from "@/components/ui/text"
import { DataTable } from "@/components/data-table/data-table"
import { DataTableMenuButton } from "@/components/data-table/data-table-filters-button"
import { DataTableViewOptions } from "@/components/data-table/data-table-view-options"
import { EventsTableFilters as EventsTableFiltersComponent } from "@/app/_components/events/events-table-filters"

import {
  eventsDefaultColumnVisibility,
  eventsTableColumns,
} from "./events-table-columns"

// ============================================================================
// Hook
// ============================================================================

type UseEventsTableOptions = {
  dataPromise: Promise<PaginatedEventsResponse>
}

const useEventsTable = ({ dataPromise }: UseEventsTableOptions) => {
  const { data: events, pagination } = use(dataPromise)

  const { table } = useDataTable<AccountEvent>({
    name: "events-table",
    data: events,
    columns: eventsTableColumns,
    pageCount: pagination.pages,
    getRowId: (originalRow, index) => `${originalRow.createdAt}-${index}`,
    shallow: false,
    clearOnDefault: true,
    initialState: {
      columnVisibility: { ...eventsDefaultColumnVisibility },
    },
    meta: {
      total: pagination.total,
      defaultColumns: { ...eventsDefaultColumnVisibility },
    },
  })

  const { enabledFilters } = useEventsSearchParams()

  return { table, enabledFilters }
}

// ============================================================================
// Compound Components
// ============================================================================

type EventsTableRootProps = {
  dataPromise: Promise<PaginatedEventsResponse>
  children: ReactNode
}

const EventsTableRoot = withErrorBoundary(
  ({ dataPromise, children }: EventsTableRootProps) => {
    const { table } = useEventsTable({ dataPromise })
    return <TableProvider table={table}>{children}</TableProvider>
  },
  {
    fallbackRender: ({ error }) => (
      <ErrorCard
        className="bg-transparent"
        errorMessage={(error as Error).message}
        title="Couldn't load Account Events"
      />
    ),
  }
)

type EventsTableHeaderProps = {
  title?: string
}

type EventsTableHeaderFC = FC<
  Omit<ComponentPropsWithoutRef<"div">, keyof EventsTableHeaderProps> &
    EventsTableHeaderProps
>

const EventsTableHeader: EventsTableHeaderFC = ({
  title = "Account History",
  className,
  ...props
}) => (
  <div className={cn("flex items-center gap-2", className)} {...props}>
    <Text variant="headline4">{title}</Text>
    <div className="flex-1" />
    <EventsTableMenuButton />
    <EventsTableViewOptions />
  </div>
)

const EventsTableMenuButton = () => {
  const { enabledFilters } = useEventsSearchParams()
  return <DataTableMenuButton enabledFilters={enabledFilters} />
}

const EventsTableViewOptions = () => {
  const { table } = useTable<AccountEvent>()
  return <DataTableViewOptions table={table} tableName="events" />
}

type EventsTableContentProps = object

type EventsTableContentFC = FC<
  Omit<ComponentPropsWithoutRef<"div">, keyof EventsTableContentProps> &
    EventsTableContentProps
>

const EventsTableContent: EventsTableContentFC = ({ className, ...props }) => {
  const { table } = useTable<AccountEvent>()
  return <DataTable table={table} className={cn(className)} {...props} />
}

// Re-export filters for convenience
const EventsTableFilters = EventsTableFiltersComponent

// ============================================================================
// Combined Component
// ============================================================================

type AccountEventsTableProps = {
  dataPromise: Promise<PaginatedEventsResponse>
}

const AccountEventsTable: FC<AccountEventsTableProps> = ({ dataPromise }) => (
  <EventsTableRoot dataPromise={dataPromise}>
    <EventsTableHeader />
    <EventsTableFilters />
    <EventsTableContent />
  </EventsTableRoot>
)

// ============================================================================
// Exports
// ============================================================================

export {
  // Combined (default usage)
  AccountEventsTable,
  // Hook
  useEventsTable,
  // Individual parts
  EventsTableRoot,
  EventsTableHeader,
  EventsTableMenuButton,
  EventsTableViewOptions,
  EventsTableFilters,
  EventsTableContent,
}

export type { AccountEventsTableProps }
