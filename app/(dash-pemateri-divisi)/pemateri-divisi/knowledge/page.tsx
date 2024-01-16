import { Suspense } from "react"
import { Metadata } from "next"
import { redirect } from "next/navigation"

import { authOptions } from "@/lib/auth"
import { getOperatorCategory } from "@/lib/fetcher/category-fetcher"
import {
  getKnowledgeByCreatedByUser,
  getKnowledgeDashboardCount,
} from "@/lib/fetcher/knowledge-fetcher"
import { getReference } from "@/lib/fetcher/reference-fetcher"
import { getCurrentUser } from "@/lib/session"
import { extractToken } from "@/lib/utils"
import { DataTableSkeleton } from "@/components/data-table/data-table-skeleton"
import { DateRangePicker } from "@/components/date-range-picker"
import { MotionDiv } from "@/components/framer-wrapper"
import { DashboardHeader } from "@/components/header"
import { Icons } from "@/components/icons"
import { BreadCrumbs } from "@/components/pagers/breadcrumb"
import { DashboardShell, KnowledgeTableShell } from "@/components/shell"
import { Widget } from "@/components/widget"

export const metadata: Metadata = {
  title: "Pengetahuan",
  description: "Operator LMS Knowledge Page",
}

interface PemateriDivisiKnowledgePageProps {
  searchParams: {
    [key: string]: string | string[] | undefined
  }
}

export default async function PemateriDivisiKnowledgePage({
  searchParams,
}: PemateriDivisiKnowledgePageProps) {
  const user = await getCurrentUser()

  const tokenExtracted = extractToken(user?.token)

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  const {
    page,
    per_page,
    sort,
    knowledge_title,
    id_category,
    status_text,
    status,
    from,
    to,
  } = searchParams ?? {}

  // Initial value
  const pageInitial = typeof page === "string" ? parseInt(page) : 1
  const limitInitial = typeof per_page === "string" ? parseInt(per_page) : 10
  const sortFieldInitial = typeof sort === "string" ? sort : "id_knowledge"
  const sortOrderInitial = typeof sort === "string" ? sort : "asc"
  const searchQueryInitial =
    typeof knowledge_title === "string" ? knowledge_title : ""

  // Split sort into sortField and sortOrder
  const sortField = sortFieldInitial.split(".")[0]
  const sortOrder = sortOrderInitial.split(".")[1]

  const fromInitial = typeof from === "string" ? from : ""
  const toInitial = typeof to === "string" ? to : ""

  const [knowledge, category, reference, knowledgeStatus] = await Promise.all([
    getKnowledgeByCreatedByUser({
      token: user?.token,
      page: pageInitial,
      limit: limitInitial,
      searchQuery: searchQueryInitial,
      sortField: sortField,
      orderBy: sortOrder,
      categoryIds: id_category, // Add this line
      statusCode: status_text, // Add this line
      visibilityId: status, // Add this line
      userUuid: tokenExtracted.id,
      from: fromInitial,
      to: toInitial,
    }),
    getOperatorCategory({ token: user?.token, page: 1, limit: 100 }),
    getReference({
      token: user?.token,
      refCode: "003",
    }),
    getKnowledgeDashboardCount({
      token: user?.token,
      userUuid: tokenExtracted.id,
    }),
  ])

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
        ]}
      />

      <div className="grid grid-cols-1 items-center justify-between gap-4 xl:grid-cols-2">
        <MotionDiv
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <DashboardHeader
            heading="Pengetahuan"
            description="Materi dan Pengetahuan yang anda buat"
          />
        </MotionDiv>

        <DateRangePicker
          align="end"
          className="flex  place-items-end items-end justify-self-end"
        />
      </div>

      <div className="mt-4 grid grid-cols-2 gap-4 xl:grid-cols-4">
        <Widget
          icon={<Icons.knowledge className="text-blue-500" />}
          title="Materi"
          subtitle={knowledgeStatus.data.total_knowledge_count.toString()}
        />

        <Widget
          icon={<Icons.ban className="text-green-500" />}
          title="Private"
          subtitle={knowledgeStatus.data.private_knowledge_count.toString()}
        />

        <Widget
          icon={<Icons.packageOpen className="text-yellow-500" />}
          title="Publik"
          subtitle={knowledgeStatus.data.public_knowledge_count.toString()}
        />

        <Widget
          icon={<Icons.packagePlus className="text-red-500" />}
          title="Terbaru"
          subtitle={knowledgeStatus.data.recent_knowledge_title.toString()}
        />
      </div>

      <Suspense fallback={<DataTableSkeleton columnCount={10} />}>
        <KnowledgeTableShell
          data={knowledge.data}
          categoryResp={category}
          referenceResp={reference}
          pageCount={knowledge.totalPage}
        />
      </Suspense>
    </DashboardShell>
  )
}
