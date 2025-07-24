"use client"

import { use } from "react"
import { TableProvider } from "@/context/table-context"
import { withErrorBoundary } from "react-error-boundary"

import {
  type Operator,
  type OperatorSortingKeys,
  type OperatorsSearchResponse,
} from "@/types/api"
import { operatorSearchSort } from "@/lib/search-parsers/operator-search-parsers"
import { useOperatorsSearchParams } from "@/hooks/search/use-custom-search-params"
import { useDataTable } from "@/hooks/use-data-table"
import { ErrorCard } from "@/components/ui/error-card"
import { Text } from "@/components/ui/text"
import { DataTable } from "@/components/data-table/data-table"
import { DataTableMenuButton } from "@/components/data-table/data-table-filters-button"
import { DataTableViewOptions } from "@/components/data-table/data-table-view-options"
import { OperatorTableFilters } from "@/app/_components/operators/filters/operator-table-filters"

import {
  operatorsDefaultColumnVisibility,
  operatorsTableColumns,
} from "./operators-table-columns"

interface OperatorsTableProps {
  dataPromise: Promise<OperatorsSearchResponse>
}

export const OperatorsTable = withErrorBoundary(
  ({ dataPromise: data }: OperatorsTableProps) => {
    const { operators, pagination } = use(data)

    const { table } = useDataTable<Operator, OperatorSortingKeys>({
      name: "operators-table",
      data: operators,
      columns: operatorsTableColumns,
      pageCount: pagination.pages,
      getRowId: (originalRow, index) => `${originalRow.id}-${index}`,
      shallow: false,
      clearOnDefault: true,
      initialState: {
        sorting: operatorSearchSort.ordering.defaultValue,
        columnVisibility: operatorsDefaultColumnVisibility,
      },
      meta: {
        total: pagination.total,
        defaultColumns: operatorsDefaultColumnVisibility,
      },
    })

    const { enabledFilters } = useOperatorsSearchParams()

    return (
      <>
        <TableProvider table={table}>
          <div className="flex items-center gap-2">
            <Text variant="headline4">Operators</Text>
            <div className="flex-1" />
            <DataTableMenuButton enabledFilters={enabledFilters} />
            <DataTableViewOptions table={table} tableName="operators" />
          </div>
          <OperatorTableFilters />
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
          title="Couldn't load  Operators"
        />
      )
    },
  }
)
