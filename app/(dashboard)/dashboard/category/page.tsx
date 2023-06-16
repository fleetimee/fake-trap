import { getCategory } from "@/lib/fetcher/category/category-fetcher"
import { DashboardHeader } from "@/components/header"
import { DashboardShell } from "@/components/shell"

import { columns } from "./columns"
import { DataTable } from "./data-table"

export default async function CategoryPage() {
  const categoryList = await getCategory(6)

  console.log(categoryList)

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
