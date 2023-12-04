import { redirect } from "next/navigation"

import { CourseOneRes } from "@/types/course/res"
import { PostsListRes } from "@/types/posts/res/posts-lists"
import { ThreadOneRes } from "@/types/threads/res/thread-get-one"
import { authOptions } from "@/lib/auth"
import { getCurrentUser } from "@/lib/session"
import { ForumPost } from "@/components/app/course/detail/forum/ui"
import { Editor } from "@/components/editor"
import { MotionDiv } from "@/components/framer-wrapper"
import { BreadCrumbs } from "@/components/pagers/breadcrumb"
import { DashboardShell } from "@/components/shell"
import { Card } from "@/components/ui/card"

interface ThreadPageProps {
  params: {
    idCourse: string
    idThreads: string
  }
}

export default async function ThreadPage({ params }: ThreadPageProps) {
  const user = await getCurrentUser()
}
