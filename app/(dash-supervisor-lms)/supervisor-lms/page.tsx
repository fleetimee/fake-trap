import { Metadata } from "next"
import Link from "next/link"
import { redirect } from "next/navigation"
import { PartyPopper } from "lucide-react"

import { authOptions } from "@/lib/auth"
import { getSupervisorLmsCount } from "@/lib/fetcher/approval-fetcher"
import { getLoggedOnUser } from "@/lib/fetcher/auth-fetcher"
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
}

export default async function SupervisorLmsProfilePage() {
  const user = await getCurrentUser()

  const tokenExtracted = extractToken(user?.token)

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  const loggedOnUser = await getLoggedOnUser({
    token: user?.token,
    uuid: tokenExtracted?.id,
  })

  // Fetch supervisor LMS Count
  const approvalCount = await getSupervisorLmsCount({
    token: user?.token,
    userUuid: tokenExtracted?.id,
  })

  return (
    <DashboardShell>
      <BreadCrumbs
        segments={[
          {
            href: "/supervisor-lms",
            title: "Dashboard",
          },
        ]}
      />

      <DashboardHeader heading="Supervisor LMS" description={dateNow} />

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

      <div
        className="grid grid-cols-1 gap-4"
        style={{ gridTemplateRows: "auto 1fr" }}
      >
        <div className=" grid grid-cols-2 gap-4 xl:grid-cols-4">
          {approvalCount.data.map((item, index) => {
            return (
              <Link
                href={`supervisor-pemateri-divisi/approval?page=1&status_text=${item.status_code}`}
              >
                <Widget
                  key={index}
                  icon={
                    item.status === "approved" ? (
                      <Icons.mailCheck className="text-blue-500" />
                    ) : item.status === "pending" ? (
                      <Icons.mailQuestion className="text-green-500" />
                    ) : (
                      <Icons.mailX className="text-red-500" />
                    )
                  }
                  title={
                    item.status === "approved"
                      ? "Approved"
                      : item.status === "pending"
                        ? "Pending"
                        : "Rejected"
                  }
                  subtitle={item.count.toString()}
                />
              </Link>
            )
          })}
        </div>
      </div>
    </DashboardShell>
  )
}
