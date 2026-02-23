import { type Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { getOperator } from "@/api/operator"
import { MdOutlineLock } from "react-icons/md"

import { type ChainName } from "@/config/chains"
import { cn } from "@/lib/utils"
import { numberFormatter } from "@/lib/utils/number"
import { shortenAddress } from "@/lib/utils/strings"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { CopyBtn } from "@/components/ui/copy-btn"
import { ErrorCard } from "@/components/ui/error-card"
import { Outline } from "@/components/ui/outline"
import { Stat } from "@/components/ui/stat"
import { Text } from "@/components/ui/text"
import { PerformanceChart } from "@/components/operators/charts/performance-chart"
import { OperatorAvatar } from "@/components/operators/operator-avatar"
import { OperatorMetaData } from "@/components/operators/operator-meta-data"
import { PerformanceText } from "@/components/operators/performance-text"
import { VerifiedOperatorBadge } from "@/components/operators/verified-operator-badge"
import { Shell } from "@/components/shell"
import { TableNavigation } from "@/app/[network]/operator/[id]/_components/table-navigations"

interface IndexPageProps {
  params: Promise<{ id: string; network: string }>
  children: React.ReactNode
}

export async function generateMetadata(
  props: IndexPageProps
): Promise<Metadata> {
  const { id, network } = await props.params

  const operator = await getOperator({
    network: network as ChainName,
    id: +id,
  }).catch(() => null)

  if (!operator) return {}

  const params = {
    id,
    network,
    name: operator.name,
    "24h": operator.performance["24h"].toString(),
    "30d": operator.performance["30d"].toString(),
    validators_count: operator.validators_count.toString(),
    is_private: operator.is_private.toString(),
    is_verified: operator.type === "verified_operator" ? "true" : "false",
    logo: operator.logo,
  }

  const ogUrl = `/api/og/operator/?${new URLSearchParams(params).toString()}`

  return {
    title: `${operator.name}`,
    description:
      "View performance, status, and validator information for this Operator on the SSV Network.",
    openGraph: {
      title: `${operator.name}`,
      description:
        "View performance, status, and validator information for this Operator on the SSV Network.",
      images: [ogUrl],
    },
    twitter: {
      title: `${operator.name}`,
      description:
        "View performance, status, and validator information for this Operator on the SSV Network.",
      images: [ogUrl],
    },
  }
}

export default async function Layout(props: IndexPageProps) {
  const { id, network } = await props.params

  return (
    <Shell className="gap-2">
      {await (async () => {
        try {
          const operator = await getOperator({
            network: network as ChainName,
            id: +id,
          })
          if (!operator) return <div>Operator not found</div>
          return (
            <div className="flex flex-col gap-6">
              <Card>
                <div className="grid max-w-full grid-cols-[auto_1fr] gap-[14px] gap-y-3">
                  <OperatorAvatar
                    size="xl"
                    className="md:row-start-1 md:row-end-3"
                    variant="unstyled"
                    src={operator.logo}
                  />
                  <div className="col-start-2 flex items-center gap-2">
                    <Text variant="headline4" className="whitespace-normal">
                      {operator.name}
                    </Text>
                    <div className="flex items-center gap-[6px]">
                      {operator.is_private && (
                        <MdOutlineLock className="size-[18px] min-w-[18px]" />
                      )}
                      {operator.type === "verified_operator" && (
                        <VerifiedOperatorBadge size={18} />
                      )}
                    </div>
                  </div>
                  <div className="col-start-1 col-end-3 flex flex-wrap gap-1 md:col-start-2">
                    <Outline>
                      <Text variant="caption-medium" className="text-gray-500">
                        ID:
                      </Text>
                      <Text variant="body-3-medium">{operator.id}</Text>
                    </Outline>
                    <Outline>
                      <Text variant="caption-medium" className="text-gray-500">
                        Owner:
                      </Text>
                      <Button
                        as={Link}
                        className="font-mono text-sm font-medium"
                        href={`/${network}/account/${operator.owner_address}`}
                        variant="link"
                      >
                        {shortenAddress(operator.owner_address)}
                      </Button>
                      <CopyBtn text={operator.owner_address} />
                    </Outline>
                    <Outline>
                      <Text variant="caption-medium" className="text-gray-500">
                        Public Key:
                      </Text>
                      <Text
                        variant="body-3-medium"
                        className="max-w-28 overflow-hidden text-ellipsis font-mono"
                      >
                        {operator.public_key}
                      </Text>
                      <CopyBtn text={operator.public_key} />
                    </Outline>
                  </div>
                </div>
                <OperatorMetaData operator={operator} />

                <div className="grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-6">
                  <Stat
                    title="Status"
                    tooltip="Based on whether the majority of assigned duties were performed in the last 10 epochs"
                    content={
                      <Text
                        className={cn({
                          "text-success-700": operator.status === "Active",
                          "text-gray-500": operator.status === "No Validators",
                          "text-error-500":
                            operator.status === "Inactive" ||
                            operator.status === "Removed",
                        })}
                      >
                        {operator.status}
                      </Text>
                    }
                  />
                  <Stat
                    title="Performance (1D | 1M)"
                    tooltip="Operator performance is calculated by the percentage of attended duties within the specified time-frame."
                    content={
                      <div className="flex items-center gap-1">
                        <PerformanceText
                          performance={operator.performance["24h"]}
                        />
                        <Text className="font-thin text-gray-500">|</Text>
                        <PerformanceText
                          performance={operator.performance["30d"]}
                        />
                      </div>
                    }
                  />
                  <Stat
                    title="ETH Managed"
                    tooltip="ETH staked across all validators in this cluster"
                    content={
                      <div className="flex items-center gap-0.5">
                        <Image
                          src="/images/networks/dark.svg"
                          alt="ETH"
                          width={20}
                          height={20}
                          className="object-fit size-5"
                        />
                        {operator.effective_balance > 0 ? (
                          <Text>
                            {numberFormatter.format(
                              Number(operator.effective_balance)
                            )}
                          </Text>
                        ) : (
                          <Text className="text-gray-400">-</Text>
                        )}
                      </div>
                    }
                  />
                  <Stat
                    title="Validators"
                    tooltip="The number of validators serviced by this operator"
                    content={<Text>{operator.validators_count}</Text>}
                  />
                </div>
              </Card>
              <div className="flex flex-row gap-4">
                <PerformanceChart
                  className="w-full"
                  operatorId={+id}
                  network={network as ChainName}
                />
              </div>
              <Card gap="none" className="overflow-hidden">
                <TableNavigation
                  operatorId={id}
                  validatorCount={operator.validators_count}
                />
                {props.children}
              </Card>
            </div>
          )
        } catch (error) {
          return (
            <ErrorCard
              className="bg-transparent"
              errorMessage={(error as Error).message}
              title="Operator not found"
            />
          )
        }
      })()}
    </Shell>
  )
}
