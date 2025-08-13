/* eslint-disable @next/next/no-img-element */
import { type ComponentPropsWithoutRef, type FC } from "react"

import { cn } from "@/lib/utils"
import { MEV_RELAYS_VALUES } from "@/lib/utils/operator"

import { MevRelayLogo } from "./mev-relay-logo"

export type MevRelaysDisplayProps = {
  mevRelays: string
}

type MevRelaysDisplayFC = FC<
  Omit<ComponentPropsWithoutRef<"div">, keyof MevRelaysDisplayProps> &
    MevRelaysDisplayProps
>

export const MevRelaysDisplay: MevRelaysDisplayFC = ({
  mevRelays,
  className,
  ...props
}) => {
  return (
    <div className={cn("flex gap-0.5", className)} {...props}>
      {MEV_RELAYS_VALUES.map((mev) => (
        <MevRelayLogo key={mev} mev={mev} active={mevRelays.includes(mev)} />
      ))}
    </div>
  )
}

MevRelaysDisplay.displayName = "MevRelaysDisplay"
