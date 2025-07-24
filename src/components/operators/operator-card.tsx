import type { ComponentPropsWithRef, FC } from "react"
import Image from "next/image"
import Link from "next/link"
import { PerformanceIcon } from "@/assets/images/performance-icon"
import { StatusIndicator } from "@/assets/images/status-indicator"
import { MdOutlineLock } from "react-icons/md"

import { type Operator } from "@/types/api"
import { cn } from "@/lib/utils"
import { Outline } from "@/components/ui/outline"
import { Text } from "@/components/ui/text"
import { OperatorAvatar } from "@/components/operators/operator-avatar"
import { PerformanceText } from "@/components/operators/performance-text"

export type OperatorCardProps = {
  operator: Operator
}

type OperatorCardFC = FC<
  Omit<ComponentPropsWithRef<"div">, keyof OperatorCardProps> &
    OperatorCardProps
>

export const OperatorCard: OperatorCardFC = ({
  className,
  operator,
  ...props
}) => {
  return (
    <div
      className={cn(
        "flex flex-col items-center gap-3 rounded-2xl border px-5 py-6",
        {
          "border-transparent bg-gray-50": operator.is_active === 1,
          "border-error-200 bg-error-50": operator.is_active === 0,
        },
        className
      )}
      {...props}
    >
      <div className="relative w-fit">
        <OperatorAvatar src={operator.logo} size="lg" variant="unstyled" />
        <StatusIndicator
          className="absolute right-0 top-0 -translate-y-1/2 translate-x-1/2"
          status={operator.is_active === 1 ? "active" : "offline"}
        />
      </div>
      <div className="flex items-center gap-[6px]">
        <Text
          as={Link}
          href={`/operator/${operator.id}`}
          variant="body-3-medium"
          className="line-clamp-1 cursor-pointer"
        >
          {operator.name}
        </Text>
        <div className="flex items-center gap-1">
          {operator.is_private && (
            <MdOutlineLock className="size-[14px] min-w-[14px]" />
          )}
          {operator.type === "verified_operator" && (
            <Image
              width={14}
              height={14}
              className="size-[14px]"
              src="/images/verified.svg"
              alt="Verified"
            />
          )}
        </div>
      </div>
      <div className="flex flex-col items-center gap-1">
        <Outline>
          <Text variant="caption-medium" className="text-gray-500">
            ID:
          </Text>
          <Text variant="body-3-medium">{operator.id}</Text>
        </Outline>
        <Outline>
          <PerformanceIcon />
          <Text
            as={PerformanceText}
            performance={operator.performance["30d"]}
            variant="body-3-medium"
          />
        </Outline>
      </div>
    </div>
  )
}

OperatorCard.displayName = "OperatorCard"
