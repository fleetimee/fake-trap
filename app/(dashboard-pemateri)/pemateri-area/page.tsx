import { Metadata } from "next"
import { redirect } from "next/navigation"
import { Variants } from "framer-motion"
import { PartyPopper } from "lucide-react"

import { pemateriAreaRole, supervisorAreaRole } from "@/config/dashboard"
import { authOptions } from "@/lib/auth"
import { getCurrentUser } from "@/lib/session"
import { convertDatetoString, extractToken } from "@/lib/utils"
import { DashboardInformation } from "@/components/dashboard-information"
import { MotionDiv } from "@/components/framer-wrapper"
import { DashboardHeader } from "@/components/header"
import { DashboardShell } from "@/components/shell"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export const metadata: Metadata = {
  title: "Admin Area",
  description: "Admin Area",
}

const parentVariant: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { staggerChildren: 0.2 } },
}

const childrenVariant: Variants = {
  initial: { opacity: 0, x: 50 },
  animate: { opacity: 1, x: 0 },
}
const childrenVariantTwo: Variants = {
  initial: { opacity: 0, y: 50, scale: 0.5 },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
}

export default async function PemateriAreaPage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions?.pages?.signIn || "login")
  }

  const dateNow = convertDatetoString(new Date().toString())

  const getDayWithText = new Date().toLocaleString("en", {
    weekday: "long",
  })

  const userExtracted = extractToken(user.token)

  return (
    <DashboardShell>
      <MotionDiv
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <DashboardHeader heading="Admin Area" description={dateNow} />
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
              {userExtracted.username}
            </span>
          </AlertTitle>
          <AlertDescription>
            Have a Nice{" "}
            <span className="font-heading uppercase">{getDayWithText}</span> !
          </AlertDescription>
        </Alert>
      </MotionDiv>

      <MotionDiv
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <DashboardInformation
          roleName={pemateriAreaRole.roleName}
          roleDescription={pemateriAreaRole.roleDescription}
          features={pemateriAreaRole.features}
        />
      </MotionDiv>
    </DashboardShell>
  )
}
