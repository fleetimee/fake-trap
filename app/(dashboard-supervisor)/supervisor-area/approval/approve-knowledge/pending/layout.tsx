import { MotionDiv } from "@/components/framer-wrapper"
import { Icons } from "@/components/icons"
import { DashboardShell } from "@/components/shell"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

interface SupervisorPendingKnowledgeLayoutProps {
  children: React.ReactNode
}

export default function SupervisorPendingKnowledgeLayout({
  children,
}: SupervisorPendingKnowledgeLayoutProps) {
  return (
    <DashboardShell>
      <MotionDiv initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <Alert>
          <Icons.pending className="h-4 w-4 text-yellow-400" />
          <AlertTitle>Pending Pengetahuan</AlertTitle>
          <AlertDescription>
            Berikut adalah daftar pengetahuan yang belum di approve, tugas anda
            adalah menyetujui atau menolak pengetahuan tersebut.
          </AlertDescription>
        </Alert>
      </MotionDiv>

      {children}
    </DashboardShell>
  )
}
