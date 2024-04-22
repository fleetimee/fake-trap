import Link from "next/link"
import { generateFromString } from "generate-avatar"
import { MessagesSquare } from "lucide-react"
import Balancer from "react-wrap-balancer"

import { getMetaData } from "@/lib/utils"
import { Icons } from "@/components/icons"
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card"

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { Button } from "../ui/button"
import { Separator } from "../ui/separator"
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip"

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
    <Card>
      <CardTitle className={`$ group p-4 pb-0`}>
        <div className="flex items-start gap-4">
          <Avatar>
            <AvatarImage
              src={`data:image/svg+xml;utf8,${generateFromString(props.idThreads)}`}
            />
            <AvatarFallback className="rounded-md">{"A"}</AvatarFallback>
          </Avatar>

          <div className="space-y-1 text-sm">
            <h2 className={`group-hover:underline"}`}>ANONIM</h2>

            <p className="text-foreground/60">anonim</p>
          </div>
        </div>
      </CardTitle>

      <CardContent className="p-4 pt-2">
        <div>
          <small className="text-sm text-foreground/60">
            Dibuat saat {getMetaData(props.createdAt)}
          </small>
        </div>
        <p className="cst-wrap-text mt-1">
          <Balancer>{props.title}</Balancer>
        </p>
      </CardContent>

      <CardFooter className="flex-col items-start p-0 pb-2">
        <Separator className="mb-2" />

        <div className="space-x-2 px-4 py-2">
          <Link href={props.linkString}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="default" className="space-x-2">
                  <MessagesSquare className="aspect-square w-5" />
                  <span>{props.numberOfPosts}</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>Jumlah balasan yang diberikan</TooltipContent>
            </Tooltip>
          </Link>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" size="default" className="space-x-2">
                <Icons.user className="aspect-square w-5" />
                <span>{props.numberOfUsers}</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Jumlah user yang terlibat</TooltipContent>
          </Tooltip>
        </div>
      </CardFooter>
    </Card>
  )
}
