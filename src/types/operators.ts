export type OperatorDKGHealthResponse = {
  id: string
  isHealthy: boolean
  isMultiSig: boolean
  isOutdated: boolean
  isEthClientConnected: boolean
  isMismatchId: boolean
  /** Version reported by the DKG node; null when the node did not answer. */
  version?: string | null
}
