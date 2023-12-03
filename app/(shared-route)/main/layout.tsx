import { getCurrentUser } from "@/lib/session"
import { extractToken } from "@/lib/utils"
import { SiteFooter } from "@/components/layouts/site-footer"
import { SiteHeader } from "@/components/layouts/site-header"
import { DashboardNavNew } from "@/components/shared-nav"





interface DashboardLayoutProps {
  children: React.ReactNode
}

interface GetMenuProps {
  token: string | undefined
  groupId: string
  limit: number
  page: number
}

async function getMenu({ token, groupId, limit, page }: GetMenuProps) {
  let url = `${process.env.NEXT_PUBLIC_BASE_URL}/secure/menu/${groupId}/?&limit=${limit}&page=${page}`

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

export default async function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  const user = await getCurrentUser()

  const tokenExtracted = extractToken(user?.token)

  const menu = await getMenu({
    token: user?.token,
    groupId: tokenExtracted.group.toString(), // '1' = 'Admin'
    limit: 100,
    page: 1,
  })

  return (
    <div className="flex min-h-screen flex-col space-y-6 ">
      <SiteHeader user={user} />
      <div className="container grid flex-1 gap-12 md:grid-cols-[200px_1fr]">
        <aside className="hidden w-[200px] flex-col md:flex">
          <DashboardNavNew items={menu?.data} />
        </aside>
        <main className="flex w-full flex-1 flex-col overflow-auto">
          {children}
        </main>
      </div>
      <SiteFooter className="border-t" />
    </div>
  )
}
