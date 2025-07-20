"use client"

import { use } from "react"
import { TableProvider } from "@/context/table-context"
import { withErrorBoundary } from "react-error-boundary"

import { type Operator, type PaginatedValidatorsResponse } from "@/types/api"
import { defaultValidatorSort } from "@/lib/search-parsers/validators-search-parsers"
import { useValidatorsSearchParams } from "@/hooks/search/use-validators-search-params"
import { useDataTable } from "@/hooks/use-data-table"
import { ErrorCard } from "@/components/ui/error-card"
import { Text } from "@/components/ui/text"
import { DataTableMenuButton } from "@/components/data-table/data-table-filters-button"
import { DataTableViewOptions } from "@/components/data-table/data-table-view-options"
import { DataTable } from "@/components/data-table/elastic-10k-table/data-table"
import {
  ValidatorTableFilters,
  type ValidatorTableFiltersProps,
} from "@/app/_components/validators/filters/validator-table-filters"

import { validatorsTableColumns } from "./validators-table-columns"

type ValidatorsTableProps = {
  dataPromise: Promise<PaginatedValidatorsResponse<Operator>>
} & ValidatorTableFiltersProps

export const ValidatorsTable = withErrorBoundary(
  ({ dataPromise: data, ...filterProps }: ValidatorsTableProps) => {
    const response = use(data)

    const { table } = useDataTable({
      name: "validators-table",
      data: response.validators,
      columns: validatorsTableColumns,
      pageCount: response.pagination.pages,
      getRowId: (originalRow, index) => `${originalRow.id}-${index}`,
      shallow: false,
      clearOnDefault: true,
      initialState: {
        sorting: defaultValidatorSort,
      },
      meta: {
        total: response.pagination.total,
        pagination: response.pagination,
      },
    })

    const { enabledFilters } = useValidatorsSearchParams()

    return (
      <>
        <TableProvider table={table}>
          <div className="flex items-center gap-2">
            <Text variant="headline4">Validators</Text>
            <div className="flex-1"></div>
            <DataTableMenuButton enabledFilters={enabledFilters} />
            <DataTableViewOptions table={table} />
          </div>
          <ValidatorTableFilters {...filterProps} />
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
          title="Couldn't load  Validators"
        />
      )
    },
  }
)
