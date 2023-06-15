import { DashboardHeader } from "@/components/header"
import { DashboardShell } from "@/components/shell"

export default function CategoryPage() {
  return (
    <DashboardShell>
      <DashboardHeader
        heading="Kategori"
        description="Kategori Pengetahuan yang tersedia"
      />
    </DashboardShell>
  )
}
