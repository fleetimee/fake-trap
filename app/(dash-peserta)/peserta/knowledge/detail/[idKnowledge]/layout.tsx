import { redirect } from "next/navigation"

import { authOptions } from "@/lib/auth"
import { getOneKnowledge } from "@/lib/fetcher"
import { getCurrentUser } from "@/lib/session"
import { extractToken } from "@/lib/utils"
import { Content } from "@/components/content"
import { KnowledgeContentSidebar } from "@/components/content-sidebar"
import SectionBanner from "@/components/create-section-banner"
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
            href: "/peserta",
            title: "Dashboard",
          },
          {
            href: "/peserta/knowledge",
            title: "Pengetahuan",
          },
          {
            href: `/peserta/knowledge/detail/${params.idKnowledge}`,
            title: knowledge.data.knowledge_title,
          },
        ]}
      />

      <SectionBanner
        title={knowledge.data.knowledge_title}
        description={knowledge.data.description}
        urlLink="/peserta/knowledge"
        canCreateSection={false}
      />

      <div
        className="flex h-auto flex-col gap-4 px-2 lg:flex-row"
        id="scrollTarget"
      >
        {/* Content */}
        <Content title={knowledge.data?.knowledge_title}>{children}</Content>

        {/* Knowledge Sidebar Section */}
        <KnowledgeContentSidebar
          baseUrl={`/peserta/knowledge/detail/${params.idKnowledge}`}
          knowledge={knowledge}
          canCreateContent={false}
        />
      </div>
    </DashboardShell>
  )
}
