"use client"

import type { FC } from "react"
import { omit } from "lodash-es"
import { LuSatelliteDish } from "react-icons/lu"
import { MdOutlineTravelExplore } from "react-icons/md"
import urlJoin from "url-join"

import { cn } from "@/lib/utils"
import { useLinks } from "@/hooks/use-links"
import type { ButtonProps } from "@/components/ui/button"
import { IconButton } from "@/components/ui/button"
import { Tooltip } from "@/components/ui/tooltip"

export type SsvExplorerBtnProps =
  | {
      operatorId: string | number
    }
  | {
      validatorId: string
    }

type SsvExplorerBtnFC = FC<
  Omit<ButtonProps, keyof SsvExplorerBtnProps> & SsvExplorerBtnProps
>

export const SsvExplorerBtn: SsvExplorerBtnFC = ({ className, ...props }) => {
  const links = useLinks()
  const isOperator = "operatorId" in props

  const id = isOperator
    ? (props as { operatorId: string | number }).operatorId
    : (props as { validatorId: string }).validatorId

  const clearedProps = omit(props, ["operatorId", "validatorId"])
  const href = urlJoin(
    links.ssv.explorer,
    isOperator ? "operators" : "validators",
    id.toString()
  )

  return (
    <Tooltip
      asChild
      content={isOperator ? "Explore Operator" : "Explore Validator"}
    >
      <IconButton
        variant="ghost"
        as="a"
        href={href}
        onClick={(ev) => ev.stopPropagation()}
        target="_blank"
        size="icon"
        className={cn(
          "relative inline-flex size-6 overflow-hidden text-gray-500",
          className
        )}
        {...clearedProps}
      >
        <MdOutlineTravelExplore className="size-[65%]" />
      </IconButton>
    </Tooltip>
  )
}

SsvExplorerBtn.displayName = "SsvExplorerBtn"

export type BeaconchainBtnProps = {
  validatorId: string
}

type BeaconchainBtnFC = FC<
  Omit<ButtonProps, keyof BeaconchainBtnProps> & BeaconchainBtnProps
>

export const BeaconchainBtn: BeaconchainBtnFC = ({
  validatorId,
  className,
  ...props
}) => {
  const links = useLinks()

  return (
    <Tooltip asChild content={"Beaconchain"}>
      <IconButton
        as="a"
        variant="ghost"
        href={`${links.beaconcha}/validator/${validatorId}`}
        className={cn(
          "relative inline-flex size-6 overflow-hidden text-gray-500",
          className
        )}
        target="_blank"
        {...props}
      >
        <LuSatelliteDish />
      </IconButton>
    </Tooltip>
  )
}
