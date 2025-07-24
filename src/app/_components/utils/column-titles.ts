/* eslint-disable @typescript-eslint/no-explicit-any */
import type { ColumnDef } from "@tanstack/react-table"

import { eventsTableColumns } from "@/app/_components/events/events-table-columns"

import { accountsTableColumns } from "../accounts/accounts-table-columns"
import { clustersTableColumns } from "../clusters/clusters-table-columns"
import { operatorsTableColumns } from "../operators/operators-table-columns"
import { validatorsTableColumns } from "../validators/validators-table-columns"

const createTitleMap = <TData>(columns: ColumnDefWithTitle<TData>[]) => {
  return columns.reduce(
    (acc, column) => {
      if (!column.title) return acc
      acc[column.accessorKey] = column.title
      return acc
    },
    {} as Record<string, string>
  )
}

export type ColumnDefWithTitle<TData> = ColumnDef<TData> & {
  title?: string
  accessorKey: string
}
const customColumnTitles: Partial<Record<TableName, Record<string, string>>> = {
  operators: createTitleMap(operatorsTableColumns),
  validators: createTitleMap(validatorsTableColumns),
  clusters: createTitleMap(clustersTableColumns),
  accounts: createTitleMap(accountsTableColumns),
  events: createTitleMap(eventsTableColumns),
}
export type TableName =
  | "operators"
  | "validators"
  | "clusters"
  | "accounts"
  | "events"

export const getColumnTitle = (tableName: TableName, columnId: string) => {
  return customColumnTitles[tableName]?.[columnId]
}
