import { formatUnits } from "viem"

export const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 2,
})

export const numberFormatter = new Intl.NumberFormat("en-US", {
  useGrouping: true,
  maximumFractionDigits: 2,
})

export const _percentageFormatter = new Intl.NumberFormat("en-US", {
  style: "percent",
  maximumFractionDigits: 2,
})

export const percentageFormatter = {
  format: (value?: number) => {
    if (!value) return "N/A"
    return _percentageFormatter.format(value / 100)
  },
}

export const bigintFormatter = new Intl.NumberFormat("en-US", {
  useGrouping: false,
  maximumFractionDigits: 7,
})

export const ethFormatter = new Intl.NumberFormat("en-US", {
  useGrouping: true,
  maximumFractionDigits: 4,
})

export const formatSSV = (num: bigint, decimals = 18) =>
  ethFormatter.format(+formatUnits(num, decimals))

export const formatBigintInput = (num: bigint, decimals = 18) =>
  bigintFormatter.format(+formatUnits(num, decimals))

const units = {
  s: 1000,
  m: 60000,
  h: 3600000,
  d: 86400000,
  w: 604800000,
  mon: 2629746000,
  y: 31556952000,
} as const

type Unit = keyof typeof units

const regex = /^([\d.]+)(\w+)$/
export const ms = (value: `${number}${Unit}`): number => {
  const match = value.match(regex)
  if (!match) return 0
  const [, num, unit] = match
  return Number(num) * units[unit as keyof typeof units]
}

export const sortNumbers = <T extends bigint | number>(numbers: T[]): T[] => {
  return [...numbers].sort((a, b) => Number(a) - Number(b))
}
