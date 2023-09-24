import React from "react"
import { Metadata } from "next"
import { redirect } from "next/navigation"

import { authOptions } from "@/lib/auth"
import { getCurrentUser } from "@/lib/session"
import { MotionDiv } from "@/components/framer-wrapper"
import { HeaderSubMenu } from "@/components/header-submenu"
import { ApproveCourseTabs } from "@/components/pagers/approve-course-tab"
import { BreadCrumbs } from "@/components/pagers/breadcrumb"
import { DashboardShell } from "@/components/shell"

export const metadata: Metadata = {
  title: "Approve Pelatihan",
  description:
    "Halaman untuk menyetujui pengetahuan yang diajukan oleh pemberi materi",
}

interface SupervisorApproveCourseProps {
  children: React.ReactNode
}

export default async function SupervisorApproveCourseLayout({
  children,
}: SupervisorApproveCourseProps) {
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
            href: "/supervisor-area/approval/approve-course",
            title: "Approve Pelatihan",
          },
        ]}
      />

      <MotionDiv initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <HeaderSubMenu
          title="Approval Pelatihan"
          description="
                    Disini anda dapat menyetujui pelatihan yang diajukan oleh pemberi materi
                  "
        />
      </MotionDiv>

      <div className="space-y-4 overflow-hidden">
        <ApproveCourseTabs />
        {children}
      </div>
    </DashboardShell>
  )
}
