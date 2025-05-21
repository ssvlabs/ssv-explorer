"use client"

import { use } from "react"
import { TableProvider } from "@/context/table-context"
import { withErrorBoundary } from "react-error-boundary"

import { type Operator, type PaginatedClustersResponse } from "@/types/api"
import { defaultClusterSort } from "@/lib/search-parsers/clusters-search-parsers"
import { useClustersSearchParams } from "@/hooks/search/use-clusters-search-params"
import { useDataTable } from "@/hooks/use-data-table"
import { ErrorCard } from "@/components/ui/error-card"
import { Text } from "@/components/ui/text"
import { DataTable } from "@/components/data-table/data-table"
import { DataTableMenuButton } from "@/components/data-table/data-table-filters-button"
import { DataTableViewOptions } from "@/components/data-table/data-table-view-options"
import { ClusterTableFilters } from "@/app/_components/clusters/filters/cluster-table-filters"

import {
  clustersTableColumns,
  clustersTableDefaultColumns,
} from "./clusters-table-columns"

interface ClustersTableProps {
  dataPromise: Promise<PaginatedClustersResponse<Operator[]>>
}

export const ClustersTable = withErrorBoundary(
  ({ dataPromise: data }: ClustersTableProps) => {
    const { clusters, pagination } = use(data)

    const { table } = useDataTable({
      name: "clusters",
      data: clusters,
      columns: clustersTableColumns,
      pageCount: pagination.pages,
      getRowId: (originalRow, index) => `${originalRow.clusterId}-${index}`,
      shallow: false,
      clearOnDefault: true,
      initialState: {
        sorting: defaultClusterSort,
        columnVisibility: clustersTableDefaultColumns,
      },
      meta: {
        total: pagination.total,
        defaultColumns: clustersTableDefaultColumns,
      },
    })

    const { enabledFilters } = useClustersSearchParams()

    return (
      <>
        <TableProvider table={table}>
          <div className="flex gap-2">
            <Text variant="headline4">Clusters</Text>
            <div className="flex-1"></div>
            <DataTableMenuButton enabledFilters={enabledFilters} />
            <DataTableViewOptions table={table} />
          </div>
          <ClusterTableFilters />
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
          title="Couldn't load  Clusters"
        />
      )
    },
  }
)
