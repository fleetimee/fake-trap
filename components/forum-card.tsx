import Link from "next/link"

import { convertDatetoString } from "@/lib/utils"

import { Icons } from "./icons"
import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card"

interface ForumCardProps {
  idCourse: string
  idThreads: string
  title: string
  createdAt: string
  numberOfUsers: number
  numberOfPosts: number
  linkString: string
}

export function ForumCard({ ...props }: ForumCardProps) {
  return (
    <Card key={props.idThreads} className="rounded-md">
      <CardHeader>
        <Link
          href={{
            pathname: props.linkString,
          }}
        >
          <CardTitle className="block -translate-x-2 -translate-y-2 rounded-md border-2 border-black bg-primary p-4 font-bold text-white hover:-translate-y-3 active:translate-x-0 active:translate-y-0 dark:text-black 2xl:text-2xl">
            {props.title}
          </CardTitle>
        </Link>
        <CardDescription className="grid grid-cols-2 justify-between text-sm text-muted-foreground">
          <div className="inline-flex items-center text-xs font-semibold text-primary 2xl:text-xl">
            <Icons.clock className="mr-2 h-4 w-4" />
            {convertDatetoString(new Date(props.createdAt).toString())}
          </div>

          <div className="flex items-center justify-end">
            <div className="grid grid-cols-2 justify-between">
              <div className="mr-2 inline-flex">
                <Icons.user className="mr-2 h-4 w-4 2xl:h-8 2xl:w-8" />
                {props.numberOfUsers}
              </div>

              <div className="inline-flex ">
                <Icons.comment className="mr-2 h-4 w-4 2xl:h-8 2xl:w-8" />
                {props.numberOfUsers}
              </div>
            </div>
          </div>
        </CardDescription>
      </CardHeader>
    </Card>
  )
}
