"use client"

import { useQueryState } from "nuqs"

import { chains } from "@/config/chains"
import { networkParser } from "@/lib/search-parsers"

export const useNetworkQuery = () => {
  const [network, setNetwork] = useQueryState("network", networkParser.network)
  return {
    query: { value: network, set: setNetwork },
    chain: chains[network],
  }
}
