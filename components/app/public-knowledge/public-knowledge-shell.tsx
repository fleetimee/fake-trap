"use client"

import React from "react"

import { KnowledgeOneRes, KnowledgeOneResContent } from "@/types/knowledge/res"

import { PublicKnowledgeDetailContent } from "./public-knowledge-detail-content"
import PublicDetailSidebarKnowledge from "./public-knowledge-detail-sidebar"

interface PublicKnowledgeDetailShellProps {
  detailKnowledge: KnowledgeOneRes
}

export function PublicKnowledgeDetailShell({
  detailKnowledge,
}: PublicKnowledgeDetailShellProps) {
  const [contentData, setContentData] = React.useState<KnowledgeOneResContent>({
    content_title: "",
    content_type: 0,
    id_content: 0,
    id_section: 0,
    image: "",
    link: "",
    created_at: Date.now().toString() as unknown as Date,
    updated_at: Date.now().toString() as unknown as Date,
  })

  const [activeIndex, setActiveIndex] = React.useState<number>(0)

  return (
    <div className="flex h-auto  flex-col gap-4 px-2 lg:flex-row">
      <PublicKnowledgeDetailContent
        dataContentKnowledge={detailKnowledge}
        contentData={contentData}
      />
      <PublicDetailSidebarKnowledge
        activeIndex={activeIndex}
        setActiveIndex={setActiveIndex}
        contentData={contentData}
        setContentData={setContentData}
        dataKnowledge={detailKnowledge}
      />
    </div>
  )
}
