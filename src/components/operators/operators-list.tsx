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
  const count = operators.length

  const getGridClasses = () => {
    if (count === 4) {
      return "flex gap-6 flex-wrap justify-center [&>*]:w-[320px] [&>*]:flex-shrink-0"
    }
    if (count === 7) {
      return "flex gap-6 flex-wrap justify-center [&>*]:w-[172px] [&>*]:flex-shrink-0"
    }
    if (count === 10) {
      return "flex gap-6 flex-wrap justify-center [&>*]:w-[250px] [&>*]:flex-shrink-0"
    }
    if (count === 13) {
      return "flex gap-6 flex-wrap justify-center [&>*]:w-[168px] [&>*]:flex-shrink-0"
    }

    // Default fallback
    return "flex gap-6 flex-wrap justify-center [&>*]:min-w-[168px] [&>*]:max-w-[320px] [&>*]:flex-shrink-0"
  }

  return (
    <div className={cn(className)} {...props}>
      <div className={cn(getGridClasses())}>
        {operators.map((operator) => (
          <OperatorCard key={operator.id} operator={operator} />
        ))}
      </div>
    </div>
  )
}

OperatorsList.displayName = "OperatorsList"
