export type KnowledgeGetNewRes = {
  code: number
  message: string
  data: KnowledgeGetNewResData
}

export type KnowledgeGetNewResData = {
  id_knowledge: number
  knowledge_title: string
  description: string
  status: number
  image: string
  id_category: number
  created_at: Date
  updated_at: Date
}

export interface KnowledgeNewOperatorNewRes {
  code: number
  message: string
  data: KnowledgeNewOperatorNewResData[]
}

export interface KnowledgeNewOperatorNewResData {
  id_knowledge: number
  knowledge_title: string
  description: string
  image: string
  requester_name: string
  status: string
  status_text: string
  updated_at: string
}
