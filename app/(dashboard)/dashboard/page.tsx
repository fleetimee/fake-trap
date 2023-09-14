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
import { PartyPopper } from "lucide-react"

import { authOptions } from "@/lib/auth"
import { getCurrentUser } from "@/lib/session"
import { convertDatetoString, extractToken } from "@/lib/utils"
import { DashboardHeader } from "@/components/header"
import { DashboardShell } from "@/components/shell"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export const metadata = {
  title: "Dashboard",
}

export default async function DashboardPage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  const dateNow = convertDatetoString(new Date().toString())

  const getDay = new Date().getDay()

  const getDayWithText = new Date().toLocaleString("en", {
    weekday: "long",
  })

  const userExtracted = extractToken(user.token)

  return (
    <DashboardShell>
      <DashboardHeader heading="Dashboard" description={dateNow} />
      <Alert>
        <PartyPopper className="h-5 w-5" />
        <AlertTitle>
          Halo,{" "}
          <span className="font-heading uppercase text-primary">
            {userExtracted.username}
          </span>
        </AlertTitle>
        <AlertDescription>
          Have a Nice{" "}
          <span className="font-heading uppercase">{getDayWithText}</span> !
        </AlertDescription>
      </Alert>
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
