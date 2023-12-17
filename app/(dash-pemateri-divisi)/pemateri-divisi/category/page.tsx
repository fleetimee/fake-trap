import React from "react"
import { Metadata } from "next"
import { redirect } from "next/navigation"

import { authOptions } from "@/lib/auth"
import { getCategoryByCreator, getRule } from "@/lib/fetcher"
import { getCurrentUser } from "@/lib/session"
import { extractToken } from "@/lib/utils"
import { DataTableSkeleton } from "@/components/data-table/data-table-skeleton"
import { MotionDiv } from "@/components/framer-wrapper"
import { DashboardHeader } from "@/components/header"
import { BreadCrumbs } from "@/components/pagers/breadcrumb"
import { CategoryTableShell, DashboardShell } from "@/components/shell"

export const metadata: Metadata = {
  title: "Kategori",
  description: "Operator LMS Category Page",
}

interface CategoryPageProps {
  searchParams: {
    [key: string]: string | string[] | undefined
  }
}

export default async function PemateriDivisiCategoryPage({
  searchParams,
}: CategoryPageProps) {
  const user = await getCurrentUser()

  const tokenExtracted = extractToken(user?.token)

  const { page, per_page, sort, category_name } = searchParams ?? {}

  const pageInitial = typeof page === "string" ? parseInt(page) : 1
  const limitInitial = typeof per_page === "string" ? parseInt(per_page) : 10
  const sortFieldInitial = typeof sort === "string" ? sort : "created_at"
  const sortOrderInitial = typeof sort === "string" ? sort : "desc"
  const searchQueryInitial =
    typeof category_name === "string" ? category_name : ""

  const sortField = sortFieldInitial.split(".")[0]
  const sortOrder = sortOrderInitial.split(".")[1]

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  const rule = await getRule({
    idRole: "1",
    token: user?.token,
  })

  const categoryData = await getCategoryByCreator({
    token: user?.token,
    createdBy: tokenExtracted.id,
    page: pageInitial,
    limit: limitInitial,
    sortBy: sortField,
    orderBy: sortOrder,
    searchQuery: searchQueryInitial,
  })

  console.log(categoryData)

  return (
    <DashboardShell>
      <BreadCrumbs
        segments={[
          {
            href: "/pemateri-divisi",
            title: "Dashboard",
          },
          {
            href: "/pemateri-divisi/category",
            title: "Kategori",
          },
        ]}
      />

      <div className="grid grid-cols-1 items-center justify-between gap-4 xl:grid-cols-2">
        <MotionDiv
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <DashboardHeader
            heading="Kategori"
            description="Kategori yang anda buat"
          />
        </MotionDiv>
      </div>

      <React.Suspense fallback={<DataTableSkeleton columnCount={6} />}>
        <CategoryTableShell
          data={categoryData.data}
          pageCount={categoryData.totalPage}
          rule={rule.data}
          newRowLink="/pemateri-divisi/category/new"
          editRowLink="/pemateri-divisi/category/"
        />
      </React.Suspense>
    </DashboardShell>
  )
}
