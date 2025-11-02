"use client"

import { useEffect, useState } from "react"
import { endpoint } from "@/api"
import { api } from "@/api/api-client"
import { useTheme } from "next-themes"
import { LuRefreshCw } from "react-icons/lu"

import { type DutyElement } from "@/types/api/duties"
import {
  DutyRoles,
  dutySteps,
  type DutyDetailsResponse,
} from "@/types/api/duty-details"
import { type Operator } from "@/types/api/operator"
import { type ChainName } from "@/config/chains"
import { remove0x } from "@/lib/utils/strings"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Text } from "@/components/ui/text"
import { OperatorAvatar } from "@/components/operators/operator-avatar"
import CompleteBadge from "@/app/_components/duties/complete-badge"
import Status from "@/app/_components/duties/status"

interface DutyDetailsModalProps {
  data: { operators: Operator[] }
  selectedDuty: DutyElement | null
  network: ChainName
  open: boolean
  onOpenChange: (open: boolean) => void
}

const fetchDutyDetails = async (params: {
  publicKey: string
  slot: number
  role: string
  network: ChainName
}): Promise<DutyDetailsResponse> => {
  const searchParams = new URLSearchParams({
    slot: params.slot.toString(),
    role: params.role.toLowerCase(),
  })

  const url = endpoint(
    params.network,
    `duties/details/${remove0x(params.publicKey)}`,
    `?${searchParams}`
  )

  console.log("Fetching from URL:", url)

  return await api.get<DutyDetailsResponse>(url)
}

const isSuccessProcess = (clusterSize: number, successOperators: number) => {
  const sizes: Record<number, number> = {
    [4]: 1,
    [7]: 2,
    [10]: 3,
    [13]: 4,
  }
  const result = clusterSize - successOperators
  const threshold = sizes[clusterSize]
  return threshold !== undefined ? result <= threshold : false
}

