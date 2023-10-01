"use client"

import { KnowledgeOneRes, KnowledgeOneResContent } from "@/types/knowledge/res"
import { renderContent } from "@/components/render-content"

interface RenderContentWrapperProps {
  detailKnowledge: KnowledgeOneRes
  contentData: KnowledgeOneResContent
  contentType: string
}

export default function RenderContentWrapper({
  detailKnowledge,
  contentType,
  contentData,
}: RenderContentWrapperProps) {
  return renderContent({
    detailKnowledge,
    contentData,
    contentType,
  })
}
