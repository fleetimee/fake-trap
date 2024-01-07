export type KnowledgeStatusCount = {
  code: number
  message: string
  data: KnowledgeStatusCountData[]
}

export type KnowledgeStatusCountData = {
  status_text: string
  count: number
}
