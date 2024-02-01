import { Suspense } from "react"
import { Metadata } from "next"
import { redirect } from "next/navigation"

import { authOptions } from "@/lib/auth"
import { getOperatorCategory } from "@/lib/fetcher/category-fetcher"
import { getOperatorKnowledge } from "@/lib/fetcher/knowledge-fetcher"
import { getReference } from "@/lib/fetcher/reference-fetcher"
import { getCurrentUser } from "@/lib/session"
import { DataTableSkeleton } from "@/components/data-table/data-table-skeleton"
import { DateRangePicker } from "@/components/date-range-picker"
import { MotionDiv } from "@/components/framer-wrapper"
import { DashboardHeader } from "@/components/header"
import { BreadCrumbs } from "@/components/pagers/breadcrumb"
import { DashboardShell, KnowledgeTableShell } from "@/components/shell"

export const metadata: Metadata = {
  title: "Pengetahuan",
  description: "Operator LMS Knowledge Page",
}

interface OperatorLMSKnowledgePageProps {
  searchParams: {
    [key: string]: string | string[] | undefined
  }
}

export default async function OperatorLMSKnowledgePage({
  searchParams,
}: OperatorLMSKnowledgePageProps) {
  const user = await getCurrentUser()

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

  console.log(page)

  // Initial value
  const pageInitial = typeof page === "string" ? parseInt(page) : 1
  const limitInitial = typeof per_page === "string" ? parseInt(per_page) : 10
  const sortFieldInitial = typeof sort === "string" ? sort : "id_knowledge"
  const sortOrderInitial = typeof sort === "string" ? sort : "asc"
  const searchQueryInitial =
    typeof knowledge_title === "string" ? knowledge_title : ""

  const fromInitial = typeof from === "string" ? from : ""
  const toInitial = typeof to === "string" ? to : ""

  // Split sort into sortField and sortOrder
  const sortField = sortFieldInitial.split(".")[0]
  const sortOrder = sortOrderInitial.split(".")[1]

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  const [knowledgeResp, categoryResp, referenceResp] = await Promise.all([
    getOperatorKnowledge({
      token: user?.token,
      page: pageInitial,
      limit: limitInitial,
      searchQuery: searchQueryInitial,
      sortField: sortField,
      orderBy: sortOrder,
      categoryIds: id_category,
      statusCode: status_text,
      visibilityId: status,
      from: fromInitial,
      to: toInitial,
    }),
    getOperatorCategory({ token: user?.token, page: 1, limit: 100 }),
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
            href: "/operator-lms",
            title: "Dashboard",
          },
          {
            href: "/operator-lms/knowledge",
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
            description="Pengetahuan yang tersedia di e-learning"
          />
        </MotionDiv>

        <DateRangePicker
          align="end"
          className="flex  place-items-end items-end justify-self-end"
        />
      </div>

      <Suspense fallback={<DataTableSkeleton columnCount={10} />}>
        <KnowledgeTableShell
          data={knowledgeResp.data}
          categoryResp={categoryResp}
          referenceResp={referenceResp}
          pageCount={knowledgeResp.totalPage}
        />
      </Suspense>
    </DashboardShell>
  )
}
