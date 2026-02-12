"use client"

import { useId, useMemo, useState, type FC } from "react"
import { format } from "date-fns"
import { FaInfoCircle } from "react-icons/fa"
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

import { type OperatorPerformanceChart } from "@/types/api/operator"
import { type ChainName } from "@/config/chains"
import { cn } from "@/lib/utils"
import { useOperatorPerformanceChart } from "@/hooks/queries/use-operator-performance-chart"
import { Card } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Text } from "@/components/ui/text"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { OperatorPerformanceTooltip } from "@/components/operators/operator-performance-tooltip"

type RangeKey = "1d" | "7d" | "30d"

const ranges: Array<{
  label: string
  value: RangeKey
  days: number
  points: number
  type: OperatorPerformanceChart["type"]
}> = [
  { label: "1D", value: "1d", days: 1, points: 24, type: "hourly" },
  { label: "7D", value: "7d", days: 7, points: 7, type: "daily" },
  { label: "30D", value: "30d", days: 30, points: 30, type: "daily" },
]

type PerformanceChartProps = {
  operatorId: number
  network: ChainName
  className?: string
}

type ChartDatum = {
  timestamp: number
  performance: number
}

export const PerformanceChart: FC<PerformanceChartProps> = ({
  operatorId,
  network,
  className,
}) => {
  const [selectedRange, setSelectedRange] = useState<RangeKey>("30d")
  const gradientId = useId()
  const selectedRangeConfig = ranges.find(
    (range) => range.value === selectedRange
  )!

  const { data, isLoading, error } = useOperatorPerformanceChart({
    operatorId,
    network,
    points: selectedRangeConfig?.points,
    type: selectedRangeConfig?.type,
  })

  const chartData: ChartDatum[] = useMemo(() => {
    if (!data?.data?.length) return []

    return data.data.map((point) => ({
      timestamp: new Date(point.timestamp).getTime(),
      performance: point.performance,
    }))
  }, [data?.data])

  const maxPerformance =
    chartData.length > 0
      ? Math.max(...chartData.map((point) => point.performance))
      : 0

  const yDomainMax = Math.max(100, Math.ceil(maxPerformance / 10) * 10 || 100)

  const labelFormatter = (value: number) =>
    format(value, selectedRange === "1d" ? "MMM d, HH:mm" : "MMM d")

  const xTickFormatter = (value: number) =>
    format(value, selectedRange === "1d" ? "HH:mm" : "MMM d")

  return (
    <Card className={cn("gap-4", className)}>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Text variant="body-2-semibold" className="text-gray-700">
            Avg. Performance
          </Text>
          <OperatorPerformanceTooltip>
            <FaInfoCircle className="size-3.5 text-gray-500" />
          </OperatorPerformanceTooltip>
        </div>
        <ToggleGroup
          type="single"
          value={selectedRange}
          onValueChange={(value) => {
            if (value) setSelectedRange(value as RangeKey)
          }}
          aria-label="Select performance range"
        >
          {ranges.map((range) => (
            <ToggleGroupItem
              key={range.value}
              value={range.value}
              data-active={range.value === selectedRange}
            >
              {range.label}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      </div>

      <div className="h-[260px]">
        {isLoading ? (
          <Skeleton className="size-full" />
        ) : error ? (
          <div className="flex h-full items-center justify-center rounded-xl bg-gray-100">
            <Text variant="body-3-medium" className="text-error-500">
              Unable to load performance data
            </Text>
          </div>
        ) : chartData.length === 0 ? (
          <div className="flex h-full items-center justify-center rounded-xl bg-gray-100">
            <Text variant="body-3-medium" className="text-gray-500">
              No performance data available
            </Text>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ left: -10, right: 10 }}>
              <CartesianGrid stroke="var(--gray-300)" />
              <XAxis
                dataKey="timestamp"
                type="number"
                domain={["dataMin", "dataMax"]}
                tickFormatter={xTickFormatter}
                tick={{ fontSize: 12, fill: "var(--gray-500)" }}
                stroke="var(--gray-300)"
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                domain={[0, yDomainMax]}
                tick={{ fontSize: 12, fill: "var(--gray-500)" }}
                stroke="var(--gray-300)"
                tickFormatter={(value: number) => `${value}%`}
                tickLine={false}
              />
              <defs>
                <linearGradient
                  id={gradientId}
                  x1="0%"
                  y1="0%"
                  x2="0%"
                  y2="100%"
                >
                  <stop
                    offset="0%"
                    style={{
                      stopColor: "var(--primary-500)",
                      stopOpacity: 0.7,
                    }}
                  />
                  <stop
                    offset="100%"
                    style={{ stopColor: "var(--primary-500)", stopOpacity: 0 }}
                  />
                </linearGradient>
              </defs>
              <Tooltip
                labelFormatter={labelFormatter}
                formatter={(value: number) => `${value.toFixed(2)}%`}
                contentStyle={{
                  backgroundColor: "var(--gray-50)",
                  borderRadius: 16,
                  border: "none",
                  boxShadow: "0 0 20px var(--gray-200)",
                }}
              />
              <Area
                type="monotone"
                dataKey="performance"
                stroke="var(--primary-500)"
                strokeWidth={1.5}
                fill={`url(#${gradientId})`}
                activeDot={{ r: 4 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>
    </Card>
  )
}
