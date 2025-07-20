import { type WithPagination } from "@/types/api"

export type DutiesResponse = WithPagination<{
  duties: DutyElement[]
}>

export type DutyOperator = {
  id: number
  name: string
  status: Status
}

export interface DutyElement {
  publicKey: string
  operators: DutyOperator[]
  missing_operators: DutyOperator[]
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
