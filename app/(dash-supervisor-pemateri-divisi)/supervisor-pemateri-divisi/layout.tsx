import { getLoggedOnUser } from "@/lib/fetcher/auth-fetcher"
import { getMenu } from "@/lib/fetcher/menu-fetcher"
import { getUserOrg } from "@/lib/fetcher/users-fetcher"
import { getCurrentUser } from "@/lib/session"
import { extractToken } from "@/lib/utils"
import { SiteFooter } from "@/components/layouts/site-footer"
import { SiteHeader } from "@/components/layouts/site-header"
import { DashboardNewNewNav } from "@/components/new-nav"

interface DashboardLayoutProps {
  children: React.ReactNode
}

export default async function SupervisorPemateriDivisiLayout({
  children,
}: DashboardLayoutProps) {
  const user = await getCurrentUser()

  const tokenExtracted = extractToken(user?.token)

  const menu = await getMenu({
    token: user?.token,
    idRole: "2",
  })

  const userLogged = await getLoggedOnUser({
    token: user?.token,
    uuid: tokenExtracted.id,
  })

  const userOrg = await getUserOrg({
    token: user?.token,
    email: tokenExtracted.email,
  })

  const isUserHasMoreThanOneRole = tokenExtracted?.role.length > 1

  return (
    <div className="flex min-h-screen flex-col  ">
      <SiteHeader
        user={user}
        displayName={userLogged.data.name}
        emailName={userLogged.data.email}
        isMoreThanOneRole={isUserHasMoreThanOneRole}
        sidebarNavItems={menu?.data}
      />
      <div className="bg-[url(/bg_main.svg)] bg-cover bg-top bg-no-repeat  py-4 dark:bg-none md:bg-left lg:min-h-[100svh]">
        <div className="container grid flex-1 gap-12 md:grid-cols-[200px_1fr]">
          <aside className="hidden w-[200px] flex-col border-r md:flex">
            <DashboardNewNewNav items={menu?.data} org={userOrg.data} />
          </aside>
          <main className="flex w-full flex-1 flex-col overflow-auto">
            {children}
          </main>
        </div>
      </div>
      <SiteFooter className="border-t" />
    </div>
  )
}
