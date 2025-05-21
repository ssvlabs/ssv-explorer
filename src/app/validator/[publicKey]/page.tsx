import Link from "next/link"
import { searchDuties } from "@/api/duties"
import { getValidator } from "@/api/validators"
import { type SearchParams } from "nuqs"

import {
  dutiesSearchParamsCache,
  type DutiesSearchSchema,
} from "@/lib/search-parsers/duties-search-parsers"
import { cn } from "@/lib/utils"
import { shortenAddress } from "@/lib/utils/strings"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { CopyBtn } from "@/components/ui/copy-btn"
import { Outline } from "@/components/ui/outline"
import { BeaconchainBtn } from "@/components/ui/ssv-explorer-btn"
import { Stat } from "@/components/ui/stat"
import { Text } from "@/components/ui/text"
import { OperatorCard } from "@/components/operators/operator-card"
import { Shell } from "@/components/shell"
import { DutiesTable } from "@/app/_components/duties/duties-table"

interface IndexPageProps {
  params: Promise<{ publicKey: string }>
  searchParams: Promise<SearchParams>
}

export default async function Page(props: IndexPageProps) {
  const { publicKey } = await props.params
  const awaitedSearchParams = await props.searchParams
  const searchParams = dutiesSearchParamsCache.parse(
    awaitedSearchParams
  ) as DutiesSearchSchema

  const duties = searchDuties({
    ...searchParams,
    validatorPublicKey: publicKey,
  })
  const validator = await getValidator({
    publicKey,
    network: searchParams.network,
  })

  return (
    <Shell className="gap-6">
      <Card>
        <Text variant="headline4">Validator</Text>
        <div className="flex gap-1">
          <Outline>
            <Text variant="caption-medium" className="text-gray-500">
              ID:
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
              href={`/account/${validator.owner_address}`}
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
              href={`/cluster/${validator.cluster}`}
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
          <Stat className="flex-1" title="ETH Balance" content={32 + " ETH"} />
        </div>
      </Card>

      <div
        className={cn("flex flex-wrap justify-center gap-6 [&>*]:min-w-32", {
          "[&>*]:flex-1": validator.operators.length < 8,
        })}
      >
        {validator.operators.map((operator) => (
          <OperatorCard key={operator.id} operator={operator} />
        ))}
      </div>
      <Card>
        <DutiesTable dataPromise={duties} />
      </Card>
    </Shell>
  )
}
