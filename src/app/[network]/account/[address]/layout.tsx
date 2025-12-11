import { isAddress } from "viem"

import { shortenAddress } from "@/lib/utils/strings"
import { Card } from "@/components/ui/card"
import { CopyBtn } from "@/components/ui/copy-btn"
import { ErrorCard } from "@/components/ui/error-card"
import { Outline } from "@/components/ui/outline"
import { EtherscanBtn } from "@/components/ui/ssv-explorer-btn"
import { Text } from "@/components/ui/text"
import { Shell } from "@/components/shell"

import { TableNavigation } from "./_components/table-navigations"
import { AccountStats } from "./account-stats"

export default async function AccountLayout({
  params,
  children,
}: LayoutProps<"/[network]/account/[address]">) {
  const { address } = await params

  if (!isAddress(address)) {
    return (
      <ErrorCard
        title="Invalid Account Address"
        errorMessage="Please enter a valid Ethereum address (starts with 0x)."
        className="flex-1 bg-transparent"
      />
    )
  }

  return (
    <Shell className="gap-2">
      <div className="flex flex-col gap-6">
        <Card>
          <div className="flex flex-col gap-5">
            <Text variant="headline4">Account</Text>
            <Outline className="pr-1">
              <Text variant="caption-medium" className="text-gray-500">
                Owner:
              </Text>
              <Text className="font-mono text-sm font-medium">
                {shortenAddress(address)}
              </Text>
              <div className="ml-2 flex items-center">
                <CopyBtn text={address} />
                <EtherscanBtn
                  address={address}
                  className="size-6 text-gray-500"
                />
              </div>
            </Outline>
          </div>
          <AccountStats ownerAddress={address} />
        </Card>
        <Card className="">
          <TableNavigation ownerAddress={address} />
          {children}
        </Card>
      </div>
    </Shell>
  )
}
