import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { EditorParser, EditorRenderer } from "@mobtakr/editorjs-parser"
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
  console.log(contentParsed)
  //
  const parser = new EditorParser(contentParsed.blocks)
  //
  const parsedBlocks = parser.parse()

  return (
    <Card key={post.id_post} className="h-full min-h-[350px] w-full p-8">
      <div className="flex flex-col items-end">
        <p className="items-end text-xs">
          {convertDatetoString(new Date(post.created_at).toString())}
        </p>
      </div>
      <Separator className="my-6" />
      <div className="grid grid-cols-12">
        <div className="col-span-2 flex max-h-full flex-col items-center justify-center gap-4">
          <Avatar className="h-20 w-20">
            <AvatarImage
              src={`data:image/svg+xml;utf8,${generateFromString(
                post.username
              )}`}
            />
            <AvatarFallback />
          </Avatar>
          <p className="font-heading">{post.username}</p>
        </div>
        {/*<div className="col-span-10 text-sm">{post.content}</div>*/}
        {/*<div className="col-span-10">*/}
        {/*  <EditorRenderer parsedBlocks={parsedBlocks} styles />*/}
        {/*</div>*/}

        <div className="col-span-10">
          <Blocks
            data={contentParsed}
            // config={{
            //   code: {
            //     className: "language-js",
            //   },
            //   delimiter: {
            //     className: "border border-2 w-16 mx-auto",
            //   },
            //   embed: {
            //     className: "border-0",
            //   },
            //   header: {
            //     className: "font-bold",
            //   },
            //
            //   image: {
            //     className: "w-full max-w-screen-md",
            //     actionsClassNames: {
            //       stretched: "w-full h-80 object-cover",
            //       withBorder: "border border-2",
            //       withBackground: "p-2",
            //     },
            //   },
            //   list: {
            //     className: "list-inside",
            //   },
            //   paragraph: {
            //     className: "text-base text-opacity-75",
            //     actionsClassNames: {
            //       alignment: "text-{alignment}", // This is a substitution placeholder: left or center.
            //     },
            //   },
            //   quote: {
            //     className: "py-3 px-5 italic font-serif",
            //   },
            //   table: {
            //     className: "table-auto",
            //   },
            // }}
          />
        </div>
      </div>
    </Card>
  )
}
