import { scaleQuantize } from "d3"

const variables = [
  "var(--primary-200)",
  "var(--primary-300)",
  "var(--primary-400)",
  "var(--primary-500)",
]

const colors = {
  dark: {
    colors: ["#045588", "#067bc4", "#0792e8", "#1ba5f8"],
    empty: "#00000033",
  },
  light: {
    colors: ["#bbe4fd", "#76c8fb", "#49b6f9", "#1ba5f8"],
    empty: "#e6eaf7",
  },
}

const colorScale = scaleQuantize<string>().domain([0, 100]).range(variables)
export const getCountryColor = (percentage?: number) => {
  return percentage ? colorScale(percentage) : "var(--empty-100)"
}

export const getCountryColorCanvas = (
  theme: "dark" | "light",
  percentage?: number
) => {
  return percentage
    ? colors[theme].colors[percentage] || colors[theme].empty
    : colors[theme].empty
}
