import { MenuListResNew } from "@/types/menu/res"
import { UserOneRes } from "@/types/user/res"
import { getCurrentUser } from "@/lib/session"
import { extractToken } from "@/lib/utils"
import { SiteFooter } from "@/components/layouts/site-footer"
import { SiteHeader } from "@/components/layouts/site-header"
import { DashboardNewNewNav } from "@/components/new-nav"

interface DashboardLayoutProps {
  children: React.ReactNode
}

interface GetUserProps {
  token: string | undefined
  uuid: string
}

async function getLoggedOnUser({
  token,
  uuid,
}: GetUserProps): Promise<UserOneRes> {
  let url = `${process.env.NEXT_PUBLIC_BASE_URL}/secure/users/${uuid}`

  const res = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    cache: "no-cache",
  })

  return res.json()
}

interface GetMenuProps {
  token: string | undefined
  idRole: string
}

async function getMenu({
  token,
  idRole,
}: GetMenuProps): Promise<MenuListResNew> {
  let url = `${process.env.NEXT_PUBLIC_BASE_URL}/secure/menu/role/${idRole}`

  const res = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    cache: "no-cache",
  })

  return res.json()
}

export default async function PemateriLayout({
  children,
}: DashboardLayoutProps) {
  const user = await getCurrentUser()

  const tokenExtracted = extractToken(user?.token)

  const menu = await getMenu({
    token: user?.token,
    idRole: "3", // '1' = 'Admin'
  })

  const userLogged = await getLoggedOnUser({
    token: user?.token,
    uuid: tokenExtracted.id,
  })

  console.log("userLogged", userLogged)

  const isUserHasMoreThanOneRole = tokenExtracted?.role.length > 1

  console.log("isUserHasMoreThanOneRole", isUserHasMoreThanOneRole)

  return (
    <div className="flex min-h-screen flex-col space-y-6 ">
      <SiteHeader
        user={user}
        displayName={userLogged.data.name}
        emailName={userLogged.data.email}
        isMoreThanOneRole={isUserHasMoreThanOneRole}
      />
      <div className="container grid flex-1 gap-12 md:grid-cols-[200px_1fr]">
        <aside className="hidden w-[200px] flex-col border-r md:flex">
          <DashboardNewNewNav items={menu?.data} />
        </aside>
        <main className="flex w-full flex-1 flex-col overflow-auto">
          {children}
        </main>
      </div>
      <SiteFooter className="border-t" />
    </div>
  )
}
