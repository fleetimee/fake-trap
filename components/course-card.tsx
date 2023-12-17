import Image from "next/image"
import Link from "next/link"

import { CourseListResData } from "@/types/course/res"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Button, buttonVariants } from "@/components/ui/button"
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { Avatar } from "./ui/avatar"
import { Badge } from "./ui/badge"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"

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

interface CourseCardV2Props {
  courseId: string
  courseTitle: string
  courseDescription: string
  courseDate: string
  courseImage: string
  courseAuthor: string
}

export default function CourseCardV2({ ...props }: CourseCardV2Props) {
  return (
    <>
      <Card className=" flex w-full max-w-md flex-col justify-between overflow-hidden rounded-xl border-2 bg-white shadow-md hover:border-primary sm:w-[30rem] md:max-w-2xl xl:h-[300px]">
        <div className="md:flex">
          <div className="md:shrink-0">
            <img
              alt="Man looking at item at a store"
              className="h-48 w-full object-cover md:h-full md:w-48"
              height="48"
              src={`${process.env.NEXT_PUBLIC_BASE_URL}${props.courseImage}`}
              style={{
                aspectRatio: "48/48",
                objectFit: "cover",
              }}
              width="48"
            />
          </div>
          <div className="p-8">
            <Badge className="mb-4 inline-block rounded-full bg-indigo-100 px-2 text-sm text-indigo-800">
              Quote of the day
            </Badge>
            <a
              className="mt-1 line-clamp-2 block text-lg font-medium leading-tight text-black hover:underline"
              href="#"
            >
              {props.courseTitle}
            </a>
            <p className="mt-2 line-clamp-2 text-gray-500">
              {props.courseDescription}
            </p>
          </div>
        </div>

        <CardFooter className="flex items-center justify-between border-t border-gray-200 bg-gray-50 p-6">
          <div className="text-sm">
            <p className="font-semibold leading-none text-gray-900">
              {props.courseAuthor}
            </p>
            <p className="text-gray-600">{props.courseDate}</p>
          </div>
          <div className="flex items-center space-x-1">
            {/* <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline">Ke Pelatihan</Button>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div className="p-4">
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    The answer to the quote is here.
                  </p>
                </div>
              </PopoverContent>
            </Popover> */}

            <Link
              href={`/peserta/course/detail/${props.courseId}`}
              className={buttonVariants({
                variant: "outline",
              })}
            >
              Ke Pelatihan
            </Link>
          </div>
        </CardFooter>
      </Card>
    </>
  )
}
