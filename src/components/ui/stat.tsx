import type { ComponentPropsWithRef, FC, ReactNode } from "react"
import { Slot } from "@radix-ui/react-slot"
import { isNumber, isString } from "lodash-es"
import { FaInfoCircle } from "react-icons/fa"

import { cn } from "@/lib/utils"
import { Text } from "@/components/ui/text"
import { Tooltip } from "@/components/ui/tooltip"

import { Skeleton } from "./skeleton"

export type StatProps = {
  title: string
  content: ReactNode
  tooltip?: ReactNode
  subContent?: ReactNode
  isContentLoading?: boolean
}

type StatFC = FC<
  Omit<ComponentPropsWithRef<"div">, keyof StatProps> & StatProps
>

export const Stat: StatFC = ({
  className,
  title,
  tooltip,
  content,
  subContent,
  isContentLoading,
  ...props
}) => {
  const ContentComponent = isString(content) || isNumber(content) ? Text : Slot
  const SubContentComponent =
    isString(subContent) || isNumber(subContent) ? Text : Slot

  return (
    <div className={cn("flex flex-col", className)} {...props}>
      <Tooltip content={tooltip}>
        <div className="flex items-center gap-1">
          <Text
            variant="caption-medium"
            className="whitespace-nowrap text-gray-500"
          >
            {title}
          </Text>
          {tooltip && <FaInfoCircle className="size-3 text-gray-500" />}
        </div>
      </Tooltip>
      {isContentLoading ? (
        <Skeleton className="w-24">
          <Text
            className="select-none text-xl text-transparent"
            aria-hidden="true"
          >
            Placeholder
          </Text>
        </Skeleton>
      ) : (
        <ContentComponent className="text-xl font-bold">
          {content}
        </ContentComponent>
      )}
      {subContent &&
        (isContentLoading ? (
          <Skeleton className="w-16">
            <Text
              variant="caption-medium"
              className="select-none text-transparent"
              aria-hidden="true"
            >
              Placeholder
            </Text>
          </Skeleton>
        ) : (
          <SubContentComponent
            variant="caption-medium"
            className="text-gray-500"
          >
            {subContent}
          </SubContentComponent>
        ))}
    </div>
  )
}

Stat.displayName = "Stat"
