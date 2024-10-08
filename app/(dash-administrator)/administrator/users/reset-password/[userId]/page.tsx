import { Metadata } from "next"

import { getOneUser } from "@/lib/fetcher/users-fetcher"
import { getCurrentUser } from "@/lib/session"
import { ResetPasswordOperatorForm } from "@/components/forms/reset-password-operator-form"
import { BreadCrumbs } from "@/components/pagers/breadcrumb"
import { DashboardShell } from "@/components/shell"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export const metadata: Metadata = {
  title: "Reset Password",
  description: "Reset Password",
}

interface AdminsUsersResetPasswordPageProps {
  params: {
    userId: string
  }
}

export default async function AdminUsersResetPasswordPage({
  params,
}: AdminsUsersResetPasswordPageProps) {
  const user = await getCurrentUser()

  const person = await getOneUser({
    uuid: params.userId,
    token: user?.token,
  })

  return (
    <DashboardShell>
      <BreadCrumbs
        segments={[
          {
            href: "/administrator",
            title: "Dashboard",
          },
          {
            href: "/administrator/users",
            title: "Managemen User",
          },
          {
            href: "/administrator/users/reset-password",
            title: "Reset Password",
          },
        ]}
      />

      <Card>
        <CardHeader className="space-y-1">
          <CardTitle className="text-xl">Reset Password</CardTitle>
          <CardDescription>
            Reset password untuk user{" "}
            <span className="font-semibold uppercase">
              {person?.data?.name}
            </span>
          </CardDescription>
        </CardHeader>

        <CardContent>
          <ResetPasswordOperatorForm person={person?.data} />
        </CardContent>
      </Card>
    </DashboardShell>
  )
}
