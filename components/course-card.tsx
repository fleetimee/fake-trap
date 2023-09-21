import Image from "next/image"
import Link from "next/link"

import { CourseListResData } from "@/types/course/res"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { buttonVariants } from "@/components/ui/button"
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

interface CourseCardProps {
  courseResponse: CourseListResData
  link: string
}

export function CourseCard({ link, courseResponse }: CourseCardProps) {
  return (
    <>
      <Card className="grid h-full max-h-fit min-h-[25rem] flex-col overflow-hidden">
        <AspectRatio ratio={16 / 9}>
          <div className="absolute inset-0 bg-gradient-to-t from-transparent to-zinc-950/50" />

          <Image
            className="h-full rounded-t-md border-b"
            src={courseResponse.image}
            alt={courseResponse.id_course.toString()}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            fill
            loading="lazy"
          />
        </AspectRatio>
        <div className="flex flex-col justify-between">
          <CardHeader>
            <CardTitle className="line-clamp-1 text-lg">
              {courseResponse.course_name}
            </CardTitle>
            {courseResponse.course_desc ? (
              <CardDescription className="line-clamp-2">
                {courseResponse.course_desc}
              </CardDescription>
            ) : null}
          </CardHeader>
          <CardFooter>
            <Link
              href={link}
              className={buttonVariants({
                size: "lg",
                variant: "outline",
                className: "w-full",
              })}
            >
              Lihat Pelatihan
            </Link>
          </CardFooter>
        </div>
      </Card>
      <span className="sr-only">{courseResponse.course_name}</span>
    </>
  )
}
