import { redirect } from "next/navigation"

import { CategoryListRes } from "@/types/category/res"
import { authOptions } from "@/lib/auth"
import { getCurrentUser } from "@/lib/session"
import { CreateCategorySheet } from "@/components/app/category/operations/create-category-sheet"
import { DashboardHeader } from "@/components/header"
import { BreadCrumbs } from "@/components/pagers/breadcrumb"
import { DashboardShell } from "@/components/shell"
import { CategoryTableShell } from "@/components/shell/category-table-shell"

export const metadata = {
  title: "Kategori",
  description: "Kategori Pengetahuan yang tersedia",
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

  const { page, per_page, sort, name, category } = searchParams ?? {}

  const limit = typeof per_page === "string" ? parseInt(per_page) : 10

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  const categoryList = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/secure/category/?page=${page}&limit=${limit}`,
    {
      method: "GET",
      headers: {
        ContentType: "application/json",
        Authorization: `Bearer ${user?.token}`,
      },
      cache: "no-cache",
    }
  )

  const categoryListData: CategoryListRes = await categoryList.json()

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
        <DashboardHeader
          heading="Kategori"
          description="Kategori Pengetahuan yang tersedia"
        />

        <CreateCategorySheet />
      </div>

      <CategoryTableShell
        data={categoryListData.data}
        pageCount={categoryListData.totalPage}
      />
    </DashboardShell>
  )
}
