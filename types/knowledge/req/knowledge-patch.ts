export type KnowledgePatchReq = {
  knowledge_title: string
  description: string
  status?: number | null
  image?: string | null
  id_category: number
}
