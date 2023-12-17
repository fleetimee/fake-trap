import { Metadata } from "next"
import { notFound, redirect } from "next/navigation"

import { authOptions } from "@/lib/auth"
import { getOneCategory, getRule } from "@/lib/fetcher"
import { getCurrentUser } from "@/lib/session"
import { extractToken } from "@/lib/utils"
import UpdateCategoryForm from "@/components/forms/update-category-form"
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
  title: "Update Kategori",
  description: "Halaman untuk mengubah kategori",
}

interface PemateriDivisiUpdateCategoryPageProps {
  params: {
    idCategory: string
  }
}

export default async function PemateriDivisiUpdateCategoryPage({
  params,
}: PemateriDivisiUpdateCategoryPageProps) {
  const user = await getCurrentUser()

  const tokenExtracted = extractToken(user?.token)

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  const category = await getOneCategory({
    token: user?.token,
    idCategory: params.idCategory,
  })

  if (category.code === 400 || category.data.created_by !== tokenExtracted.id) {
    return notFound()
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
            title: "Kategori",
          },
          {
            href: `/pemateri-divisi/category/update/${params.idCategory}`,
            title: category.data.category_name,
          },
          {
            href: `/pemateri-divisi/category/update/${params.idCategory}`,
            title: "Ubah Kategori",
          },
        ]}
      />

      <Card>
        <CardHeader className="space-y-1">
          <CardTitle className="text-xl">Ubah Kategori</CardTitle>
          <CardDescription>
            Ubah kategori dengan mengisi form di bawah ini.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <UpdateCategoryForm category={category.data} />
        </CardContent>
      </Card>
    </DashboardShell>
  )
}
