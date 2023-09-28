import React from "react"
import { Metadata } from "next"
import { redirect } from "next/navigation"

import { authOptions } from "@/lib/auth"
import { getCurrentUser } from "@/lib/session"
import { MotionDiv } from "@/components/framer-wrapper"
import { HeaderSubMenu } from "@/components/header-submenu"
import { ApproveKnowledgeTabs } from "@/components/pagers/approve-knowledge-tab"
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
          {
            href: "/supervisor-area/approval",
            title: "Approval",
          },
          {
            href: "/supervisor-area/approval/approve-knowledge",
            title: "Approve Pengetahuan",
          },
        ]}
      />

      <MotionDiv>
        <HeaderSubMenu
          title="Approval Pengetahuan"
          description="Disini anda dapat menyetujui pengetahuan yang diajukan oleh pemberi materi"
        />
      </MotionDiv>

      <div className="space-y-4 overflow-auto">
        <ApproveKnowledgeTabs />
        {children}
      </div>
    </DashboardShell>
  )
}
