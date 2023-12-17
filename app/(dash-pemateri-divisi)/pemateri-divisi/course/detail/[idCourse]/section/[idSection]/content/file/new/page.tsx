import { notFound, redirect } from "next/navigation"

import { authOptions } from "@/lib/auth"
import { getOneSection } from "@/lib/fetcher"
import { getCurrentUser } from "@/lib/session"
import { AddContentFileForm } from "@/components/forms/add-content-file-form"
import { Separator } from "@/components/ui/separator"

interface CourseContentFileNewPageProps {
  params: {
    idCourse: string
    idSection: string
  }
}

export default async function CourseContentFileNewPage({
  params,
}: CourseContentFileNewPageProps) {
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
        <h3 className="text-lg font-medium">Konten File</h3>
        <p className="text-sm text-muted-foreground">
          Tambahkan konten file untuk section {section.data.section_title}
        </p>
      </div>
      <Separator />
      <AddContentFileForm
        idSection={Number(params.idSection)}
        section={section.data}
      />
    </div>
  )
}
