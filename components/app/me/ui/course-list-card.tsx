import Image from "next/image"
import Link from "next/link"

import { UserEnrolledCourseListResData } from "@/types/me/res"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

interface CourseLisCardtProps
  extends React.ComponentPropsWithoutRef<typeof Card> {
  course: UserEnrolledCourseListResData
}

export function CourseListCard({
  course,
  className,
  ...props
}: CourseLisCardtProps) {
  return (
    <Link href={`/dashboard/course/${course.id_course}`}>
      <Card className="h-full max-h-fit min-h-[280px] overflow-hidden">
        <AspectRatio ratio={16 / 9}>
          <div className="absolute inset-0 bg-gradient-to-t from-transparent to-zinc-950/50" />
          <Image
            src={`${process.env.NEXT_PUBLIC_BASE_URL}${course.image}`}
            alt={course.id_course.toString()}
            width="0"
            height="0"
            sizes="100vw"
            className="h-full w-full rounded-t-md border-b"
          />
        </AspectRatio>
        <CardHeader>
          <CardTitle className="line-clamp-1 text-lg">
            {course.course_name}
          </CardTitle>
          <CardDescription className="line-clamp-2">
            {course.course_desc}
          </CardDescription>
        </CardHeader>
      </Card>
      <span className="sr-only">{course.course_name}</span>
    </Link>
  )
}
