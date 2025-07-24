"use client"

import { useState } from "react"
import { xor } from "lodash-es"
import { X } from "lucide-react"
import { useQueryState, type ParserBuilder } from "nuqs"
import { MdKeyboardReturn } from "react-icons/md"
import { isAddress, type Address } from "viem"

import { cn } from "@/lib/utils"
import { shortenAddress } from "@/lib/utils/strings"
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

type AddressFilterProps<TSearchKey extends string = string> = {
  name: string
  searchQueryKey: TSearchKey
  parser: ParserBuilder<Address[]>
}
export function AddressFilter<TSearchKey extends string = string>({
  name = "Address",
  searchQueryKey,
  parser,
}: AddressFilterProps<TSearchKey>) {
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState<string>("")
  const [addresses, setAddresses] = useQueryState(searchQueryKey, parser)

  const isSearchValidAddress = isAddress(search)
  const isAddressSelected = addresses?.includes(search)

  return (
    <FilterButton
      name={name}
      activeFiltersCount={addresses?.length ?? 0}
      onClear={() => setAddresses(null)}
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
        {Boolean(addresses?.length) && (
          <div className="flex flex-wrap gap-1 border-y p-2">
            {addresses?.map((owner_address) => (
              <Button
                size="sm"
                key={owner_address}
                className="h-6 gap-0.5 rounded-full pb-px pl-2 pr-1"
                variant="secondary"
                onClick={() => setAddresses(xor(addresses, [owner_address]))}
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
              "pt-0": !addresses?.length,
            })}
          >
            <CommandEmpty>This list is empty.</CommandEmpty>
            <CommandGroup>
              <CommandItem
                value={search}
                className="flex h-10 items-center space-x-2 px-2"
                onSelect={() => {
                  setAddresses(xor(addresses, [search]))
                  setSearch("")
                }}
              >
                <span
                  className={cn(
                    "flex-1 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
                    { "text-gray-600 line-through": isAddressSelected }
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
