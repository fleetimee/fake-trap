import Image from "next/image"
import Link from "next/link"
import { redirect } from "next/navigation"
import { ClockIcon } from "@radix-ui/react-icons"
import Blocks from "editorjs-blocks-react-renderer"
import Balancer from "react-wrap-balancer"

import { authOptions } from "@/lib/auth"
import { ContentType } from "@/lib/enums/status"
import { getOneContent } from "@/lib/fetcher/content-fetcher"
import { getCurrentUser } from "@/lib/session"
import { convertDatetoString } from "@/lib/utils"
import { YoutubeRender } from "@/components/content-renderer"
import { LocalVideoPlayer } from "@/components/local-video-player"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Button, buttonVariants } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

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
    return (
      <div className="whatever-you-want mx-auto flex w-fit flex-col items-start justify-center p-4">
        <h1 className="text-4xl font-bold  ">{content.data.content_title}</h1>

        <p>{convertDatetoString(content.data.created_at.toString())}</p>

        <Separator />

        <Blocks data={contentParsed} />
      </div>
    )
  }

  if (video) {
    return (
      <div className="flex flex-col items-start justify-center gap-3">
        <h1 className="text-4xl font-bold  ">
          <Balancer>{content.data.content_title}</Balancer>
        </h1>

        <span className="inline-flex">
          <ClockIcon className="mr-2 h-6 w-6 text-gray-500" />
          <p>{convertDatetoString(content.data.created_at.toString())}</p>
        </span>

        <Separator />

        <p className="text-sm italic ">{content.data.video?.flavor_text}</p>

        <YoutubeRender link={content.data.video?.video_url} />
      </div>
    )
  }

  if (file) {
    return (
      <div className="flex flex-col items-start justify-center gap-6">
        <h1 className="text-4xl font-bold  ">
          <Balancer>{content.data.content_title}</Balancer>
        </h1>

        <span className="inline-flex">
          <ClockIcon className="mr-2 h-6 w-6 text-gray-500" />
          <p>{convertDatetoString(content.data.created_at.toString())}</p>
        </span>

        <Separator />

        <p className="text-xl italic ">
          Terdapat {content.data.files?.length} file yang dapat diunduh untuk di
          baca
        </p>

        <div className="grid grid-cols-1 items-center justify-center gap-8  xl:grid-cols-2">
          {content.data.files &&
            content.data.files.map((file) => (
              <Card
                key={file.id_content_file}
                className="mx-auto w-80 overflow-hidden rounded-lg shadow-lg transition-all duration-200 hover:shadow-xl"
              >
                <Image
                  alt="Profile picture"
                  className="w-full object-cover"
                  height="320"
                  src="/images/placeholder.svg"
                  style={{
                    aspectRatio: "320/320",
                    objectFit: "cover",
                  }}
                  width="320"
                />
                <CardContent className="p-4">
                  <h2 className="text-2xl font-bold transition-all duration-200 hover:text-gray-700">
                    {file.file_type}
                  </h2>
                  <h3 className="text-gray-500 transition-all duration-200 hover:text-gray-600">
                    {Number(file.file_size)
                      ? (Number(file.file_size) / 1024 / 1024).toFixed(2)
                      : "N/A"}{" "}
                    MB
                  </h3>
                  <p className="mt-2 text-gray-600 transition-all duration-200 hover:text-gray-700">
                    {file.file_path.split("/").pop()}
                  </p>
                  <div className="mt-4 flex space-x-2">
                    <Link
                      href={`${process.env.NEXT_PUBLIC_BASE_URL}/${file.file_path}`}
                      target="_blank"
                      className={buttonVariants({
                        size: "sm",
                        className:
                          "w-full transition-all duration-200 hover:bg-gray-700 hover:text-white",
                      })}
                    >
                      Download
                    </Link>
                    <Button
                      className="w-full transition-all duration-200 hover:border-gray-700 hover:text-gray-700"
                      size="sm"
                      variant="outline"
                    >
                      <Link
                        href={`/operator-lms/course/detail/${
                          params.idCourse
                        }/section/${params.idSection}/content/${
                          params.idContent
                        }/render/${file.file_path.split("/").pop()}`}
                      >
                        Preview
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
        </div>
      </div>
    )
  }

  if (localVideo) {
    return (
      <div className="flex flex-col items-start justify-center gap-3">
        <h1 className="text-4xl font-bold  ">
          <Balancer>{content.data.content_title}</Balancer>
        </h1>
        <span className="inline-flex">
          <ClockIcon className="mr-2 h-6 w-6 text-gray-500" />
          <p>{convertDatetoString(content.data.created_at.toString())}</p>
        </span>
        <Separator />
        <p className="py-2 text-sm italic">
          {content.data.video_upload?.flavor_text}
        </p>
        <AspectRatio ratio={16 / 9}>
          <LocalVideoPlayer
            url={`${process.env.NEXT_PUBLIC_BASE_URL}${content.data.video_upload?.video_path}`}
          />
        </AspectRatio>
      </div>
    )
  }
}
