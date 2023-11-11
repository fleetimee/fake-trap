import { redirect } from "next/navigation"

import { CategoryListRes } from "@/types/category/res"
import { authOptions } from "@/lib/auth"
import { getCurrentUser } from "@/lib/session"
import { CreateCategorySheet } from "@/components/app/category/operations/create-category-sheet"
import { MotionDiv } from "@/components/framer-wrapper"
import { DashboardHeader } from "@/components/header"
import { BreadCrumbs } from "@/components/pagers/breadcrumb"
import { CategoryTableShell, DashboardShell } from "@/components/shell"

export const metadata = {
  title: "Kategori",
  description: "Kategori Pengetahuan yang tersedia",
}

interface GetCategoryProps {
  token: string | undefined
  page: number
  limit: number
  sortBy?: string
  orderBy?: string
  searchQuery?: string
}

async function getCategory({
  token,
  page,
  limit,
  sortBy = "created_at",
  orderBy = "desc",
  searchQuery = "",
}: GetCategoryProps): Promise<CategoryListRes> {
  let url = `${process.env.NEXT_PUBLIC_BASE_URL}/secure/category/?page=${page}&limit=${limit}&sortBy=${sortBy}&orderBy=${orderBy}&searchQuery=${searchQuery}`

  const res = await fetch(url, {
    method: "GET",
    headers: {
      ContentType: "application/json",
      Authorization: `Bearer ${token}`,
    },
    cache: "no-cache",
  })

  return await res.json()
}

interface CategoryPageProps {
  searchParams: {
    [key: string]: string | string[] | undefined
  }
}

export default async function CategoryPage({
  searchParams,
}: CategoryPageProps) {
  const user = await getCurrentUser()

  const { page, per_page, sort, category_name, category } = searchParams ?? {}

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

  const categoryListData = await getCategory({
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
            href: "/dashboard",
            title: "Dashboard",
          },
          {
            href: "/dashboard/categori",
            title: "Kategori",
          },
        ]}
      />

      <div className="flex items-center justify-between gap-4">
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
        >
          <CreateCategorySheet />
        </MotionDiv>
      </div>

      <CategoryTableShell
        data={categoryListData.data}
        pageCount={categoryListData.totalPage}
      />
    </DashboardShell>
  )
}
