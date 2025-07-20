import type { FC } from "react"

import { cn } from "@/lib/utils"
import type { BadgeProps } from "@/components/ui/badge"
import { Badge } from "@/components/ui/badge"

export type ClusterStatusBadgeProps = {
  active: boolean
}

type ClusterStatusBadgeFC = FC<
  Omit<BadgeProps, keyof ClusterStatusBadgeProps> & ClusterStatusBadgeProps
>

export const ClusterStatusBadge: ClusterStatusBadgeFC = ({
  className,
  active,
  ...props
}) => {
  return (
    <Badge
      className={cn(className)}
      size="sm"
      {...props}
      variant={active ? "success" : "error"}
    >
      {active ? "Active" : "Inactive"}
    </Badge>
  )
}

ClusterStatusBadge.displayName = "ClusterStatusBadge"
