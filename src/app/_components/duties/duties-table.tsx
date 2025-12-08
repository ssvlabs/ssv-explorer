"use client"

import { use, useState } from "react"
import { TableProvider } from "@/context/table-context"
import { withErrorBoundary } from "react-error-boundary"

import { type DutiesResponse, type DutyElement } from "@/types/api/duties"
import { type ChainName } from "@/config/chains"
import { defaultDutiesSort } from "@/lib/search-parsers/duties-search-parsers"
import { useDataTable } from "@/hooks/use-data-table"
import { useLocalStorage } from "@/hooks/use-local-storage"
import { Badge } from "@/components/ui/badge"
import { Text } from "@/components/ui/text"
import { DataTable } from "@/components/data-table/data-table"
import { DataTableViewOptions } from "@/components/data-table/data-table-view-options"

import { createDutiesTableColumns } from "./duties-table-columns"
import { DutyDetailsModal } from "./duty-details-modal"

interface DutiesTableProps {
  dataPromise: Promise<DutiesResponse>
  network: ChainName
}

export const defaultColumns = {
  publicKey: true,
  slot: true,
  epoch: true,
  duty: true,
  status: true,
  sequence: true,
}

export const DutiesTable = withErrorBoundary(
  ({ dataPromise: data, network }: DutiesTableProps) => {
    const response = use(data)
    const [selectedDuty, setSelectedDuty] = useState<DutyElement | null>(null)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [enablePerformanceV2] = useLocalStorage("ENABLE_PERFORMANCE_V2")

    const handleRowClick = (duty: DutyElement) => {
      setSelectedDuty(duty)
      setIsModalOpen(Boolean(enablePerformanceV2))
    }

    const { table } = useDataTable({
      name: "duties",
      data: response.duties,
      columns: createDutiesTableColumns(handleRowClick),
      pageCount: response.pagination.pages,
      getRowId: (originalRow, index) => `${originalRow.publicKey}-${index}`,
      shallow: false,
      clearOnDefault: true,
      initialState: {
        sorting: defaultDutiesSort,
      },
      meta: {
        total: response.pagination.total,
      },
    })

    return (
      <>
        <TableProvider table={table}>
          <div className="flex items-center gap-2">
            <Text variant="headline4">Duties </Text>
            <Badge variant="primary" size="sm">
              {response.pagination.total}
            </Badge>
            <div className="flex-1"></div>
            <DataTableViewOptions table={table} />
          </div>
          <DataTable table={table} />
        </TableProvider>

        <DutyDetailsModal
          selectedDuty={selectedDuty}
          network={network}
          open={isModalOpen}
          onOpenChange={setIsModalOpen}
        />
      </>
    )
  },
  {
    fallbackRender: ({ error }) => {
      return (
        <div className="flex flex-col gap-4">
          <h4 className="text-2xl font-semibold tracking-tight">
            Error Loading Duties
          </h4>
          <div className="relative w-full rounded-lg border border-destructive/50 bg-destructive/10 p-4 text-destructive [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-destructive">
            <p className="text-sm [&_p]:leading-relaxed">
              {(error as Error).message}
            </p>
            <pre>{JSON.stringify(error, null, 2)}</pre>
          </div>
        </div>
      )
    },
  }
)
