"use client"

import { type DutyElement } from "@/types/api/duties"
import { type Operator } from "@/types/api/operator"
import { shortenAddress } from "@/lib/utils/strings"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { CopyBtn } from "@/components/ui/copy-btn"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Outline } from "@/components/ui/outline"
import { Text } from "@/components/ui/text"
import { OperatorAvatar } from "@/components/operators/operator-avatar"
import CompleteBadge from "@/app/_components/duties/complete-badge"
import Status from "@/app/_components/duties/status"

interface DutyDetailsModalProps {
  // duty: DutyElement | null
  data: { operators: Operator[] }
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function DutyDetailsModal({
  // duty,
  data,
  open,
  onOpenChange,
}: DutyDetailsModalProps) {
  // if (!duty) return null
  console.log(data)
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[522px] p-6">
        {/*<DialogHeader className="pb-4">*/}
        <div className="flex h-[86px] flex-col justify-between">
          <DialogTitle className="text-xl font-semibold">Duty</DialogTitle>
          <div className="flex h-[40px] w-full gap-4">
            <Text className="flex w-[110px] gap-2" variant={"body-3-bold"}>
              <img className="h-[14px] w-4" src={"/images/cluster.svg"} />
              Cluster
            </Text>
            {data.operators.map((operator) => (
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
        {/*</DialogHeader>*/}
        <div className="flex size-full flex-col">
          <div className="flex-col">
            <Text className="w-[120px]" variant={"body-3-bold"}>
              Round Start
            </Text>
            <div className="flex">
              <div className={"mt-[14px] flex w-[120px] flex-col gap-2"}>
                <Text
                  className="flex w-[120px] items-center gap-2 text-gray-600"
                  variant={"caption-medium"}
                >
                  <CompleteBadge isSuccess />
                  Lead
                </Text>
                <Text
                  className="flex w-[120px] items-center gap-2 text-gray-600"
                  variant={"caption-medium"}
                >
                  {" "}
                  <CompleteBadge isSuccess={false} />
                  Pre
                </Text>
                <Text
                  className="flex w-[120px] items-center gap-2 text-gray-600"
                  variant={"caption-medium"}
                >
                  Bratishka
                </Text>
                <Text
                  className="flex w-[120px] items-center gap-2 text-gray-600"
                  variant={"caption-medium"}
                >
                  Hueta
                </Text>
              </div>
              <div className={"flex gap-1"}>
                <div className="flex max-w-12 flex-col items-center justify-center gap-2 rounded-[8px] border border-gray-300 bg-gray-100 px-2 py-3">
                  <Status isSuccess={false} isLeader={false} />
                  <Status isSuccess={true} isLeader={true} />
                  <Status isSuccess={true} isLeader={true} />
                  <Status isSuccess={true} isLeader={true} />
                </div>
                <div className="flex max-w-12 flex-col items-center justify-center gap-2 rounded-[8px] border border-gray-300 bg-gray-100 px-2 py-3">
                  <Status isSuccess={true} isLeader={true} />
                  <Status isSuccess={true} isLeader={true} />
                  <Status isSuccess={true} isLeader={true} />
                  <Status isSuccess={true} isLeader={true} />
                </div>
                <div className="flex max-w-12 flex-col items-center justify-center gap-2 rounded-[8px] border border-gray-300 bg-gray-100 px-2 py-3">
                  <Status isSuccess={true} isLeader={true} />
                  <Status isSuccess={true} isLeader={true} />
                  <Status isSuccess={true} isLeader={true} />
                  <Status isSuccess={true} isLeader={true} />
                </div>
                <div className="flex max-w-12 flex-col items-center justify-center gap-2 rounded-[8px] border border-gray-300 bg-gray-100 px-2 py-3">
                  <Status isSuccess={true} isLeader={true} />
                  <Status isSuccess={true} isLeader={true} />
                  <Status isSuccess={true} isLeader={true} />
                  <Status isSuccess={true} isLeader={true} />
                </div>
              </div>
            </div>
          </div>

          {/*<div className="flex gap-2 w-full">*/}
          {/*    <div className="w-[120px] flex flex-col justify-between">*/}
          {/*        <Text className="w-[120px]" variant={"body-3-bold"}>Round Start</Text>*/}
          {/*        <div className='flex flex-col gap-1'>*/}
          {/*            <Text className="w-[120px]" variant={"body-3-medium"}>Leader</Text>*/}
          {/*        </div>*/}
          {/*    </div>*/}
          {/*</div>*/}

          {/*<div*/}
          {/*    className="max-w-12 gap-2 justify-center items-center py-3 px-2 flex flex-col bg-gray-100 border rounded-[8px] border-gray-300">*/}
          {/*    <Status isSuccess={true} isLeader={true}/>*/}
          {/*    <Status isSuccess={true} isLeader={true}/>*/}
          {/*        <Status isSuccess={true} isLeader={true}/>*/}
          {/*        <Status isSuccess={true} isLeader={true}/>*/}
          {/*    </div>*/}
          {/*</div>*/}
        </div>
      </DialogContent>
    </Dialog>
  )
}
