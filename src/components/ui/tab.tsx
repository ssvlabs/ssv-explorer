import * as React from "react"

import { type ComponentWithAs, type PropsWithAs } from "@/types/component"
import { cn } from "@/lib/utils"

import { Badge } from "./badge"
import { Button, type ButtonProps } from "./button"
import { textVariants } from "./text"

type TabProps = {
  isActive?: boolean
  count?: number
} & PropsWithAs<"button">

export type TabFC = ComponentWithAs<"button", ButtonProps & TabProps>

// @ts-expect-error - I don't know how to fix this
export const Tab: TabFC = React.forwardRef<
  HTMLButtonElement,
  ButtonProps & TabProps
>(({ className, isActive, ...props }, ref) => {
  return (
    <Button
      ref={ref}
      className={cn(
        "w-fit",
        {
          "bg-transparent text-gray-500 hover:bg-gray-200 active:bg-gray-300":
            !isActive,
          "font-semibold text-gray-800": isActive,
        },
        className
      )}
      variant={isActive ? "secondary" : "default"}
      {...props}
    >
      {props.children}
      {props.count !== undefined && (
        <Badge
          variant="unstyled"
          size="sm"
          className={textVariants({
            variant: "caption-semibold",
            className: cn("rounded-sm px-1 py-[2px]", {
              "bg-primary-500 text-gray-50": isActive,
              "bg-primary-50 text-primary-400": !isActive,
            }),
          })}
        >
          {" "}
          {props.count}
        </Badge>
      )}
    </Button>
  )
})

Tab.displayName = "Tab"