export function DutyDetailsModal({
  data,
  selectedDuty,
  network,
  open,
  onOpenChange,
}: DutyDetailsModalProps) {
  const [dutyDetails, setDutyDetails] = useState<DutyDetailsResponse | null>(
    null
  )
  const [loading, setLoading] = useState(false)
  const { theme } = useTheme()
  const dark = theme === "dark"

  useEffect(() => {
    if (open && selectedDuty) {
      setLoading(true)
      setDutyDetails(null) // Reset previous data

      fetchDutyDetails({
        publicKey: selectedDuty.publicKey,
        slot: selectedDuty.slot,
        role: selectedDuty.duty,
        network: network,
      })
        .then((details) => {
          setDutyDetails(details)
        })
        .catch((error) => {})
        .finally(() => {
          setLoading(false)
        })
    }
  }, [open, selectedDuty, network])

  const handleOpenChange = (newOpen: boolean) => {
    console.log("handleOpenChange called:", { newOpen })
    onOpenChange(newOpen)

    if (!newOpen) {
      setDutyDetails(null)
      setLoading(false)
    }
  }
  if (!selectedDuty) return null

  const rounds: {
    round?: number
    leader?: number
    prepares?: number[]
    commits?: number[]
    pre_consensus?: number[]
    post_consensus?: number[]
  }[] = dutyDetails?.round_changes || []

  rounds[rounds.length ? rounds.length - 1 : 0] = {
    ...rounds[rounds.length - 1],
    post_consensus: dutyDetails?.post_consensus.length
      ? dutyDetails?.post_consensus
      : [],
  }
  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      {/*<div>*/}
      <DialogContent className="min-w-[400px] max-w-[800px] p-6">
        <div className="flex h-[86px] flex-col justify-between">
          <DialogTitle className="w-[50px] font-semibold">Duty</DialogTitle>
          <div className="flex h-[40px] justify-between gap-4">
            <Text className="flex w-[110px] gap-2" variant={"body-3-bold"}>
              <img
                className="h-[14px] w-4"
                src={`/images/duty-icon/${dark ? "dark" : "light"}.svg`}
              />
              Cluster
            </Text>
            <div className="ml-10 mr-2 flex justify-end gap-[16.5px]">
              {" "}
              {[...data.operators].map((operator) => (
                <div
                  key={operator.id}
                  className="flex flex-col items-center justify-center gap-1"
                >
                  <OperatorAvatar
                    size="base"
                    className="md:row-start-1 md:row-end-3"
                    variant="unstyled"
                    src={operator.logo}
                  />
                  <Text
                    className="font-mono text-gray-600"
                    variant={"caption-medium"}
                  >
                    {operator.id}
                  </Text>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="h-px w-full bg-gray-200" />

        <div className="flex size-full flex-col">
          {dutyDetails?.pre_consensus && (
            <div className="flex items-center justify-between">
              <div className="relative flex flex-col">
                <Text
                  className="ml-0.5 flex w-[120px] items-center gap-2 text-gray-600"
                  variant={"caption-medium"}
                >
                  <CompleteBadge
                    isSuccess={isSuccessProcess(
                      data.operators.length,
                      (dutyDetails.pre_consensus || []).length
                    )}
                  />
                  Pre Consensus
                </Text>
                <div className="absolute top-[18px] ml-[7px] h-8 w-px bg-gray-300" />
              </div>
              <div className="ml-10 flex justify-end gap-1">
                {dutyDetails?.operators.map(({ id }) => {
                  return (
                    <div
                      key={id}
                      className="flex max-w-12 flex-col items-center justify-center gap-2 rounded-[8px] border border-gray-300 bg-gray-100 px-2 py-3"
                    >
                      <Status
                        isSuccess={dutyDetails?.pre_consensus?.includes(id)}
                      />
                    </div>
                  )
                })}
              </div>
            </div>
          )}
          {rounds.map((round, index) => {
            const keys = Object.keys(round).filter(
              (roundName) => roundName !== "round"
            ) as Array<keyof typeof round>
            return (
              <div key={index} className="relative mt-5 flex-col">
                <Text
                  className="flex w-[120px] items-center gap-2 text-nowrap"
                  variant={"body-3-bold"}
                >
                  <LuRefreshCw className="text-gray-600" />

                  {index > 0 ? "Round Change" : "Round Start"}
                </Text>
                <div className="absolute ml-[7px] h-[14px] w-px bg-gray-300" />
                <div className="ml-0.5 flex justify-between">
                  <div className={"mt-[14px] flex w-[120px] flex-col"}>
                    {keys.map((key, keyIndex) => {
                      return (
                        <div key={key} className="flex flex-col">
                          <Text
                            className="flex w-[120px] items-center gap-2 text-gray-600"
                            variant={"caption-medium"}
                          >
                            <CompleteBadge
                              isSuccess={
                                Array.isArray(round[key])
                                  ? isSuccessProcess(
                                      data.operators.length,
                                      (round[key] || []).length
                                    )
                                  : data.operators
                                      .map((op) => op.id)
                                      .includes(round[key] || -1)
                              }
                            />
                            {dutySteps[key]}
                          </Text>
                          {keyIndex !== keys.length - 1 && (
                            <div className="ml-[5px] h-2 w-px bg-gray-300" />
                          )}
                        </div>
                      )
                    })}
                  </div>
                  <div className="flex-col">
                    <div className="flex gap-1">
                      {data.operators.map(({ id }) => {
                        return (
                          <div
                            key={id}
                            className="flex max-w-12 flex-col items-center justify-center gap-2 rounded-[8px] border border-gray-300 bg-gray-100 px-2 py-3"
                          >
                            {keys.map((key) => {
                              return (
                                <Status
                                  key={key}
                                  isNeutral={
                                    key === "leader" && round[key] !== id
                                  }
                                  isSuccess={
                                    (Array.isArray(round[key]) &&
                                      round[key].includes(id)) ||
                                    (key === "leader" && round[key] === id)
                                  }
                                  isLeader={
                                    key === "leader" && round[key] === id
                                  }
                                />
                              )
                            })}
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
        {/*</div>*/}
      </DialogContent>
      {/*</div>*/}
    </Dialog>
  )
}
