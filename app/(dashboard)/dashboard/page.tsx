import { DashboardHeader } from "@/components/header"
import { DashboardShell } from "@/components/shell"

export default async function DashboardPage() {
  return (
    <DashboardShell>
      <DashboardHeader
        heading="Dashboard"
        description="Selamat datang di e-learning"
      />
    </DashboardShell>
  )
}
