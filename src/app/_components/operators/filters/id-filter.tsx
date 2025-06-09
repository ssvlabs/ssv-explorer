"use client"

import { useState } from "react"
import { searchOperators } from "@/api/operator"
import { useQuery } from "@tanstack/react-query"
import { CommandLoading } from "cmdk"
import { xor } from "lodash-es"
import { Loader2, X } from "lucide-react"

import { cn } from "@/lib/utils"
import { useOperatorsSearchParams } from "@/hooks/search/use-operators-search-params"
import { useDebounceValue } from "@/hooks/use-debounce"
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

export function IdFilter() {
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState<string>("")
  const debouncedSearch = useDebounceValue(search, 500)

  const { network, filters, setFilters } = useOperatorsSearchParams()

  const query = useQuery({
    queryKey: ["operators", "ids", search, network],
    queryFn: async () => {
      return searchOperators({
        network,
        search,
        page: 1,
        perPage: 10,
      })
    },
    enabled: open && Boolean(debouncedSearch),
  })

  const showList = search && debouncedSearch

  return (
    <FilterButton
      name="ID"
      activeFiltersCount={filters.id?.length ?? 0}
      onClear={() => setFilters((prev) => ({ ...prev, id: null }))}
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
      <Command shouldFilter={false}>
        <div
          className={cn("p-2", {
            "pb-0": showList,
          })}
        >
          <CommandInput
            placeholder="Search Ids"
            value={search}
            onValueChange={(value) => setSearch(value)}
          />
        </div>

        {Boolean(filters.id?.length) && (
          <div className="flex flex-wrap gap-1 border-y border-gray-200 p-2">
            {filters.id?.map((id) => (
              <Button
                size="sm"
                key={id}
                className="h-6 gap-0.5 rounded-full pb-px pl-2 pr-1"
                variant="secondary"
                onClick={() =>
                  setFilters((prev) => ({
                    ...prev,
                    id: xor(prev.id, [id]),
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
        {showList && (
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
                className="flex h-10 items-center space-x-2 px-2"
                onSelect={() => {
                  setFilters((prev) => ({
                    ...prev,
                    id: xor(prev.id, [operator.id]),
                  }))
                }}
              >
                <Checkbox
                  id={operator.id.toString()}
                  checked={filters.id?.includes(operator.id)}
                  className="mr-2"
                />
                <span
                  className={cn(
                    "flex-1 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  )}
                >
                  {operator.id}
                </span>
              </CommandItem>
            ))}
          </CommandList>
        )}
      </Command>
    </FilterButton>
  )
}
