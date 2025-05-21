import type { ComponentPropsWithRef, FC } from "react"
import Link from "next/link"
import { MdOutlineLock } from "react-icons/md"

import { type Operator } from "@/types/api"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Text } from "@/components/ui/text"
import { OperatorAvatar } from "@/components/operators/operator-avatar"

export type OperatorInfoProps = {
  variant?: "minimal" | "full"
  operator: Pick<Operator, "id" | "name" | "logo" | "is_private" | "type">
}

type OperatorInfoFC = FC<
  Omit<ComponentPropsWithRef<"div">, keyof OperatorInfoProps> &
    OperatorInfoProps
>

export const OperatorInfo: OperatorInfoFC = ({
  className,
  variant = "full",
  operator,
  ...props
}) => {
  return (
    <div className={cn("flex items-center gap-2", className)} {...props}>
      <OperatorAvatar src={operator.logo} />
      <div className="flex flex-col items-start">
        <div className="flex items-center gap-2">
          <Button asChild variant="link">
            <Link href={`/operator/${operator.id}`}>
              {operator.name || "OOOO"}
            </Link>
          </Button>
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
        {variant === "full" && (
          <Text
            variant="caption-medium"
            className="mt-[-2px] font-mono text-gray-500"
          >
            ID {operator.id}
          </Text>
        )}
      </div>
    </div>
  )
}

OperatorInfo.displayName = "OperatorInfo"
