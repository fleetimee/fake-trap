import { redirect } from "next/navigation"

import { authOptions } from "@/lib/auth"
import { getOneThread, getPostsList } from "@/lib/fetcher"
import { getCurrentUser } from "@/lib/session"
import { ForumPost } from "@/components/app/course/detail/forum/ui"
import { Editor } from "@/components/editor"
import { Card } from "@/components/ui/card"

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
      <Card className="h-full min-h-[120px] w-full border-4 border-black bg-primary p-8 text-black">
        <p className="font-heading text-2xl text-white">
          {thread.data.threads_title}
        </p>
      </Card>

      <p className="font-heading text-2xl">Balasan</p>

      {/* <Editor id_threads={parseInt(params.idThreads)} /> */}

      {posts.data?.map((post) => <ForumPost key={post.id_post} post={post} />)}
    </div>
  )
}
