import { type ExtractAbiEventNames } from "abitype"

import { type SETTER_ABI } from "@/lib/abi/setter"

export type AccountEventName = ExtractAbiEventNames<typeof SETTER_ABI>

export const ACCOUNT_EVENTS_EMOJI_MAP: Record<AccountEventName, string> = {
  // Admin & System Events
  AdminChanged: "🔧",
  Initialized: "🚀",
  Upgraded: "⬆️",
  BeaconUpgraded: "⬆️",
  ModuleUpgraded: "📦",

  // Ownership Events
  OwnershipTransferStarted: "🔄",
  OwnershipTransferred: "👑",

  // Cluster Events
  ClusterDeposited: "💰",
  ClusterLiquidated: "💥",
  ClusterReactivated: "🔄",
  ClusterWithdrawn: "💸",

  // Validator Events
  ValidatorAdded: "➕",
  ValidatorRemoved: "➖",
  ValidatorExited: "🚪",

  // Operator Events
  OperatorAdded: "➕",
  OperatorRemoved: "➖",
  OperatorWithdrawn: "💵",

  // Operator Fee Events
  OperatorFeeDeclared: "📢",
  OperatorFeeExecuted: "✅",
  OperatorFeeDeclarationCancelled: "❌",
  OperatorFeeIncreaseLimitUpdated: "📈",
  OperatorMaximumFeeUpdated: "🔝",

  // Whitelist Events
  OperatorWhitelistUpdated: "📋",
  OperatorMultipleWhitelistUpdated: "📝",
  OperatorMultipleWhitelistRemoved: "🚫",
  OperatorWhitelistingContractUpdated: "📄",

  // Privacy Events
  OperatorPrivacyStatusUpdated: "🔒",

  // Network & Fee Events
  NetworkFeeUpdated: "💳",
  NetworkEarningsWithdrawn: "🏦",
  FeeRecipientAddressUpdated: "📬",

  // Period & Threshold Updates
  DeclareOperatorFeePeriodUpdated: "⏰",
  ExecuteOperatorFeePeriodUpdated: "⏱️",
  LiquidationThresholdPeriodUpdated: "⚠️",
  MinimumLiquidationCollateralUpdated: "💎",
}

export const getAccountEventIcon = (event: AccountEventName) => {
  return ACCOUNT_EVENTS_EMOJI_MAP[event] || "📃"
}
