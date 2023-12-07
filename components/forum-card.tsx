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
          <CardTitle className="block -translate-x-2 -translate-y-2 rounded-md border-2 border-black bg-yellow-500 p-4 text-2xl font-bold hover:-translate-y-3 active:translate-x-0 active:translate-y-0">
            {props.title}
          </CardTitle>
        </Link>
        <CardDescription className="grid grid-cols-2 justify-between text-sm text-muted-foreground">
          <div className="inline-flex items-center text-xl font-semibold text-primary">
            <Icons.clock className="mr-2 h-4 w-4" />
            {convertDatetoString(new Date(props.createdAt).toString())}
          </div>

          <div className="flex items-center justify-end">
            <div className="grid grid-cols-2 justify-between">
              <div className="mr-2 inline-flex text-green-500">
                <Icons.user className="mr-2 h-8 w-8" />
                {props.numberOfUsers}
              </div>

              <div className="inline-flex text-red-600">
                <Icons.comment className="mr-2 h-8 w-8" />
                {props.numberOfUsers}
              </div>
            </div>
          </div>
        </CardDescription>
      </CardHeader>
    </Card>
  )
}
