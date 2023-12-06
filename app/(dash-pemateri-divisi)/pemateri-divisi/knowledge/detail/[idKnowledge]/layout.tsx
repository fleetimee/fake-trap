import React from "react"
import Link from "next/link"
import { notFound, redirect } from "next/navigation"

import { authOptions } from "@/lib/auth"
import { getOneKnowledge } from "@/lib/fetcher"
import { getCurrentUser } from "@/lib/session"
import { extractToken } from "@/lib/utils"
import { Content } from "@/components/content"
import { KnowledgeContentSidebar } from "@/components/content-sidebar"
import { CreateContentDropdownButton } from "@/components/create-content-dropdown-button"
import SectionBanner from "@/components/create-section-banner"
import { Icons } from "@/components/icons"
import { BreadCrumbs } from "@/components/pagers/breadcrumb"
import { DashboardShell } from "@/components/shell"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

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

  const tokenExtracted = extractToken(user?.token)

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  const knowledge = await getOneKnowledge({
    idKnowledge: params.idKnowledge,
    token: user?.token,
  })

  const createdBy = knowledge.data?.created_by

  if (createdBy !== tokenExtracted?.id) {
    return notFound()
  }

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
