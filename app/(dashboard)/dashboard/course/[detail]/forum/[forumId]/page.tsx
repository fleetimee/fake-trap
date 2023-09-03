import { redirect } from "next/navigation"

import { PostsListRes } from "@/types/posts/res/posts-lists"
import { authOptions } from "@/lib/auth"
import { getCurrentUser } from "@/lib/session"
import { BreadCrumbs } from "@/components/pagers/breadcrumb"
import { DashboardShell } from "@/components/shell"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Card } from "@/components/ui/card"

type Props = {
  params: {
    forumId: string
  }
  searchParams: {}
}

interface GetPostsListProps {
  token: string | undefined
  idThreads: string
  limit: number
  page: number
}

async function getPostsList({
  token,
  idThreads,
  limit,
  page,
}: GetPostsListProps): Promise<PostsListRes> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/secure/threads/${idThreads}/posts/?limit=${limit}&page=${page}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  )

  return await res.json()
}

export default async function ForumPostPage({ params }: Props) {
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  const postsResp = await getPostsList({
    token: user?.token,
    idThreads: params.forumId,
    limit: 10,
    page: 1,
  })

  return (
    <DashboardShell>
      <BreadCrumbs
        segments={[
          {
            href: "/dashboard",
            title: "Dashboard",
          },
          {
            href: "/dashboard/course",
            title: "Kursus",
          },
          {
            href: "#",
            title: "Threads",
          },
          {
            href: "#",
            title: postsResp.data[0].threads_title,
          },
        ]}
      />
      <div className="flex flex-col items-center justify-between gap-4">
        {postsResp.data.map((post) => (
          <Card key={post.id_post} className="h-[200px] w-full p-8">
            <div className="grid grid-cols-12">
              <div className="col-span-2 flex max-h-full flex-col  gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarFallback />
                </Avatar>
                <p className="ml-2 font-heading">{post.username}</p>
              </div>
              <div className="col-span-10 font-heading">{post.content}</div>
            </div>
          </Card>
        ))}
      </div>
    </DashboardShell>
  )
}
