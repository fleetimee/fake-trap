import { redirect } from "next/navigation"

import { authOptions } from "@/lib/auth"
import { getAllCategoriesData } from "@/lib/datasource"
import { getCurrentUser } from "@/lib/session"
import { DashboardHeader } from "@/components/header"
import { DashboardShell } from "@/components/shell"
import { columns } from "@/app/(dashboard)/dashboard/category/columns"
import { DataTable } from "@/app/(dashboard)/dashboard/category/data-table"

export const metadata = {
  title: "Kategori",
  description: "Kategori Pengetahuan yang tersedia",
}

/**
 * Renders the Category page component.
 * @returns {JSX.Element} The Category page component.
 */
export default async function CategoryPage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  const categoryList = await getAllCategoriesData({
    token: user?.token,
  })

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Kategori"
        description="Kategori Pengetahuan yang tersedia"
      />
      <DataTable columns={columns} data={categoryList.data} />
    </DashboardShell>
  )
}
