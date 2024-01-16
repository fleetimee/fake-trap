import Link from "next/link"
import { redirect } from "next/navigation"

import { authOptions } from "@/lib/auth"
import { getThreadList } from "@/lib/fetcher/threads-fetcher"
import { getCurrentUser } from "@/lib/session"
import { cn } from "@/lib/utils"
import { ForumCard } from "@/components/cards/forum-card"
import { buttonVariants } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"

interface CourseThreadPageProps {
  params: {
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

      <div className="flex justify-end">
        <Link
          href={`/operator-lms/course/detail/${params.idCourse}/threads/new`}
          className={buttonVariants({
            size: "lg",
            variant: "outline",
            className: cn(
              "inline-block border-4 border-black bg-yellow-300 px-6 py-2 text-lg text-black hover:bg-yellow-400"
            ),
          })}
        >
          Buat Thread Baru
        </Link>
      </div>

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
                linkString={`/operator-lms/course/detail/${params.idCourse}/threads/${thread.id_threads}`}
              />
            ))}
          </div>
        </ScrollArea>
      ) : null}
    </div>
  )
}
