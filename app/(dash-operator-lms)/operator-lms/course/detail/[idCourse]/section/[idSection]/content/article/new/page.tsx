import { notFound, redirect } from "next/navigation"

import { authOptions } from "@/lib/auth"
import { getOneSection } from "@/lib/fetcher/section-fetcher"
import { getCurrentUser } from "@/lib/session"
import { AddContentArticleForm } from "@/components/forms/add-content-article-form"
import { Separator } from "@/components/ui/separator"

interface CourseContentArticleNewPageProps {
  params: {
    idCourse: string
    idSection: string
  }
}

export default async function CourseContentArticleNewPage({
  params,
}: CourseContentArticleNewPageProps) {
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  const section = await getOneSection({
    token: user.token,
    idSection: params.idSection,
  })

  if (section.code === 400) {
    return notFound()
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Konten Article</h3>
        <p className="text-sm text-muted-foreground">
          Tambahkan konten article untuk section {section.data.section_title}
        </p>
      </div>
      <Separator />
      <AddContentArticleForm idSection={Number(params.idSection)} />
    </div>
  )
}
