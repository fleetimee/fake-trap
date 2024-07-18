import { getLoggedOnUser } from "@/lib/fetcher/auth-fetcher"
import { getMenu } from "@/lib/fetcher/menu-fetcher"
import { getNavbar } from "@/lib/fetcher/navbar-fetcher"
import { getUserOrg } from "@/lib/fetcher/users-fetcher"
import { getCurrentUser } from "@/lib/session"
import { extractToken } from "@/lib/utils"
import { SiteFooter } from "@/components/layouts/site-footer"
import { SiteHeader } from "@/components/layouts/site-header"
import { DashboardNewNewNav } from "@/components/new-nav"
import { ScrollToTopButton } from "@/components/scroll-to-top"

interface AdministratorLayoutProps {
  children: React.ReactNode
}

export default async function AdministratorLayout({
  children,
}: AdministratorLayoutProps) {
  const user = await getCurrentUser()

  const tokenExtracted = extractToken(user?.token)

  const [menu, userLogged, userOrg, categoryNav] = await Promise.all([
    getMenu({
      token: user?.token,
      idRole: "6",
    }),
    getLoggedOnUser({
      token: user?.token,
      uuid: tokenExtracted.id,
    }),
    getUserOrg({
      token: user?.token,
      email: tokenExtracted?.email,
    }),
    getNavbar(),
  ])

  const isUserHasMoreThanOneRole = tokenExtracted?.role.length > 1

  return (
    <div className="flex min-h-screen flex-col ">
      <SiteHeader
        user={user}
        displayName={userLogged.data.name}
        emailName={userLogged.data.email}
        isMoreThanOneRole={isUserHasMoreThanOneRole}
        sidebarNavItems={menu?.data}
        topNavItems={categoryNav?.data}
        profilePicture={userLogged.data.profile_picture}
      />

      <div className="grow bg-background py-4">
        <div className="container grid flex-1 gap-12 md:grid-cols-[200px_1fr]">
          <aside className="hidden w-[200px] flex-col border-r md:flex">
            <DashboardNewNewNav org={userOrg.data} items={menu?.data} />
          </aside>
          <main className="flex w-full flex-1 flex-col overflow-auto">
            {children}
          </main>
        </div>
      </div>

      <SiteFooter className="border-t" />
      <ScrollToTopButton />
    </div>
  )
}
