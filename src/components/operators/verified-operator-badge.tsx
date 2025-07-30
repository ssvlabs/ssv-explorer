import type { FC } from "react"
import Image, { type ImageProps } from "next/image"

import { cn } from "@/lib/utils"
import { Tooltip } from "@/components/ui/tooltip"

export type VerifiedOperatorBadgeProps = {
  size?: number
}

type VerifiedOperatorBadgeFC = FC<
  Omit<
    Omit<ImageProps, "alt" | "width" | "height" | "src">,
    keyof VerifiedOperatorBadgeProps
  > &
    VerifiedOperatorBadgeProps
>

export const VerifiedOperatorBadge: VerifiedOperatorBadgeFC = ({
  className,
  size = 14,
  ...props
}) => {
  return (
    <Tooltip
      asChild
      content="This operator is verified by SSV"
      delayDuration={500}
    >
      <Image
        {...props}
        width={size}
        height={size}
        style={{
          minWidth: size,
          minHeight: size,
        }}
        className={cn(className)}
        src="/images/verified.svg"
        alt="Verified Operator"
      />
    </Tooltip>
  )
}

VerifiedOperatorBadge.displayName = "VerifiedOperatorBadge"
