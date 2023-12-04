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
}

export function ForumCard({ ...props }: ForumCardProps) {
  return (
    <Card key={props.idThreads}>
      <CardHeader>
        <Link
          href={{
            pathname: `/member-area/course/${props.idCourse}/threads/${props.idThreads}`,
          }}
        >
          <CardTitle className="font-heading text-lg font-bold hover:text-blue-600 hover:underline">
            {props.title}
          </CardTitle>
        </Link>
        <CardDescription className="grid grid-cols-2 justify-between text-sm text-muted-foreground">
          <div className="inline-flex items-center text-primary">
            <Icons.clock className="mr-2 h-4 w-4" />
            {convertDatetoString(new Date(props.createdAt).toString())}
          </div>

          <div className="flex items-center justify-end">
            <div className="grid grid-cols-2 justify-between">
              <div className="mr-2 inline-flex text-green-500">
                <Icons.user className="mr-2 h-4 w-4" />
                {props.numberOfUsers}
              </div>

              <div className="inline-flex text-red-600">
                <Icons.comment className="mr-2 h-4 w-4" />
                {props.numberOfUsers}
              </div>
            </div>
          </div>
        </CardDescription>
      </CardHeader>
    </Card>
  )
}
