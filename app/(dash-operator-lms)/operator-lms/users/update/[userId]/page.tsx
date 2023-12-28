import { Metadata } from "next"
import { Shield } from "lucide-react"

import { getRole } from "@/lib/fetcher"
import { getOneUser } from "@/lib/fetcher/users-fetcher"
import { getCurrentUser } from "@/lib/session"
import { UpdateUserForm } from "@/components/forms/update-users-form"
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
  title: "Update User",
  description: "Update User",
}

interface OperatorLMSUsersPageUpdateProps {
  params: {
    userId: string
  }
}

export default async function OperatorLMSUsersPageUpdate({
  params,
}: OperatorLMSUsersPageUpdateProps) {
  const user = await getCurrentUser()

  const person = await getOneUser({
    token: user?.token,
    uuid: params.userId,
  })

  const role = await getRole({
    token: user?.token,
  })

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
            href: "/operator-lms/users/update",
            title: "Update User",
          },
        ]}
      />

      <Alert variant="destructive">
        <Shield className="h-4 w-4" />
        <AlertTitle>Perhatian!</AlertTitle>
        <AlertDescription>
          Demi keamanan, setelah menambahkan user baru, user tersebut akan
          dikirimkan password sementara ke email yang terdaftar.
        </AlertDescription>
      </Alert>

      <Card>
        <CardHeader className="space-y-1">
          <CardTitle className="text-xl">
            Update User: {""}
            <span className="font-semibold">{person?.data?.name}</span>
          </CardTitle>
          <CardDescription>
            Update User yang sudah dibuat sebelumnya
          </CardDescription>
        </CardHeader>

        <CardContent>
          <UpdateUserForm roleOptions={role.data} user={person.data} />
        </CardContent>
      </Card>
    </DashboardShell>
  )
}
