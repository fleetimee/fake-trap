import Link from "next/link"
import { redirect } from "next/navigation"

import { CourseOneRes } from "@/types/course/res"
import { PostsListRes } from "@/types/posts/res/posts-lists"
import { ThreadOneRes } from "@/types/threads/res/thread-get-one"
import { authOptions } from "@/lib/auth"
import { getCurrentUser } from "@/lib/session"
import { ForumPost } from "@/components/app/course/detail/forum/ui"
import { Editor } from "@/components/editor"
import { MotionDiv } from "@/components/framer-wrapper"
import { Icons } from "@/components/icons"
import { BreadCrumbs } from "@/components/pagers/breadcrumb"
import { DashboardShell } from "@/components/shell"
import { buttonVariants } from "@/components/ui/button"
import { Card } from "@/components/ui/card";





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

interface MemberForumPageProps {
  params: {
    forumId: string
  }
}

export default async function MemberForumPage({
  params,
}: MemberForumPageProps) {
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  const [postResp, threadResp] = await Promise.all([
    getPostsList({
      token: user?.token,
      idThreads: params.forumId,
      limit: 1000,
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
      <div className="flex min-w-[10rem] cursor-pointer items-center gap-2 ">
        <Link
          href={`/member-area/course/${courseResp.data.id_course}`}
          className={buttonVariants({
            size: "default",
            variant: "outline",
          })}
        >
          <span className="mr-2">
            <Icons.chevronLeft className="h-4 w-4" />
          </span>
          Kembali
        </Link>
      </div>

      <BreadCrumbs
        segments={[
          {
            href: "/member-area",
            title: "Member Area",
          },
          {
            href: "/member-area/course",
            title: "Pelatihan",
          },
          {
            href: `/member-area/course/${courseResp.data.id_course}`,
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

        {postResp.data?.map((post) => (
          <MotionDiv
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, staggerChildren: 0.2 }}
            // only on initial render
            viewport={{ once: true }}
          >
            <ForumPost key={post.id_post} post={post} />
          </MotionDiv>
        ))}

        <Editor id_threads={parseInt(params.forumId)} />
      </div>
    </DashboardShell>
  )
}
