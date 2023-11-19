import { Metadata } from "next"
import { redirect } from "next/navigation"

import { authOptions } from "@/lib/auth"
import { getCurrentUser } from "@/lib/session"
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
  title: "Tambah Test dan Latihan",
  description: "Tambah Test dan Latihan",
}

export default async function OperatorLMSExercisePageNew() {
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  return (
    <DashboardShell>
      <BreadCrumbs
        segments={[
          {
            href: "/operator-lms",
            title: "Dashboard",
          },
          {
            href: "/operator-lms/exercise",
            title: "Test dan Latihan",
          },
          {
            href: "/operator-lms/exercise/new",
            title: "Tambah Test dan Latihan",
          },
        ]}
      />

      <Card>
        <CardHeader className="space-y-1">
          <CardTitle className="text-xl">Tambah Test dan Latihan</CardTitle>
          <CardDescription>
            Buat Pre Test, Post Test, dan Latihan untuk peserta Anda.
          </CardDescription>
        </CardHeader>

        <CardContent></CardContent>
      </Card>
    </DashboardShell>
  )
}
