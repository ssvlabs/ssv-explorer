import { createParser, parseAsArrayOf, type Options } from "nuqs/server"
import { formatGwei, formatUnits, isAddress, parseGwei, parseUnits } from "viem"
import { z } from "zod"

import { sortNumbers } from "@/lib/utils/number"
import { parseAsTuple } from "@/lib/utils/parsers"
import {
  isClusterId,
  isValidatorPublicKey,
} from "@/components/global-search/search-input-parser"

export const defaultSearchOptions: Options = {
  history: "push",
  shallow: false,
  clearOnDefault: true,
}

export const addressesParser = parseAsArrayOf(
  z.string().refine(isAddress)
).withOptions(defaultSearchOptions)

export const clustersParser = parseAsArrayOf(
  z.string().refine(isClusterId)
).withOptions(defaultSearchOptions)

export const publicKeysParser = parseAsArrayOf(
  z.string().refine(isValidatorPublicKey)
).withOptions(defaultSearchOptions)

export const numberRangeParser = parseAsTuple(
  z.tuple([z.number({ coerce: true }), z.number({ coerce: true })]),
  {
    postParse: sortNumbers,
  }
).withOptions({
  ...defaultSearchOptions,
  throttleMs: 500,
})

export const optionalNumberRangeParser = createParser<[number, number]>({
  parse: (value) => {
    try {
      const [a, b] = value.split(",").map(Number)
      return [a ?? 0, b ?? 0] as [number, number]
    } catch {
      return null
    }
  },
  serialize: ([min, max]) => {
    // 0 means "no limit" — intentionally falsy so it's omitted from the URL
    if (min && max) return `${min},${max}`
    if (min) return `${min},`
    if (max) return `,${max}`
    return ""
  },
  eq: (a, b) => a[0] === b[0] && a[1] === b[1],
}).withOptions({ ...defaultSearchOptions, throttleMs: 500 })

export const effectiveBalanceParser = parseAsTuple(
  z.tuple([z.number({ coerce: true }), z.number({ coerce: true })]),
  {
    postParse: sortNumbers,
  }
).withOptions(defaultSearchOptions)

const bigintTuple = z.tuple([
  z.bigint({ coerce: true }),
  z.bigint({ coerce: true }),
])

type EBParserProps = {
  /**
   * If true, values are treated as eth and converted but converted to gwei in the URL (e.g. 32 -> 32e9)
   * If false, no unit conversion is applied.
   */
  serializeToGwei: boolean
}

/**
 * Creates an effective-balance range parser for URL search params.
 *
 * @param serializeToGwei - If true, values are treated as wei and converted
 * to/from gwei when parsing and serializing. If false, no unit conversion is applied.
 */
export const getEffectiveBalanceParser = ({
  serializeToGwei,
}: EBParserProps) => {
  return createParser<[number, number]>({
    parse: (value) => {
      try {
        const parsed = bigintTuple
          .parse(value.split(","))
          .map((v) => Number(serializeToGwei ? formatGwei(v) : v))
        return parsed as [number, number]
      } catch (error) {
        return null
      }
    },
    serialize: ([_min, _max]) => {
      if (_min === 0 && _max === 0) return ""
      const min = serializeToGwei ? parseGwei(`${_min}`).toString() : `${_min}`
      const max = serializeToGwei ? parseGwei(`${_max}`).toString() : `${_max}`
      if (min && max) return `${min},${max}`
      if (min) return `${min},`
      if (max) return `,${max}`
      return ""
    },
  })
    .withDefault([0, 0])
    .withOptions(defaultSearchOptions)
}

export const balanceRangeParser = createParser<[number, number]>({
  parse: (value) => {
    try {
      const parts = value.split(",").map((v) => (v === "" ? "0" : v))
      const parsed = bigintTuple
        .parse(parts)
        .map((v) => Number(formatUnits(v, 18)))
      return parsed as [number, number]
    } catch {
      return null
    }
  },
  serialize: ([_min, _max]) => {
    const min = _min ? parseUnits(`${_min}`, 18).toString() : ""
    const max = _max ? parseUnits(`${_max}`, 18).toString() : ""
    if (min && max) return `${min},${max}`
    if (min) return `${min},`
    if (max) return `,${max}`
    return ""
  },
})
  .withDefault([0, 0])
  .withOptions({ ...defaultSearchOptions, throttleMs: 500 })
