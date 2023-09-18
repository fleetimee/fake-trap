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
import { Variants } from "framer-motion"
import { PartyPopper } from "lucide-react"

import { authOptions } from "@/lib/auth"
import { getCurrentUser } from "@/lib/session"
import { convertDatetoString, extractToken } from "@/lib/utils"
import { MotionDiv } from "@/components/framer-wrapper"
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
        type: "spring",
        stiffness: 500,
        damping: 30,
        mass: 0.5,
        delay: 0.2,
      },
    },
  }

  return (
    <DashboardShell>
      <MotionDiv
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <DashboardHeader heading="Dashboard" description={dateNow} />
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
        className="grid grid-cols-2 gap-4 md:grid-cols-2 lg:grid-cols-4"
        variants={parentVariant}
        initial="initial"
        animate="animate"
      >
        <MotionDiv variants={childrenVariant} className="child">
          <DashboardUserCardCount token={user.token} />
        </MotionDiv>
        <MotionDiv variants={childrenVariant} className="child">
          <DashboardKnowledgeCardCount token={user.token} />
        </MotionDiv>
        <MotionDiv variants={childrenVariant} className="child">
          <DashboardCourseCardCount token={user.token} />
        </MotionDiv>
        <MotionDiv variants={childrenVariant} className="child">
          <DashboardCategoryCardCount token={user.token} />
        </MotionDiv>
      </MotionDiv>
      <MotionDiv
        className="flex flex-col items-center justify-between gap-6 md:grid lg:grid-cols-2"
        variants={parentVariant}
        initial="initial"
        animate="animate"
      >
        <MotionDiv className="child h-full" variants={childrenVariantTwo}>
          <DashboardKnowledgeHighlight token={user.token} />
        </MotionDiv>
        <MotionDiv className="child h-full" variants={childrenVariantTwo}>
          <DashboardCourseHighlight token={user.token} />
        </MotionDiv>
      </MotionDiv>
    </DashboardShell>
  )
}
