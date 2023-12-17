import React from "react"
import { redirect } from "next/navigation"

import { authOptions } from "@/lib/auth"
import { getCurrentUser } from "@/lib/session"
import { MotionDiv } from "@/components/framer-wrapper"
import { DashboardHeader } from "@/components/header"
import { BreadCrumbs } from "@/components/pagers/breadcrumb"
import { DashboardShell } from "@/components/shell"
import { Separator } from "@/components/ui/separator"
import { SidebarNav } from "@/app/(dash-operator-lms)/operator-lms/setting/_components/setting_sidebar"

const sidebarNavItem = [
  {
    title: "Profil",
    href: "/supervisor-lms/setting",
  },
  {
    title: "Akun",
    href: "/supervisor-lms/setting/account",
  },
  {
    title: "Keamanan",
    href: "/supervisor-lms/setting/security",
  },
]

interface SupervisorLmsSettingLayoutProps {
  children: React.ReactNode
}

export default async function SupervisorLmsSettingLayout({
  children,
}: SupervisorLmsSettingLayoutProps) {
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  return (
    <DashboardShell>
      <BreadCrumbs
        segments={[
          {
            href: "/supervisor-lms",
            title: "Dashboard",
          },
          {
            href: "/supervisor-lms/setting",
            title: "Pengaturan",
          },
        ]}
      />

      <div className="grid grid-cols-1 items-center justify-between gap-4 xl:grid-cols-2">
        <MotionDiv
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <DashboardHeader
            heading="Setting"
            description="Pengaturan Akun Supervisor LMS"
          />
        </MotionDiv>
      </div>

      <Separator />

      <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
        <aside className=" lg:w-1/5">
          <SidebarNav items={sidebarNavItem} />
        </aside>
        <div className="flex-1 lg:max-w-2xl">{children}</div>
      </div>
    </DashboardShell>
  )
}
