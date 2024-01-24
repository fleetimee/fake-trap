import React from "react"

import { getOnePublicKnowledge } from "@/lib/fetcher/knowledge-fetcher"
import { Content } from "@/components/content"
import { KnowledgeContentSidebar } from "@/components/content-sidebar"
import { SectionBanner } from "@/components/create-section-banner"
import { BreadCrumbs } from "@/components/pagers/breadcrumb"
import { Shell } from "@/components/shell/lobby-shell"

interface KnowledgeDetailLayoutProps {
  children: React.ReactNode
  params: {
    detail: string
  }
}

export async function generateMetadata({ params }: KnowledgeDetailLayoutProps) {
  const knowledge = await getOnePublicKnowledge({
    idKnowledge: Number(params.detail),
  })

  return {
    title: knowledge.data.knowledge_title,
    description: knowledge.data.description,
  }
}

export default async function KnowledgeDetail({
  children,
  params,
}: KnowledgeDetailLayoutProps) {
  const knowledge = await getOnePublicKnowledge({
    idKnowledge: Number(params.detail),
  })

  return (
    <Shell>
      <BreadCrumbs
        isWhiteText={true}
        segments={[
          {
            href: "/",
            title: "Home",
          },
          {
            href: "/intro/knowledge/all",
            title: "Semua Pengetahuan",
          },
          {
            href: "#",
            title: "Knowledge",
          },
          {
            href: `/intro/knowledge/${params.detail}`,
            title: knowledge.data.knowledge_title,
          },
        ]}
      />

      <SectionBanner
        title={knowledge.data.knowledge_title}
        description={knowledge.data.description}
        urlLink="/intro/knowledge"
        image={knowledge.data.image}
      />

      <div
        className="
        flex 
        flex-col
        gap-4
        px-2
        md:flex-row
        lg:flex-row
        
        "
        id="scrollTarget"
      >
        <Content title={knowledge?.data?.knowledge_title}>{children}</Content>

        <KnowledgeContentSidebar
          baseUrl={`/intro/knowledge/${params.detail}`}
          knowledge={knowledge}
          canCreateContent={false}
          newSection={false}
        />
      </div>
    </Shell>
  )
}
