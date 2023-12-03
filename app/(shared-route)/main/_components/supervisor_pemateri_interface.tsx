import { MotionDiv } from "@/components/framer-wrapper"
import { DashboardHeader } from "@/components/header"
import { DashboardShell } from "@/components/shell"





export function SupervisorPemateriInterface() {
  return (
    <DashboardShell>
      <MotionDiv
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <DashboardHeader
          heading="Supervisor Pemateri"
          description="Selamat datang di Supervisor Pemateri"
        />
      </MotionDiv>
    </DashboardShell>
  )
}
