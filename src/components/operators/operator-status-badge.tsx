import type { FC } from "react"

import type { Operator } from "@/types/api"
import { cn } from "@/lib/utils"
import type { BadgeProps, BadgeVariants } from "@/components/ui/badge"
import { Badge } from "@/components/ui/badge"

type OperatorStatus = Operator["status"]

export type OperatorStatusBadgeProps = {
  status: OperatorStatus
}

type OperatorStatusBadgeFC = FC<
  Omit<BadgeProps, keyof OperatorStatusBadgeProps> & OperatorStatusBadgeProps
>

const variants: Record<OperatorStatus, BadgeVariants["variant"]> = {
  Active: "success",
  Removed: "uncoloredError",
  "No validators": "info",
  Inactive: "error",
}
const getBadgeVariant = (status: OperatorStatus): BadgeVariants["variant"] => {
  return variants[status] ?? "info"
}

export const OperatorStatusBadge: OperatorStatusBadgeFC = ({
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

OperatorStatusBadge.displayName = "OperatorStatusBadge"
