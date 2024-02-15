import React from "react"
import { Metadata } from "next"
import { redirect } from "next/navigation"
import NotFoundLottie from "@/public/lottie/not-found.json"

import { authOptions } from "@/lib/auth"
import { getKnowledgeUser } from "@/lib/fetcher/knowledge-fetcher"
import { getCurrentUser } from "@/lib/session"
import { MotionDiv } from "@/components/framer-wrapper"
import { DashboardHeader } from "@/components/header"
import { Knowledges } from "@/components/knowledges"
import { NotFoundAnim } from "@/components/not-found-anim"
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

  const { page, per_page, search, sort } = searchParams

  const pageInitial = typeof page === "string" ? parseInt(page) : 1
  const limitInitial = typeof per_page === "string" ? parseInt(per_page) : 8
  const searchInitial = typeof search === "string" ? search : ""

  const orderByInitial = typeof sort === "string" ? sort : "desc"
  const sortByInitial = typeof sort === "string" ? sort : "created_at"

  const sortBy = sortByInitial.split(".")[0]
  const orderBy = orderByInitial.split(".")[1]

  const knowledges = await getKnowledgeUser({
    token: user?.token,
    page: pageInitial,
    limit: limitInitial,
    searchQuery: searchInitial,
    sortOrder: orderBy,
    sortField: sortBy,
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
        ]}
      />

      <MotionDiv
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <DashboardHeader
          heading="Pengetahuan"
          description="Pengetahuan atau Materi Terbuka yang dapat diakses oleh semua peserta."
        />
      </MotionDiv>

      <Separator />

      {knowledges.data.length === 0 ? (
        <NotFoundAnim
          animationData={NotFoundLottie}
          title="Belum ada Materi"
          description="Tidak ada materi yang tersedia saat ini."
          backButtonUrl="/peserta"
        />
      ) : (
        <Knowledges
          knowledges={knowledges.data}
          pageCount={knowledges.totalPage}
        />
      )}
    </DashboardShell>
  )
}
