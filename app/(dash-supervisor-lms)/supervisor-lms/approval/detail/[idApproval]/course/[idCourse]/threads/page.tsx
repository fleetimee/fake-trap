import { redirect } from "next/navigation"
import { MessageCircle } from "lucide-react"

import { authOptions } from "@/lib/auth"
import { getThreadList } from "@/lib/fetcher/threads-fetcher"
import { getCurrentUser } from "@/lib/session"
import { Threads } from "@/components/threads"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

interface CourseThreadPageProps {
  params: {
    idApproval: string
    idCourse: string
  }
}

export default async function CourseThreadPage({
  params,
}: CourseThreadPageProps) {
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  const threads = await getThreadList({
    token: user?.token,
    idCourse: params.idCourse,
    limit: 1000,
    page: 1,
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between rounded-lg bg-gradient-to-r from-blue-50 to-blue-100 p-6 dark:from-blue-950/50 dark:to-blue-900/50">
        <div>
          <h3 className="text-lg font-medium text-blue-700 dark:text-blue-300">
            Threads
          </h3>
          <p className="text-sm text-blue-600/80 dark:text-blue-400/80">
            Buat thread baru atau lihat thread yang sudah ada dan berkomunikasi
            dengan peserta lainnya.
          </p>
        </div>
      </div>
      <Separator className="bg-blue-100 dark:bg-blue-900/50" />

      {threads.data.length === 0 ? (
        <div className="flex h-full w-full items-center justify-center p-4">
          <Card className="flex h-full min-h-[400px] w-full items-center justify-center border-dashed border-blue-200 bg-blue-50/50 dark:border-blue-900 dark:bg-blue-950/50 sm:min-h-[500px]">
            <CardContent className="w-full max-w-md text-center">
              <div className="space-y-6">
                <MessageCircle className="mx-auto h-16 w-16 text-blue-400" />
                <div className="space-y-2">
                  <h2 className="text-3xl font-semibold text-blue-700 dark:text-blue-300">
                    Belum ada thread
                  </h2>
                  <p className="text-blue-600/80 dark:text-blue-400/80">
                    Belum ada thread yang dibuat dalam pembelajaran ini
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      ) : (
        <Threads
          data={threads.data}
          pageCount={threads.totalPage}
          idCourse={params.idCourse}
          link={`/supervisor-lms`}
          idApproval={params.idApproval}
        />
      )}
    </div>
  )
}
