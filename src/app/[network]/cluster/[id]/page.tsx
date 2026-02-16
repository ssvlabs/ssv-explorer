import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { getCluster } from "@/api/clusters"
import { searchValidators } from "@/api/validators"
import { type Hex } from "viem"

import { type ChainName } from "@/config/chains"
import { validatorsSearchParamsCache } from "@/lib/search-parsers/validators-search-parsers"
import { cn } from "@/lib/utils"
import { formatSSV, numberFormatter } from "@/lib/utils/number"
import { remove0x, shortenAddress } from "@/lib/utils/strings"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { CopyBtn } from "@/components/ui/copy-btn"
import { ErrorCard } from "@/components/ui/error-card"
import { Outline } from "@/components/ui/outline"
import { Stat } from "@/components/ui/stat"
import { Tab } from "@/components/ui/tab"
import { Text } from "@/components/ui/text"
import { OperatorsList } from "@/components/operators/operators-list"
import { Shell } from "@/components/shell"
import {
  ValidatorsTableContent,
  ValidatorsTableFilters,
  ValidatorsTableMenuButton,
  ValidatorsTableRoot,
} from "@/app/_components/validators/validators-table"

interface IndexPageProps {
  params: Promise<{ id: Hex; network: ChainName }>
  searchParams: Promise<{}>
}

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

export default async function Page(props: IndexPageProps) {
  const { id, network } = await props.params
  const awaitedSearchParams = await props.searchParams
  const searchParams = validatorsSearchParamsCache.parse(awaitedSearchParams)

  const validators = searchValidators({
    ...searchParams,
    cluster: [id],
    network: network,
  })

  const cluster = await getCluster({ id, network: network }).catch(() => null)

  if (!cluster) {
    return (
      <ErrorCard
        errorMessage="Cluster not found"
        title="Cluster not found"
        className="flex-1 bg-transparent"
      />
    )
  }

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
          {/* <Stat
            title="Current Balance"
            content={
              <div className="flex items-center gap-0.5">
                <Image
                  src={
                    cluster.migrated
                      ? "/images/networks/dark.svg"
                      : "/images/ssvIcons/icon.svg"
                  }
                  alt={cluster.migrated ? "ETH" : "SSV"}
                  width={20}
                  height={20}
                  className="object-fit size-5"
                />
                <Text>
                  {formatSSV(
                    BigInt(
                      cluster.migrated ? cluster.ethBalance : cluster.balance
                    )
                  )}
                </Text>
              </div>
            }
          /> */}
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
        </div>
      </Card>
      <OperatorsList operators={cluster.operators} />
      <Card className="gap-0 p-0">
        <ValidatorsTableRoot
          dataPromise={validators}
          columns={["publicKey", "status", "createdAt"]}
        >
          <div className="flex items-center gap-2 p-5">
            <Tab
              variant="ghost"
              count={+cluster.validatorCount}
              data-active={true}
            >
              Validators
            </Tab>
            <div className="flex-1"></div>
            <ValidatorsTableMenuButton />
          </div>
          <ValidatorsTableFilters
            className="px-5"
            hideOperatorsFilter
            hideOwnerAddressFilter
            hideClusterIdFilter
          />
          <ValidatorsTableContent />
        </ValidatorsTableRoot>
        {/* <ValidatorsTable
          dataPromise={validators}
          columns={["publicKey", "status", "createdAt"]}
          hideOperatorsFilter
          hideOwnerAddressFilter
          hideClusterIdFilter
        /> */}
      </Card>
    </Shell>
  )
}
