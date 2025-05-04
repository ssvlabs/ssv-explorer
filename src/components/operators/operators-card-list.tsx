import type { ComponentPropsWithRef, FC } from "react"

import { type Operator } from "@/types/api"
import { cn } from "@/lib/utils"
import { OperatorCard } from "@/components/operators/operator-card"

export type OperatorsCardListProps = {
  operators: Operator[]
}

type OperatorsCardListFC = FC<
  Omit<ComponentPropsWithRef<"div">, keyof OperatorsCardListProps> &
    OperatorsCardListProps
>

export const OperatorsCardList: OperatorsCardListFC = ({
  className,
  operators,
  ...props
}) => {
  return (
    <div
      className={cn(
        "flex flex-wrap justify-center gap-6 [&>*]:min-w-32",
        {
          "[&>*]:flex-1": operators.length < 8,
        },
        className
      )}
      {...props}
    >
      {operators.map((operator, index) => (
        <OperatorCard key={operator.id} operator={operator} />
      ))}
    </div>
  )
}

OperatorsCardList.displayName = "OperatorsCardList"
