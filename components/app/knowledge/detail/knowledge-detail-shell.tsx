"use client"

import React from "react"

import {
  KnowledgeByIdResponse,
  KnowledgeByIdSectionContentData,
} from "@/types/knowledge-res"

import DetailSidebarKnowledge from "../detail-sidebar-knowledge"
import { KnowledgeDetailContent } from "./knowledge-detail-content"

export function KnowledgeDetailShell(props: {
  detailKnowledgeData: KnowledgeByIdResponse
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

  const [scaleInitial, setScaleInitial] = React.useState<number>(1.2)

  const [scaleUp, setScaleUp] = React.useState<number>(scaleInitial + 0.2)

  const [scaleDown, setScaleDown] = React.useState<number>(scaleInitial - 0.2)

  return (
    <div className="flex h-auto  flex-col gap-4 px-2 lg:flex-row">
      <KnowledgeDetailContent
        dataContentKnowledge={props.detailKnowledgeData}
        setContentData={setContentData}
        contentData={contentData}
        activeIndex={activeIndex}
        setActiveIndex={setActiveIndex}
      />
      <DetailSidebarKnowledge
        dataKnowledge={props.detailKnowledgeData}
        setContentData={setContentData}
        contentData={contentData}
        activeIndex={activeIndex}
        setActiveIndex={setActiveIndex}
      />
    </div>
  )
}
