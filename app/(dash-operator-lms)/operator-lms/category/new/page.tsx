import { Metadata } from "next"
import { redirect } from "next/navigation"

import { authOptions } from "@/lib/auth"
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
  title: "Tambah Kategori",
  description: "Tambah Kategori baru",
}

export default async function OperatorLmsCategoryPageNew() {
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
            href: "/operator-lms/category",
            title: "Kategori",
          },
          {
            href: "/operator-lms/category/new",
            title: "Tambah Kategori",
          },
        ]}
      />

      <Card>
        <CardHeader className="space-y-1">
          <CardTitle className="text-xl">Tambah Kategori</CardTitle>
          <CardDescription>Tambah Kategori Baru</CardDescription>
        </CardHeader>

        <CardContent>
          <AddCategoryForm />
        </CardContent>
      </Card>
    </DashboardShell>
  )
}
