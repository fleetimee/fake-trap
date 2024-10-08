import { Metadata } from "next"
import { redirect } from "next/navigation"
import { Shield } from "lucide-react"

import { authOptions } from "@/lib/auth"
import { getRole } from "@/lib/fetcher/role-fetcher"
import { getCurrentUser } from "@/lib/session"
import { extractToken } from "@/lib/utils"
import { AddUserForm } from "@/components/forms/add-users-form"
import { BreadCrumbs } from "@/components/pagers/breadcrumb"
import { DashboardShell } from "@/components/shell"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export const metadata: Metadata = {
  title: "Tambah User Baru",
  description: "Tambah User Baru",
}

export default async function OperatorLMSUsersPageNew() {
  const user = await getCurrentUser()

  const tokenExtracted = extractToken(user?.token)

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  const isAdministrator = tokenExtracted.role.some((role) => role.id_role === 6)

  const role = await getRole({ token: user?.token })

  return (
    <DashboardShell>
      <BreadCrumbs
        segments={[
          {
            href: "/operator-lms",
            title: "Dashboard",
          },
          {
            href: "/operator-lms/users",
            title: "Managemen User",
          },
          {
            href: "/operator-lms/users/new",
            title: "Tambah User Baru",
          },
        ]}
      />

      {!isAdministrator ? (
        <Alert variant="informative">
          <Shield className="size-4" />
          <AlertTitle>Perhatian!</AlertTitle>
          <AlertDescription>
            Anda tidak memiliki kewenangan untuk menambah user dengan role
            Operator LMS, Approval LMS, dan Administrator
          </AlertDescription>
        </Alert>
      ) : null}

      <Alert variant="destructive">
        <Shield className="size-4" />
        <AlertTitle>Perhatian!</AlertTitle>
        <AlertDescription>
          Demi keamanan, setelah menambahkan user baru, user tersebut akan
          dikirimkan password sementara ke email yang terdaftar.
        </AlertDescription>
      </Alert>

      <Card>
        <CardHeader className="space-y-1">
          <CardTitle className="text-xl">Tambah User Baru</CardTitle>
          <CardDescription>
            Tambahkan user baru untuk mengakses sistem
          </CardDescription>
        </CardHeader>

        <CardContent>
          <AddUserForm roleOptions={role.data} />
        </CardContent>
      </Card>
    </DashboardShell>
  )
}
