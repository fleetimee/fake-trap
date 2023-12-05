import { redirect } from "next/navigation"

import { authOptions } from "@/lib/auth"
import { getCurrentUser } from "@/lib/session"
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

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Section / Bagian</h3>
        <p className="text-sm text-muted-foreground">
          Tambah Section atau Bagian baru untuk pelatihan ini.
        </p>
      </div>
      <Separator />
    </div>
  )
}
