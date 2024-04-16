import React from "react"
import { notFound } from "next/navigation"

import {
  getOnePublicKnowledge,
  lookupKnowledgePublic,
} from "@/lib/fetcher/knowledge-fetcher"
import { getCurrentUser } from "@/lib/session"
import { Content } from "@/components/content"
import { KnowledgeContentSidebar } from "@/components/content-sidebar"
import { SectionBanner } from "@/components/create-section-banner"
import { BreadCrumbs } from "@/components/pagers/breadcrumb"

interface KnowledgeDetailLayoutProps {
  children: React.ReactNode
  params: {
    detail: string
  }
}

export async function generateMetadata({ params }: KnowledgeDetailLayoutProps) {
  // const knowledge = await getOnePublicKnowledge({
  //   idKnowledge: Number(params.detail),
  // })

  // const isPublic = await lookupKnowledgePublic({
  //   idKnowledge: Number(params.detail),
  //   token: user?.token,
  // })

  // if (isPublic.code === 404) {
  //   return {
  //     title: "Pengetahuan tidak ditemukan",
  //     description: "Pengetahuan tidak ditemukan",
  //   }
  // }

  // return {
  //   title: knowledge.data.knowledge_title,
  //   description: knowledge.data.description,
  // }

  const knowledge = await getOnePublicKnowledge({
    idKnowledge: Number(params.detail),
  })

  const isPublic = await lookupKnowledgePublic({
    idKnowledge: Number(params.detail),
  })

  if (isPublic.code === 404) {
    return {
      title: "Materi Tidak Ditemukan",
      description: "Materi Tidak Ditemukan",
    }
  }

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

  const isPublic = await lookupKnowledgePublic({
    idKnowledge: Number(params.detail),
  })

  if (isPublic.code === 404) {
    return notFound()
  }

  // const isPublic = await lookupKnowledgePublic({
  //   idKnowledge: Number(params.detail),
  //   token: user?.token,
  // })

  // if (isPublic.code === 404) {
  //   return notFound()
  // }

  return (
    <div className="sm:container sm:grid sm:items-center sm:gap-8 sm:pb-8 sm:pt-6 md:py-8">
      <div className="hidden sm:block">
        <BreadCrumbs
          isWhiteText={true}
          segments={[
            {
              href: "/",
              title: "Home",
            },
            {
              href: "/intro/knowledge/all",
              title: "Semua Materi",
            },

            {
              href: `/intro/knowledge/${params.detail}`,
              title: knowledge.data.knowledge_title,
            },
          ]}
        />
      </div>

      <div className="hidden sm:block">
        <SectionBanner
          title={knowledge.data.knowledge_title}
          description={knowledge.data.description}
          urlLink="/intro/knowledge"
          image={knowledge.data.image}
        />
      </div>

      <div
        className="flex flex-col md:flex-row md:gap-4 md:px-2 lg:flex-row"
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
    </div>
  )
}
