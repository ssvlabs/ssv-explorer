import { type Address, type Hex } from "viem"

export const clusterRegex = /^(?:0x)?[a-fA-F0-9]{64}$/
export const operatorRegex = /^\d{1,4}$/
export const validatorRegex = /^(?:0x)?[a-fA-F0-9]{96}$/
export const accountRegex = /^0x[a-fA-F0-9]{40}$/

export const parseSearchInput = (search: string) => {
  if (clusterRegex.test(search)) {
    return { type: "cluster", value: search, isExactMatch: true } as const
  }
  if (operatorRegex.test(search)) {
    return { type: "operator", value: search, isExactMatch: false } as const
  }
  if (validatorRegex.test(search)) {
    return { type: "validator", value: search, isExactMatch: true } as const
  }
  if (accountRegex.test(search)) {
    return { type: "account", value: search, isExactMatch: true } as const
  }
  return { type: "free-text", value: search, isExactMatch: false } as const
}

export const isClusterId = (search: string): search is Hex =>
  clusterRegex.test(search)
export const isOperatorId = (search: string) => operatorRegex.test(search)
export const isValidatorPublicKey = (search: string): search is Hex =>
  validatorRegex.test(search)
export const isAccountAddress = (search: string): search is Address =>
  accountRegex.test(search)
