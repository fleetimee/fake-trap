import { DashboardHeader } from "@/components/header"
import { DashboardShell } from "@/components/shell"

export default function QuizPage() {
  return (
    <DashboardShell>
      <DashboardHeader
        heading="Quiz"
        description="Quiz yang tersedia di e-learning"
      />
    </DashboardShell>
  )
}
