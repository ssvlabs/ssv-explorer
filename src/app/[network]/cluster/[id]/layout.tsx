import type { Metadata } from "next"
import Link from "next/link"
import { getCluster } from "@/api/clusters"

import { type ChainName } from "@/config/chains"
import { getClusterBalance } from "@/lib/contracts/get-cluster-balance"
import { cn } from "@/lib/utils"
import { numberFormatter } from "@/lib/utils/number"
import { remove0x, shortenAddress } from "@/lib/utils/strings"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { CopyBtn } from "@/components/ui/copy-btn"
import { ErrorCard } from "@/components/ui/error-card"
import { Outline } from "@/components/ui/outline"
import { Stat } from "@/components/ui/stat"
import { Text } from "@/components/ui/text"
import { OperatorsList } from "@/components/operators/operators-list"
import { Shell } from "@/components/shell"

import { ClusterBalanceStat } from "./_components/cluster-balance-stat"

export const metadata: Metadata = {
  title: "Cluster",
  description:
    "View details and validators for this cluster on the SSV Network.",
  openGraph: {
    title: "Cluster",
    description:
      "View details and validators for this cluster on the SSV Network.",
    images: ["/og.png"],
  },
  twitter: {
    title: "Cluster",
    description:
      "View details and validators for this cluster on the SSV Network.",
    images: ["/og.png"],
  },
}

interface LayoutProps {
  children: React.ReactNode
  params: Promise<{ id: string; network: string }>
}

export default async function Layout({ children, params }: LayoutProps) {
  const { id, network: networkStr } = await params
  const network = networkStr as ChainName

  const cluster = await getCluster({ id, network }).catch(() => null)

  if (!cluster) {
    return (
      <ErrorCard
        errorMessage="Cluster not found"
        title="Cluster not found"
        className="flex-1 bg-transparent"
      />
    )
  }

  const { balance, isMigrated } = await getClusterBalance({
    cluster,
    network,
  }).catch(() => ({ balance: 0n, isMigrated: false }))

  return (
    <Shell className="gap-6">
      <Card>
        <Text variant="headline4">Cluster</Text>
        <div className="flex flex-wrap gap-1">
          <Outline>
            <Text variant="caption-medium" className="text-gray-500">
              ID:
            </Text>
            <Text variant="body-3-medium">
              {shortenAddress(remove0x(cluster.clusterId))}
            </Text>
            <CopyBtn text={cluster.clusterId} />
          </Outline>
          <Outline>
            <Text variant="caption-medium" className="text-gray-500">
              Owner:
            </Text>
            <Button
              as={Link}
              href={`/${network}/account/${cluster.ownerAddress}`}
              variant="link"
              className="font-mono text-sm"
            >
              {shortenAddress(cluster.ownerAddress)}
            </Button>
            <CopyBtn text={cluster.ownerAddress} />
          </Outline>
        </div>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-6">
          <Stat
            title="Status"
            content={
              <Text
                className={cn({
                  "text-success-700": cluster.active,
                  "text-error-500": !cluster.active,
                })}
              >
                {cluster.active ? "Active" : "Inactive"}
              </Text>
            }
          />
          <ClusterBalanceStat balance={balance} isMigrated={isMigrated} />
          <Stat
            title="Effective Balance"
            tooltip="ETH staked across all validators in this cluster"
            content={
              numberFormatter.format(Number(cluster.effectiveBalance)) + " ETH"
            }
          />
          <Stat
            title="Validators"
            content={numberFormatter.format(+cluster.validatorCount)}
          />
          <Stat
            title="Runway (days)"
            content={cluster.runway != null ? `${cluster.runway}` : "-"}
          />
        </div>
      </Card>
      <OperatorsList operators={cluster.operators} />
      <Card gap="none" className="overflow-hidden p-0">
        {children}
      </Card>
    </Shell>
  )
}
