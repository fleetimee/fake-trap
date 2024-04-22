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
    // <Card key={props.idThreads} className="rounded-md">
    //   <CardHeader>
    //     <Link
    //       href={{
    //         pathname: props.linkString,
    //       }}
    //     >
    //       <CardTitle className="block -translate-x-2 -translate-y-2 rounded-md border-2 border-black bg-primary p-4 font-bold text-white hover:-translate-y-3 active:translate-x-0 active:translate-y-0 dark:text-black 2xl:text-2xl">
    //         {props.title}
    //       </CardTitle>
    //     </Link>
    //     <CardDescription className="grid grid-cols-2 justify-between text-sm text-muted-foreground">
    //       <div className="inline-flex items-center text-xs font-semibold text-primary 2xl:text-xl">
    //         <Icons.clock className="mr-2 h-4 w-4" />
    //         {convertDatetoString(new Date(props.createdAt).toString())}
    //       </div>

    //       <div className="flex items-center justify-end">
    //         <div className="grid grid-cols-2 justify-between">
    //           <div className="mr-2 inline-flex">
    //             <Icons.user className="mr-2 h-4 w-4 2xl:h-8 2xl:w-8" />
    //             {props.numberOfUsers}
    //           </div>

    //           <div className="inline-flex ">
    //             <Icons.comment className="mr-2 h-4 w-4 2xl:h-8 2xl:w-8" />
    //             {props.numberOfUsers}
    //           </div>
    //         </div>
    //       </div>
    //     </CardDescription>
    //   </CardHeader>
    // </Card>

    <Card>
      <CardTitle className={`$ group p-4 pb-0`}>
        <div className="flex items-start gap-4">
          <Avatar className="rounded-md">
            <AvatarImage
              src={`data:image/svg+xml;utf8,${generateFromString(props.idThreads)}`}
            />
            <AvatarFallback className="rounded-md">{"A"}</AvatarFallback>
          </Avatar>

          <div className="space-y-1 text-sm">
            <h2 className={`group-hover:underline"}`}>Anonim</h2>

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
