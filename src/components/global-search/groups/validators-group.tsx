import { type UseInfiniteQueryResult } from "@tanstack/react-query"

import { type SearchValidator } from "@/types/api"
import { shortenAddress } from "@/lib/utils/strings"
import { CommandGroup, CommandItem } from "@/components/ui/command"
import { Text } from "@/components/ui/text"

interface ValidatorsGroupProps {
  query: UseInfiniteQueryResult<SearchValidator[], unknown>
  onSelect: (group: "validator", value: SearchValidator) => void
}

export function ValidatorsGroup({ query, onSelect }: ValidatorsGroupProps) {
  if (!query.data?.length && !query.hasNextPage) return null

  return (
    <CommandGroup>
      <Text
        variant="caption-bold"
        className="px-[14px] pb-2 pt-3 text-gray-500"
      >
        Validators
      </Text>
      {query.data?.map((validator) => (
        <CommandItem
          className="px-5 py-3"
          key={validator.public_key}
          onSelect={() => {
            onSelect("validator", validator)
          }}
        >
          {shortenAddress(validator.public_key)}
        </CommandItem>
      ))}
      {query.hasNextPage && (
        <CommandItem
          className="cursor-pointer"
          value="load-more"
          onMouseDown={(e) => e.preventDefault()}
          onSelect={() => {
            query.fetchNextPage()
          }}
        >
          {query.isFetching ? "Loading..." : "Load more"}
        </CommandItem>
      )}
    </CommandGroup>
  )
}
