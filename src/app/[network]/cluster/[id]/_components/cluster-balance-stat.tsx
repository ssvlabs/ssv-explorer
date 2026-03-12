import Image from "next/image"

import { formatSSV } from "@/lib/utils/number"
import { Stat } from "@/components/ui/stat"
import { Text } from "@/components/ui/text"

/**
 * Server Component - displays cluster balance fetched from contract
 * Balance is passed from parent server component, no client-side fetching
 */
export const ClusterBalanceStat = ({
  balance,
  isMigrated,
}: {
  balance: bigint
  isMigrated: boolean
}) => {
  const currencySymbol = isMigrated ? "ETH" : "SSV"
  const currencyIcon = isMigrated
    ? "/images/networks/dark.svg"
    : "/images/ssvIcons/icon.svg"

  return (
    <Stat
      title="Current Balance"
      content={
        <div className="flex items-center gap-0.5">
          <Image
            src={currencyIcon}
            alt={currencySymbol}
            width={20}
            height={20}
            className="object-fit size-5"
          />
          <Text>
            {formatSSV(balance)} {currencySymbol}
          </Text>
        </div>
      }
    />
  )
}
