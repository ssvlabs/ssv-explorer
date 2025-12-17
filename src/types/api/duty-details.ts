export interface DutyDetailsResponse {
  role: string
  committee_id: string
  validator_index: number
  public_key: string
  slot: number
  epoch: number
  hasConsensusRoundChanges: boolean
  pre_consensus: number[] | null
  post_consensus: number[]
  round_changes: Array<{
    round: number
    leader: number
    prepares: number[]
    commits: number[]
  }>
  operators: Array<{
    id: number
    logo: string
  }>
}

export enum DutyRoles {
  Aggregator = "aggregator",
  Attester = "attester",
  Proposer = "proposer",
  SyncCommittee = "sync_committee",
  SyncCommitteeContribution = "sync_committee_contribution",
}

export const dutySteps = {
  round: "Round",
  post_consensus: "Post Consensus",
  pre_consensus: "Pre Consensus",
  leader: "Leader",
  prepares: "Prepares",
  commits: "Commits",
}
