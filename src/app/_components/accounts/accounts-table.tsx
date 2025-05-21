"use client"

import { use } from "react"
import { TableProvider } from "@/context/table-context"
import { X } from "lucide-react"

import { type PaginatedAccountsResponse } from "@/types/api/account"
import { useAccountsSearchParams } from "@/hooks/search/use-accounts-search-params"
import { useDataTable } from "@/hooks/use-data-table"
import { Button } from "@/components/ui/button"
import { Text } from "@/components/ui/text"
import { DataTable } from "@/components/data-table/data-table"
import { DataTableMenuButton } from "@/components/data-table/data-table-filters-button"
import { DataTableViewOptions } from "@/components/data-table/data-table-view-options"
import { OperatorTableFilters } from "@/app/_components/operators/filters/operator-table-filters"

import { accountsTableColumns } from "./accounts-table-columns"

interface AccountsTableProps {
  dataPromise: Promise<PaginatedAccountsResponse>
}

export const defaultColumns = {
  id: true,
  owner_address: true,
  recipient_address: true,
  version: true,
}

export function AccountsTable({ dataPromise: data }: AccountsTableProps) {
  const { accounts, pagination } = use(data)
  const { enabledFilters, clearFilters } = useAccountsSearchParams()

  const { table } = useDataTable({
    name: "accounts",
    data: accounts,
    columns: accountsTableColumns,
    pageCount: pagination.pages,
    getRowId: (originalRow, index) => `${originalRow.ownerAddress}-${index}`,
    shallow: false,
    clearOnDefault: true,
    meta: {
      total: pagination.total,
    },
  })

  return (
    <>
      <TableProvider table={table}>
        <div className="flex gap-2">
          <Text variant="headline4">Accounts</Text>
          <div className="flex-1"></div>
          <DataTableMenuButton enabledFilters={enabledFilters} />
          {enabledFilters.count > 0 && (
            <Button
              aria-label="Toggle columns"
              variant="outline"
              role="combobox"
              size="sm"
              className="ml-auto flex h-8"
              onClick={clearFilters}
            >
              <X className="size-4" />
              Clear
            </Button>
          )}
          <DataTableViewOptions table={table} />
        </div>
        <OperatorTableFilters />
        <DataTable table={table} />
      </TableProvider>
    </>
  )
}
