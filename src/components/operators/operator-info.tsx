"use client"

import type { ComponentPropsWithoutRef, ComponentPropsWithRef, FC } from "react"
import Link from "next/link"
import { MdOutlineLock } from "react-icons/md"

import { type Operator } from "@/types/api"
import { cn } from "@/lib/utils"
import { useNetworkParam } from "@/hooks/app/useNetworkParam"
import { Button } from "@/components/ui/button"
import { Text } from "@/components/ui/text"
import { OperatorAvatar } from "@/components/operators/operator-avatar"
import { VerifiedOperatorBadge } from "@/components/operators/verified-operator-badge"

export type OperatorInfoProps = {
  variant?: "minimal" | "full"
  operator: Pick<Operator, "id" | "name" | "logo" | "is_private" | "type">
  avatarProps?: ComponentPropsWithoutRef<typeof OperatorAvatar>
}

type OperatorInfoFC = FC<
  Omit<ComponentPropsWithRef<"div">, keyof OperatorInfoProps> &
    OperatorInfoProps
>

export const OperatorInfo: OperatorInfoFC = ({
  className,
  variant = "full",
  operator,
  avatarProps,
  ...props
}) => {
  return (
    <div className={cn("flex items-center gap-2", className)} {...props}>
      <OperatorAvatar src={operator.logo} {...avatarProps} />
      <div className="flex min-w-0 flex-1 flex-col items-start">
        <div className="flex min-w-0 flex-1 items-center gap-2">
          <Button
            as={Link}
            variant="link"
            href={`/${useNetworkParam()}/operator/${operator.id}`}
            className="min-w-0 flex-1 text-left"
          >
            <Text className="block w-full max-w-[110px] truncate">
              {operator.name || `Operator ${operator.id}`}
            </Text>
          </Button>
          <div className="flex items-center gap-1">
            {operator.is_private && <MdOutlineLock className="size-[14px]" />}
            {operator.type === "verified_operator" && (
              <VerifiedOperatorBadge size={14} />
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
