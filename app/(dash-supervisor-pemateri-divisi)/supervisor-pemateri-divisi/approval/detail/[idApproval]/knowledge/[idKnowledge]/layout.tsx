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

interface ApprovalDetailKnowledgePageProps {
  params: {
    idApproval: string
    idKnowledge: string
  }
  children: React.ReactNode
}

export async function generateMetadata({
  params,
}: ApprovalDetailKnowledgePageProps) {
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
  params,
  children,
}: ApprovalDetailKnowledgePageProps) {
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
            href: "/supervisor-pemateri-divisi",
            title: "Dashboard",
          },
          {
            href: "/supervisor-pemateri-divisi/approval",
            title: "Approval",
          },
          {
            href: `#`,
            title: "Pengetahuan",
          },
          {
            href: `/approval/detail/${params.idApproval}/knowledge/${params.idKnowledge}`,
            title: knowledge.data?.knowledge_title,
          },
        ]}
      />

      <SectionBanner
        title={knowledge.data?.knowledge_title}
        description={knowledge.data?.description}
        urlLink={`/approval/detail/${params.idApproval}/knowledge/${params.idKnowledge}/edit`}
        image={knowledge.data?.image}
      />

      <div
        className="flex h-auto flex-col gap-4 px-2 lg:flex-row"
        id="scrollTarget"
      >
        <Content title={knowledge.data?.knowledge_title}>{children}</Content>

        <KnowledgeContentSidebar
          knowledge={knowledge}
          baseUrl={`/supervisor-pemateri-divisi/approval/detail/${params.idApproval}/knowledge/${params.idKnowledge}`}
          canCreateContent={false}
          newSection={false}
        />
      </div>
    </DashboardShell>
  )
}
