import React from "react"
import { Metadata } from "next"
import { redirect } from "next/navigation"

import { authOptions } from "@/lib/auth"
import { getOperatorCategory } from "@/lib/fetcher/category-fetcher"
import { getRule } from "@/lib/fetcher/rule-fetcher"
import { getCurrentUser } from "@/lib/session"
import { DataTableSkeleton } from "@/components/data-table/data-table-skeleton"
import { MotionDiv } from "@/components/framer-wrapper"
import { DashboardHeader } from "@/components/header"
import { BreadCrumbs } from "@/components/pagers/breadcrumb"
import { CategoryTableShell, DashboardShell } from "@/components/shell"

export const metadata: Metadata = {
  title: "Modul",
  description: "Admin Modul Page",
}

interface AdminCategoryPageProps {
  searchParams: {
    [key: string]: string | string[] | undefined
  }
}

export default async function AdminCategoryPage({
  searchParams,
}: AdminCategoryPageProps) {
  const user = await getCurrentUser()

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
    idRole: "6",
    token: user?.token,
  })

  const categoryData = await getOperatorCategory({
    token: user?.token,
    page: pageInitial,
    limit: limitInitial,
    sortBy: sortField,
    orderBy: sortOrder,
    searchQuery: searchQueryInitial,
  })

  return (
    <DashboardShell>
      <BreadCrumbs
        segments={[
          {
            href: "/administrator",
            title: "Dashboard",
          },
          {
            href: "/administrator/category",
            title: "Modul",
          },
        ]}
      />

      <div className="grid grid-cols-1 items-center justify-between gap-4 xl:grid-cols-2">
        <MotionDiv
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <DashboardHeader
            heading="Modul"
            description="Modul Materi yang tersedia"
          />
        </MotionDiv>
      </div>

      <React.Suspense fallback={<DataTableSkeleton columnCount={6} />}>
        <CategoryTableShell
          data={categoryData.data}
          pageCount={categoryData.totalPage}
          rule={rule.data}
          newRowLink="/administrator/category/new"
          editRowLink="/administrator/category/"
        />
      </React.Suspense>
    </DashboardShell>
  )
}
