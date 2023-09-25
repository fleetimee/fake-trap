import React from "react"
import { Metadata } from "next"
import { redirect } from "next/navigation"

import { authOptions } from "@/lib/auth"
import { getCurrentUser } from "@/lib/session"
import { BreadCrumbs } from "@/components/pagers/breadcrumb"
import { DashboardShell } from "@/components/shell"

export const metadata: Metadata = {
  title: "Approve Pengetahuan",
  description:
    "Halaman untuk menyetujui pengetahuan yang diajukan oleh pemberi materi",
}

interface SupervisorApproveKnowledgeProps {
  children: React.ReactNode
}

export default async function SupervisorApproveKnowledge({
  children,
}: SupervisorApproveKnowledgeProps) {
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  return (
    <DashboardShell>
      <BreadCrumbs
        segments={[
          {
            href: "/supervisor-area",
            title: "Supervisor Area",
          },
        ]}
      />
    </DashboardShell>
  )
}
