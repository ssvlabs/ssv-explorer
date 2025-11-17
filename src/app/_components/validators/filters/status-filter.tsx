"use client"

import { xor } from "lodash-es"
import { useQueryState } from "nuqs"

import { validatorsSearchParsers } from "@/lib/search-parsers/validators-search-parsers"
import { cn } from "@/lib/utils"
import {
  validatorStatusApiParams,
  validatorStatusApiParamToLabel,
} from "@/lib/utils/validator-status-mapping"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import { FilterButton } from "@/components/filter/filter-button"

export function StatusFilter() {
  const [statusParams, setStatusParams] = useQueryState(
    "status",
    validatorsSearchParsers.status
  )

  return (
    <FilterButton
      name="Status"
      activeFiltersCount={statusParams?.length ?? 0}
      onClear={() => setStatusParams(null)}
    >
      <Command>
        <CommandList className="max-h-none overflow-y-auto">
          <CommandEmpty>This list is empty.</CommandEmpty>
          <CommandGroup>
            {validatorStatusApiParams.map((status) => (
              <CommandItem
                key={status}
                value={status}
                className="flex h-10 items-center space-x-2 px-2"
                onSelect={() => {
                  setStatusParams(xor(statusParams, [status]))
                }}
              >
                <Checkbox
                  id={status}
                  checked={statusParams.includes(status)}
                  className="mr-2"
                />
                <span
                  className={cn(
                    "flex-1 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  )}
                >
                  {validatorStatusApiParamToLabel[status]}
                </span>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </Command>
    </FilterButton>
  )
}
