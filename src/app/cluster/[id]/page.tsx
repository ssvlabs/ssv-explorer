import type { Metadata } from "next"
import Link from "next/link"
import { getCluster } from "@/api/clusters"
import { searchValidators } from "@/api/validators"

import {
  validatorsSearchParamsCache,
  type ValidatorsSearchSchema,
} from "@/lib/search-parsers/validators-search-parsers"
import { cn } from "@/lib/utils"
import { formatSSV, numberFormatter } from "@/lib/utils/number"
import { remove0x, shortenAddress } from "@/lib/utils/strings"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { CopyBtn } from "@/components/ui/copy-btn"
import { ErrorCard } from "@/components/ui/error-card"
import { Outline } from "@/components/ui/outline"
import { Stat } from "@/components/ui/stat"
import { Text } from "@/components/ui/text"
import { OperatorCard } from "@/components/operators/operator-card"
import { Shell } from "@/components/shell"
import { ValidatorsTable } from "@/app/_components/validators/validators-table"

interface IndexPageProps {
  params: Promise<{ id: string }>
  searchParams: Promise<{ network: string }>
}

export const metadata: Metadata = {
  title: "Cluster",
  description:
    "View details and validators for this cluster on the SSV Network.",
}

export default async function Page(props: IndexPageProps) {
  const { id } = await props.params
  const awaitedSearchParams = await props.searchParams
  const searchParams = validatorsSearchParamsCache.parse(
    awaitedSearchParams
  ) as ValidatorsSearchSchema

  const validators = searchValidators({
    ...searchParams,
    cluster: [id],
  })

  const cluster = await getCluster({ id, network: searchParams.network }).catch(
    (error) => {
      console.error(error)
      return null
    }
  )

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
        <div className="flex gap-1">
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
              href={`/account/${cluster.ownerAddress}`}
              variant="link"
              className="font-mono text-sm"
            >
              {shortenAddress(cluster.ownerAddress)}
            </Button>
            <CopyBtn text={cluster.ownerAddress} />
          </Outline>
        </div>
        <div className="flex items-center gap-6 align-sub">
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
            title="Total ETH"
            content={
              numberFormatter.format(+cluster.validatorCount * 32) + " ETH"
            }
          />
        </div>
      </Card>
      <div
        className={cn("flex flex-wrap justify-center gap-6 [&>*]:min-w-32", {
          "[&>*]:flex-1": cluster.operators.length < 8,
        })}
      >
        {cluster.operators.map((operator) => (
          <OperatorCard key={operator.id} operator={operator} />
        ))}
      </div>
      <Card>
        <ValidatorsTable dataPromise={validators} hideClusterIdFilter />
      </Card>
    </Shell>
  )
}
