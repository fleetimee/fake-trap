import { Metadata } from "next"
import { notFound, redirect } from "next/navigation"

import { authOptions } from "@/lib/auth"
import { getOneCategory } from "@/lib/fetcher/category-fetcher"
import { getRule } from "@/lib/fetcher/rule-fetcher"
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
  title: "Update Modul",
  description: "Halaman untuk mengubah Modul",
}

interface AdminUpdateCategoryPageProps {
  params: {
    idCategory: string
  }
}

export default async function AdminUpdateCategoryPage({
  params,
}: AdminUpdateCategoryPageProps) {
  const user = await getCurrentUser()

  const tokenExtracted = extractToken(user?.token)

  const idCategory = params.idCategory.includes("_")
    ? params.idCategory.split("_")[1]
    : params.idCategory

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  const category = await getOneCategory({
    token: user?.token,
    idCategory: idCategory,
  })

  if (category.code === 400) {
    return notFound()
  }

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
            href: `/administrator/category/update/${category.data.id_category}`,
            title: "Update Modul",
          },
          {
            href: `/administrator/category/update/${category.data.id_category}`,
            title: `${category.data.category_name}`,
          },
        ]}
      />

      <Card>
        <CardHeader className="space-y-1">
          <CardTitle className="text-xl">
            Update Modul:{" "}
            <span className="font-bold">{category.data.category_name}</span>
          </CardTitle>
          <CardDescription>Update Modul yang sudah ada</CardDescription>
        </CardHeader>

        <CardContent>
          <UpdateCategoryForm category={category.data} />
        </CardContent>
      </Card>
    </DashboardShell>
  )
}
