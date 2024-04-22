import Link from "next/link"
import { redirect } from "next/navigation"
import Balancer from "react-wrap-balancer"

import { authOptions } from "@/lib/auth"
import { getPostsList } from "@/lib/fetcher/post-fetcher"
import { getOneThread } from "@/lib/fetcher/threads-fetcher"
import { getCurrentUser } from "@/lib/session"
import { getMetaData } from "@/lib/utils"
import { ForumPost } from "@/components/cards/forum-posts-card"
import { Icons } from "@/components/icons"
import { buttonVariants } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

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
      <p className="font-heading text-2xl">Thread Starter</p>

      <Card>
        <CardContent className="p-4 pt-2">
          <div>
            <small className="text-sm text-foreground/60">
              Dibuat saat {getMetaData(thread.data.created_at)}
            </small>
          </div>
          <p className="cst-wrap-text mt-1">
            <Balancer>{thread.data.threads_title}</Balancer>
          </p>
        </CardContent>
      </Card>

      <p className="font-heading text-2xl">Balasan</p>

      {posts.data?.map((post) => <ForumPost key={post.id_post} post={post} />)}

      <div className="flex justify-end">
        <Link
          href={`/editor/${params.idThreads}`}
          className={buttonVariants({
            variant: "outline",
            size: "lg",
            className: "flex w-[200px] ",
          })}
        >
          <Icons.comment className="mr-2 h-4 w-4" />
          Balas
        </Link>
      </div>
    </div>
  )
}
