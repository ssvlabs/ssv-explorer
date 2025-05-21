"use client"

import { use } from "react"
import Link from "next/link"
import { TableProvider } from "@/context/table-context"
import { withErrorBoundary } from "react-error-boundary"

import { type OperatorsSearchResponse } from "@/types/api"
import { useDataTable } from "@/hooks/use-data-table"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ErrorCard } from "@/components/ui/error-card"
import { Text, textVariants } from "@/components/ui/text"
import { DataTable } from "@/components/data-table/data-table"
import { operatorsTablePreviewColumns } from "@/app/_components/operators/operators-table-columns"

interface OperatorsTableProps {
  dataPromise: Promise<OperatorsSearchResponse>
}

export const OperatorsTablePreview = withErrorBoundary(
  ({ dataPromise: data }: OperatorsTableProps) => {
    const { operators: operators, pagination } = use(data)

    const { table } = useDataTable({
      name: "operators-table-preview",
      data: operators,
      columns: operatorsTablePreviewColumns,
      pageCount: pagination.pages,
      getRowId: (originalRow, index) => `${originalRow.id}-${index}`,
      shallow: false,
      clearOnDefault: true,
      initialState: {
        sorting: [{ id: "id", desc: false }],
        columnVisibility: {
          name: true,
          eth1_node_client: false,
          fee: false,
          location: false,
          id: false,
          owner_address: true,
          eth2_node_client: false,
          validators_count: false,
          performance_24h: true,
          performance_30d: false,
          mev_relays: false,
          status: true,
        },
      },
      meta: {
        total: pagination.total,
      },
    })

    return (
      <TableProvider table={table}>
        <Card className="flex-1 gap-0 overflow-hidden p-0 pb-2">
          <div className="flex justify-between p-6 pb-2">
            <Text variant="body-2-bold" className="text-gray-500">
              Operators
            </Text>
            <Button
              as={Link}
              href="/operators"
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
          title="Couldn't load  Operators"
        />
      )
    },
  }
)
