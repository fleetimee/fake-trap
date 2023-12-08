import React from "react"
import { Metadata } from "next"
import { redirect } from "next/navigation"

import { KnowledgeListRes } from "@/types/knowledge/res"
import { authOptions } from "@/lib/auth"
import { getKnowledgeUser } from "@/lib/fetcher"
import { getCurrentUser } from "@/lib/session"
import { KnowledgeCard } from "@/components/app/public-knowledge/ui"
import { MotionDiv } from "@/components/framer-wrapper"
import { DashboardHeader } from "@/components/header"
import { BreadCrumbs } from "@/components/pagers/breadcrumb"
import { DashboardShell } from "@/components/shell"
import { KnowledgeCardSkeleton } from "@/components/skeletons/knowledge-card-skeleton"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

export const metadata: Metadata = {
  title: "Pengetahuan",
}

export default async function PesertaKnowledgePage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  const knowledges = await getKnowledgeUser({
    token: user?.token,
    page: 1,
    limit: 100,
    searchQuery: "",
    sortField: "created_at",
    sortOrder: "desc",
  })

  console.log(knowledges)

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
        ]}
      />

      <MotionDiv
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <DashboardHeader heading="Pengetahuan" />
      </MotionDiv>

      <Separator />

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <React.Suspense
          fallback={Array.from({ length: 10 }).map((_, i) => (
            <KnowledgeCardSkeleton key={i} />
          ))}
        >
          {knowledges.data.map((knowledge) => (
            <KnowledgeCard
              key={knowledge.id_knowledge}
              knowledge={knowledge}
              link={`/public-knowledge/${knowledge.id_knowledge}`}
            />
          ))}
        </React.Suspense>
      </div>
    </DashboardShell>
  )
}
