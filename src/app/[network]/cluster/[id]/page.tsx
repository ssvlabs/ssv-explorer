import type { Metadata } from "next"
import Link from "next/link"
import { getCluster } from "@/api/clusters"
import { searchValidators } from "@/api/validators"
import { type Hex } from "viem"

import { getNativeCurrency, type ChainName } from "@/config/chains"
import {
  validatorsSearchParamsCache,
  type ValidatorsSearchSchema,
} from "@/lib/search-parsers/validators-search-parsers"
import { formatSSV, numberFormatter } from "@/lib/utils/number"
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
import { ValidatorsTable } from "@/app/_components/validators/validators-table"

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
  const searchParams = validatorsSearchParamsCache.parse(
    awaitedSearchParams
  ) as ValidatorsSearchSchema

  const validators = searchValidators({
    ...searchParams,
    cluster: [id],
    network: network,
  })

  const cluster = await getCluster({ id, network: network }).catch((error) => {
    return null
  })

  if (!cluster) {
    return (
      <ErrorCard
        errorMessage="Cluster not found"
        title="Cluster not found"
        className="flex-1 bg-transparent"
      />
    )
  }

  const nativeCurrency = getNativeCurrency(network)

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
        <div className="flex flex-col gap-2 align-sub md:flex-row md:items-center md:gap-6">
          <Stat
            className="flex-1"
            title="Validators"
            content={numberFormatter.format(+cluster.validatorCount)}
          />
          <div className="h-full border-r border-gray-500" />
          <Stat
            className="flex-1"
            title="Cluster Balance"
            content={formatSSV(BigInt(cluster.balance)) + " SSV"}
          />
          <div className="h-full border-r border-gray-500" />
          <Stat
            className="flex-1"
            title={`Total ${nativeCurrency.symbol}`}
            content={
              numberFormatter.format(+cluster.validatorCount * 32) +
              ` ${nativeCurrency.symbol}`
            }
          />
        </div>
      </Card>
      <OperatorsList operators={cluster.operators} />
      <Card>
        <ValidatorsTable
          dataPromise={validators}
          columns={["publicKey", "status"]}
          hideOperatorsFilter
          hideOwnerAddressFilter
          hideClusterIdFilter
        />
      </Card>
    </Shell>
  )
}
