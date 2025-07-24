import { type Table, type TableOptions } from "@tanstack/react-table"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useQueryState } from "nuqs"

import { type InfinitePagination, type SearchValidator } from "@/types/api"
import { elasticSearchParsers } from "@/lib/search-parsers/validators-search-parsers"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface DataTablePaginationProps<TData> {
  table: Table<TData> & {
    options: TableOptions<TData> & {
      meta: {
        total: number
        pagination?: InfinitePagination
        defaultColumns?: Record<string, boolean>
      }
    }
  }
  pagination: InfinitePagination
  pageSizeOptions?: number[]
}

export function DataTablePagination({
  table,
  pageSizeOptions = [10, 25, 50, 100],
}: DataTablePaginationProps<SearchValidator>) {
  const tableState = table.getState()
  const pageSize = tableState.pagination.pageSize
  const pageIndex = tableState.pagination.pageIndex
  const totalItems = table.options.meta?.total ?? 0

  const [, setLastId] = useQueryState("lastId", elasticSearchParsers.lastId)
  const [, setSearchDirection] = useQueryState(
    "pageDirection",
    elasticSearchParsers.pageDirection
  )

  const handleNext = () => {
    setLastId(table.options.meta.pagination?.current_last.toString() ?? "")
    setSearchDirection("next")
    table.nextPage()
  }

  const handlePrevious = () => {
    if (pageIndex === 1) {
      setLastId(null)
      setSearchDirection(null)
    } else {
      setLastId(table.options.meta.pagination?.current_last.toString() ?? "")
      setSearchDirection("prev")
    }
    table.previousPage()
  }

  const startRow = pageIndex * pageSize + 1
  const endRow = Math.min((pageIndex + 1) * pageSize, totalItems)

  return (
    <div className="flex w-full flex-col-reverse items-center justify-between gap-4 overflow-auto p-1 sm:flex-row sm:gap-8">
      <div className="flex-1 whitespace-nowrap text-sm text-muted-foreground">
        {startRow}-{endRow} of {totalItems}
      </div>
      <div className="flex flex-col-reverse items-center gap-4 sm:flex-row sm:gap-6 lg:gap-8">
        <div className="flex items-center space-x-2">
          <p className="whitespace-nowrap text-sm font-medium">Rows per page</p>
          <Select
            value={`${table.getState().pagination.pageSize}`}
            onValueChange={(value) => {
              table.setPageSize(Number(value))
            }}
          >
            <SelectTrigger className="h-8 w-[4.5rem]">
              <SelectValue placeholder={table.getState().pagination.pageSize} />
            </SelectTrigger>
            <SelectContent side="top">
              {pageSizeOptions.map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center justify-center text-sm font-medium">
          Page {table.getState().pagination.pageIndex + 1} of{" "}
          {table.getPageCount()}
        </div>
        <div className="flex items-center space-x-2">
          <Button
            aria-label="Go to previous page"
            variant="outline"
            size="icon"
            className="size-8"
            onClick={handlePrevious}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronLeft className="size-4" aria-hidden="true" />
          </Button>
          <Button
            aria-label="Go to next page"
            variant="outline"
            size="icon"
            className="size-8"
            onClick={handleNext}
            disabled={!table.getCanNextPage()}
          >
            <ChevronRight className="size-4" aria-hidden="true" />
          </Button>
        </div>
      </div>
    </div>
  )
}
