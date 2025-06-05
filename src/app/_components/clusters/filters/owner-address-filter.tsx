"use client"

import { useState } from "react"
import { xor } from "lodash-es"
import { X } from "lucide-react"
import { MdKeyboardReturn } from "react-icons/md"
import { isAddress } from "viem"

import { cn } from "@/lib/utils"
import { shortenAddress } from "@/lib/utils/strings"
import { useClustersSearchParams } from "@/hooks/search/use-clusters-search-params"
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
  const { filters, setFilters } = useClustersSearchParams()

  const isSearchValidAddress = isAddress(search)

  return (
    <FilterButton
      name="Owner Address"
      activeFiltersCount={filters.ownerAddress?.length ?? 0}
      onClear={() => setFilters((prev) => ({ ...prev, ownerAddress: null }))}
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
            <CommandEmpty>This list is empty.</CommandEmpty>
            <CommandGroup>
              <CommandItem
                value={search}
                className="flex h-10 items-center space-x-2 px-2"
                onSelect={() => {
                  setFilters((prev) => ({
                    ...prev,
                    ownerAddress: xor(prev.ownerAddress, [search]),
                  }))
                }}
              >
                <span
                  className={cn(
                    "flex-1 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  )}
                >
                  {search}
                </span>
                <div className="flex h-5 w-6 items-center justify-center rounded-md border border-gray-400">
                  <MdKeyboardReturn className="size-3 text-gray-500" />
                </div>
              </CommandItem>
            </CommandGroup>
          </CommandList>
        )}
      </Command>
    </FilterButton>
  )
}
