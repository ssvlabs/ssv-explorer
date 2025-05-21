"use client"

import { useState, type ComponentPropsWithRef, type FC } from "react"
import { Collapse } from "react-collapse"
import { FaGlobe, FaLinkedin } from "react-icons/fa"
import { FaXTwitter } from "react-icons/fa6"
import { LuChevronDown } from "react-icons/lu"

import { type Operator } from "@/types/api"
import { cn } from "@/lib/utils"
import { getYearlyFee } from "@/lib/utils/operator"
import { Button } from "@/components/ui/button"
import { Outline } from "@/components/ui/outline"
import { Text } from "@/components/ui/text"
import { MevRelaysDisplay } from "@/components/mev-relays-display"

export type OperatorMetaDataProps = {
  operator: Operator
}

type OperatorMetaDataFC = FC<
  Omit<ComponentPropsWithRef<"div">, keyof OperatorMetaDataProps> &
    OperatorMetaDataProps
>

export const OperatorMetaData: OperatorMetaDataFC = ({
  operator,
  className,
  ...props
}) => {
  const [shouldShowMore, setShouldShowMore] = useState(false)
  return (
    <Collapse
      isOpened={true}
      className={cn(className)}
      style={{
        width: "100%",
      }}
    >
      <div className="flex w-full items-start justify-between rounded-xl bg-gray-200 p-2">
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <div className="flex flex-wrap gap-2">
              <Outline className="h-6">
                <Text variant="caption-medium" className="text-gray-500">
                  Fee (Yearly):
                </Text>
                <Text variant="body-3-medium">
                  {getYearlyFee(BigInt(operator.fee), { format: true })}
                </Text>
              </Outline>
              <Outline className="h-6">
                <Text variant="caption-medium" className="text-gray-500">
                  Location:
                </Text>
                <Text variant="body-3-medium" className="max-w-xs truncate">
                  {operator.location || "N/A"}
                </Text>
              </Outline>
              <Outline className="h-6">
                <Text variant="caption-medium" className="text-gray-500">
                  ETH1 node client:
                </Text>
                <Text variant="body-3-medium">
                  {operator.eth1_node_client || "N/A"}
                </Text>
              </Outline>
              <Outline className="h-6">
                <Text variant="caption-medium" className="text-gray-500">
                  ETH2 node client:
                </Text>
                <Text variant="body-3-medium">
                  {operator.eth2_node_client || "N/A"}
                </Text>
              </Outline>
              <Outline className="h-6 text-xl">
                <Text variant="caption-medium" className="text-gray-500">
                  MEV Relays:
                </Text>
                <MevRelaysDisplay mevRelays={operator.mev_relays} />
              </Outline>
            </div>
            {shouldShowMore && (
              <div className="flex flex-wrap gap-2">
                <Outline className="h-6">
                  <Text variant="caption-medium" className="text-gray-500">
                    Cloud provider:
                  </Text>
                  <Text variant="body-3-medium">
                    {operator.setup_provider || "N/A"}
                  </Text>
                </Outline>
                <Outline className="h-6">
                  <Text variant="caption-medium" className="text-gray-500">
                    DKG Endpoint:
                  </Text>
                  <Text variant="body-3-medium">
                    {operator.dkg_address || "N/A"}
                  </Text>
                </Outline>
                {operator.twitter_url && (
                  <Outline asChild>
                    <a href={operator.twitter_url} target="_blank">
                      <FaXTwitter className="size-4" />
                    </a>
                  </Outline>
                )}
                {operator.linkedin_url && (
                  <Outline asChild>
                    <a href={operator.linkedin_url} target="_blank">
                      <FaLinkedin className="size-4" />
                    </a>
                  </Outline>
                )}
                {operator.website_url && (
                  <Outline asChild>
                    <a href={operator.website_url} target="_blank">
                      <FaGlobe className="size-4" />
                    </a>
                  </Outline>
                )}
              </div>
            )}
          </div>
          {shouldShowMore && operator.description && (
            <Text variant="body-3-medium" className="px-1 py-0.5">
              {operator.description}
            </Text>
          )}
        </div>
        <Button
          variant="ghost"
          className="h-6 min-h-0 text-primary-500 hover:bg-transparent"
          onClick={() => setShouldShowMore(!shouldShowMore)}
        >
          <Text variant="body-3-medium">
            {shouldShowMore ? "Show Less" : "Show More"}
          </Text>
          <LuChevronDown
            className={cn(
              "size-4 transition-transform duration-150",
              shouldShowMore ? "rotate-180" : ""
            )}
          />
        </Button>
      </div>
    </Collapse>
  )
}

OperatorMetaData.displayName = "OperatorMetaData"
