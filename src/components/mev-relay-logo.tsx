/* eslint-disable @next/next/no-img-element */
import { type FC } from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { useTheme } from "next-themes"

import { cn } from "@/lib/utils"
import { MEV_RELAYS_LOGOS, type MevRelay } from "@/lib/utils/operator"
import { Tooltip } from "@/components/ui/tooltip"

const mevVariants = cva("flex size-[0.875em] items-center justify-center", {
  variants: {
    variant: {
      bordered: "rounded-sm border bg-gray-200",
      unstyled: "",
    },
    active: {
      true: "",
      false: "",
      undefined: "",
    },
  },
  compoundVariants: [
    {
      variant: "bordered",
      active: true,
      class: "border-primary-500 bg-primary-50",
    },
    {
      variant: "bordered",
      active: false,
      class: "border-transparent opacity-40 grayscale",
    },
  ],
  defaultVariants: {
    variant: "bordered",
    active: false,
  },
})

export type MevRelayLogoProps = {
  mev: MevRelay
  className?: string
} & VariantProps<typeof mevVariants>

export const MevRelayLogo: FC<MevRelayLogoProps> = ({
  mev,
  variant,
  active,
  className,
}) => {
  const { theme } = useTheme()
  const dark = theme === "dark"

  return (
    <Tooltip
      content={
        <div className="flex items-center gap-3">
          <img
            src={`/images/mevs/${MEV_RELAYS_LOGOS[mev]}${"-dark"}.svg`}
            className={cn("size-10")}
            alt={mev}
          />
          {mev}
        </div>
      }
    >
      <div className={mevVariants({ variant, active, className })}>
        <img
          src={`/images/mevs/${MEV_RELAYS_LOGOS[mev]}${dark ? "-dark" : ""}.svg`}
          className={cn("size-[0.5em]")}
          alt={mev}
        />
      </div>
    </Tooltip>
  )
}
