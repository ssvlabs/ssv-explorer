"use client"

import {
  use,
  useMemo,
  type ComponentPropsWithoutRef,
  type FC,
  type ReactNode,
} from "react"
import { TableProvider, useTable } from "@/context/table-context"
import { withErrorBoundary } from "react-error-boundary"

import {
  type Operator,
  type PaginatedValidatorsResponse,
  type SearchValidator,
} from "@/types/api"
import { defaultValidatorSort } from "@/lib/search-parsers/validators-search-parsers"
import { cn } from "@/lib/utils"
import { useValidatorsSearchParams } from "@/hooks/search/use-custom-search-params"
import { useDataTable } from "@/hooks/use-data-table"
import { ErrorCard } from "@/components/ui/error-card"
import { Text } from "@/components/ui/text"
import { DataTableMenuButton } from "@/components/data-table/data-table-filters-button"
import { DataTableViewOptions } from "@/components/data-table/data-table-view-options"
import { DataTable } from "@/components/data-table/elastic-10k-table/data-table"
import {
  ValidatorTableFilters,
  type ValidatorTableFiltersProps,
} from "@/app/_components/validators/validator-table-filters"

import {
  validatorsTableColumns,
  type ValidatorTableColumnAccessorKey,
} from "./validators-table-columns"

// ============================================================================
// Hook
// ============================================================================

type UseValidatorsTableOptions = {
  dataPromise: Promise<PaginatedValidatorsResponse<Operator>>
  columns?: ValidatorTableColumnAccessorKey[]
}

const useValidatorsTable = ({
  dataPromise,
  columns,
}: UseValidatorsTableOptions) => {
  const response = use(dataPromise)

  const cols = useMemo(
    () =>
      (columns
        ? columns.map((column) =>
            validatorsTableColumns.find((c) => c.accessorKey === column)
          )
        : validatorsTableColumns) as typeof validatorsTableColumns,
    [columns]
  )

  const validators = useMemo(
    () => response.validators.sort((a, b) => b.id - a.id),
    [response.validators]
  )

  const { table } = useDataTable({
    name: "validators-table",
    data: validators,
    columns: cols,
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

  return { table, enabledFilters }
}

// ============================================================================
// Compound Components
// ============================================================================

type ValidatorsTableRootProps = {
  dataPromise: Promise<PaginatedValidatorsResponse<Operator>>
  columns?: ValidatorTableColumnAccessorKey[]
  children: ReactNode
}

const ValidatorsTableRoot = withErrorBoundary(
  ({ dataPromise, columns, children }: ValidatorsTableRootProps) => {
    const { table } = useValidatorsTable({ dataPromise, columns })
    return <TableProvider table={table}>{children}</TableProvider>
  },
  {
    fallbackRender: ({ error }) => (
      <ErrorCard
        className="bg-transparent"
        errorMessage={(error as Error).message}
        title="Couldn't load Validators"
      />
    ),
  }
)

type ValidatorsTableHeaderProps = {
  title?: string
}

type ValidatorsTableHeaderFC = FC<
  Omit<ComponentPropsWithoutRef<"div">, keyof ValidatorsTableHeaderProps> &
    ValidatorsTableHeaderProps
>

const ValidatorsTableHeader: ValidatorsTableHeaderFC = ({
  title = "Validators",
  className,
  ...props
}) => (
  <div className={cn("flex items-center gap-2", className)} {...props}>
    <Text variant="headline4">{title}</Text>
    <div className="flex-1" />
    <ValidatorsTableMenuButton />
  </div>
)

const ValidatorsTableMenuButton = () => {
  const { enabledFilters } = useValidatorsSearchParams()
  return <DataTableMenuButton enabledFilters={enabledFilters} />
}

const ValidatorsTableViewOptions = () => {
  const { table } = useTable<SearchValidator<Operator>>()
  return <DataTableViewOptions table={table} tableName="validators" />
}

type ValidatorsTableContentProps = object

type ValidatorsTableContentFC = FC<
  Omit<ComponentPropsWithoutRef<"div">, keyof ValidatorsTableContentProps> &
    ValidatorsTableContentProps
>

const ValidatorsTableContent: ValidatorsTableContentFC = ({
  className,
  ...props
}) => {
  const { table } = useTable<SearchValidator<Operator>>()
  return <DataTable table={table} className={cn(className)} {...props} />
}

// Re-export filters for convenience
const ValidatorsTableFilters = ValidatorTableFilters

// ============================================================================
// Combined Component
// ============================================================================

type ValidatorsTableProps = {
  dataPromise: Promise<PaginatedValidatorsResponse<Operator>>
  columns?: ValidatorTableColumnAccessorKey[]
} & ValidatorTableFiltersProps

const ValidatorsTable: FC<ValidatorsTableProps> = ({
  dataPromise,
  columns,
  ...filterProps
}) => (
  <ValidatorsTableRoot dataPromise={dataPromise} columns={columns}>
    <ValidatorsTableHeader />
    <ValidatorsTableFilters {...filterProps} />
    <ValidatorsTableContent />
  </ValidatorsTableRoot>
)

// ============================================================================
// Exports
// ============================================================================

export {
  // Combined (default usage)
  ValidatorsTable,
  // Hook
  useValidatorsTable,
  // Individual parts
  ValidatorsTableRoot,
  ValidatorsTableHeader,
  ValidatorsTableMenuButton,
  ValidatorsTableViewOptions,
  ValidatorsTableFilters,
  ValidatorsTableContent,
}

export type { ValidatorsTableProps, ValidatorTableFiltersProps }
