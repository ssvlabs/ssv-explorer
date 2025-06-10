import { isAddress, type Address } from "viem"

import { shortenAddress } from "@/lib/utils/strings"
import { Card } from "@/components/ui/card"
import { CopyBtn } from "@/components/ui/copy-btn"
import { ErrorCard } from "@/components/ui/error-card"
import { Outline } from "@/components/ui/outline"
import { Text } from "@/components/ui/text"
import { Shell } from "@/components/shell"

import { TableNavigation } from "./_components/table-navigations"
import { AccountStats } from "./account-stats"

interface IndexPageProps {
  children: React.ReactNode
  params: Promise<{ address: Address }>
}

export default async function AccountLayout({
  params,
  children,
}: IndexPageProps) {
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
            <Outline>
              <Text variant="caption-medium" className="text-gray-500">
                Owner:
              </Text>
              <Text className="font-mono text-sm font-medium">
                {shortenAddress(address)}
              </Text>
              <CopyBtn text={address} />
            </Outline>
          </div>
          <AccountStats ownerAddress={address} />
        </Card>
        <Card>
          <TableNavigation ownerAddress={address} />
          {children}
        </Card>
      </div>
    </Shell>
  )
}
