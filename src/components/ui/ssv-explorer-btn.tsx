"use client"

import type { FC } from "react"
import { type Address } from "abitype"
import { LuSatelliteDish } from "react-icons/lu"
import { TbExternalLink } from "react-icons/tb"
import urlJoin from "url-join"

import { cn } from "@/lib/utils"
import { useLinks } from "@/hooks/use-links"
import type { ButtonProps } from "@/components/ui/button"
import { Button, IconButton } from "@/components/ui/button"
import { Tooltip } from "@/components/ui/tooltip"

export type EtherscanBtnProps = {
  address: Address
}

type EtherscanBtnFC = FC<
  Omit<ButtonProps, keyof EtherscanBtnProps> & EtherscanBtnProps
>

export const EtherscanBtn: EtherscanBtnFC = ({
  className,
  address,
  ...props
}) => {
  const links = useLinks()
  const href = urlJoin(links.etherscan, "address", address)

  return (
    <Tooltip asChild content="Explore on Etherscan">
      <Button
        as="a"
        href={href}
        onClick={(ev) => ev.stopPropagation()}
        target="_blank"
        size="icon"
        variant="ghost"
        className={cn("size-7 text-gray-700", className)}
        {...props}
      >
        <TbExternalLink className="size-[65%]" />
      </Button>
    </Tooltip>
  )
}

EtherscanBtn.displayName = "SsvEtherscanBtn"

export type BeaconchainBtnProps = {
  validatorId: string
}

type BeaconchainBtnFC = FC<
  Omit<ButtonProps, keyof BeaconchainBtnProps> & BeaconchainBtnProps
>

export const BeaconchainBtn: BeaconchainBtnFC = ({ validatorId, ...props }) => {
  const links = useLinks()

  return (
    <Tooltip asChild content={"Beaconchain"}>
      <IconButton
        as="a"
        href={`${links.beaconcha}/validator/${validatorId}`}
        target="_blank"
        {...props}
      >
        <LuSatelliteDish />
      </IconButton>
    </Tooltip>
  )
}
