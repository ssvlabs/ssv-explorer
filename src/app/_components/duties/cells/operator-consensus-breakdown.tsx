import { useMemo, type ComponentPropsWithRef, type FC } from "react"
import { Badge } from "lucide-react"

import { Status, type DutyOperator } from "@/types/api/duties"
import { cn } from "@/lib/utils"
import { sortOperators } from "@/lib/utils/operator"
import { Text } from "@/components/ui/text"

export type OperatorConsensusBreakdownProps = {
  operators: DutyOperator[]
  missingOperators: DutyOperator[]
}

type OperatorConsensusBreakdownFC = FC<
  Omit<ComponentPropsWithRef<"div">, keyof OperatorConsensusBreakdownProps> &
    OperatorConsensusBreakdownProps
>

export const OperatorConsensusBreakdown: OperatorConsensusBreakdownFC = ({
  className,
  operators,
  missingOperators,
  ...props
}) => {
  const displayOperators = useMemo(() => {
    return sortOperators([
      ...operators.map((operator) => ({ ...operator, status: Status.Success })),
      ...missingOperators.map((operator) => ({
        ...operator,
        status: Status.Failed,
      })),
    ])
  }, [operators, missingOperators])

  return (
    <div className={cn("flex items-center gap-[2px]", className)} {...props}>
      {displayOperators.map((operator) => (
        <div
          key={operator.id}
          className={cn(
            "flex h-6 w-fit min-w-7 items-center justify-center rounded border px-1 font-mono text-[10px]",
            {
              "border-primary-200 bg-primary-50 text-primary-600":
                operator.status === Status.Success,
              "border-error-200 bg-error-50 text-error-500":
                operator.status === Status.Failed,
            }
          )}
        >
          {operator.id}
        </div>
      ))}
    </div>
  )
}

OperatorConsensusBreakdown.displayName = "OperatorConsensusBreakdown"
