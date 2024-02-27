import React from "react"
import { Metadata } from "next"
import { redirect } from "next/navigation"

import { authOptions } from "@/lib/auth"
import {
  getCategoryHighlight,
  getOperatorCategory,
} from "@/lib/fetcher/category-fetcher"
import { getRule } from "@/lib/fetcher/rule-fetcher"
import { getCurrentUser } from "@/lib/session"
import { DataTableSkeleton } from "@/components/data-table/data-table-skeleton"
import { DateRangePicker } from "@/components/date-range-picker"
import { MotionDiv } from "@/components/framer-wrapper"
import { DashboardHeader } from "@/components/header"
import { Icons } from "@/components/icons"
import { BreadCrumbs } from "@/components/pagers/breadcrumb"
import { CategoryTableShell, DashboardShell } from "@/components/shell"
import { Widget } from "@/components/widget"

export const metadata: Metadata = {
  title: "Modul",
  description: "Modul yang tersedia di LMS",
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

  const getCurrentMonth = () => {
    const date = new Date()
    const month = date.getMonth() + 1
    return month.toString()
  }

  const getMonth = (date: Date) => {
    return date.getMonth() + 1 // getMonth returns a 0-based month, so we add 1
  }

  const { page, per_page, sort, category_name, from, to } = searchParams ?? {}

  const pageInitial = typeof page === "string" ? parseInt(page) : 1
  const limitInitial = typeof per_page === "string" ? parseInt(per_page) : 10
  const sortFieldInitial = typeof sort === "string" ? sort : "created_at"
  const sortOrderInitial = typeof sort === "string" ? sort : "desc"
  const searchQueryInitial =
    typeof category_name === "string" ? category_name : ""

  const sortField = sortFieldInitial.split(".")[0]
  const sortOrder = sortOrderInitial.split(".")[1]

  const fromInitial = typeof from === "string" ? from : ""
  const toInitial = typeof to === "string" ? to : ""

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  const rule = await getRule({
    idRole: "1",
    token: user?.token,
  })

  const categoryData = await getOperatorCategory({
    token: user?.token,
    page: pageInitial,
    limit: limitInitial,
    sortBy: sortField,
    orderBy: sortOrder,
    searchQuery: searchQueryInitial,
    from: fromInitial,
    to: toInitial,
  })

  const selectedDate = new Date(fromInitial)

  const selectedMonth = getMonth(selectedDate)

  const categoryHighlight = await getCategoryHighlight({
    token: user?.token,
    month: isNaN(selectedMonth) ? getCurrentMonth() : selectedMonth.toString(),
  })

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
            description="Modul yang tersedia di LMS"
          />
        </MotionDiv>

        <DateRangePicker
          align="end"
          className="flex  place-items-end items-end justify-self-end"
        />
      </div>

      {categoryHighlight.code === 200 ? (
        <div className="mt-4 grid grid-cols-2 gap-4 xl:grid-cols-4">
          <Widget
            icon={<Icons.category className="text-blue-500" />}
            title="Modul"
            subtitle={categoryHighlight.data.total_category_count.toString()}
          />

          <Widget
            icon={<Icons.average className="text-green-500" />}
            title="Avg / Bulan"
            subtitle={categoryHighlight.data.avg_categories_per_month.toString()}
          />

          <Widget
            icon={<Icons.user className="text-yellow-500" />}
            title="Paling Aktif"
            subtitle={categoryHighlight.data.most_active_creator_name}
          />

          <Widget
            icon={<Icons.percent className="text-red-500" />}
            title="Persentase"
            subtitle={categoryHighlight.data.latest_month_percent_increase.toString()}
          />
        </div>
      ) : (
        <div className="mt-4 grid grid-cols-2 gap-4 xl:grid-cols-4">
          <Widget
            icon={<Icons.category />}
            title="Modul"
            subtitle={categoryData.count.toString()}
          />
        </div>
      )}

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
