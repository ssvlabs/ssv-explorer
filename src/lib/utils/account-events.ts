import { type ExtractAbiEventNames } from "abitype"

import { type ssvNetworkAbi } from "@/lib/abi/setter"

export type AccountEventName = ExtractAbiEventNames<typeof ssvNetworkAbi>

export const ACCOUNT_EVENTS_EMOJI_MAP: Partial<
  Record<AccountEventName, string>
> = {
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
  ClusterBalanceUpdated: "📊",
  ClusterDeposited: "💰",
  ClusterLiquidated: "💥",
  ClusterReactivated: "🔄",
  ClusterWithdrawn: "💸",
  ClusterMigratedToETH: "💫",

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
  CooldownDurationUpdated: "⏳",
  DeclareOperatorFeePeriodUpdated: "⏰",
  ExecuteOperatorFeePeriodUpdated: "⏱️",
  LiquidationThresholdPeriodSSVUpdated: "⚠️",
  LiquidationThresholdPeriodUpdated: "⚠️",
  MinimumLiquidationCollateralSSVUpdated: "💎",
  MinimumLiquidationCollateralUpdated: "💎",
  MinimumOperatorEthFeeUpdated: "💳",

  // Rescue & Sync Events
  ERC20Rescued: "🆘",
  FeesSynced: "🔄",

  // Network Events
  NetworkFeeUpdatedSSV: "💳",
  OracleReplaced: "🔮",
  QuorumUpdated: "📊",
  SSVNetworkUpgradeBlock: "⬆️",

  // Rewards & Staking Events
  RewardsClaimed: "🎁",
  RewardsSettled: "💵",
  RootCommitted: "📝",
  Staked: "🔒",
  UnstakeRequested: "📤",
  UnstakedWithdrawn: "💸",
  WeightedRootProposed: "📋",
}

export const getAccountEventIcon = (event: AccountEventName) => {
  return ACCOUNT_EVENTS_EMOJI_MAP[event] || "📃"
}
