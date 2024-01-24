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
      <PageHeader
        id="sign-out-page-header"
        aria-labelledby="sign-out-page-header-heading"
        className="text-center"
      >
        <PageHeaderHeading size="sm">Sign out</PageHeaderHeading>
        <PageHeaderDescription size="sm">
          Apakah anda yakin ingin keluar?
        </PageHeaderDescription>
      </PageHeader>

      <LogOutButtons />
    </Shell>
  )
}
