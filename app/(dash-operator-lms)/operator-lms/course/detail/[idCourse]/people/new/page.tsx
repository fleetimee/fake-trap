import { redirect } from "next/navigation"

import { authOptions } from "@/lib/auth"
import { getCourseVacantUser } from "@/lib/fetcher/course-fetcher"
import { getCurrentUser } from "@/lib/session"
import { AddCourseUserForm } from "@/components/forms/add-course-user-form"
import { Separator } from "@/components/ui/separator"

interface CourseUserNewPageProps {
  params: {
    idCourse: string
  }
}

export default async function CourseUserNewPage({
  params,
}: CourseUserNewPageProps) {
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  const vacantUsers = await getCourseVacantUser({
    token: user?.token,
    idCourse: params.idCourse,
  })

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Tambah Peserta</h3>
        <p className="text-sm text-muted-foreground">
          Tambahkan peserta ke dalam pembelajaran ini. Peserta akan mendapatkan
          akses ke semua materi yang ada di pembelajaran ini.
        </p>
      </div>
      <Separator />

      <AddCourseUserForm
        userLists={vacantUsers.data}
        idCourse={parseInt(params.idCourse)}
      />
    </div>
  )
}
