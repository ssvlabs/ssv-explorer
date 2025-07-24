"use client"

import { type FC } from "react"
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

const data = [
  { name: "Page A", uv: 4000, pv: 2400, amt: 2400 },
  { name: "Page B", uv: 3000, pv: 1398, amt: 2210 },
  { name: "Page C", uv: 2000, pv: 9800, amt: 2290 },
  { name: "Page D", uv: 2200, pv: 3908, amt: 2000 },
  { name: "Page E", uv: 1890, pv: 4800, amt: 2181 },
  { name: "Page F", uv: 2390, pv: 3800, amt: 2500 },
  { name: "Page G", uv: 3490, pv: 4300, amt: 2100 },
  { name: "Page H", uv: 3800, pv: 5200, amt: 3000 },
  { name: "Page I", uv: 2900, pv: 3700, amt: 2700 },
  { name: "Page J", uv: 2950, pv: 4100, amt: 2900 },
  { name: "Page K", uv: 2500, pv: 3300, amt: 2200 },
  { name: "Page L", uv: 3700, pv: 4500, amt: 3100 },
  { name: "Page M", uv: 3200, pv: 5600, amt: 4000 },
  { name: "Page N", uv: 2800, pv: 3100, amt: 2400 },
  { name: "Page O", uv: 3100, pv: 3800, amt: 2600 },
  { name: "Page P", uv: 3800, pv: 4200, amt: 2900 },
]

const PerformanceChart: FC = () => {
  const max = Math.max(...data.map((item) => item.uv))

  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        data={data}
        margin={{
          left: -23,
        }}
      >
        <CartesianGrid stroke="var(--gray-300)" />
        <XAxis
          stroke="var(--gray-300)"
          tick={{
            fontSize: 12,
            fill: "var(--gray-500)",
          }}
        />
        <YAxis
          domain={[0, max]}
          stroke="var(--gray-300)"
          tick={{
            fontSize: 12,
            fill: "var(--gray-500)",
          }}
        />
        <defs>
          <linearGradient
            id="myInlineGradient"
            x1="0%"
            y1="0%"
            x2="0%"
            y2="100%"
          >
            <stop
              offset="0%"
              style={{ stopColor: "var(--primary-500)", stopOpacity: 0.7 }}
            />
            <stop
              offset="100%"
              style={{ stopColor: "var(--primary-500)", stopOpacity: 0 }}
            />
          </linearGradient>
        </defs>
        <Tooltip
          contentStyle={{
            backgroundColor: "var(--gray-50)",
            borderRadius: 16,
            border: "none",
            boxShadow: "0 0 20px var(--gray-200)",
          }}
        />
        <Area
          type="natural"
          dataKey="uv"
          stroke="var(--primary-500)"
          strokeWidth={1.5}
          fill="url(#myInlineGradient)"
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}

export default PerformanceChart
