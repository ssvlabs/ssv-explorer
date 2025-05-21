"use client"

import { useState } from "react"
import { searchClusters } from "@/api/clusters"
import { useQuery } from "@tanstack/react-query"
import { CommandLoading } from "cmdk"
import { xor } from "lodash-es"
import { Loader2, X } from "lucide-react"
import { isAddress, type Address } from "viem"

import { cn } from "@/lib/utils"
import { shortenAddress } from "@/lib/utils/strings"
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

export function OwnerAddressFilter() {
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState<string>("")
  const { network, filters, setFilters } = useClustersSearchParams()
  const query = useQuery({
    queryKey: ["clusters", "owner-address", search, network],
    queryFn: async () => {
      return searchClusters({
        search: search,
        network,
        page: 1,
        perPage: 10,
      })
    },
    select: (data) => [
      ...new Set(
        data.clusters
          .map((cluster) => cluster.ownerAddress)
          .filter((address): address is Address => Boolean(address))
      ),
    ],
    enabled: open && isAddress(search),
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
        <div className="p-2">
          <CommandInput
            placeholder="Search Owner Address"
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
              <Checkbox
                id={owner_address}
                checked={filters.ownerAddress?.includes(owner_address)}
                className="mr-2"
              />
              <span
                className={cn(
                  "flex-1 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                )}
              >
                {owner_address}
              </span>
            </CommandItem>
          ))}
        </CommandList>
      </Command>
    </FilterButton>
  )
}
