"use client"

import { useState } from "react"
import { searchValidators } from "@/api/validators"
import { useQuery } from "@tanstack/react-query"
import { CommandLoading } from "cmdk"
import { xor } from "lodash-es"
import { Loader2, X } from "lucide-react"

import { cn } from "@/lib/utils"
import { shortenAddress } from "@/lib/utils/strings"
import { useValidatorsSearchParams } from "@/hooks/search/use-validators-search-params"
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

export function PublicKeyFilter() {
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState<string>("")
  const { network, filters, setFilters } = useValidatorsSearchParams()

  const query = useQuery({
    queryKey: ["validators", "publicKeys", search, network],
    queryFn: async () => {
      return searchValidators({
        search,
        network,
        page: 1,
        perPage: 10,
      })
    },
    enabled: open,
  })

  return (
    <FilterButton
      name="Public Key"
      activeFiltersCount={filters.publicKey?.length ?? 0}
      onClear={() => setFilters((prev) => ({ ...prev, publicKey: null }))}
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
            placeholder="Search Public Keys"
            value={search}
            onValueChange={(value) => setSearch(value)}
          />
        </div>
        {Boolean(filters.publicKey?.length) && (
          <div className="flex flex-wrap gap-1 border-y border-gray-200 p-2">
            {filters.publicKey?.map((id) => (
              <Button
                size="sm"
                key={id}
                className="h-6 gap-0.5 rounded-full pb-px pl-2 pr-1"
                variant="secondary"
                onClick={() =>
                  setFilters((prev) => ({
                    ...prev,
                    publicKey: xor(prev.publicKey, [id]),
                  }))
                }
              >
                <Text variant="caption-medium">{shortenAddress(id)}</Text>{" "}
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
          {query.data?.validators?.map((validator) => (
            <CommandItem
              key={validator.public_key}
              value={validator.public_key}
              className="flex h-10 items-center space-x-2 px-2"
              onSelect={() => {
                setFilters((prev) => ({
                  ...prev,
                  publicKey: xor(prev.publicKey, [validator.public_key]),
                }))
              }}
            >
              <Checkbox
                id={validator.public_key}
                checked={filters.publicKey?.includes(validator.public_key)}
                className="mr-2"
              />
              <span
                className={cn(
                  "flex-1 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                )}
              >
                {shortenAddress(validator.public_key)}
              </span>
            </CommandItem>
          ))}
        </CommandList>
      </Command>
    </FilterButton>
  )
}
