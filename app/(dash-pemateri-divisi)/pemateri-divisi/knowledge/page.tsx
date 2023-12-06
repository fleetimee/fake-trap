import { Suspense } from "react"
import { Metadata } from "next"
import { redirect } from "next/navigation"

import { authOptions } from "@/lib/auth"
import {
  getKnowledgeByCreatedBy,
  getListCategory,
  getReference,
  getRule,
} from "@/lib/fetcher"
import { getCurrentUser } from "@/lib/session"
import { extractToken } from "@/lib/utils"
import { DataTableSkeleton } from "@/components/data-table/data-table-skeleton"
import { MotionDiv } from "@/components/framer-wrapper"
import { DashboardHeader } from "@/components/header"
import { BreadCrumbs } from "@/components/pagers/breadcrumb"
import { DashboardShell, KnowledgeTableShell } from "@/components/shell"

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

  const rule = await getRule({
    idRole: "1",
    token: user?.token,
  })

  const [knowledge, category, reference] = await Promise.all([
    getKnowledgeByCreatedBy({
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
    }),
    getListCategory({ token: user?.token, page: 1, limit: 100 }),
    getReference({
      token: user?.token,
      refCode: "003",
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
