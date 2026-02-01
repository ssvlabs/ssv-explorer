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
  type Operator,
  type OperatorSortingKeys,
  type OperatorsSearchResponse,
} from "@/types/api"
import { operatorSearchSort } from "@/lib/search-parsers/operator-search-parsers"
import { cn } from "@/lib/utils"
import { useOperatorsSearchParams } from "@/hooks/search/use-custom-search-params"
import { useDataTable } from "@/hooks/use-data-table"
import { ErrorCard } from "@/components/ui/error-card"
import { Text } from "@/components/ui/text"
import { DataTable } from "@/components/data-table/data-table"
import { DataTableMenuButton } from "@/components/data-table/data-table-filters-button"
import { DataTableViewOptions } from "@/components/data-table/data-table-view-options"
import {
  OperatorTableFilters,
  type OperatorTableFiltersProps,
} from "@/app/_components/operators/filters/operator-table-filters"

import {
  operatorsDefaultColumnVisibility,
  operatorsTableColumns,
  type OperatorColumnsAccessorKeys,
} from "./operators-table-columns"

// ============================================================================
// Hook
// ============================================================================

type UseOperatorsTableOptions = {
  dataPromise: Promise<OperatorsSearchResponse>
  hideColumns?: OperatorColumnsAccessorKeys[]
}

const useOperatorsTable = ({
  dataPromise,
  hideColumns,
}: UseOperatorsTableOptions) => {
  const { operators, pagination } = use(dataPromise)
  const columns = operatorsTableColumns

  const visibleColumns = hideColumns
    ? columns.filter((column) => !hideColumns.includes(column.accessorKey))
    : columns

  const { table } = useDataTable<Operator, OperatorSortingKeys>({
    name: "operators-table",
    data: operators,
    columns: visibleColumns,
    pageCount: pagination.pages,
    getRowId: (originalRow, index) => `${originalRow.id}-${index}`,
    shallow: false,
    clearOnDefault: true,
    initialState: {
      sorting: operatorSearchSort.ordering.defaultValue,
      columnVisibility: { ...operatorsDefaultColumnVisibility },
    },
    meta: {
      total: pagination.total,
      defaultColumns: { ...operatorsDefaultColumnVisibility },
    },
  })

  const { enabledFilters } = useOperatorsSearchParams()

  return { table, enabledFilters }
}

// ============================================================================
// Compound Components
// ============================================================================

type OperatorsTableRootProps = {
  dataPromise: Promise<OperatorsSearchResponse>
  hideColumns?: OperatorColumnsAccessorKeys[]
  children: ReactNode
}

const OperatorsTableRoot = withErrorBoundary(
  ({ dataPromise, hideColumns, children }: OperatorsTableRootProps) => {
    const { table } = useOperatorsTable({ dataPromise, hideColumns })
    return <TableProvider table={table}>{children}</TableProvider>
  },
  {
    fallbackRender: ({ error }) => (
      <ErrorCard
        className="bg-transparent"
        errorMessage={(error as Error).message}
        title="Couldn't load Operators"
      />
    ),
  }
)

type OperatorsTableHeaderProps = {
  title?: string
}

type OperatorsTableHeaderFC = FC<
  Omit<ComponentPropsWithoutRef<"div">, keyof OperatorsTableHeaderProps> &
    OperatorsTableHeaderProps
>

const OperatorsTableHeader: OperatorsTableHeaderFC = ({
  title = "Operators",
  className,
  ...props
}) => (
  <div className={cn("flex items-center gap-2", className)} {...props}>
    <Text variant="headline4">{title}</Text>
    <div className="flex-1" />
    <OperatorsTableMenuButton />
    <OperatorsTableViewOptions />
  </div>
)

const OperatorsTableMenuButton = () => {
  const { enabledFilters } = useOperatorsSearchParams()
  return <DataTableMenuButton enabledFilters={enabledFilters} />
}

const OperatorsTableViewOptions = () => {
  const { table } = useTable<Operator>()
  return <DataTableViewOptions table={table} tableName="operators" />
}

type OperatorsTableContentProps = object

type OperatorsTableContentFC = FC<
  Omit<ComponentPropsWithoutRef<"div">, keyof OperatorsTableContentProps> &
    OperatorsTableContentProps
>

const OperatorsTableContent: OperatorsTableContentFC = ({
  className,
  ...props
}) => {
  const { table } = useTable<Operator>()
  return <DataTable table={table} className={cn(className)} {...props} />
}

// Re-export filters for convenience
const OperatorsTableFilters = OperatorTableFilters

// ============================================================================
// Combined Component
// ============================================================================

type OperatorsTableProps = {
  dataPromise: Promise<OperatorsSearchResponse>
  hideColumns?: OperatorColumnsAccessorKeys[]
} & OperatorTableFiltersProps

const OperatorsTable: FC<OperatorsTableProps> = ({
  dataPromise,
  hideColumns,
  ...filterProps
}) => (
  <OperatorsTableRoot dataPromise={dataPromise} hideColumns={hideColumns}>
    <OperatorsTableHeader />
    <OperatorsTableFilters {...filterProps} />
    <OperatorsTableContent />
  </OperatorsTableRoot>
)

// ============================================================================
// Exports
// ============================================================================

export {
  // Combined (default usage)
  OperatorsTable,
  // Hook
  useOperatorsTable,
  // Individual parts
  OperatorsTableRoot,
  OperatorsTableHeader,
  OperatorsTableMenuButton,
  OperatorsTableViewOptions,
  OperatorsTableFilters,
  OperatorsTableContent,
}

export type { OperatorsTableProps, OperatorTableFiltersProps }
