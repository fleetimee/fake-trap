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
      <div className="flex items-center justify-center rounded-md bg-white">
        <Card className="w-full border-4 border-blue-950 bg-blue-50 shadow-[8px_8px_0px_0px_rgba(15,23,42,1)] transition-all hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-[5px_5px_0px_0px_rgba(15,23,42,1)] md:min-w-[30rem]">
          <CardHeader className="space-y-1">
            <PageHeader
              id="sign-out-page-header"
              aria-labelledby="sign-out-page-header-heading"
              className="text-center"
            >
              <PageHeaderHeading
                size="sm"
                className="text-3xl font-black text-blue-950"
              >
                Keluar ?
              </PageHeaderHeading>
              <PageHeaderDescription
                size="sm"
                className="font-medium text-blue-800"
              >
                Apakah anda yakin ingin keluar?
              </PageHeaderDescription>
            </PageHeader>
          </CardHeader>
          <CardContent>
            <LogOutButtons />
          </CardContent>
        </Card>
      </div>
    </Shell>
  )
}
