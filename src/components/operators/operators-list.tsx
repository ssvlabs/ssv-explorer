import type { ComponentPropsWithRef, FC } from "react"

import { type Operator } from "@/types/api"
import { cn } from "@/lib/utils"
import { OperatorCard } from "@/components/operators/operator-card"

export type OperatorsListProps = {
  operators: Operator[]
}

type OperatorsListFC = FC<
  Omit<ComponentPropsWithRef<"div">, keyof OperatorsListProps> &
    OperatorsListProps
>

export const OperatorsList: OperatorsListFC = ({
  className,
  operators,
  ...props
}) => {
  return (
    <div className={cn(className)} {...props}>
      <div
        className={cn(
          "flex gap-6 overflow-x-auto md:overflow-x-auto lg:flex-wrap lg:justify-center [&>*]:min-w-48 lg:[&>*]:min-w-[172px]",
          {
            "[&>*]:flex-1": operators.length < 8,
          }
        )}
      >
        {operators.map((operator) => (
          <OperatorCard key={operator.id} operator={operator} />
        ))}
      </div>
    </div>
  )
}

OperatorsList.displayName = "OperatorsList"
