"use client"

import { use } from "react"
import { TableProvider } from "@/context/table-context"
import { withErrorBoundary } from "react-error-boundary"

import { type PaginatedAccountsResponse } from "@/types/api/account"
import { useAccountsSearchParams } from "@/hooks/search/use-custom-search-params"
import { useDataTable } from "@/hooks/use-data-table"
import { ErrorCard } from "@/components/ui/error-card"
import { Text } from "@/components/ui/text"
import { DataTable } from "@/components/data-table/data-table"
import { DataTableMenuButton } from "@/components/data-table/data-table-filters-button"
import { DataTableViewOptions } from "@/components/data-table/data-table-view-options"
import { AccountTableFilters } from "@/app/_components/accounts/account-table-filters"

import {
  accountsDefaultColumnVisibility,
  accountsTableColumns,
} from "./accounts-table-columns"

interface AccountsTableProps {
  dataPromise: Promise<PaginatedAccountsResponse>
}

export const AccountsTable = withErrorBoundary(
  ({ dataPromise: data }: AccountsTableProps) => {
    const { accounts, pagination } = use(data)
    const { enabledFilters } = useAccountsSearchParams()

    const { table } = useDataTable({
      name: "accounts",
      data: accounts,
      columns: accountsTableColumns,
      pageCount: pagination.pages,
      getRowId: (originalRow, index) => `${originalRow.ownerAddress}-${index}`,
      shallow: false,
      clearOnDefault: true,
      initialState: {
        columnVisibility: { ...accountsDefaultColumnVisibility },
      },
      meta: {
        total: pagination.total,
        defaultColumns: accountsDefaultColumnVisibility,
      },
    })

    return (
      <>
        <TableProvider table={table}>
          <div className="flex gap-2">
            <Text variant="headline4">Accounts</Text>
            <div className="flex-1" />
            <DataTableMenuButton enabledFilters={enabledFilters} />
            <DataTableViewOptions table={table} tableName="accounts" />
          </div>
          <AccountTableFilters />
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
          title="Couldn't load Accounts"
        />
      )
    },
  }
)
