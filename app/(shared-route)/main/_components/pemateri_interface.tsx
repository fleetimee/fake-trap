import { Variants } from "framer-motion"
import { PartyPopper } from "lucide-react"

import { adminAreaRole } from "@/config/dashboard"
import {
  DashboardCategoryCardCount,
  DashboardCourseCardCount,
  DashboardKnowledgeCardCount,
  DashboardUserCardCount,
} from "@/components/app/dashboard/ui/cards"
import {
  DashboardCourseHighlight,
  DashboardKnowledgeHighlight,
} from "@/components/app/dashboard/ui/highlight"
import { DashboardInformation } from "@/components/dashboard-information"
import { MotionDiv } from "@/components/framer-wrapper"
import { DashboardHeader } from "@/components/header"
import { DashboardShell } from "@/components/shell"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"





interface PemateriInterfaceProps {
  dateNow: string
  username: string
  getDayWithText: string
  parentVariant: Variants
  childrenVariant: Variants
  token: string
}

export function PemateriInterface({
  dateNow,
  username,
  getDayWithText,
  parentVariant,
  childrenVariant,
  token,
}: PemateriInterfaceProps) {
  return (
    <DashboardShell>
      <MotionDiv
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <DashboardHeader heading="Pemateri" description={dateNow} />
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
              {username}
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
          roleName={adminAreaRole.roleName}
          roleDescription={adminAreaRole.roleDescription}
          features={adminAreaRole.features}
        />
      </MotionDiv>

      <MotionDiv
        className="grid grid-cols-2 gap-4 md:grid-cols-2 lg:grid-cols-4"
        variants={parentVariant}
        initial="initial"
        animate="animate"
      >
        <MotionDiv variants={childrenVariant} className="child">
          <DashboardUserCardCount token={token} />
        </MotionDiv>
        <MotionDiv variants={childrenVariant} className="child">
          <DashboardKnowledgeCardCount token={token} />
        </MotionDiv>
        <MotionDiv variants={childrenVariant} className="child">
          <DashboardCourseCardCount token={token} />
        </MotionDiv>
        <MotionDiv variants={childrenVariant} className="child">
          <DashboardCategoryCardCount token={token} />
        </MotionDiv>
      </MotionDiv>

      <MotionDiv
        className="flex flex-col items-center justify-between gap-6 md:grid lg:grid-cols-2"
        variants={parentVariant}
        initial="initial"
        animate="animate"
      >
        <MotionDiv className="child h-full" variants={parentVariant}>
          <DashboardKnowledgeHighlight token={token} />
        </MotionDiv>
        <MotionDiv className="child h-full" variants={parentVariant}>
          <DashboardCourseHighlight token={token} />
        </MotionDiv>
      </MotionDiv>
    </DashboardShell>
  )
}
