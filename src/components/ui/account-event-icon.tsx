import type { ComponentPropsWithRef, FC } from "react"

import { cn } from "@/lib/utils"
import {
  getAccountEventIcon,
  type AccountEventName,
} from "@/lib/utils/account-events"

export type AccountEventIconProps = {
  event: AccountEventName
}

type AccountEventIconFC = FC<
  Omit<ComponentPropsWithRef<"div">, keyof AccountEventIconProps> &
    AccountEventIconProps
>

export const AccountEventIcon: AccountEventIconFC = ({
  className,
  event,
  ...props
}) => {
  return (
    <div
      className={cn(
        "flex size-7 min-w-7 items-center justify-center rounded-lg border border-primary-300 bg-gray-100",
        className
      )}
      {...props}
    >
      {getAccountEventIcon(event)}
    </div>
  )
}

AccountEventIcon.displayName = "AccountEventIcon"
