import React from "react"
import { Metadata } from "next"
import { notFound, redirect } from "next/navigation"
import { PartyPopper } from "lucide-react"

import { authOptions } from "@/lib/auth"
import { checkUserEnrolled, getOneCourse, getOneKnowledge } from "@/lib/fetcher"
import { getCurrentUser } from "@/lib/session"
import { extractToken } from "@/lib/utils"
import { Content } from "@/components/content"
import { KnowledgeContentSidebar } from "@/components/content-sidebar"
import { CourseContentSidebar } from "@/components/course-content-sidebar"
import { SectionBanner } from "@/components/create-section-banner"
import { MotionDiv } from "@/components/framer-wrapper"
import { BreadCrumbs } from "@/components/pagers/breadcrumb"
import { DashboardShell } from "@/components/shell"
import { Shell } from "@/components/shell/lobby-shell"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { VercelToolbar } from "@/components/vercel-toolbar"

import { getOnePublicKnowledge } from "./page"

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
        segments={[
          {
            href: "/",
            title: "Home",
          },
          {
            href: "/intro",
            title: "Intro",
          },
          {
            href: "/intro/knowledge",
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
        canCreateSection={false}
      />

      <div
        className="flex h-auto flex-col gap-4 px-2 lg:flex-row"
        id="scrollTarget"
      >
        <Content title={knowledge?.data?.knowledge_title}>{children}</Content>

        <KnowledgeContentSidebar
          baseUrl={`/intro/knowledge/${params.detail}`}
          knowledge={knowledge}
          canCreateContent={false}
        />
      </div>
    </Shell>
  )
}
