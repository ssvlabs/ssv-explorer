import {
  format,
  formatDistanceToNow,
  formatDistanceToNowStrict,
} from "date-fns"

import { chains, type SupportedChain } from "@/config/chains"
import { globals } from "@/config/globals"

// Genesis timestamps for supported networks

export function getBlockDate(
  blockNumber: number,
  chainId: SupportedChain = 1
): Date {
  const genesisTimestamp = chains[chainId].genesisTimestamp || 0

  const secondsPerBlock = 86400 / Number(globals.BLOCKS_PER_DAY)

  // Calculate the time elapsed since genesis
  const secondsElapsed = blockNumber * secondsPerBlock

  // Convert to milliseconds and create date
  const blockTimestamp = genesisTimestamp + secondsElapsed * 1000

  return new Date(blockTimestamp)
}

export function formatBlockDate(
  blockNumber: number,
  chainId: SupportedChain = 1
) {
  const date = getBlockDate(blockNumber, chainId)

  return {
    date,
    full: format(date, "PPpp"), // "Dec 15, 2023 at 2:30 PM"
    relative: formatDistanceToNowStrict(date, { addSuffix: true }), // "2 days ago"
    short: format(date, "MMM dd, yyyy"), // "Dec 15, 2023"
    iso: date.toISOString(), // "2023-12-15T14:30:00.000Z"
    timestamp: date.getTime(), // Unix timestamp in milliseconds
  }
}

// Utility to get the age of a block
export function getBlockAge(
  blockNumber: number,
  chainId: SupportedChain = 1
): string {
  const date = getBlockDate(blockNumber, chainId)
  return formatDistanceToNow(date, { addSuffix: true })
}

// Utility to check if a block is recent (within last 24 hours)
export function isRecentBlock(
  blockNumber: number,
  chainId: SupportedChain = 1
): boolean {
  const date = getBlockDate(blockNumber, chainId)
  const now = new Date()
  const dayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000)
  return date > dayAgo
}
