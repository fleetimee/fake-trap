import { getCategory } from "@/lib/fetcher/category/category-fetcher"
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
  const categoryList = await getCategory(6)

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
