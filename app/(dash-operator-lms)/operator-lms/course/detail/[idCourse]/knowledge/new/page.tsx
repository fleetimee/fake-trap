import { redirect } from "next/navigation"

import { authOptions } from "@/lib/auth"
import { Visibility } from "@/lib/enums/status"
import { getOperatorKnowledge } from "@/lib/fetcher/knowledge-fetcher"
import { getCurrentUser } from "@/lib/session"
import { AddCourseKnowledgeForm } from "@/components/forms/add-course-knowledge-form"
import { Separator } from "@/components/ui/separator"

interface CourseKnowledgePageProps {
  params: {
    idCourse: string
  }
}

export default async function CourseKnowledgePage({
  params,
}: CourseKnowledgePageProps) {
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  const knowledges = await getOperatorKnowledge({
    limit: 999,
    page: 1,
    token: user?.token,
    visibilityId: Visibility.PRIVATE,
  })

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Tambah Materi</h3>
        <p className="text-sm text-muted-foreground">
          Tambahkan materi baru ke dalam pelatihan ini.
        </p>
      </div>
      <Separator />

      <AddCourseKnowledgeForm
        idCourse={parseInt(params.idCourse)}
        knowledges={knowledges.data}
      />
    </div>
  )
}
