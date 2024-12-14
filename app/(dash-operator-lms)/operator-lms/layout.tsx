import { getOperatorApprovalRequests } from "@/lib/fetcher/approval-fetcher"
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

interface DashboardLayoutProps {
  children: React.ReactNode
}

export default async function OperatorLMSLayout({
  children,
}: DashboardLayoutProps) {
  const user = await getCurrentUser()

  const tokenExtracted = extractToken(user?.token)

  const menu = await getMenu({
    token: user?.token,
    idRole: "3",
  })

  const getRejectedCount = await getOperatorApprovalRequests({
    idRequester: tokenExtracted?.id,
    token: user?.token,
    limit: 9999,
    page: 1,
    status: "0053",
  })

  const rejectedCount =
    getRejectedCount.data.length > 0 ? getRejectedCount.data.length : 0

  const userLogged = await getLoggedOnUser({
    token: user?.token,
    uuid: tokenExtracted.id,
  })

  const userOrg = await getUserOrg({
    token: user?.token,
    email: tokenExtracted?.name,
  })

  const categoryNav = await getNavbar()

  const isUserHasMoreThanOneRole = tokenExtracted?.role.length > 1

  return (
    <div className="flex min-h-screen flex-col ">
      <SiteHeader
        user={user}
        displayName={userLogged.data.name}
        emailName={userLogged.data.email}
        isMoreThanOneRole={isUserHasMoreThanOneRole}
        sidebarNavItems={menu?.data}
        topNavItems={categoryNav.data}
        profilePicture={userLogged.data.profile_picture}
        userOrg={userOrg.data}
      />
      <div className="grow bg-background py-4">
        <div className="container grid flex-1 gap-12 md:grid-cols-[200px_1fr]">
          <aside className="hidden w-[200px] flex-col border-r md:flex">
            <DashboardNewNewNav
              org={userOrg.data}
              items={menu?.data}
              operatorLmsTrackerCount={rejectedCount}
            />
          </aside>
          <main className="flex w-full flex-1 flex-col overflow-auto">
            {children}
          </main>
        </div>
      </div>
      {/* </div> */}
      <SiteFooter className="border-t" />
      <ScrollToTopButton />
    </div>
  )
}
