import {
  type ComponentProps,
  type ComponentPropsWithoutRef,
  type FC,
  type ReactNode,
  type RefObject,
} from "react"
import { type PopoverProps } from "@radix-ui/react-popover"
import { X } from "lucide-react"
import { GoTriangleDown } from "react-icons/go"

import { cn } from "@/lib/utils"

import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { Text } from "../ui/text"

type FilterButtonProps = {
  ref?: RefObject<HTMLButtonElement>
  isActive?: boolean
  activeFiltersCount?: number
  name: string
  popover?: Partial<{
    root: Omit<PopoverProps, "children">
    content: Omit<ComponentProps<typeof PopoverContent>, "children">
  }>
  onClear?: () => void
  children?: ReactNode
}
export const FilterButton: FC<
  FilterButtonProps &
    Omit<ComponentPropsWithoutRef<"button">, keyof FilterButtonProps>
> = ({
  ref,
  name,
  isActive,
  activeFiltersCount,
  popover,
  onClear,
  children,
  ...props
}) => {
  return (
    <Popover {...popover?.root}>
      <PopoverTrigger asChild>
        <button
          {...props}
          className={cn(
            "group inline-flex h-10 items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
            {
              "bg-gray-100 pl-[16px] pr-2": !activeFiltersCount,
              "bg-primary-100 px-2": activeFiltersCount,
              "bg-primary-100": isActive,
            }
          )}
        >
          {Boolean(activeFiltersCount) && (
            <div className="rounded-md bg-primary-50 px-2 py-[2px]">
              <Text
                variant="body-3-semibold"
                className={cn("text-primary-500")}
                style={{
                  width: `${(activeFiltersCount?.toString().length ?? 1) * 0.9}ch`,
                }}
              >
                {activeFiltersCount}
              </Text>
            </div>
          )}
          <Text
            variant="body-3-medium"
            className={cn({
              "text-primary-500": true || isActive || activeFiltersCount,
            })}
          >
            {name}
          </Text>
          <div className="flex">
            <div className="flex size-6 items-center justify-center">
              <GoTriangleDown className="sFGize-4 text-gray-500 transition-transform group-data-[state=open]:rotate-180 group-data-[state=open]:text-primary-500" />
            </div>
            {Boolean(activeFiltersCount || isActive) && (
              <div
                onClick={(event) => {
                  event.stopPropagation()
                  onClear?.()
                }}
                className="flex size-6 items-center justify-center rounded-md text-gray-500 hover:bg-primary-50 hover:text-primary-500"
              >
                <X className="size-4" />
              </div>
            )}
          </div>
        </button>
      </PopoverTrigger>
      <PopoverContent
        {...popover?.content}
        className={cn("overflow-auto p-0", popover?.content?.className ?? "")}
      >
        {children}
      </PopoverContent>
    </Popover>
  )
}
