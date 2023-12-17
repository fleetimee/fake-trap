import Link from "next/link"

import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import { Card, CardFooter } from "@/components/ui/card"

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
