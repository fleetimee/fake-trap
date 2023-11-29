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
import { Card, CardHeader } from "@/components/ui/card"
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

        <p className="text-xl italic ">{content.data.video?.flavor_text}</p>

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

        {content.data.files &&
          content.data.files.map((file) => (
            <div className="grid grid-cols-1 items-start justify-center gap-3">
              <Card className="flex min-h-[5rem] min-w-[30rem] max-w-2xl items-center justify-between p-4 hover:border-primary">
                <Link
                  href={`${process.env.NEXT_PUBLIC_BASE_URL}/${file.file_path}`}
                  target="_blank"
                >
                  <p className="text-blue-500 underline">{file.file_path}</p>
                </Link>

                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <DownloadIcon className="mr-2 h-6 w-6" />
                  </DropdownMenuTrigger>

                  <DropdownMenuContent className="w-56">
                    <DropdownMenuLabel>Files</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                      <DropdownMenuItem>
                        <User className="mr-2 h-4 w-4" />
                        <span>Download</span>
                        <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <CreditCard className="mr-2 h-4 w-4" />
                        <span>Preview</span>
                        <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              </Card>
            </div>
          ))}
      </div>
    )
  }

  return null
}
