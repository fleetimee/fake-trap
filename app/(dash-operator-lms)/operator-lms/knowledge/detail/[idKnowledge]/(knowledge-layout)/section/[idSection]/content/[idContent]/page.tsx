import Image from "next/image"
import Link from "next/link"
import { redirect } from "next/navigation"
import { DownloadIcon } from "@radix-ui/react-icons"
import Blocks from "editorjs-blocks-react-renderer"
import {
  Cloud,
  CreditCard,
  Github,
  Keyboard,
  LifeBuoy,
  LogOut,
  Mail,
  MessageSquare,
  Plus,
  PlusCircle,
  Settings,
  User,
  UserPlus,
  Users,
} from "lucide-react"

import { authOptions } from "@/lib/auth"
import { getOneContent } from "@/lib/fetcher"
import { getCurrentUser } from "@/lib/session"
import { YoutubeRender } from "@/components/content-renderer"
import { Icons } from "@/components/icons"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
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

  const article = content?.data?.content_type === "0014"
  const video = content?.data?.content_type === "0012"
  const file = content?.data?.content_type === "0013"

  if (article) {
    return (
      <div className="whatever-you-want flex w-fit flex-col items-start justify-center p-4">
        <h1 className="text-4xl font-bold  ">{content.data.content_title}</h1>

        <Separator />

        <Blocks data={contentParsed} />
      </div>
    )
  }

  if (video) {
    return (
      <div className="flex flex-col items-start justify-center gap-3">
        <h1 className="text-4xl font-bold  ">{content.data.content_title}</h1>

        <Separator />

        <p className="text-sm italic ">{content.data.video?.flavor_text}</p>

        <YoutubeRender link={content.data.video?.video_url} />
      </div>
    )
  }

  if (file) {
    return (
      <div className="flex flex-col items-start justify-center gap-6">
        <h1 className="text-4xl font-bold  ">{content.data.content_title}</h1>
        <Separator />

        <p className="text-xl italic ">
          Terdapat {content.data.files?.length} file yang dapat diunduh untuk di
          baca
        </p>

        <div className="grid grid-cols-1 items-start justify-center gap-3  xl:grid-cols-2">
          {content.data.files &&
            content.data.files.map((file) => (
              <Card
                key="1"
                className="mx-auto w-80 overflow-hidden rounded-lg shadow-lg transition-all duration-200 hover:shadow-xl"
              >
                <Image
                  alt="Profile picture"
                  className="w-full object-cover"
                  height="320"
                  src="/placeholder.svg"
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
                    {file.file_size}
                  </h3>
                  <p className="mt-2 text-gray-600 transition-all duration-200 hover:text-gray-700">
                    {file.file_path.split("/").pop()}
                  </p>
                  <div className="mt-4 flex space-x-2">
                    <Button
                      className="w-full transition-all duration-200 hover:bg-gray-700 hover:text-white"
                      size="sm"
                    >
                      Download
                    </Button>
                    <Button
                      className="w-full transition-all duration-200 hover:border-gray-700 hover:text-gray-700"
                      size="sm"
                      variant="outline"
                    >
                      Preview
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
        </div>
      </div>
    )
  }

  return null
}
