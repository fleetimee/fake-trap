import { Metadata } from "next"
import { redirect } from "next/navigation"
import { PartyPopper } from "lucide-react"

import { authOptions } from "@/lib/auth"
import { getLoggedOnUser } from "@/lib/fetcher/auth-fetcher"
import { getGlobalCount } from "@/lib/fetcher/menu-fetcher"
import { getCurrentUser } from "@/lib/session"
import { dateNow, extractToken, getDayWithText } from "@/lib/utils"
import { MotionDiv } from "@/components/framer-wrapper"
import { DashboardHeader } from "@/components/header"
import { Icons } from "@/components/icons"
import { BreadCrumbs } from "@/components/pagers/breadcrumb"
import { DashboardShell } from "@/components/shell"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Widget } from "@/components/widget"

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Operator LMS Dashboard Page",
}
export default async function OperatorLMSDashboard() {
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  const tokenExtracted = extractToken(user?.token)

  const loggedOnUser = await getLoggedOnUser({
    token: user?.token,
    uuid: tokenExtracted.id,
  })

  const globalCount = await getGlobalCount({
    token: user?.token,
  })

  return (
    <DashboardShell>
      <BreadCrumbs
        segments={[
          {
            href: "/operator-lms",
            title: "Dashboard",
          },
        ]}
      />

      <MotionDiv
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <DashboardHeader heading="Operator LMS" description={dateNow} />
      </MotionDiv>

      <MotionDiv
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
      >
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
      </MotionDiv>

      <div
        className="grid grid-cols-2 gap-4 xl:grid-cols-4"
        style={{ marginTop: "1rem" }}
      >
        <Widget
          icon={<Icons.knowledge className="text-green-500" />}
          title="Pengetahuan"
          subtitle={globalCount.data?.knowledge_count.toString()}
        />

        <Widget
          icon={<Icons.category className="text-blue-500" />}
          title="Kategori"
          subtitle={globalCount.data?.category_count.toString()}
        />

        <Widget
          icon={<Icons.quiz className="text-yellow-500" />}
          title="Test dan Latihan"
          subtitle={globalCount.data?.quiz_count.toString()}
        />

        <Widget
          icon={<Icons.course className="text-red-500" />}
          title="Pelatihan"
          subtitle={globalCount.data?.course_count.toString()}
        />
      </div>
    </DashboardShell>
  )
}
