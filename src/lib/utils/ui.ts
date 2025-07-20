export const getPerformanceColor = (performance: number) => {
  if (performance > 99) return "text-[#06B64F]"
  if (performance > 96) return "text-[#7ED90B]"
  if (performance > 90) return "text-[#FD9D2F]"
  if (performance > 0) return "text-[#EC1C26]"
  if (performance === 0) return "text-gray-500 text-xs"
}
