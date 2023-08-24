"use client"

import React from "react"
import Link from "next/link"

import { KnowledgeOneRes, KnowledgeOneResContent } from "@/types/knowledge/res"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"
import { Icons } from "@/components/icons"
import { BreadCrumbs } from "@/components/pagers/breadcrumb"

import DetailSidebarKnowledge from "../detail-sidebar-knowledge"
import { KnowledgeDetailContent } from "./knowledge-detail-content"

interface KnowledgeDetailShellProps {
  detailKnowledgeData: KnowledgeOneRes
}

export function KnowledgeDetailShell({
  detailKnowledgeData,
}: KnowledgeDetailShellProps) {
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
              title: detailKnowledgeData.data.knowledge_title,
              href: `/dashboard/knowledge/${detailKnowledgeData.data.id_knowledge}`,
            },
          ]}
        />

        <div className="flex items-center justify-end gap-2 px-2">
          <Input
            type="text"
            placeholder="Link Public"
            className="w-full xl:w-1/2"
            defaultValue={`${process.env.NEXT_PUBLIC_BASE_URL}/intro/knowledge/${detailKnowledgeData.data.id_knowledge}`}
          />

          <Button
            variant="secondary"
            className="ml-2"
            onClick={() => {
              navigator.clipboard.writeText(
                `${process.env.NEXT_PUBLIC_BASE_URL}/intro/knowledge/${detailKnowledgeData.data.id_knowledge}`
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
            href={`/intro/knowledge/${detailKnowledgeData.data.id_knowledge}`}
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
          detailKnowledge={detailKnowledgeData}
          contentData={contentData}
        />
        <DetailSidebarKnowledge
          dataKnowledge={detailKnowledgeData}
          setContentData={setContentData}
          contentData={contentData}
          activeIndex={activeIndex}
          setActiveIndex={setActiveIndex}
        />
      </div>
    </div>
  )
}
