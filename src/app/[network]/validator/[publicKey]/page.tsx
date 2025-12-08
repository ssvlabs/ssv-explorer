import type { Metadata } from "next"
import Link from "next/link"
import { getValidatorPerformanceV2, searchDuties } from "@/api/duties"
import { getValidator } from "@/api/validators"
import { type SearchParams } from "nuqs"

import { getNativeCurrency, type ChainName } from "@/config/chains"
import {
  dutiesSearchParamsCache,
  type DutiesSearchSchema,
} from "@/lib/search-parsers/duties-search-parsers"
import { cn } from "@/lib/utils"
import { formatGwei } from "@/lib/utils/number"
import { shortenAddress } from "@/lib/utils/strings"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { CopyBtn } from "@/components/ui/copy-btn"
import { ErrorCard } from "@/components/ui/error-card"
import { Outline } from "@/components/ui/outline"
import { BeaconchainBtn } from "@/components/ui/ssv-explorer-btn"
import { Stat } from "@/components/ui/stat"
import { Text } from "@/components/ui/text"
import { validatorRegex } from "@/components/global-search/search-input-parser"
import { OperatorsList } from "@/components/operators/operators-list"
import { Shell } from "@/components/shell"
import { DutiesTable } from "@/app/_components/duties/duties-table"

interface IndexPageProps {
  params: Promise<{ publicKey: string; network: ChainName }>
  searchParams: Promise<SearchParams>
}

export const metadata: Metadata = {
  title: "Validator",
  description: "View details and duties for this validator on the SSV Network.",
  openGraph: {
    title: "Validator",
    description:
      "View details and duties for this validator on the SSV Network.",
    images: ["/og.png"],
  },
  twitter: {
    title: "Validator",
    description:
      "View details and duties for this validator on the SSV Network.",
    images: ["/og.png"],
  },
}

export default async function Page(props: IndexPageProps) {
  const { publicKey, network } = await props.params

  if (!validatorRegex.test(publicKey)) {
    return (
      <ErrorCard
        className="mx-auto max-w-md bg-transparent"
        title="Invalid validator public key"
        errorMessage="Please check the URL and try again."
      />
    )
  }

  const awaitedSearchParams = await props.searchParams
  const searchParams = dutiesSearchParamsCache.parse(
    awaitedSearchParams
  ) as DutiesSearchSchema

  const duties = searchDuties({
    ...searchParams,
    validatorPublicKey: publicKey,
    network,
  })
  const performanceV2 = await getValidatorPerformanceV2({
    publicKey,
    network,
  })
  let validator
  try {
    validator = await getValidator({
      publicKey,
      network,
    })
  } catch (error) {
    return (
      <ErrorCard
        className="bg-transparent"
        errorMessage={(error as Error).message}
        title="Validator not found"
      />
    )
  }

  const nativeCurrency = getNativeCurrency(network)

  // Merge performance V2 data with operators
  const operatorsWithPerformanceV2 = validator.operators.map((operator) => {
    const performanceData = performanceV2?.operatorsPerformance?.find(
      (perf) => perf.operatorId === operator.id
    )
    return {
      ...operator,
      performanceV2: performanceData
        ? {
            dailyPerformance: performanceData.dailyPerformance,
            monthlyPerformance: performanceData.monthlyPerformance,
          }
        : operator.performanceV2,
    }
  })

  return (
    <Shell className="gap-6">
      <Card>
        <Text variant="headline4">Validator</Text>
        <div className="flex flex-wrap gap-1">
          <Outline>
            <Text variant="caption-medium" className="text-gray-500">
              Public Key:
            </Text>
            <Text variant="body-3-medium">{shortenAddress(publicKey)}</Text>
            <CopyBtn text={publicKey} />
            <BeaconchainBtn validatorId={publicKey} />
          </Outline>
          <Outline>
            <Text variant="caption-medium" className="text-gray-500">
              Owner:
            </Text>
            <Button
              as={Link}
              href={`/${network}/account/${validator.owner_address}`}
              variant="link"
              className="font-mono text-sm"
            >
              {shortenAddress(validator.owner_address)}
            </Button>
            <CopyBtn text={validator.owner_address} />
          </Outline>
          <Outline>
            <Text variant="caption-medium" className="text-gray-500">
              Cluster:
            </Text>
            <Button
              as={Link}
              href={`/${network}/cluster/${validator.cluster}`}
              variant="link"
              className="font-mono text-sm"
            >
              {shortenAddress(validator.cluster)}
            </Button>
            <CopyBtn text={validator.cluster} />
          </Outline>
        </div>
        <div className="flex items-center gap-6 align-sub">
          <Stat
            className="flex-1"
            title="Status"
            content={
              <Text
                className={cn({
                  "text-success-700": validator.status === "Active",
                  "text-error-500": validator.status === "Inactive",
                })}
              >
                {validator.status}
              </Text>
            }
          />
          <div className="h-full border-r border-gray-500" />
          <Stat
            className="flex-1"
            title={`${nativeCurrency.symbol} Balance`}
            content={`${formatGwei(BigInt(validator.validator_info.effective_balance || 0n))} ${nativeCurrency.symbol}`}
          />
        </div>
      </Card>

      <OperatorsList operators={operatorsWithPerformanceV2} />

      <Card>
        <DutiesTable dataPromise={duties} network={network} />
      </Card>
    </Shell>
  )
}
