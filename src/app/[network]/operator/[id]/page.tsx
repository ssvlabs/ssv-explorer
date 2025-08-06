import { type Metadata } from "next"
import Link from "next/link"
import { getOperator } from "@/api/operator"
import { searchValidators } from "@/api/validators"
import { MdOutlineLock } from "react-icons/md"

import { type ChainName } from "@/config/chains"
import { validatorsSearchParamsCache } from "@/lib/search-parsers/validators-search-parsers"
import { cn } from "@/lib/utils"
import { shortenAddress } from "@/lib/utils/strings"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { CopyBtn } from "@/components/ui/copy-btn"
import { ErrorCard } from "@/components/ui/error-card"
import { Outline } from "@/components/ui/outline"
import { Stat } from "@/components/ui/stat"
import { Text } from "@/components/ui/text"
import { OperatorAvatar } from "@/components/operators/operator-avatar"
import { OperatorMetaData } from "@/components/operators/operator-meta-data"
import { PerformanceText } from "@/components/operators/performance-text"
import { VerifiedOperatorBadge } from "@/components/operators/verified-operator-badge"
import { Shell } from "@/components/shell"
import { ValidatorsTable } from "@/app/_components/validators/validators-table"

interface IndexPageProps {
  params: Promise<{ id: string; network: ChainName }>
  searchParams: Promise<{ network: string }>
}

export async function generateMetadata(
  props: IndexPageProps
): Promise<Metadata> {
  const [{ id, network }, searchParams] = await Promise.all([
    props.params,
    props.searchParams,
  ])

  const operator = await getOperator({
    network,
    id: +id,
  })

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

export default async function Page(props: IndexPageProps) {
  const { id, network } = await props.params
  const validatorsSearch = validatorsSearchParamsCache.parse(
    await props.searchParams
  )
  const validators = searchValidators({
    ...validatorsSearch,
    operator: [+id],
    network,
  })

  return (
    <Shell className="gap-2">
      {(async () => {
        try {
          const operator = await getOperator({
            network,
            id: +id,
          })
          if (!operator) return <div>Operator not found</div>
          return (
            <div className="flex flex-col gap-6">
              <Card>
                <div className="flex gap-[14px]">
                  <OperatorAvatar
                    size="xl"
                    variant="unstyled"
                    src={operator.logo}
                  />
                  <div className="flex w-full flex-col gap-[12px]">
                    <div className="flex items-center gap-2">
                      <Text variant="headline4">{operator.name}</Text>
                      <div className="flex items-center gap-[6px]">
                        {operator.is_private && (
                          <MdOutlineLock className="size-[18px] min-w-[18px]" />
                        )}
                        {operator.type === "verified_operator" && (
                          <VerifiedOperatorBadge size={18} />
                        )}
                      </div>
                    </div>
                    <div className="flex gap-1">
                      <Outline>
                        <Text
                          variant="caption-medium"
                          className="text-gray-500"
                        >
                          ID:
                        </Text>
                        <Text variant="body-3-medium">{operator.id}</Text>
                      </Outline>
                      <Outline>
                        <Text
                          variant="caption-medium"
                          className="text-gray-500"
                        >
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
                        <Text
                          variant="caption-medium"
                          className="text-gray-500"
                        >
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
                </div>
                <OperatorMetaData operator={operator} />

                <div className="flex items-center gap-6 align-sub">
                  <Stat
                    className="flex-1"
                    title="Status"
                    tooltip="Based on whether the majority of assigned duties were performed in the last 10 epochs"
                    content={
                      <Text
                        className={cn({
                          "text-success-700": operator.status === "Active",
                          "text-gray-500": operator.status === "No validators",
                          "text-error-500":
                            operator.status === "Inactive" ||
                            operator.status === "Removed",
                        })}
                      >
                        {operator.status}
                      </Text>
                    }
                  />
                  <div className="h-full border-r border-gray-500" />
                  <Stat
                    className="flex-1"
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
                    className="flex-1"
                    title="Validators"
                    tooltip="The number of validators serviced by this operator"
                    content={<Text>{operator.validators_count}</Text>}
                  />
                </div>
              </Card>
              <Card>
                <ValidatorsTable dataPromise={validators} />
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
