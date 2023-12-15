import React from "react"

import { UserOneRes } from "@/types/user/res"
import { getCurrentUser } from "@/lib/session"
import { extractToken } from "@/lib/utils"
import { SiteFooter } from "@/components/layouts/site-footer"
import { SiteHeader } from "@/components/layouts/site-header"

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

interface IntroLayoutProps {
  children: React.ReactNode
}

export default async function IntroLayout({ children }: IntroLayoutProps) {
  const user = await getCurrentUser()

  if (!user) {
    return (
      <div className="relative flex min-h-screen flex-col bg-background">
        <SiteHeader
          user={user}
          displayName="No"
          emailName="User"
          isMoreThanOneRole={false}
        />
        <main className="flex-1">{children}</main>
        <SiteFooter className="border-t" />
      </div>
    )
  }

  const tokenExtracted = extractToken(user?.token)

  const loggedOnUser = await getLoggedOnUser({
    token: user?.token,
    uuid: tokenExtracted.id,
  })

  const isMoreThanOneRole = tokenExtracted.role.some((role) => role.id_role > 1)

  return (
    <div className="relative flex min-h-screen flex-col bg-[url(/hero_bg.svg)] bg-cover lg:bg-bottom">
      <SiteHeader
        user={user}
        displayName={loggedOnUser?.data?.name}
        emailName={loggedOnUser?.data?.email}
        isMoreThanOneRole={isMoreThanOneRole}
      />
      <main className="flex-1">{children}</main>
      <SiteFooter className="border-t" />
    </div>
  )
}
