import { generateFromString } from "generate-avatar"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

interface ProfileCardProps {
  username: string
  email: string
  numberOfPost: number
  numberOfCourse: number
  numberOfQuiz: number
}

export function ProfileCard({ ...props }: ProfileCardProps) {
  return (
    <Card className="col-span-7 flex  h-auto min-h-[350px] w-auto min-w-[250px] flex-col gap-6 p-4  lg:col-span-2">
      <h1 className="font-heading text-2xl font-light">Data User</h1>

      <div className="flex items-start justify-start gap-6 space-y-4">
        <Avatar className="h-20 w-20">
          <AvatarImage
            src={`data:image/svg+xml;utf8,${generateFromString(
              props.username
            )}`}
          />
          <AvatarFallback />
        </Avatar>

        <div className="flex flex-col items-start justify-between gap-1 ">
          <span className=" text-xl font-semibold">{props.username}</span>
          <span className=" text-sm font-semibold">{props.email}</span>
        </div>
      </div>

      <Separator className="my-1" />

      <div className="grid grid-cols-2 items-start justify-between">
        <div className="grid grid-cols-1 items-start gap-1">
          <span className="font-heading text-xs ">Jumlah Post</span>
          <span className="text-xl font-semibold">{props.numberOfPost}</span>
        </div>

        <div className="grid grid-cols-1 items-start gap-1">
          <span className="font-heading text-xs">Jumlah Kursus</span>
          <span className="text-xl font-semibold">{props.numberOfCourse}</span>
        </div>
      </div>

      <div className="grid grid-cols-2 items-start justify-between">
        <div className="grid grid-cols-1 items-start gap-1">
          <span className="font-heading text-xs ">Kuis Yang Dijawab</span>
          <span className="text-xl font-semibold">{props.numberOfQuiz}</span>
        </div>
      </div>
    </Card>
  )
}
