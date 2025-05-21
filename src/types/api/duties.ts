import { type WithPagination } from "@/types/api"

export type DutiesResponse = WithPagination<{
  duties: DutyElement[]
}>

export interface DutyElement {
  publicKey: string
  operators: Operator[]
  missing_operators: Operator[]
  slot: number
  epoch: number
  duty: DutyEnum
  status: Status
  sequence: number
}

export enum DutyEnum {
  Attester = "ATTESTER",
}

export interface Operator {
  id: number
  name: string
  status: Status
}

export enum Status {
  Failed = "failed",
  Success = "success",
}
