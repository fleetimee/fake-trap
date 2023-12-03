"use client"

import Image from "next/image"
import Link from "next/link"

import { CourseData } from "@/types/course-res"
import { Knowledge } from "@/types/knowledge-res"
import { CourseHoverContent } from "@/components/app/course/ui/course-hover-content"
import { DeleteCourseButton } from "@/components/app/course/ui/delete-course-sheet"
import { EditCourseButton } from "@/components/app/course/ui/edit-course-sheet"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { HoverCard, HoverCardTrigger } from "@/components/ui/hover-card"





export default function CourseGrid(props: {
  data: CourseData
  dataKnowledge: Knowledge
}) {
  return (
    <HoverCard>
      <HoverCardTrigger>
        <Card
          className="flex flex-col items-start justify-center hover:bg-accent hover:text-accent-foreground"
          key={props.data.id_course}
        >
          {props.data.date_end < new Date() ? (
            <Badge className="ml-4 mt-4 w-20 items-center justify-center text-center">
              Test
            </Badge>
          ) : (
            <Badge
              variant="destructive"
              className="ml-4 mt-4 w-20 items-center justify-center text-center"
            >
              Selesai
            </Badge>
          )}

          <CardHeader className="h-22 w-full flex-none">
            <Link
              href={`/dashboard/course/${props.data.id_course}`}
              className="font-semibold hover:underline"
            >
              <p className="line-clamp-2 font-heading text-lg lg:text-xl">
                {props.data.course_name}
              </p>
            </Link>
          </CardHeader>
          <CardContent className="flex flex-col">
            <Image
              src={props.data.image}
              alt="Picture of the author"
              width={1200}
              height={1200}
              className="aspect-video flex-none rounded-lg object-cover grayscale transition-all hover:scale-105 hover:grayscale-0 "
            />
            <section className="flex flex-col justify-center pt-6">
              <div className="flex flex-row items-end justify-end">
                <EditCourseButton
                  data={props.data}
                  dataKnowledge={props.dataKnowledge}
                />
                <DeleteCourseButton item={props.data} />
              </div>
            </section>
          </CardContent>
        </Card>
      </HoverCardTrigger>
      <CourseHoverContent data={props.data} />
    </HoverCard>
  )
}
