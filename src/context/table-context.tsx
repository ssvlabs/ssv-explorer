"use client"

import {
  createContext,
  use,
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from "react"
import { type Table } from "@tanstack/react-table"

type TableContextType<TData> = {
  table: Table<TData>
  isFiltersOpen: boolean
  setIsFiltersOpen: Dispatch<SetStateAction<boolean>>
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const TableContext = createContext<TableContextType<any> | null>(null)

interface TableProviderProps<TData> {
  children: ReactNode
  table: Table<TData>
}

export function TableProvider<TData = unknown>({
  children,
  table,
}: TableProviderProps<TData>) {
  const [isFiltersOpen, setIsFiltersOpen] = useState(false)
  return (
    <TableContext.Provider value={{ table, isFiltersOpen, setIsFiltersOpen }}>
      {children}
    </TableContext.Provider>
  )
}

export function useTable<TData = unknown>() {
  const context = use(TableContext)
  if (context === undefined) {
    throw new Error("useTableContext must be used within a TableProvider")
  }
  return context as TableContextType<TData>
}
