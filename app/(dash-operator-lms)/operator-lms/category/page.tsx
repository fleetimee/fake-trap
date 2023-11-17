import { Metadata } from "next"
import Link from "next/link"
import { redirect } from "next/navigation"

import { authOptions } from "@/lib/auth"
import { getOperatorCategory, getRule } from "@/lib/fetcher"
import { getCurrentUser } from "@/lib/session"
import { extractToken } from "@/lib/utils"
import { MotionDiv } from "@/components/framer-wrapper"
import { DashboardHeader } from "@/components/header"
import { BreadCrumbs } from "@/components/pagers/breadcrumb"
import { CategoryTableShell, DashboardShell } from "@/components/shell"
import { Button, buttonVariants } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Kategori",
  description: "Operator LMS Category Page",
}

interface CategoryPageProps {
  searchParams: {
    [key: string]: string | string[] | undefined
  }
}

export default async function OperatorLmsCategoryPage({
  searchParams,
}: CategoryPageProps) {
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
    idRole: "3",
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
            href: "/operator-lms",
            title: "Dashboard",
          },
          {
            href: "/operator-lms/category",
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
            description="Kategori Pengetahuan yang tersedia"
          />
        </MotionDiv>

        <MotionDiv
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex xl:justify-end "
        >
          {rule.data.can_write_knowledge ? (
            <Link
              href="/operator-lms/category/new"
              className={buttonVariants({
                size: "sm",
                className: "ml-2",
              })}
            >
              Buat Kategori Baru
            </Link>
          ) : (
            <Button className="ml-2" size="sm" disabled>
              Buat Kategori Baru
            </Button>
          )}
        </MotionDiv>
      </div>

      <CategoryTableShell
        data={categoryData.data}
        pageCount={categoryData.totalPage}
        rule={rule.data}
      />
    </DashboardShell>
  )
}
