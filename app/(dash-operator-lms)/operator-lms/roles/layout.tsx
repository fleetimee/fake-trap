import { Metadata } from "next"
import { redirect } from "next/navigation"

import { authOptions } from "@/lib/auth"
import { getRole } from "@/lib/fetcher/role-fetcher"
import { getCurrentUser } from "@/lib/session"
import { MotionDiv } from "@/components/framer-wrapper"
import { DashboardHeader } from "@/components/header"
import { BreadCrumbs } from "@/components/pagers/breadcrumb"
import { DashboardShell } from "@/components/shell"
import { Separator } from "@/components/ui/separator"

import { SidebarNavRole } from "../setting/_components/setting_sidebar"

export const metadata: Metadata = {
  title: "Managemen Kewenangan",
  description: "Managemen Kewenangan",
}

interface OperatorLMSRoleLayoutProps {
  children: React.ReactNode
}

export default async function OperatorLMSRoleLayout({
  children,
}: OperatorLMSRoleLayoutProps) {
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  const roles = await getRole({
    token: user?.token,
  })

  return (
    <DashboardShell>
      <BreadCrumbs
        segments={[
          {
            href: "/operator-lms",
            title: "Dashboard",
          },
          {
            href: "/operator-lms/roles",
            title: "Managemen Kewenangan",
          },
        ]}
      />

      <div className="grid grid-cols-1 items-center justify-between gap-4 xl:grid-cols-2">
        <MotionDiv
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <DashboardHeader
            heading="Kewenangan"
            description="Pengaturan kewenangan untuk user yang menggunakan aplikasi"
          />
        </MotionDiv>
      </div>

      <Separator />

      <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
        <aside className=" lg:w-1/5">
          <SidebarNavRole items={roles.data} />
        </aside>
        <div className="flex-1 lg:max-w-2xl">{children}</div>
      </div>
    </DashboardShell>
  )
}
