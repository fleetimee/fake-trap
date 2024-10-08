import { redirect } from "next/navigation"

import { authOptions } from "@/lib/auth"
import { ContentType } from "@/lib/enums/status"
import { getOneContent } from "@/lib/fetcher/content-fetcher"
import { getCurrentUser } from "@/lib/session"
import { ArticleFrame } from "@/components/frame/article-frame"
import { FileFrame } from "@/components/frame/file-frame"
import { LocalVideoFrame } from "@/components/frame/local-video-frame"
import { YoutubeFrame } from "@/components/frame/youtube-frame"

interface CourseContentPageProps {
  params: {
    idCourse: string
    idSection: string
    idContent: string
  }
}

export default async function CourseContentPage({
  params,
}: CourseContentPageProps) {
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  const content = await getOneContent({
    token: user?.token,
    idContent: params.idContent,
  })

  const contentParsed = JSON.parse(content?.data?.article?.body || "{}")

  const article = content?.data?.content_type === ContentType.ARTICLE
  const video = content?.data?.content_type === ContentType.VIDEO
  const file = content?.data?.content_type === ContentType.DOCUMENT
  const localVideo = content?.data?.content_type === ContentType.LOCAL_FILE

  if (article) {
    return <ArticleFrame content={content} contentParsed={contentParsed} />
  }

  if (video) {
    return <YoutubeFrame content={content} />
  }

  if (file) {
    return (
      <FileFrame
        content={content}
        params={{
          detail: params.idCourse,
          idSection: params.idSection,
          idContent: params.idContent,
        }}
      />
    )
  }

  if (localVideo) {
    return <LocalVideoFrame content={content} />
  }
}
