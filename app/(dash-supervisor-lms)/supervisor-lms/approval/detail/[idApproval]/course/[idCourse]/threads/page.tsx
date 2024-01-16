import { redirect } from "next/navigation"

import { authOptions } from "@/lib/auth"
import { getThreadList } from "@/lib/fetcher/threads-fetcher"
import { getCurrentUser } from "@/lib/session"
import { ForumCard } from "@/components/cards/forum-card"
import { ScrollArea } from "@/components/ui/scroll-area"
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
      <div>
        <h3 className="text-lg font-medium">Threads</h3>
        <p className="text-sm text-muted-foreground">
          Buat thread baru atau lihat thread yang sudah ada. dan berkomunikasi
          dengan peserta lainnya.
        </p>
      </div>
      <Separator />

      {threads && threads.data && threads.data.length > 0 ? (
        <ScrollArea className="h-[700px] w-full">
          <div className="flex flex-col gap-4">
            {threads.data.map((thread) => (
              <ForumCard
                idCourse={params.idCourse}
                idThreads={thread.id_threads.toString()}
                title={thread.threads_title}
                createdAt={thread.created_at.toString()}
                numberOfPosts={thread.number_of_posts}
                numberOfUsers={thread.number_of_users}
                // linkString={`/peserta/course/detail/${params.idCourse}/threads/${thread.id_threads}`}
                linkString={`/supervisor-lms/approval/detail/${params.idApproval}/course/${params.idCourse}/threads/${thread.id_threads}`}
              />
            ))}
          </div>
        </ScrollArea>
      ) : (
        <div className="mt-9 flex flex-col items-center justify-center gap-4">
          <h1 className="text-2xl font-semibold">Belum ada thread</h1>
          <p className="text-sm text-muted-foreground">
            Buat thread baru untuk memulai diskusi
          </p>
        </div>
      )}
    </div>
  )
}
