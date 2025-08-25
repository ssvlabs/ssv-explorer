import { scaleQuantize } from "d3"

const colors = [
  "var(--primary-200)",
  "var(--primary-300)",
  "var(--primary-400)",
  "var(--primary-500)",
]
const colorScale = scaleQuantize<string>().domain([0, 100]).range(colors)
export const getCountryColor = (percentage?: number) => {
  return percentage ? colorScale(percentage) : "var(--empty-100)"
}
