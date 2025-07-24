import { useTable } from "@/context/table-context"

export const useColumnsVisibility = () => {
  const { table } = useTable()
  const allColumns = table.getAllColumns()
  const hidableColumns = allColumns.filter(
    (column) => typeof column.accessorFn !== "undefined" && column.getCanHide()
  )

  const fixedColumnsCount = allColumns.length - hidableColumns.length

  const visibleColumnsCount =
    hidableColumns.filter((column) => column.getIsVisible()).length +
    fixedColumnsCount

  return {
    allColumns,
    hidableColumns,
    fixedColumnsCount,
    visibleColumnsCount,
  }
}
