import Image from "next/image"
import Link from "next/link"
import { getOperator } from "@/api/operator"
import { searchValidators } from "@/api/validators"
import { MdOutlineLock } from "react-icons/md"

import { networkParserCache } from "@/lib/search-parsers"
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
import { Shell } from "@/components/shell"
import { ValidatorsTable } from "@/app/_components/validators/validators-table"

interface IndexPageProps {
  params: Promise<{ id: string }>
  searchParams: Promise<{ network: string }>
}

export default async function Page(props: IndexPageProps) {
  const { id } = await props.params
  const networkSearch = networkParserCache.parse(await props.searchParams)
  const validatorsSearch = validatorsSearchParamsCache.parse(
    await props.searchParams
  )
  const validators = searchValidators({ ...validatorsSearch, operators: [+id] })

  return (
    <Shell className="gap-2">
      {(async () => {
        try {
          const operator = await getOperator({
            network: networkSearch.network,
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
                          <Image
                            width={18}
                            height={18}
                            className="size-[18px]"
                            src="/images/verified.svg"
                            alt="Verified"
                          />
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
                          href={`/account/${operator.owner_address}`}
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
                    tooltip="Whatsup?"
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
                    tooltip="Whatsup?"
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
                    tooltip="Whatsup?"
                    content={<Text>{operator.validators_count}</Text>}
                  />
                </div>
              </Card>
              {/* <div className="flex gap-6 [&>*]:flex-1">
                <Card>
                  <Text variant="caption-medium" className="text-gray-500">
                    Avg. Performance
                  </Text>
                  <div className="h-[144px] w-full rounded-xl">
                    <PerformanceChart />
                  </div>
                </Card>
                <Card>
                  <Text variant="caption-medium" className="text-gray-500">
                    ETH Management Table
                  </Text>
                  <div className="h-[144px] w-full rounded-xl">
                    <PerformanceChart />
                  </div>
                </Card>
              </div> */}
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
