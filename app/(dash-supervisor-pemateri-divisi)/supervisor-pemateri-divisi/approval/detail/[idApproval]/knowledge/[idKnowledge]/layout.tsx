import React from "react"
import Link from "next/link"
import { redirect } from "next/navigation"

import { authOptions } from "@/lib/auth"
import { getOneKnowledge } from "@/lib/fetcher/knowledge-fetcher"
import { getCurrentUser } from "@/lib/session"
import { Content } from "@/components/content"
import { KnowledgeContentSidebar } from "@/components/content-sidebar"
import { SectionBanner } from "@/components/create-section-banner"
import { Icons } from "@/components/icons"
import { BreadCrumbs } from "@/components/pagers/breadcrumb"
import { DashboardShell } from "@/components/shell"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"

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
      <div className="hidden sm:block">
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
              title: "Materi",
            },
            {
              href: `/approval/detail/${params.idApproval}/knowledge/${params.idKnowledge}`,
              title: knowledge.data?.knowledge_title,
            },
          ]}
        />
      </div>

      <div className="hidden sm:block">
        <SectionBanner
          title={knowledge.data?.knowledge_title}
          description={knowledge.data?.description}
          urlLink={`/approval/detail/${params.idApproval}/knowledge/${params.idKnowledge}/edit`}
          image={knowledge.data?.image}
        />
      </div>

      <div className="px-2">
        <Alert className="text-primary-700 flex flex-col gap-2   lg:flex-none lg:gap-0">
          <Icons.handShake className="size-4" />
          <AlertTitle>Approve Materi</AlertTitle>
          <AlertDescription>
            Silahkan approve materi menggunakan tombol di samping
          </AlertDescription>
          <div className="flex w-full flex-row justify-end gap-2 lg:w-auto">
            <Link
              href={`/supervisor-pemateri-divisi/approval/confirmation/${params.idApproval}`}
            >
              <Button className="w-full lg:w-auto">Approve</Button>
            </Link>
          </div>
        </Alert>
      </div>

      <div
        className="flex h-auto flex-col gap-4 md:px-2 lg:flex-row"
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
