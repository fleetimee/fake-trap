import { Metadata } from "next"
import { redirect } from "next/navigation"
import { PartyPopper } from "lucide-react"

import { authOptions } from "@/lib/auth"
import { getLoggedOnUser } from "@/lib/fetcher/auth-fetcher"
import { getCurrentUser } from "@/lib/session"
import { dateNow, extractToken, getDayWithText } from "@/lib/utils"
import { DashboardCourseHighlight } from "@/components/app/dashboard/ui/highlight"
import { DashboardKnowledgeHighlight } from "@/components/app/dashboard/ui/highlight/knowledge-highlight"
import { MotionDiv } from "@/components/framer-wrapper"
import { DashboardHeader } from "@/components/header"
import { BreadCrumbs } from "@/components/pagers/breadcrumb"
import { DashboardShell } from "@/components/shell"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export const metadata: Metadata = {
  title: "Dashboard",
}

export default async function PemateriDivisiDashboardPage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  const tokenExtracted = extractToken(user?.token)

  const loggedOnUser = await getLoggedOnUser({
    token: user?.token,
    uuid: tokenExtracted.id,
  })

  return (
    <DashboardShell>
      <BreadCrumbs
        segments={[
          {
            href: "/pemateri-divisi",
            title: "Dashboard",
          },
        ]}
      />

      <DashboardHeader heading="Pemateri Divisi" description={dateNow} />

      <Alert>
        <PartyPopper className="h-5 w-5" />
        <AlertTitle>
          Halo,{" "}
          <span className="font-heading uppercase text-primary">
            {loggedOnUser.data?.name}
          </span>
        </AlertTitle>
        <AlertDescription>
          Have a Nice{" "}
          <span className="font-heading uppercase">{getDayWithText}</span> !
        </AlertDescription>
      </Alert>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        <DashboardKnowledgeHighlight
          token={user?.token}
          userUuid={tokenExtracted.id}
          baseUrl="/pemateri-divisi/knowledge/detail"
        />
      </div>
    </DashboardShell>
  )
}
