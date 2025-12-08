"use client"

import { type Operator } from "@/types/api/operator"
import { useLocalStorage } from "@/hooks/use-local-storage"
import { Stat } from "@/components/ui/stat"
import { Text } from "@/components/ui/text"
import { PerformanceText } from "@/components/operators/performance-text"

interface PerformanceV2SectionProps {
  operator: Operator
}

export function PerformanceV2Section({ operator }: PerformanceV2SectionProps) {
  const [enablePerformanceV2] = useLocalStorage("ENABLE_PERFORMANCE_V2")

  if (!enablePerformanceV2) {
    return null
  }

  return (
    <Stat
      className="flex-1"
      title="Performance v2 (1D | 1M)"
      tooltip="Operator performance v2 is calculated by the percentage of attended duties within the specified time-frame."
      content={
        <div className="flex items-center gap-1">
          <PerformanceText
            performance={operator.performanceV2?.dailyPerformance}
          />
          <span className="text-gray-400">|</span>
          <PerformanceText
            performance={operator.performanceV2?.monthlyPerformance}
          />
        </div>
      }
    />
  )
}
