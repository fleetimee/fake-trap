import Image from "next/image"
import Link from "next/link"
import { redirect } from "next/navigation"
import Blocks from "editorjs-blocks-react-renderer"
import { ClockIcon } from "lucide-react"
import Balancer from "react-wrap-balancer"

import { authOptions } from "@/lib/auth"
import { ContentType } from "@/lib/enums/status"
import { getOneContent } from "@/lib/fetcher/content-fetcher"
import { getCurrentUser } from "@/lib/session"
import { convertDatetoString } from "@/lib/utils"
import { YoutubeRender } from "@/components/content-renderer"
import { ArticleFrame } from "@/components/frame/article-frame"
import { FileFrame } from "@/components/frame/file-frame"
import { LocalVideoFrame } from "@/components/frame/local-video-frame"
import { YoutubeFrame } from "@/components/frame/youtube-frame"
import { LocalVideoPlayer } from "@/components/local-video-player"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Button, buttonVariants } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

interface KnowledgeContentPageProps {
  params: {
    idKnowledge: string
    idSection: string
    idContent: string
  }
}

export default async function KnowledgeContentPage({
  params,
}: KnowledgeContentPageProps) {
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
          detail: params.idKnowledge,
          idSection: params.idSection,
          idContent: params.idContent,
        }}
      />
    )
  }
  if (localVideo) {
    return <LocalVideoFrame content={content} />
  }

  return null
}
