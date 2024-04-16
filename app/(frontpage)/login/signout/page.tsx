import { Metadata } from "next"
import { redirect } from "next/navigation"

import { authOptions } from "@/lib/auth"
import { getCurrentUser } from "@/lib/session"
import { LogOutButtons } from "@/components/auth/logout-buttons"
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header"
import { Shell } from "@/components/shell/lobby-shell"
import { BackgroundGradient } from "@/components/ui/background-gradient"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export const metadata: Metadata = {
  title: "Sign out",
  description: "Sign out from your account",
}

export default async function SignOutPage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  return (
    <Shell className="max-w-md">
      <BackgroundGradient className="rounded-[22px] bg-white p-1 dark:bg-zinc-900  md:min-w-[30rem]">
        <Card className=" md:min-w-[30rem]">
          <CardHeader className="space-y-1">
            <PageHeader
              id="sign-out-page-header"
              aria-labelledby="sign-out-page-header-heading"
              className="text-center"
            >
              <PageHeaderHeading size="sm">Keluar ?</PageHeaderHeading>
              <PageHeaderDescription size="sm">
                Apakah anda yakin ingin keluar?
              </PageHeaderDescription>
            </PageHeader>
          </CardHeader>
          <CardContent>
            <LogOutButtons />
          </CardContent>
        </Card>
      </BackgroundGradient>
    </Shell>
  )
}
