import { EditorParser } from "@mobtakr/editorjs-parser"
import Blocks from "editorjs-blocks-react-renderer"
import { generateFromString } from "generate-avatar"

import { PostsListResData } from "@/types/posts/res"
import { convertDatetoString } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

interface ForumPost {
  post: PostsListResData
}

export function ForumPost({ post }: ForumPost) {
  const contentParsed = JSON.parse(post.content)

  return (
    <Card
      key={post.id_post}
      className="h-full min-h-[350px] w-full border-2 border-black bg-yellow-300 p-8 text-black hover:bg-yellow-400"
    >
      <div className="flex flex-col items-end">
        <p className="items-end text-xs font-bold">
          {convertDatetoString(new Date(post.created_at).toString())}
        </p>
      </div>
      <Separator className="my-6" />
      <div className="grid grid-cols-12">
        <div className="col-span-2 mr-4 flex max-h-full flex-col items-center justify-start gap-4">
          <Avatar className="h-20 w-20 border-2 border-black bg-white">
            <AvatarImage
              src={`data:image/svg+xml;utf8,${generateFromString(
                post.username
              )}`}
            />
            <AvatarFallback />
          </Avatar>
          <p className="font-heading text-2xl">{post.username}</p>
        </div>

        <div className="whatever-you-want col-span-10 ml-4 border-2 border-black bg-white p-4">
          <Blocks data={contentParsed} />
        </div>
      </div>
    </Card>
  )
}
