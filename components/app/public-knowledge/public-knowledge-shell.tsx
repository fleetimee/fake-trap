"use client"

import React from "react"

import {
  KnowledgeByIdResponse,
  KnowledgeByIdSectionContentData,
} from "@/types/knowledge-res"

import { PublicKnowledgeDetailContent } from "./public-knowledge-detail-content"
import PublicDetailSidebarKnowledge from "./public-knowledge-detail-sidebar"

export function PublicKnowledgeDetailShell(props: {
  detailKnowledgeDataResp: KnowledgeByIdResponse
}) {
  const [contentData, setContentData] =
    React.useState<KnowledgeByIdSectionContentData>({
      content_title: "",
      content_type: 0,
      id_content: 0,
      id_section: 0,
      image: "",
      link: "",
    })

  const [activeIndex, setActiveIndex] = React.useState<number>(0)

  return (
    <div className="flex h-auto  flex-col gap-4 px-2 lg:flex-row">
      <PublicKnowledgeDetailContent
        activeIndex={activeIndex}
        setActiveIndex={setActiveIndex}
        contentData={contentData}
        setContentData={setContentData}
        dataContentKnowledge={props.detailKnowledgeDataResp}
      />
      <PublicDetailSidebarKnowledge
        activeIndex={activeIndex}
        setActiveIndex={setActiveIndex}
        contentData={contentData}
        setContentData={setContentData}
        dataKnowledge={props.detailKnowledgeDataResp}
      />
    </div>
  )
}
