const clusterRegex = /^(?:0x)?[a-fA-F0-9]{64}$/
const operatorRegex = /^\d{1,4}$/
const validatorRegex = /^(?:0x)?[a-fA-F0-9]{96}$/
const accountRegex = /^0x[a-fA-F0-9]{40}$/

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
