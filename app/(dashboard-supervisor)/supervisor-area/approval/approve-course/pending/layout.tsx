import React from "react"

import { MotionDiv } from "@/components/framer-wrapper"
import { Icons } from "@/components/icons"
import { DashboardShell } from "@/components/shell"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

interface SupervisorPendingCourseLayoutProps {
  children: React.ReactNode
}

export default function SupervisorPendingCourseLayout({
  children,
}: SupervisorPendingCourseLayoutProps) {
  return (
    <DashboardShell>
      <Alert>
        <Icons.pending className="h-4 w-4 text-yellow-400" />
        <AlertTitle>Pending Pelatihan</AlertTitle>
        <AlertDescription>
          Berikut adalah daftar pelatihan yang belum di approve, tugas anda
          adalah menyetujui atau menolak pelatihan tersebut.
        </AlertDescription>
      </Alert>

      {children}
    </DashboardShell>
  )
}
