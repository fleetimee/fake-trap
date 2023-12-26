import React from "react"
import { redirect } from "next/navigation"

import { authOptions } from "@/lib/auth"
import { getOneKnowledge } from "@/lib/fetcher/knowledge-fetcher"
import { getCurrentUser } from "@/lib/session"
import { Content } from "@/components/content"
import { KnowledgeContentSidebar } from "@/components/content-sidebar"
import { SectionBanner } from "@/components/create-section-banner"
import { BreadCrumbs } from "@/components/pagers/breadcrumb"
import { DashboardShell } from "@/components/shell"

interface KnowledgeDetailLayoutProps {
  children: React.ReactNode
  params: {
    idKnowledge: string
  }
}

export async function generateMetadata({ params }: KnowledgeDetailLayoutProps) {
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  const knowledge = await getOneKnowledge({
    idKnowledge: params.idKnowledge,
    token: user?.token,
  })

  return {
    title: knowledge.data?.knowledge_title,
    description: knowledge.data?.description,
  }
}

export default async function KnowledgeDetailLayout({
  children,
  params,
}: KnowledgeDetailLayoutProps) {
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  const knowledge = await getOneKnowledge({
    idKnowledge: params.idKnowledge,
    token: user?.token,
  })

  return (
    <DashboardShell>
      <BreadCrumbs
        segments={[
          {
            href: "/pemateri-divisi",
            title: "Dashboard",
          },
          {
            href: "/pemateri-divisi/knowledge",
            title: "Pengetahuan",
          },
          {
            href: `/pemateri-divisi/knowledge/detail/${params.idKnowledge}`,
            title: knowledge.data?.knowledge_title,
          },
        ]}
      />

      <SectionBanner
        title={knowledge.data?.knowledge_title}
        description={knowledge.data?.description}
        urlLink={`/pemateri-divisi/knowledge/detail/${params.idKnowledge}/section/new`}
      />

      <div
        className="flex h-auto flex-col gap-4 px-2 lg:flex-row"
        id="scrollTarget"
      >
        {/* Content */}
        <Content title={knowledge.data?.knowledge_title}>{children}</Content>

        {/* Sidebar Section */}
        <KnowledgeContentSidebar
          baseUrl={`/pemateri-divisi/knowledge/detail/${params.idKnowledge}`}
          knowledge={knowledge}
        />
      </div>
    </DashboardShell>
  )
}
