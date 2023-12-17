import { Metadata } from "next"
import { notFound, redirect } from "next/navigation"

import { authOptions } from "@/lib/auth"
import { getOneCategory, getRule } from "@/lib/fetcher"
import { getCurrentUser } from "@/lib/session"
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

interface OperatorLMSUpdateCategoryPageProps {
  params: {
    idCategory: string
  }
}

export default async function OperatorLMSUpdateCategoryPage({
  params,
}: OperatorLMSUpdateCategoryPageProps) {
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  const category = await getOneCategory({
    token: user?.token,
    idCategory: params.idCategory,
  })

  if (category.code === 400) {
    return notFound()
  }

  const rule = await getRule({
    token: user?.token,
    idRole: "3",
  })

  if (!rule.data.can_write_knowledge) {
    return notFound()
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
            href: `/operator-lms/category/update/${category.data.id_category}`,
            title: "Update Kategori",
          },
          {
            href: `/operator-lms/category/update/${category.data.id_category}`,
            title: `${category.data.category_name}`,
          },
        ]}
      />

      <Card>
        <CardHeader className="space-y-1">
          <CardTitle className="text-xl">
            Update Kategori:{" "}
            <span className="font-bold">{category.data.category_name}</span>
          </CardTitle>
          <CardDescription>Update Kategori yang sudah ada</CardDescription>
        </CardHeader>

        <CardContent>
          <UpdateCategoryForm category={category.data} />
        </CardContent>
      </Card>
    </DashboardShell>
  )
}
