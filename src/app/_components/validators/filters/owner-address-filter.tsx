"use client"

import { useState } from "react"
import { searchValidators } from "@/api/validators"
import { useQuery } from "@tanstack/react-query"
import { CommandLoading } from "cmdk"
import { xor } from "lodash-es"
import { Loader2, X } from "lucide-react"
import { MdKeyboardReturn } from "react-icons/md"
import { isAddress, type Address } from "viem"

import { cn } from "@/lib/utils"
import { shortenAddress } from "@/lib/utils/strings"
import { useValidatorsSearchParams } from "@/hooks/search/use-validators-search-params"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import { Text } from "@/components/ui/text"
import { FilterButton } from "@/components/filter/filter-button"

export function OwnerAddressFilter() {
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState<string>("")
  const { network, filters, setFilters } = useValidatorsSearchParams()

  const isSearchValidAddress = isAddress(search)

  const query = useQuery({
    queryKey: ["validators", "owner-address", search, network],
    queryFn: async () => {
      return searchValidators({
        network,
        search,
        page: 1,
        perPage: 10,
      })
    },
    select: (data) => [
      ...new Set(
        data.validators.map((validator) => validator.owner_address as Address)
      ),
    ],
    enabled: open && isSearchValidAddress,
  })

  return (
    <FilterButton
      name="Owner Address"
      activeFiltersCount={filters.ownerAddress?.length ?? 0}
      onClear={() => setFilters((prev) => ({ ...prev, ownerAddress: [] }))}
      popover={{
        root: {
          open,
          onOpenChange: setOpen,
        },
        content: {
          className: "w-[440px]",
        },
      }}
    >
      <Command>
        <div
          className={cn("p-2", {
            "pb-0": isSearchValidAddress,
          })}
        >
          <CommandInput
            placeholder="Search addresses"
            value={search}
            onValueChange={(value) => setSearch(value)}
          />
        </div>
        {Boolean(filters.ownerAddress?.length) && (
          <div className="flex flex-wrap gap-1 border-y p-2">
            {filters.ownerAddress?.map((owner_address) => (
              <Button
                size="sm"
                key={owner_address}
                className="h-6 gap-0.5 rounded-full pb-px pl-2 pr-1"
                variant="secondary"
                onClick={() =>
                  setFilters((prev) => ({
                    ...prev,
                    ownerAddress: xor(prev.ownerAddress, [owner_address]),
                  }))
                }
              >
                <Text variant="caption-medium">
                  {shortenAddress(owner_address)}
                </Text>{" "}
                <div className="flex size-4 items-center justify-center">
                  <X className="size-2.5" />
                </div>
              </Button>
            ))}
          </div>
        )}
        {isSearchValidAddress && (
          <CommandList
            className={cn("max-h-none overflow-y-auto", {
              "pt-0": !filters.ownerAddress?.length,
            })}
          >
            {query.isLoading ? (
              <CommandLoading className="flex items-center justify-center p-4">
                <Loader2 className="animate-spin" />
              </CommandLoading>
            ) : (
              <CommandEmpty>This list is empty.</CommandEmpty>
            )}
            <CommandGroup>
              {query.data?.map((owner_address) => (
                <CommandItem
                  key={owner_address}
                  value={owner_address}
                  className="flex h-10 items-center space-x-2 px-2"
                  onSelect={() => {
                    setFilters((prev) => ({
                      ...prev,
                      ownerAddress: xor(prev.ownerAddress, [owner_address]),
                    }))
                  }}
                >
                  <span
                    className={cn(
                      "flex-1 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    )}
                  >
                    {owner_address}
                  </span>
                  <div className="flex h-5 w-6 items-center justify-center rounded-md border border-gray-400">
                    <MdKeyboardReturn className="size-3 text-gray-500" />
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        )}
      </Command>
    </FilterButton>
  )
}
