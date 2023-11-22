import { redirect } from "next/navigation"

import { authOptions } from "@/lib/auth"
import { getCurrentUser } from "@/lib/session"
import { MotionDiv } from "@/components/framer-wrapper"
import { DashboardHeader } from "@/components/header"
import { BreadCrumbs } from "@/components/pagers/breadcrumb"
import { DashboardShell } from "@/components/shell"
import { Separator } from "@/components/ui/separator"

import { SidebarNav } from "./_components/setting_sidebar"

const sidebarNavItem = [
  {
    title: "Profil",
    href: "/operator-lms/setting/profile",
  },
  {
    title: "Akun",
    href: "/operator-lms/setting/account",
  },
]

interface OperatorLMSSettingLayoutProps {
  children: React.ReactNode
}

export default async function OperatorLMSSettingLayout({
  children,
}: OperatorLMSSettingLayoutProps) {
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  return (
    <DashboardShell>
      <BreadCrumbs
        segments={[
          {
            href: "/operator-lms",
            title: "Dashboard",
          },

          {
            href: "/operator-lms/setting",
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
            description="Pengaturan Akun Operator LMS"
          />
        </MotionDiv>
      </div>

      <Separator />

      <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
        <aside className="-mx-4 lg:w-1/5">
          <SidebarNav items={sidebarNavItem} />
        </aside>
        <div className="flex-1 lg:max-w-2xl">{children}</div>
      </div>
    </DashboardShell>
  )
}
