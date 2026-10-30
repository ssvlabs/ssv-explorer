import { type Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { getOperatorHistoryEvents } from "@/api/events"
import { getOperator } from "@/api/operator"
import { MdErrorOutline, MdOutlineLock } from "react-icons/md"

import { type AccountEvent } from "@/types/api/events"
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

interface IndexPageProps {
  params: Promise<{ id: string; network: string }>
  children: React.ReactNode
}

const OPERATOR_DESCRIPTION =
  "View performance, status, and validator information for this Operator on the SSV Network."

const REMOVED_OPERATOR_NOTICE =
  "This operator has been removed by its owner. Clusters that include it should replace it."

// Rendered on the server, so pin the timezone instead of using the server's.
const removalDateFormatter = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "short",
  day: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  hourCycle: "h23",
  timeZone: "UTC",
  timeZoneName: "short",
})

/**
 * The removal date must come from the on-chain `OperatorRemoved` event:
 * `updated_at` on a removed operator keeps being bumped by the indexer.
 * Returns null when no event is found or the request fails, so the page still
 * renders and shows "—".
 */
const getOperatorRemovalEvent = async (
  network: ChainName,
  operatorId: string
): Promise<AccountEvent | null> => {
  const events = await getOperatorHistoryEvents({
    network,
    operatorId,
    event: ["OperatorRemoved"],
    ordering: [{ id: "blockNumber", desc: true }],
  }).catch(() => null)

  if (!Array.isArray(events)) return null

  return events
    .filter((event) => event.event === "OperatorRemoved")
    .reduce<AccountEvent | null>(
      (latest, event) =>
        !latest || Number(event.blockNumber) > Number(latest.blockNumber)
          ? event
          : latest,
      null
    )
}

const formatRemovalDate = (event: AccountEvent | null) => {
  if (!event?.createdAt) return null
  const date = new Date(event.createdAt)
  return Number.isNaN(date.getTime()) ? null : removalDateFormatter.format(date)
}

const EmptyValue = () => <Text className="text-gray-400">—</Text>

export async function generateMetadata(
  props: IndexPageProps
): Promise<Metadata> {
  const { id, network } = await props.params

  const operator = await getOperator({
    network: network as ChainName,
    id: +id,
    includeDeleted: true,
  }).catch(() => null)

  if (!operator) return {}

  if (operator.is_deleted) {
    // No OG image: it would advertise stale performance and validator numbers.
    const title = `${operator.name} (Removed)`
    return {
      title,
      description: REMOVED_OPERATOR_NOTICE,
      openGraph: { title, description: REMOVED_OPERATOR_NOTICE },
      twitter: { title, description: REMOVED_OPERATOR_NOTICE },
    }
  }

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
    description: OPERATOR_DESCRIPTION,
    openGraph: {
      title: `${operator.name}`,
      description: OPERATOR_DESCRIPTION,
      images: [ogUrl],
    },
    twitter: {
      title: `${operator.name}`,
      description: OPERATOR_DESCRIPTION,
      images: [ogUrl],
    },
  }
}

export default async function Layout(props: IndexPageProps) {
  const { id, network } = await props.params

  let operator
  try {
    operator = await getOperator({
      network: network as ChainName,
      id: +id,
      includeDeleted: true,
    })
  } catch (error) {
    return (
      <Shell className="gap-2">
        <ErrorCard
          className="bg-transparent"
          errorMessage={(error as Error).message}
          title="Operator not found"
        />
      </Shell>
    )
  }

  if (!operator) {
    return (
      <Shell className="gap-2">
        <ErrorCard
          className="bg-transparent"
          errorMessage="Operator not found"
          title="Operator not found"
        />
      </Shell>
    )
  }

  // `is_deleted` is the source of truth. `is_active` is frozen at its
  // pre-removal value for removed operators and must not drive any UI here.
  const isRemoved = operator.is_deleted === true
  const removalEvent = isRemoved
    ? await getOperatorRemovalEvent(network as ChainName, id)
    : null
  const removalDate = formatRemovalDate(removalEvent)
  const status = isRemoved ? "Removed" : operator.status

  return (
    <Shell className="gap-2">
      <div className="flex flex-col gap-6">
        {isRemoved && (
          <div
            role="status"
            className="flex items-start gap-3 rounded-2xl border border-error-200 bg-error-50 px-5 py-4"
          >
            <MdErrorOutline className="mt-0.5 size-5 min-w-5 text-error-500" />
            <Text variant="body-2-semibold" className="text-gray-800">
              {REMOVED_OPERATOR_NOTICE}
            </Text>
          </div>
        )}
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
              tooltip={
                isRemoved
                  ? "This operator was removed on-chain by its owner"
                  : "Based on whether the majority of assigned duties were performed in the last 10 epochs"
              }
              content={
                <Text
                  className={cn({
                    "text-success-700": status === "Active",
                    "text-gray-500": status === "No Validators",
                    "text-error-500":
                      status === "Inactive" || status === "Removed",
                  })}
                >
                  {status}
                </Text>
              }
            />
            {isRemoved && (
              <Stat
                title="Removal Date"
                tooltip="When the operator was removed, taken from its OperatorRemoved event"
                content={
                  removalDate ? <Text>{removalDate}</Text> : <EmptyValue />
                }
                subContent={
                  removalDate && removalEvent?.blockNumber
                    ? `Block ${removalEvent.blockNumber}`
                    : undefined
                }
              />
            )}
            <Stat
              title="Performance (1D | 1M)"
              tooltip="Operator performance is calculated by the percentage of attended duties within the specified time-frame."
              content={
                isRemoved ? (
                  <EmptyValue />
                ) : (
                  <div className="flex items-center gap-1">
                    <PerformanceText
                      performance={operator.performance["24h"]}
                    />
                    <Text className="font-thin text-gray-500">|</Text>
                    <PerformanceText
                      performance={operator.performance["30d"]}
                    />
                  </div>
                )
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
                  {!isRemoved && operator.effective_balance > 0 ? (
                    <Text>
                      {numberFormatter.format(
                        Number(operator.effective_balance)
                      )}
                    </Text>
                  ) : (
                    <Text className="text-gray-400">
                      {isRemoved ? "—" : "-"}
                    </Text>
                  )}
                </div>
              }
            />
            <Stat
              title="Validators"
              tooltip="The number of validators serviced by this operator"
              content={
                isRemoved ? (
                  <EmptyValue />
                ) : (
                  <Text>{operator.validators_count}</Text>
                )
              }
            />
          </div>
        </Card>
        {/* Live performance metrics don't apply to a removed operator. */}
        {!isRemoved && (
          <div className="flex flex-row gap-4">
            <PerformanceChart
              className="w-full"
              operatorId={+id}
              network={network as ChainName}
            />
          </div>
        )}
        <Card gap="none" className="overflow-hidden">
          {props.children}
        </Card>
      </div>
    </Shell>
  )
}
