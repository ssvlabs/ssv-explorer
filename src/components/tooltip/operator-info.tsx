import type { ComponentPropsWithoutRef, ComponentPropsWithRef, FC } from "react"
import { MdOutlineLock } from "react-icons/md"

import { type Operator } from "@/types/api"
import { cn } from "@/lib/utils"
import { Text } from "@/components/ui/text"
import { OperatorAvatar } from "@/components/operators/operator-avatar"

export type OperatorInfoProps = {
  operator: Pick<Operator, "id" | "name" | "logo" | "is_private" | "type">
}

type OperatorInfoFC = FC<
  Omit<ComponentPropsWithRef<"div">, keyof OperatorInfoProps> &
    OperatorInfoProps
>

export const OperatorInfo: OperatorInfoFC = ({
  className,
  operator,
  ...props
}) => {
  return (
    <div className={cn("flex items-center gap-4", className)} {...props}>
      <OperatorAvatar src={operator.logo} size="lg" />
      <div className="flex flex-col items-start">
        <div className="flex items-center gap-2">
          <Text variant="body-3-medium" className="text-gray-800">
            {operator.name || `Operator ${operator.id}`}
          </Text>
          <div className="flex items-center gap-1">
            {operator.is_private && <MdOutlineLock className="size-[14px]" />}
            {operator.type === "verified_operator" && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                className="size-[14px]"
                src="/images/verified.svg"
                alt="Verified"
              />
            )}
          </div>
        </div>
        <Text
          variant="caption-medium"
          className="mt-[-2px] font-mono text-gray-500"
        >
          ID {operator.id}
        </Text>
      </div>
    </div>
  )
}

OperatorInfo.displayName = "OperatorInfo"
