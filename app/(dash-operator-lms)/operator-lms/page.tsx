import { Metadata } from "next"
import { redirect } from "next/navigation"
import { Variants } from "framer-motion"
import { PartyPopper } from "lucide-react"

import { authOptions } from "@/lib/auth"
import { getLoggedOnUser } from "@/lib/fetcher"
import { getCurrentUser } from "@/lib/session"
import { dateNow, extractToken, getDayWithText } from "@/lib/utils"
import { MotionDiv } from "@/components/framer-wrapper"
import { DashboardHeader } from "@/components/header"
import { BreadCrumbs } from "@/components/pagers/breadcrumb"
import { DashboardShell } from "@/components/shell"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"





export const metadata: Metadata = {
  title: "Dashboard",
  description: "Operator LMS Dashboard Page",
}

const parentVariant: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { staggerChildren: 0.2 } },
}

const childrenVariant: Variants = {
  initial: { opacity: 0, x: 50 },
  animate: { opacity: 1, x: 0 },
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
      </MotionDiv>
    </DashboardShell>
  )
}
