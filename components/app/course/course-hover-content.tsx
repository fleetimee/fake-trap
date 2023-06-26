"use client"

import { CourseData } from "@/types/course-res"
import { convertDatetoString } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { HoverCardContent } from "@/components/ui/hover-card"
import { Icons } from "@/components/icons"

export function CourseHoverContent(props: { data: CourseData }) {
  return (
    <HoverCardContent className="w-80">
      <div className="flex justify-between space-x-4">
        <Avatar className="aspect-auto w-1/6 object-cover">
          <AvatarImage src={props.data.image} />
          <AvatarFallback>VC</AvatarFallback>
        </Avatar>
        <div className="w-5/6 space-y-1">
          <h4 className="text-sm font-semibold">Detail Kursus</h4>
          <p className="text-sm">{props.data.course_desc}</p>
          <div className="flex items-center pt-2">
            <Icons.calendar className="mr-2 h-4 w-4 opacity-70" />{" "}
            <span className="text-xs text-muted-foreground">
              Mulai {convertDatetoString(props.data.date_start.toString())}
            </span>
          </div>
          <div className="flex items-center pt-2">
            <Icons.bookmark className="mr-2 h-4 w-4 opacity-70" />{" "}
            <span className="text-xs text-muted-foreground">
              Selesai {convertDatetoString(props.data.date_end.toString())}
            </span>
          </div>
        </div>
      </div>
    </HoverCardContent>
  )
}
