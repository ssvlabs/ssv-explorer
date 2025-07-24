"use client"

import type { ComponentPropsWithRef, FC } from "react"
import { Check } from "lucide-react"
import { FaChevronDown, FaEthereum } from "react-icons/fa"

import { type SupportedChain } from "@/config/chains"
import { cn } from "@/lib/utils"
import { networks } from "@/lib/utils/ssv-network-details"
import { useNetworkQuery } from "@/hooks/search/use-network-query"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Text } from "@/components/ui/text"

export const NetworkSwitcher: FC<ComponentPropsWithRef<"button">> = ({
  className,
  ...props
}) => {
  const { chain, query } = useNetworkQuery()
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="default"
          className={cn(
            className,
            "w-fit gap-1 pl-3 pr-2 font-sans capitalize"
          )}
          colorScheme="light"
          {...props}
        >
          <div className="flex items-center gap-3">
            <FaEthereum className="size-4" />
            <Text variant="body-3-medium">{chain.name}</Text>
          </div>
          <div className="flex size-5 items-center justify-center">
            <FaChevronDown className="size-[10px]" />
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0">
        <Command tabIndex={1} className="outline-none">
          <CommandList id="network-switcher-command">
            <CommandEmpty>No results found</CommandEmpty>
            {Object.values(networks).map((network) => (
              <CommandItem
                defaultChecked
                key={network.networkId}
                onSelect={() => {
                  query.set(network.networkId as SupportedChain)
                }}
                className="flex items-center gap-2"
              >
                <FaEthereum />
                <Text variant="body-3-medium" className="capitalize">
                  {network.apiNetwork}
                </Text>
                <Check
                  className={cn(
                    "ml-auto mr-2 size-3",
                    chain.chainId === network.networkId
                      ? "opacity-100"
                      : "opacity-0"
                  )}
                />
              </CommandItem>
            ))}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

NetworkSwitcher.displayName = "NetworkSwitcher"
