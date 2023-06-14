import { Card } from "@/components/ui/card"
import { DashboardHeader } from "@/components/header"
import { DashboardShell } from "@/components/shell"

export default function DashboardPage() {
  return (
    <DashboardShell>
      <DashboardHeader
        heading="Welcome back, Jane"
        description="Here’s what’s happening with your projects today"
      />

      <Card className="flex-1">Hello</Card>
    </DashboardShell>
  )
}
