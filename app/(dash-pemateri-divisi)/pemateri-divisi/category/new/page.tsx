import { Metadata } from "next"
import { notFound, redirect } from "next/navigation"

import { authOptions } from "@/lib/auth"
import { getRule } from "@/lib/fetcher/rule-fetcher"
import { getCurrentUser } from "@/lib/session"
import { AddCategoryForm } from "@/components/forms/add-category-form"
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
  title: "Tambah Modul",
  description: "Tambah Modul baru",
}

export default async function PemateriDivisiCategoryPageNew() {
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  const rule = await getRule({
    token: user?.token,
    idRole: "1",
  })

  if (!rule.data.can_write_knowledge) {
    return notFound()
  }

  return (
    <DashboardShell>
      <BreadCrumbs
        segments={[
          {
            href: "/pemateri-divisi",
            title: "Dashboard",
          },
          {
            href: "/pemateri-divisi/category",
            title: "Modul",
          },
          {
            href: "/pemateri-divisi/category/new",
            title: "Tambah Modul",
          },
        ]}
      />

      <Card>
        <CardHeader className="space-y-1">
          <CardTitle className="text-xl">Tambah Modul</CardTitle>
          <CardDescription>Tambah Modul Baru</CardDescription>
        </CardHeader>

        <CardContent>
          <AddCategoryForm />
        </CardContent>
      </Card>
    </DashboardShell>
  )
}
