export type ApprovalKnowledgeCountRes = {
  code: number
  message: string
  data: ApprovalKnowledgeCountResData
}

export type ApprovalKnowledgeCountResData = {
  pending: number
  approved: number
  rejected: number
  draft: number
}
