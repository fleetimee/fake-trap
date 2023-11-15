import { MotionDiv } from "@/components/framer-wrapper"
import { DashboardHeader } from "@/components/header"
import { DashboardShell } from "@/components/shell"

export function OperatorLMSInterface() {
  return (
    <DashboardShell>
      <MotionDiv
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <DashboardHeader
          heading="Operator LMS"
          description="Selamat datang di Operator LMS"
        />
      </MotionDiv>
    </DashboardShell>
  )
}
