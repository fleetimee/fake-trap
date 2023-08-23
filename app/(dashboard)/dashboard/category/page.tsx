import { redirect } from "next/navigation"

import { CategoryListRes } from "@/types/category/res"
import { authOptions } from "@/lib/auth"
import { getCurrentUser } from "@/lib/session"
import { DashboardHeader } from "@/components/header"
import { DashboardShell } from "@/components/shell"
import { columns } from "@/app/(dashboard)/dashboard/category/columns"
import { DataTable } from "@/app/(dashboard)/dashboard/category/data-table"

export const metadata = {
  title: "Kategori",
  description: "Kategori Pengetahuan yang tersedia",
}

export default async function CategoryPage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  const categoryList = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/secure/category`,
    {
      method: "GET",
      headers: {
        ContentType: "application/json",
        Authorization: `Bearer ${user?.token}`,
      },
    }
  )

  const categoryListData: CategoryListRes = await categoryList.json()

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Kategori"
        description="Kategori Pengetahuan yang tersedia"
      />
      <DataTable columns={columns} data={categoryListData.data} />
    </DashboardShell>
  )
}
