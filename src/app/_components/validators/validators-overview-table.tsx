"use client"

import { use } from "react"
import Link from "next/link"
import { TableProvider } from "@/context/table-context"
import { withErrorBoundary } from "react-error-boundary"

import { type Operator, type PaginatedValidatorsResponse } from "@/types/api"
import { defaultValidatorSort } from "@/lib/search-parsers/validators-search-parsers"
import { withNetwork } from "@/lib/utils/link"
import { useDataTable } from "@/hooks/use-data-table"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ErrorCard } from "@/components/ui/error-card"
import { Text, textVariants } from "@/components/ui/text"
import { DataTable } from "@/components/data-table/data-table"

import { validatorsOverviewTableColumns } from "./validators-table-columns"

interface ValidatorsOverviewTableProps {
  dataPromise: Promise<PaginatedValidatorsResponse<Operator>>
}

export const ValidatorsOverviewTable = withErrorBoundary(
  ({ dataPromise: data }: ValidatorsOverviewTableProps) => {
    const response = use(data)

    const { table } = useDataTable({
      name: "validators-table-preview",
      data: response.validators,
      columns: validatorsOverviewTableColumns,
      pageCount: response.pagination.pages,
      getRowId: (originalRow, index) => `${originalRow.id}-${index}`,
      shallow: false,
      clearOnDefault: true,
      initialState: {
        sorting: defaultValidatorSort,
      },
      meta: {
        total: response.pagination.total,
      },
    })

    return (
      <TableProvider table={table}>
        <Card className="flex-1 gap-0 overflow-hidden p-0 pb-2">
          <div className="flex justify-between p-6 pb-2">
            <Text variant="body-2-bold" className="text-gray-500">
              Validators
            </Text>
            <Button
              as={Link}
              href={withNetwork("/validators")}
              variant="link"
              className={textVariants({ variant: "body-3-medium" })}
            >
              View more {">"}
            </Button>
          </div>
          <DataTable className="w-full" table={table} hidePagination />
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
          title="Couldn't load  Validators"
        />
      )
    },
  }
)
