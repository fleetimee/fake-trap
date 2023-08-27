import { redirect } from "next/navigation"
import {
  DashboardCategoryCardCount,
  DashboardCourseCardCount,
  DashboardKnowledgeCardCount,
  DashboardUserCardCount,
} from "components/app/dashboard/ui/cards"
import {
  DashboardCourseHighlight,
  DashboardKnowledgeHighlight,
} from "components/app/dashboard/ui/highlight"

import { authOptions } from "@/lib/auth"
import { getCurrentUser } from "@/lib/session"
import { DashboardHeader } from "@/components/header"
import { DashboardShell } from "@/components/shell"

export const metadata = {
  title: "Dashboard",
}

export default async function DashboardPage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Dashboard"
        description="Selamat datang di e-learning"
      />
      <div className="grid grid-cols-2 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <DashboardUserCardCount token={user.token} />
        <DashboardKnowledgeCardCount token={user.token} />
        <DashboardCourseCardCount token={user.token} />
        <DashboardCategoryCardCount token={user.token} />
      </div>
      <div className="flex flex-col items-center justify-between gap-6 md:grid lg:grid-cols-2">
        <div className="h-full">
          <DashboardKnowledgeHighlight token={user.token} />
        </div>
        <div className="h-full">
          <DashboardCourseHighlight token={user.token} />
        </div>
      </div>
    </DashboardShell>
  )
}
