import Image from "next/image"
import Link from "next/link"
import { redirect } from "next/navigation"
import { generateFromString } from "generate-avatar"
import { MessageCircle, MessageSquare, Reply } from "lucide-react"
import Balancer from "react-wrap-balancer"

import { authOptions } from "@/lib/auth"
import { getPostsList } from "@/lib/fetcher/post-fetcher"
import { getOneThread } from "@/lib/fetcher/threads-fetcher"
import { getCurrentUser } from "@/lib/session"
import { getMetaData } from "@/lib/utils"
import { ForumPost } from "@/components/cards/forum-posts-card"
import { Icons } from "@/components/icons"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { buttonVariants } from "@/components/ui/button"
import { Card, CardContent, CardTitle } from "@/components/ui/card"

interface ThreadPageProps {
  params: {
    idCourse: string
    idThreads: string
  }
}

export default async function ThreadPage({ params }: ThreadPageProps) {
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  const [thread, posts] = await Promise.all([
    getOneThread({
      token: user.token,
      idThreads: params.idThreads,
    }),
    getPostsList({
      token: user.token,
      idThreads: params.idThreads,
      limit: 1000,
      page: 1,
    }),
  ])

  return (
    <>
      <div className="flex flex-col justify-between gap-8">
        <div className="inline-flex w-fit items-center rounded-lg border-2 border-black bg-blue-100 px-4 py-2 text-xl font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0)] dark:border-slate-800 dark:bg-blue-950/50 dark:shadow-[4px_4px_0px_0px_rgba(148,163,184)]">
          <MessageSquare className="mr-2 h-5 w-5" />
          Thread Starter
        </div>

        <Card className="relative border-2 border-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0)] dark:border-slate-800 dark:bg-slate-950 dark:shadow-[4px_4px_0px_0px_rgba(148,163,184)]">
          <div className="absolute right-0 top-0 h-8 w-8 rotate-12 bg-blue-500/20" />
          <CardTitle className="relative p-4 pb-0">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className="relative size-12 overflow-hidden rounded-full bg-white">
                  <Image
                    src={
                      thread.data.profile_picture
                        ? `${process.env.NEXT_PUBLIC_BASE_URL}${thread.data.profile_picture}`
                        : `data:image/svg+xml;utf8,${generateFromString(
                            thread.data.username || "Nama"
                          )}`
                    }
                    alt={thread.data.username || "User"}
                    width={100}
                    height={100}
                    className="object-cover object-top"
                  />
                </div>

                <div className="space-y-1 text-sm">
                  <h2 className="text-sm">{thread.data.name}</h2>
                  <p className="text-foreground/60">@{thread.data.username}</p>
                </div>
              </div>
            </div>
          </CardTitle>

          <CardContent className="relative p-4 pt-2">
            <div className="mb-2">
              <small className="inline-block rounded-lg border-2 border-black bg-yellow-100 px-3 py-1 text-sm font-medium dark:border-slate-800 dark:bg-yellow-100/20">
                Dibuat saat {getMetaData(thread.data.created_at)}
              </small>
            </div>
            <p className="cst-wrap-text mt-1 text-lg font-medium">
              {thread.data.threads_title}
            </p>
          </CardContent>
        </Card>

        <div className="inline-flex w-fit items-center rounded-lg border-2 border-black bg-green-100 px-4 py-2 text-xl font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0)] dark:border-slate-800 dark:bg-green-950/50 dark:shadow-[4px_4px_0px_0px_rgba(148,163,184)]">
          <Reply className="mr-2 h-5 w-5" />
          Balasan
        </div>

        {posts.data?.map((post) => (
          <ForumPost key={post.id_post} post={post} />
        ))}

        <div className="flex justify-end">
          <Link
            href={`/editor/${params.idThreads}`}
            className={buttonVariants({
              variant: "outline",
              size: "lg",
              className:
                "flex w-[200px] border-2 border-black bg-white font-medium shadow-[4px_4px_0px_0px_rgba(0,0,0)] transition-all hover:-translate-y-0.5 hover:bg-blue-100 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0)] dark:border-slate-800 dark:bg-slate-900 dark:shadow-[4px_4px_0px_0px_rgba(148,163,184)] dark:hover:bg-blue-900",
            })}
          >
            <Icons.comment className="mr-2 h-4 w-4" />
            Balas
          </Link>
        </div>
      </div>

      {/* Floating Reply Button */}
      <div className="fixed bottom-8 right-8">
        <Link
          href={`/editor/${params.idThreads}`}
          className={buttonVariants({
            variant: "outline",
            size: "lg",
            className:
              "flex items-center gap-2 rounded-full border-2 border-black bg-white font-medium shadow-[4px_4px_0px_0px_rgba(0,0,0)] hover:-translate-y-0.5 hover:bg-blue-100 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0)] dark:border-slate-800 dark:bg-slate-900 dark:shadow-[4px_4px_0px_0px_rgba(148,163,184)] dark:hover:bg-blue-900",
          })}
        >
          <MessageCircle className="h-5 w-5" />
          <span className="hidden sm:inline">Balas Cepat</span>
        </Link>
      </div>
    </>
  )
}
