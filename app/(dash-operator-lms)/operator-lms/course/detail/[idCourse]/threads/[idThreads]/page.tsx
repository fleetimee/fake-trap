import Image from "next/image"
import Link from "next/link"
import { redirect } from "next/navigation"
import { generateFromString } from "generate-avatar"
import { MessageSquare, Reply } from "lucide-react"

import { authOptions } from "@/lib/auth"
import { getPostsList } from "@/lib/fetcher/post-fetcher"
import { getOneThread } from "@/lib/fetcher/threads-fetcher"
import { getCurrentUser } from "@/lib/session"
import { getMetaData } from "@/lib/utils"
import { ForumPost } from "@/components/cards/forum-posts-card"
import { Icons } from "@/components/icons"
import { buttonVariants } from "@/components/ui/button"
import { Card, CardContent, CardTitle } from "@/components/ui/card"

interface ThreadPageProps {
  params: {
    idCourse: string
    idThreads: string
  }
}

export default async function ThreadPage({ params }: ThreadPageProps) {
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  const [thread, posts] = await Promise.all([
    getOneThread({
      token: user.token,
      idThreads: params.idThreads,
    }),
    getPostsList({
      token: user.token,
      idThreads: params.idThreads,
      limit: 1000,
      page: 1,
    }),
  ])

  return (
    <div className="flex flex-col justify-between gap-8">
      <div className="inline-flex w-fit items-center rounded-lg bg-blue-50 px-4 py-2 text-xl font-bold text-blue-700 dark:bg-blue-950/50 dark:text-blue-300">
        <MessageSquare className="mr-2 h-5 w-5" />
        Thread Starter
      </div>

      <Card className="relative bg-white dark:bg-slate-950">
        <CardTitle className="relative p-4 pb-0">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className="relative size-12 overflow-hidden rounded-full bg-white">
                <Image
                  src={
                    thread.data.profile_picture
                      ? `${process.env.NEXT_PUBLIC_BASE_URL}${thread.data.profile_picture}`
                      : `data:image/svg+xml;utf8,${generateFromString(
                          thread.data.username || "Nama"
                        )}`
                  }
                  alt={thread.data.username || "User"}
                  width={100}
                  height={100}
                  className="object-cover object-top"
                />
              </div>

              <div className="space-y-1 text-sm">
                <h2 className="text-sm">{thread.data.name}</h2>
                <p className="text-foreground/60">@{thread.data.username}</p>
              </div>
            </div>
          </div>
        </CardTitle>

        <CardContent className="relative p-4 pt-2">
          <div className="mb-2">
            <small className="inline-block rounded-lg bg-yellow-50 px-3 py-1 text-sm font-medium text-yellow-700 dark:bg-yellow-950/50 dark:text-yellow-300">
              Dibuat saat {getMetaData(thread.data.created_at)}
            </small>
          </div>
          <p className="cst-wrap-text mt-1 text-lg font-medium">
            {thread.data.threads_title}
          </p>
        </CardContent>
      </Card>

      <div className="inline-flex w-fit items-center rounded-lg bg-green-50 px-4 py-2 text-xl font-bold text-green-700 dark:bg-green-950/50 dark:text-green-300">
        <Reply className="mr-2 h-5 w-5" />
        Balasan
      </div>

      {posts.data?.map((post) => <ForumPost key={post.id_post} post={post} />)}

      <div className="flex justify-end">
        <Link
          href={`/editor/${params.idThreads}`}
          className={buttonVariants({
            variant: "default",
            size: "lg",
            className:
              "flex w-[200px] bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800",
          })}
        >
          <Icons.comment className="mr-2 h-4 w-4" />
          Balas
        </Link>
      </div>
    </div>
  )
}
