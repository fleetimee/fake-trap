"use client"

import React from "react"
import Link from "next/link"

import {
  KnowledgeByIdResponse,
  KnowledgeByIdSectionContentData,
} from "@/types/knowledge-res"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"
import { Icons } from "@/components/icons"
import { BreadCrumbs } from "@/components/pagers/breadcrumb"

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

  return (
    <div className="flex flex-col gap-4 py-4">
      <div className="flex justify-between">
        <BreadCrumbs
          segments={[
            {
              href: "/dashboard",
              title: "Dashboard",
            },
            {
              href: "/dashboard/knowledge",
              title: "Pengetahuan",
            },
            {
              title: props.detailKnowledgeData.data.knowledge_title,
              href: `/dashboard/knowledge/${props.detailKnowledgeData.data.id_knowledge}`,
            },
          ]}
        />

        <div className="flex items-center justify-end gap-2 px-2">
          <Input
            type="text"
            placeholder="Link Public"
            className="w-full xl:w-1/2"
            defaultValue={`${process.env.NEXT_PUBLIC_BASE_URL}/intro/knowledge/${props.detailKnowledgeData.data.id_knowledge}`}
          />

          <Button
            variant="secondary"
            className="ml-2"
            onClick={() => {
              navigator.clipboard.writeText(
                `${process.env.NEXT_PUBLIC_BASE_URL}/intro/knowledge/${props.detailKnowledgeData.data.id_knowledge}`
              )

              toast({
                title: "Berhasil menyalin link",
                description: "Link berhasil disalin ke clipboard",
              })
            }}
          >
            <Icons.copy className="h-4 w-4" />
          </Button>

          <Link
            href={`/intro/knowledge/${props.detailKnowledgeData.data.id_knowledge}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="secondary" className="ml-2">
              <Icons.link className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
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
    </div>
  )
}
