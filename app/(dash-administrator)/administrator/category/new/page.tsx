import { Metadata } from "next"
import { notFound, redirect } from "next/navigation"

import { authOptions } from "@/lib/auth"
import { getRule } from "@/lib/fetcher/rule-fetcher"
import { getCurrentUser } from "@/lib/session"
import { extractToken } from "@/lib/utils"
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

export default async function AdminLmsCategoryPageNew() {
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  const tokenExtracted = extractToken(user?.token)

  //   const rule = await getRule({
  //     token: user?.token,
  //     idRole: "3",
  //   })

  //   if (!rule.data.can_write_knowledge) {
  //     return notFound()
  //   }

  return (
    <DashboardShell>
      <BreadCrumbs
        segments={[
          {
            href: "/administrator",
            title: "Dashboard",
          },
          {
            href: "/administrator/category",
            title: "Modul",
          },
          {
            href: "/administrator/category/new",
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
          <AddCategoryForm userId={tokenExtracted?.id} />
        </CardContent>
      </Card>
    </DashboardShell>
  )
}
