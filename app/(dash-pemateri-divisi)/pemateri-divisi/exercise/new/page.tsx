import { Metadata } from "next"
import { redirect } from "next/navigation"

import { authOptions } from "@/lib/auth"
import { getReference } from "@/lib/fetcher/reference-fetcher"
import { getCurrentUser } from "@/lib/session"
import { AddTestForm } from "@/components/forms/add-test-form"
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

export default async function PemateriDivisiExercisePageNew() {
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  const references = await getReference({
    refCode: "002",
    token: user?.token,
  })

  return (
    <DashboardShell>
      <BreadCrumbs
        segments={[
          {
            href: "/pemateri-divisi",
            title: "Dashboard",
          },
          {
            href: "/pemateri-divisi/exercise",
            title: "Test dan Latihan",
          },
          {
            href: "/pemateri-divisi/exercise/new",
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

        <CardContent>
          <AddTestForm
            references={references}
            baseUrl="/pemateri-divisi/exercise"
          />
        </CardContent>
      </Card>
    </DashboardShell>
  )
}
