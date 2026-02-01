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
  type Cluster,
  type Operator,
  type PaginatedClustersResponse,
} from "@/types/api"
import { cn } from "@/lib/utils"
import { useClustersSearchParams } from "@/hooks/search/use-custom-search-params"
import { useDataTable } from "@/hooks/use-data-table"
import { ErrorCard } from "@/components/ui/error-card"
import { Text } from "@/components/ui/text"
import { DataTable } from "@/components/data-table/data-table"
import { DataTableMenuButton } from "@/components/data-table/data-table-filters-button"
import { DataTableViewOptions } from "@/components/data-table/data-table-view-options"
import {
  ClusterTableFilters as ClusterTableFiltersComponent,
  type ClusterTableFiltersProps,
} from "@/app/_components/clusters/cluster-table-filters"

import {
  clustersTableColumns,
  clustersTableDefaultColumns,
  type ClusterColumnsAccessorKeys,
} from "./clusters-table-columns"

// ============================================================================
// Hook
// ============================================================================

type UseClustersTableOptions = {
  dataPromise: Promise<PaginatedClustersResponse<Operator[]>>
  hideColumns?: ClusterColumnsAccessorKeys[]
}

const useClustersTable = ({
  dataPromise,
  hideColumns,
}: UseClustersTableOptions) => {
  const { clusters, pagination } = use(dataPromise)

  const visibleColumns = hideColumns
    ? clustersTableColumns.filter(
        (column) => !hideColumns.includes(column.accessorKey)
      )
    : clustersTableColumns

  const { table } = useDataTable({
    name: "clusters",
    data: clusters,
    columns: visibleColumns,
    pageCount: pagination.pages,
    getRowId: (originalRow, index) => `${originalRow.clusterId}-${index}`,
    shallow: false,
    clearOnDefault: true,
    initialState: {
      columnVisibility: { ...clustersTableDefaultColumns },
    },
    meta: {
      total: pagination.total,
      defaultColumns: { ...clustersTableDefaultColumns },
    },
  })

  const { enabledFilters } = useClustersSearchParams()

  return { table, enabledFilters }
}

// ============================================================================
// Compound Components
// ============================================================================

type ClustersTableRootProps = {
  dataPromise: Promise<PaginatedClustersResponse<Operator[]>>
  hideColumns?: ClusterColumnsAccessorKeys[]
  children: ReactNode
}

const ClustersTableRoot = withErrorBoundary(
  ({ dataPromise, hideColumns, children }: ClustersTableRootProps) => {
    const { table } = useClustersTable({ dataPromise, hideColumns })
    return <TableProvider table={table}>{children}</TableProvider>
  },
  {
    fallbackRender: ({ error }) => (
      <ErrorCard
        className="bg-transparent"
        errorMessage={(error as Error).message}
        title="Couldn't load Clusters"
      />
    ),
  }
)

type ClustersTableHeaderProps = {
  title?: string
}

type ClustersTableHeaderFC = FC<
  Omit<ComponentPropsWithoutRef<"div">, keyof ClustersTableHeaderProps> &
    ClustersTableHeaderProps
>

const ClustersTableHeader: ClustersTableHeaderFC = ({
  title = "Clusters",
  className,
  ...props
}) => (
  <div className={cn("flex items-center gap-2", className)} {...props}>
    <Text variant="headline4">{title}</Text>
    <div className="flex-1" />
    <ClustersTableMenuButton />
    <ClustersTableViewOptions />
  </div>
)

const ClustersTableMenuButton = () => {
  const { enabledFilters } = useClustersSearchParams()
  return <DataTableMenuButton enabledFilters={enabledFilters} />
}

const ClustersTableViewOptions = () => {
  const { table } = useTable<Cluster<Operator[]>>()
  return <DataTableViewOptions table={table} tableName="clusters" />
}

type ClustersTableContentProps = object

type ClustersTableContentFC = FC<
  Omit<ComponentPropsWithoutRef<"div">, keyof ClustersTableContentProps> &
    ClustersTableContentProps
>

const ClustersTableContent: ClustersTableContentFC = ({
  className,
  ...props
}) => {
  const { table } = useTable<Cluster<Operator[]>>()
  return <DataTable table={table} className={cn(className)} {...props} />
}

// Re-export filters for convenience
const ClustersTableFilters = ClusterTableFiltersComponent

// ============================================================================
// Combined Component
// ============================================================================

type ClustersTableProps = {
  dataPromise: Promise<PaginatedClustersResponse<Operator[]>>
  hideColumns?: ClusterColumnsAccessorKeys[]
} & ClusterTableFiltersProps

const ClustersTable: FC<ClustersTableProps> = ({
  dataPromise,
  hideColumns,
  ...filterProps
}) => (
  <ClustersTableRoot dataPromise={dataPromise} hideColumns={hideColumns}>
    <ClustersTableHeader />
    <ClustersTableFilters {...filterProps} />
    <ClustersTableContent />
  </ClustersTableRoot>
)

// ============================================================================
// Exports
// ============================================================================

export {
  // Combined (default usage)
  ClustersTable,
  // Hook
  useClustersTable,
  // Individual parts
  ClustersTableRoot,
  ClustersTableHeader,
  ClustersTableMenuButton,
  ClustersTableViewOptions,
  ClustersTableFilters,
  ClustersTableContent,
}

export type { ClustersTableProps, ClusterTableFiltersProps }
