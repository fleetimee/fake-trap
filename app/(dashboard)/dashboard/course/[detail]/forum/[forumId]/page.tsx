import { redirect } from "next/navigation"

import { CourseOneRes } from "@/types/course/res"
import { KnowledgeOneRes } from "@/types/knowledge/res"
import { PostsListRes } from "@/types/posts/res/posts-lists"
import { ThreadOneRes } from "@/types/threads/res/thread-get-one"
import { authOptions } from "@/lib/auth"
import { getCurrentUser } from "@/lib/session"
import { convertDatetoString } from "@/lib/utils"
import { ForumPost } from "@/components/app/course/detail/forum/ui"
import { Editor } from "@/components/editor"
import { BreadCrumbs } from "@/components/pagers/breadcrumb"
import { DashboardShell } from "@/components/shell"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

type Props = {
  params: {
    forumId: string
  }
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
      cache: "no-store",
      // next: {
      //   revalidate: 1,
      // },
    }
  )

  return await res.json()
}

interface GetOneThreadProps {
  token: string | undefined
  idThreads: string
}

async function getOneThread({
  token,
  idThreads,
}: GetOneThreadProps): Promise<ThreadOneRes> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/secure/threads/${idThreads}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    }
  )

  return await res.json()
}

interface GetOneCourseProps {
  token: string | undefined
  idCourse: string
}

async function getOneCourse({
  token,
  idCourse,
}: GetOneCourseProps): Promise<CourseOneRes> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/secure/course/${idCourse}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    }
  )

  return await res.json()
}

export default async function ForumPostPage({ params }: Props) {
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  const [postsResp, threadResp] = await Promise.all([
    getPostsList({
      token: user?.token,
      idThreads: params.forumId,
      limit: 100,
      page: 1,
    }),
    getOneThread({
      token: user?.token,
      idThreads: params.forumId,
    }),
  ])

  const courseResp = await getOneCourse({
    token: user?.token,
    idCourse: threadResp.data.id_course.toString(),
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
            href: `/dashboard/course/${courseResp.data.id_course}`,
            title: courseResp.data.course_name,
          },
          {
            href: "#",
            title: threadResp.data.threads_title,
          },
        ]}
      />
      <div className="flex flex-col justify-between gap-8">
        <p className="font-heading text-2xl">Thread Starter</p>
        <Card className="h-full min-h-[120px] w-full p-8">
          <p className="font-heading text-2xl">
            {threadResp.data.threads_title}
          </p>
        </Card>

        <p className="font-heading text-2xl">Balasan</p>

        {postsResp.data?.map((post) => (
          <ForumPost key={post.id_post} post={post} />
        ))}

        <Editor id_threads={parseInt(params.forumId)} />
      </div>
    </DashboardShell>
  )
}
