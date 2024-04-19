import Image from "next/image"
import Blocks from "editorjs-blocks-react-renderer"
import { generateFromString } from "generate-avatar"
import Balancer from "react-wrap-balancer"

import { PostsListResData } from "@/types/posts/res"
import { getMetaData } from "@/lib/utils"
import { Card, CardContent, CardTitle } from "@/components/ui/card"

interface ForumPost {
  post: PostsListResData
}

export function ForumPost({ post }: ForumPost) {
  const contentParsed = JSON.parse(post.content)

  const profilePictureLink = `${process.env.NEXT_PUBLIC_BASE_URL}${post.profile_picture}`

  return (
    <Card>
      <CardTitle className={`group p-4 pb-0`}>
        <div className="flex items-start gap-4">
          <div className="relative size-12 overflow-hidden rounded-full bg-white">
            <Image
              src={
                profilePictureLink
                  ? profilePictureLink
                  : `data:image/svg+xml;utf8,${generateFromString(
                      post.username ? post.username : "Nama"
                    )}`
              }
              alt="User name"
              width={100}
              height={100}
            />
          </div>
          <div className="space-y-1">
            <h2 className={`${"text-sm group-hover:underline"}`}>
              {post.name}
            </h2>
            <p className={`text-sm text-foreground/60`}>{post.username}</p>
          </div>
        </div>
      </CardTitle>
      <CardContent className="p-4 pt-2">
        <div>
          <small className="text-sm text-foreground/60">
            Dibuat saat {getMetaData(post.created_at)}
          </small>
        </div>
        <p className="cst-wrap-text mt-1">
          <Balancer>
            <Blocks data={contentParsed} />
          </Balancer>
        </p>
      </CardContent>
    </Card>
  )
}
