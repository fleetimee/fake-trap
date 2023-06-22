import { DashboardHeader } from "@/components/header"
import { DashboardShell } from "@/components/shell"

export const metadata = {
  title: "Kursus",
  description: "Kursus yang tersedia di e-learning",
}

export default function CoursePage() {
  return (
    <DashboardShell>
      <DashboardHeader
        heading="Kursus"
        description="Kursus yang tersedia di e-learning"
      />
    </DashboardShell>
  )
}
