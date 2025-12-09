import {
  createSearchParamsCache,
  createSerializer,
  parseAsInteger,
  parseAsStringEnum,
} from "nuqs/server"

import type { OperatorPerformanceChart } from "@/types/api/operator"
import { defaultSearchOptions } from "@/lib/search-parsers/shared/parsers"

export const operatorPerformanceChartParsers = {
  points: parseAsInteger.withOptions(defaultSearchOptions),
  type: parseAsStringEnum<OperatorPerformanceChart["type"]>([
    "daily",
    "hourly",
  ]).withOptions(defaultSearchOptions),
}

export const operatorPerformanceChartParamsCache = createSearchParamsCache(
  operatorPerformanceChartParsers
)

export const operatorPerformanceChartParamsSerializer = createSerializer(
  operatorPerformanceChartParsers,
  {
    clearOnDefault: false,
  }
)

export type OperatorPerformanceChartParams = Awaited<
  ReturnType<typeof operatorPerformanceChartParamsCache.parse>
>
