import type { FC } from "react"

import type { Validator } from "@/types/api"
import { cn } from "@/lib/utils"
import type { BadgeProps } from "@/components/ui/badge"
import { Badge, type BadgeVariants } from "@/components/ui/badge"

type ValidatorStatus = Validator["status"]

const variants: Record<ValidatorStatus, BadgeVariants["variant"]> = {
  Active: "success",
  Inactive: "error",
}

export type ValidatorStatusBadgeProps = {
  status: ValidatorStatus
}

const getBadgeVariant = (status: ValidatorStatus) => {
  return variants[status] ?? "error"
}

type ValidatorStatusBadgeFC = FC<
  Omit<BadgeProps, keyof ValidatorStatusBadgeProps> & ValidatorStatusBadgeProps
>

export const ValidatorStatusBadge: ValidatorStatusBadgeFC = ({
  className,
  status,
  ...props
}) => {
  return (
    <Badge
      className={cn(className)}
      {...props}
      variant={getBadgeVariant(status)}
    >
      {status}
    </Badge>
  )
}

ValidatorStatusBadge.displayName = "ValidatorStatusBadge"
