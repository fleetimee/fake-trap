/* eslint-disable @next/next/no-img-element */
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"

import { CourseAvailability } from "@/lib/enums/status"
import { cn, getCourseStatus } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button, buttonVariants } from "@/components/ui/button"
import { Card, CardFooter } from "@/components/ui/card"

export interface CourseCardV2Props {
  courseId: string
  courseTitle: string
  courseDescription: string
  courseDate: string
  courseImage: string
  courseAuthor: string
  startDate: Date
  endDate: Date
}

export interface CardBodyProps {
  title: string
  description: string
  className?: string
  status?: CourseAvailability
}

const CardBody = ({
  title,
  description,
  className = "p-4",
  status,
}: CardBodyProps) => (
  <div className={cn(className)}>
    <Badge variant="outline" className="max-w-max text-white">
      {status}
    </Badge>

    <h3 className="mb-2 mt-3 truncate text-2xl font-bold tracking-tighter text-gray-100">
      {title}
    </h3>
    <p className="truncate text-gray-100">{description}</p>
  </div>
)

export default function CourseCardV2({
  courseTitle,
  courseDescription,
  courseImage,
  ...props
}: CourseCardV2Props) {
  const courseStatus = getCourseStatus({
    dateStart: props.startDate,
    dateEnd: props.endDate,
  })

  return (
    <Link href={`/peserta/course/detail/${props.courseId}`} passHref>
      <div className="group relative aspect-[4/3] overflow-hidden rounded-2xl">
        <Image
          fill
          className="m-0 w-full object-cover"
          src={`${process.env.NEXT_PUBLIC_BASE_URL}${courseImage}`}
          alt={courseTitle}
          placeholder="blur"
          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkAAIAAAoAAv/lxKUAAAAASUVORK5CYII="
        />
        {/* overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/70 to-black/10"></div>
        <CardBody
          title={courseTitle}
          description={courseDescription}
          className="absolute inset-0 flex size-full flex-col justify-end p-4 "
          status={courseStatus}
        />
      </div>
    </Link>
  )
}
