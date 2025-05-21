"use client"

import { useState } from "react"
import { searchOperators } from "@/api/operator"
import { useQuery } from "@tanstack/react-query"
import { CommandLoading } from "cmdk"
import { xor } from "lodash-es"
import { Loader2, X } from "lucide-react"

import { useClustersSearchParams } from "@/hooks/search/use-clusters-search-params"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import { Text } from "@/components/ui/text"
import { FilterButton } from "@/components/filter/filter-button"
import { OperatorInfo } from "@/components/operators/operator-info"

export function OperatorsFilter() {
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState<string>("")
  const { network, filters, setFilters } = useClustersSearchParams()
  const query = useQuery({
    queryKey: ["operators", "search", search, network],
    queryFn: async () => {
      return searchOperators({
        network,
        search,
        page: 1,
        perPage: 10,
      })
    },
    enabled: open,
  })

  return (
    <FilterButton
      name="Operators"
      activeFiltersCount={filters.operators?.length ?? 0}
      onClear={() => setFilters((prev) => ({ ...prev, operators: [] }))}
      popover={{
        root: {
          open,
          onOpenChange: setOpen,
        },
        content: {
          className: "w-[320px]",
        },
      }}
    >
      <Command>
        <div className="p-2">
          <CommandInput
            placeholder="Search Operators"
            value={search}
            onValueChange={(value) => setSearch(value)}
          />
        </div>
        {Boolean(filters.operators?.length) && (
          <div className="flex flex-wrap gap-1 border-y border-gray-200 p-2">
            {filters.operators?.map((id) => (
              <Button
                size="sm"
                key={id}
                className="h-6 gap-0.5 rounded-full pb-px pl-2 pr-1"
                variant="secondary"
                onClick={() =>
                  setFilters((prev) => ({
                    ...prev,
                    operators: xor(prev.operators, [id]),
                  }))
                }
              >
                <Text variant="caption-medium">{id}</Text>{" "}
                <div className="flex size-4 items-center justify-center">
                  <X className="size-2.5" />
                </div>
              </Button>
            ))}
          </div>
        )}
        <CommandList className="max-h-none overflow-y-auto">
          {query.isLoading ? (
            <CommandLoading className="flex items-center justify-center p-4">
              <Loader2 className="animate-spin" />
            </CommandLoading>
          ) : (
            <CommandEmpty>This list is empty.</CommandEmpty>
          )}
          {query.data?.operators.map((operator) => (
            <CommandItem
              key={operator.id}
              value={operator.id.toString()}
              className="flex h-10 items-center space-x-2 px-2 py-1"
              onSelect={() => {
                setFilters((prev) => ({
                  ...prev,
                  operators: xor(prev.operators, [operator.id]),
                }))
              }}
            >
              <Checkbox
                id={operator.id.toString()}
                checked={filters.operators?.includes(operator.id)}
                className="mr-2"
              />
              <OperatorInfo
                operator={operator}
                className="pointer-events-none py-1"
              />
            </CommandItem>
          ))}
        </CommandList>
      </Command>
    </FilterButton>
  )
}
