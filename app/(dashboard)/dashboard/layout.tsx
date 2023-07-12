"use client"

import { dashboardConfig } from "@/config/dashboard"
import { SiteFooter } from "@/components/layouts/site-footer"
import { MainNav } from "@/components/main-nav"
import { DashboardNav } from "@/components/nav"
import UserAccountNav from "@/components/user-account-nav"

interface DashboardLayoutProps {
  children: React.ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col space-y-6 ">
      <header className="sticky top-0 z-40 border-b bg-background">
        <div className="container flex h-16 items-center justify-between py-4">
          <MainNav items={dashboardConfig.mainNav} />
          <UserAccountNav
            user={{
              name: "User",
              image: "https://avatars.githubusercontent.com/u/45744788?v=4",
              email: "zane.227@gmail.com",
            }}
          />
        </div>
      </header>
      <div className="container grid flex-1 gap-12 md:grid-cols-[200px_1fr]">
        <aside className="hidden w-[200px] flex-col md:flex">
          <DashboardNav items={dashboardConfig.sidebarNav} />
        </aside>
        <main className="flex w-full flex-1 flex-col overflow-hidden">
          {children}
        </main>
      </div>
      <SiteFooter className="border-t" />
    </div>
  )
}
