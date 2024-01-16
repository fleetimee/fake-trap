export type KnowledgeDashboardCount = {
  code: number
  message: string
  data: KnowledgeDashbooardCountData
}

export type KnowledgeDashbooardCountData = {
  public_knowledge_count: number
  private_knowledge_count: number
  total_knowledge_count: number
  recent_knowledge_title: string
}
