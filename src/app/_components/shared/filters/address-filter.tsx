"use client"

import { useState } from "react"
import { xor } from "lodash-es"
import { X } from "lucide-react"
import { type ParserBuilder, useQueryState } from "nuqs"
import { Collapse } from "react-collapse"
import { MdKeyboardReturn } from "react-icons/md"
import { type Address, type Hex } from "viem"

import { cn } from "@/lib/utils"
import { shortenAddress } from "@/lib/utils/strings"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import { Text } from "@/components/ui/text"
import { FilterButton } from "@/components/filter/filter-button"

type HexFilterProps<TSearchKey extends string = string> = {
  name: string
  searchQueryKey: TSearchKey
  parser: ParserBuilder<Address[]>
  placeholder?: string
  invalidMessage?: string
}
export function HexFilter<TSearchKey extends string = string>({
  name = "Hex",
  searchQueryKey,
  parser,
  placeholder = "Enter or paste address",
  invalidMessage = "Invalid address",
}: HexFilterProps<TSearchKey>) {
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState<string>("")
  const [hexes, setHexes] = useQueryState(searchQueryKey, parser)
  const parsedSearch = parser.parse(search)

  const isSearchValidHex = Boolean(parsedSearch && parsedSearch.length > 0)
  const isHexSelected = hexes?.includes(search as Address)

  return (
    <FilterButton
      name={name}
      activeFiltersCount={hexes?.length ?? 0}
      onClear={() => setHexes(null)}
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
            "pb-0": isSearchValidHex,
          })}
        >
          <CommandInput
            placeholder={placeholder}
            value={search}
            onValueChange={(value) => setSearch(value)}
            // className={cn({
            //   "border-error-500": !isSearchValidHex && search,
            // })}
          />
          <Collapse isOpened={!isSearchValidHex && Boolean(search)}>
            <Text variant="caption-medium" className="pt-1 text-error-500">
              {invalidMessage}
            </Text>
          </Collapse>
        </div>
        {Boolean(hexes?.length) && (
          <div className="flex flex-wrap gap-1 border-y p-2">
            {hexes?.map((hexValue) => (
              <Button
                size="sm"
                key={hexValue}
                className="h-6 gap-0.5 rounded-full pb-px pl-2 pr-1"
                variant="secondary"
                onClick={() => setHexes(xor(hexes, [hexValue]))}
              >
                <Text variant="caption-medium">{shortenAddress(hexValue)}</Text>{" "}
                <div className="flex size-4 items-center justify-center">
                  <X className="size-2.5" />
                </div>
              </Button>
            ))}
          </div>
        )}
        {isSearchValidHex && (
          <CommandList
            className={cn("max-h-none overflow-y-auto", {
              "pt-0": !hexes?.length,
            })}
          >
            <CommandGroup>
              <CommandItem
                value={search}
                className="flex h-10 items-center space-x-2 px-2"
                onSelect={() => {
                  setHexes(xor(hexes, [search as Hex]))
                  setSearch("")
                }}
              >
                <span
                  className={cn(
                    "flex-1 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
                    { "text-gray-600 line-through": isHexSelected }
                  )}
                >
                  {shortenAddress(search)}
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
