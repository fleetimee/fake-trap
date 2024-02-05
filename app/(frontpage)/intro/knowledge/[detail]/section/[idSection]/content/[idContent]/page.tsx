import Image from "next/image"
import Link from "next/link"
import { redirect } from "next/navigation"
import { ClockIcon } from "@radix-ui/react-icons"
import Blocks from "editorjs-blocks-react-renderer"

import { authOptions } from "@/lib/auth"
import { ContentType } from "@/lib/enums/status"
import { getOneContent } from "@/lib/fetcher/content-fetcher"
import { getCurrentUser } from "@/lib/session"
import { convertDatetoString } from "@/lib/utils"
import { FileFrame } from "@/components/frame/file-frame"
import { LocalVideoFrame } from "@/components/frame/local-video-frame"
import { YoutubeFrame } from "@/components/frame/youtube-frame"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

interface KnowledgeContentPageProps {
  params: {
    detail: string
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
    return (
      <div className="whatever-you-want mx-auto flex w-full flex-col items-start justify-center  ">
        <Card className="rounded-none border-none sm:rounded-lg">
          <CardHeader>
            <CardTitle className="text-black dark:text-white">
              {content.data.content_title}
            </CardTitle>
            <CardDescription>
              {convertDatetoString(content.data.created_at.toString())}
            </CardDescription>
          </CardHeader>

          <Separator />
          <CardContent className="text-black dark:text-white">
            <Blocks data={contentParsed} />
          </CardContent>
        </Card>
      </div>
    )
  }

  if (video) {
    return <YoutubeFrame content={content} />
  }

  if (localVideo) {
    return <LocalVideoFrame content={content} />
  }

  if (file) {
    return <FileFrame content={content} params={params} />
  }

  return null
}
