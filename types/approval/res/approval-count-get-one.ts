export type ApprovalCount = {
  code: number
  message: string
  data: ApprovalCountData
}

export type ApprovalCountData = {
  pending: number
  approved: number
  rejected: number
}
