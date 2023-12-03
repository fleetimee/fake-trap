import { Suspense } from "react"
import { Metadata } from "next"
import Link from "next/link"
import { redirect } from "next/navigation"

import { authOptions } from "@/lib/auth"
import {
  getKnowledgeV2,
  getListCategory,
  getReference,
  getRule,
} from "@/lib/fetcher"
import { getCurrentUser } from "@/lib/session"
import { DataTableSkeleton } from "@/components/data-table/data-table-skeleton"
import { MotionDiv } from "@/components/framer-wrapper"
import { DashboardHeader } from "@/components/header"
import { BreadCrumbs } from "@/components/pagers/breadcrumb"
import { DashboardShell, KnowledgeTableShell } from "@/components/shell"
import { Button, buttonVariants } from "@/components/ui/button"





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

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  const rule = await getRule({
    idRole: "3",
    token: user?.token,
  })

  const [knowledgeResp, categoryResp, referenceResp] = await Promise.all([
    getKnowledgeV2({
      token: user?.token,
      page: pageInitial,
      limit: limitInitial,
      searchQuery: searchQueryInitial,
      sortField: sortField,
      orderBy: sortOrder,
      categoryIds: id_category, // Add this line
      statusCode: status_text, // Add this line
      visibilityId: status, // Add this line
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
        <MotionDiv
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex xl:justify-end"
        >
          {rule.data.can_write_knowledge ? (
            <Link
              href="/operator-lms/knowledge/new"
              className={buttonVariants({
                size: "sm",
                className: "ml-2",
              })}
            >
              Buat Materi Baru
            </Link>
          ) : (
            <Button className="ml-2" size="sm" disabled>
              Buat Materi Baru
            </Button>
          )}
        </MotionDiv>
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
