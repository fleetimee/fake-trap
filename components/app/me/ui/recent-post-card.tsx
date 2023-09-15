import Link from "next/link"

import { UserRecentPostListRes } from "@/types/me/res"
import { convertDatetoStringShort } from "@/lib/utils"
import { Card } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"

interface RecentPostCardProps {
  recentPostList: UserRecentPostListRes
}

export function RecentPostCard({ recentPostList }: RecentPostCardProps) {
  return (
    <Card className="col-span-7 min-h-[350px] gap-4 p-4 lg:col-span-3">
      <h1 className="font-heading text-2xl font-light">Post Terbaru</h1>

      <ScrollArea className="h-[280px] w-full space-y-3 rounded-md border">
        <div className="grid grid-cols-1 items-start justify-between gap-4  p-4 ">
          {recentPostList.data ? (
            recentPostList.data.map((post) => (
              <div
                key={post.id_post}
                className="grid grid-cols-6 items-start justify-between"
              >
                <div className="col-span-5 text-xs">
                  <span className="font-heading uppercase">
                    {post.username}
                  </span>{" "}
                  baru saja membuat post baru pada forum{" "}
                  <span className="font-semibold underline hover:text-blue-600">
                    <Link
                      href={`/dashboard/course/${post.id_course}/forum/${post.id_threads}`}
                      target={"_blank"}
                    >
                      {post.threads_title}
                    </Link>
                  </span>{" "}
                </div>
                <p className="col-span-1 place-items-end text-xs font-light">
                  {convertDatetoStringShort(
                    new Date(post.created_at).toString()
                  )}
                </p>
                <Separator className="col-span-6 my-2" />
              </div>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center text-center">
              <p className="text-sm text-gray-500">Belum ada post</p>
            </div>
          )}
        </div>
      </ScrollArea>
    </Card>
  )
}
