import { Metadata } from "next"
import { redirect } from "next/navigation"
import { PartyPopper } from "lucide-react"

import { authOptions } from "@/lib/auth"
import { getLoggedOnUser } from "@/lib/fetcher/auth-fetcher"
import { getCurrentUser } from "@/lib/session"
import { dateNow, extractToken, getDayWithText } from "@/lib/utils"
import { DashboardHeader } from "@/components/header"
import { BreadCrumbs } from "@/components/pagers/breadcrumb"
import { DashboardShell } from "@/components/shell"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Administrator Dashboard",
}

export default async function AdministratorDashboard() {
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
            href: "/administrator",
            title: "Dashboard",
          },
        ]}
      />

      <DashboardHeader heading="Administrator" description={dateNow} />

      <Alert>
        <PartyPopper className="size-5" />
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
    </DashboardShell>
  )
}
