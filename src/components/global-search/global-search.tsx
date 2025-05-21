"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { useAsyncRoutePush } from "@/hooks/next/use-async-route-push"
import { useClustersInfiniteQuery } from "@/hooks/queries/use-clusters-infinite-query"
import { useOperatorsInfiniteQuery } from "@/hooks/queries/use-operators-infinite-query"
import { useValidatorsInfiniteQuery } from "@/hooks/queries/use-validators-infinite-query"
import { useDebounceValue } from "@/hooks/use-debounce"
import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Spinner } from "@/components/ui/spinner"
import { textVariants } from "@/components/ui/text"

import { OperatorsGroup } from "./groups/operators-group"
import { ValidatorsGroup } from "./groups/validators-group"

export const globalSearchVariants = cva("rounded-xl bg-background", {
  variants: {
    size: {
      md: "h-10 p-0 px-4",
      lg: "h-[60px] p-0 px-4",
    },
  },
  defaultVariants: {
    size: "md",
  },
})

type Props = VariantProps<typeof globalSearchVariants> &
  React.ComponentProps<typeof Command>

export const GlobalSearch: React.FC<Props> = ({ size, ...props }) => {
  const [open, setOpen] = React.useState(false)
  const [search, setSearch] = React.useState("")
  const [isFocused, setIsFocused] = React.useState(false)
  const inputRef = React.useRef<HTMLInputElement>(null)
  const debouncedSearch = useDebounceValue(search, 500)
  const hasSearch = Boolean(search) && Boolean(debouncedSearch)

  const asyncRoutePush = useAsyncRoutePush()

  const operatorsQuery = useOperatorsInfiniteQuery({
    search: debouncedSearch,
    perPage: 5,
  })

  const validatorsQuery = useValidatorsInfiniteQuery({
    search: debouncedSearch,
    perPage: 5,
  })

  const clustersQuery = useClustersInfiniteQuery({
    search: debouncedSearch,
    perPage: 5,
  })

  const hasAnyLoadedData = Boolean(
    operatorsQuery.data?.length ||
      validatorsQuery.data?.length ||
      clustersQuery.data?.length
  )

  const isLoading =
    operatorsQuery.isLoading ||
    validatorsQuery.isLoading ||
    clustersQuery.isLoading

  const close = () => {
    inputRef.current?.blur()
    setOpen(false)
  }

  return (
    <Popover
      open={(open || isFocused) && (hasSearch || hasAnyLoadedData)}
      onOpenChange={setOpen}
    >
      <Command
        shouldFilter={false}
        {...props}
        className={cn(props.className, "h-fit")}
      >
        <PopoverTrigger className="rounded-xl">
          <CommandInput
            ref={inputRef}
            placeholder="Search operator ID or name, validator public key, cluster ID or account address"
            value={search}
            className={globalSearchVariants({
              size,
              className: textVariants({
                variant: "body-3-medium",
                className: "border border-gray-300 bg-gray-50",
              }),
            })}
            onValueChange={(value) => setSearch(value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />
        </PopoverTrigger>
        <PopoverContent
          className="h-full w-[var(--radix-popover-trigger-width)] border-gray-300 p-0 shadow-none outline outline-[6px] outline-gray-200"
          onOpenAutoFocus={(e) => e.preventDefault()}
        >
          <CommandList className="flex flex-col">
            {!isLoading && search && <CommandEmpty>No found.</CommandEmpty>}
            {isLoading && (
              <div className="flex items-center justify-center p-6">
                <Spinner />
              </div>
            )}
            {!isLoading && (
              <>
                <OperatorsGroup
                  query={operatorsQuery}
                  onSelect={(group, operator) => {
                    close()
                    asyncRoutePush.mutate(`/operator/${operator.id}`)
                  }}
                />
                {validatorsQuery.data?.length && (
                  <>
                    <CommandSeparator />
                    <ValidatorsGroup
                      query={validatorsQuery}
                      onSelect={(group, validator) => {
                        close()
                        asyncRoutePush.mutate(
                          `/validator/${validator.public_key}`
                        )
                      }}
                    />
                  </>
                )}
              </>
            )}
          </CommandList>
        </PopoverContent>
      </Command>
    </Popover>
  )
}
