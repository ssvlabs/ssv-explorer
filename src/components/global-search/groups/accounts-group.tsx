import { type UseInfiniteQueryResult } from "@tanstack/react-query"

import { type Account } from "@/types/api/account"
import { shortenAddress } from "@/lib/utils/strings"
import { Button } from "@/components/ui/button"
import { CommandGroup, CommandItem } from "@/components/ui/command"
import { Text } from "@/components/ui/text"

interface AccountsGroupProps {
  query: UseInfiniteQueryResult<Account[], unknown>
  onSelect: (group: "account", value: Account) => void
}

export function AccountsGroup({ query, onSelect }: AccountsGroupProps) {
  if (!query.data?.length && !query.hasNextPage) return null

  return (
    <CommandGroup>
      <Text
        variant="caption-bold"
        className="px-[14px] pb-2 pt-3 text-gray-500"
      >
        Accounts
      </Text>
      {query.data?.map((account) => (
        <CommandItem
          className="px-5 py-3"
          key={account.ownerAddress}
          onSelect={() => {
            onSelect("account", account)
          }}
        >
          {shortenAddress(account.ownerAddress)}
        </CommandItem>
      ))}
      {query.hasNextPage && (
        <div className="mt-1 flex w-full justify-center">
          <Button
            size="sm"
            className="w-full text-primary-500"
            variant="ghost"
            isLoading={query.isFetching}
            onClick={(ev) => {
              ev.preventDefault()
              ev.stopPropagation()
              query.fetchNextPage()
            }}
          >
            Load more
          </Button>
        </div>
      )}
    </CommandGroup>
  )
}
