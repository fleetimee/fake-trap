import React from "react"
import { Metadata } from "next"
import { redirect } from "next/navigation"

import { authOptions } from "@/lib/auth"
import { getKnowledgeUser } from "@/lib/fetcher"
import { getCurrentUser } from "@/lib/session"
import { MotionDiv } from "@/components/framer-wrapper"
import { DashboardHeader } from "@/components/header"
import { Knowledges } from "@/components/knowledges"
import { BreadCrumbs } from "@/components/pagers/breadcrumb"
import { DashboardShell } from "@/components/shell"
import { Separator } from "@/components/ui/separator"

export const metadata: Metadata = {
  title: "Pengetahuan",
}

interface PesertaKnowledgePageProps {
  searchParams: {
    [key: string]: string | string[] | undefined
  }
}

export default async function PesertaKnowledgePage({
  searchParams,
}: PesertaKnowledgePageProps) {
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  const { page, per_page, store_page } = searchParams

  const pageInitial = typeof page === "string" ? parseInt(page) : 1
  const limitInitial = typeof per_page === "string" ? parseInt(per_page) : 8

  const knowledges = await getKnowledgeUser({
    token: user?.token,
    page: pageInitial,
    limit: limitInitial,
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

      <Knowledges
        knowledges={knowledges.data}
        pageCount={knowledges.totalPage}
      />
    </DashboardShell>
  )
}
