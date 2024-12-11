/* eslint-disable tailwindcss/migration-from-tailwind-2 */
/* eslint-disable @next/next/no-img-element */
import Image from "next/image"
import Link from "next/link"

import { CourseAvailability } from "@/lib/enums/status"
import { cn, getCourseStatus } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"

import { CountdownTimer } from "../countdown-timer"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "../ui/hover-card"

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

const getStatusColor = (status: CourseAvailability) => {
  switch (status) {
    case CourseAvailability.ACTIVE:
      return "bg-green-500/20 text-green-500 hover:bg-green-500/30"
    case CourseAvailability.OVER:
      return "bg-red-500/20 text-red-500 hover:bg-red-500/30"
    case CourseAvailability.SOON:
      return "bg-blue-500/20 text-blue-500 hover:bg-blue-500/30"
    default:
      return "bg-gray-500/20 text-gray-500 hover:bg-gray-500/30"
  }
}

const CardBody = ({
  title,
  description,
  className = "p-4",
  status,
}: CardBodyProps) => (
  <div className={cn(className)}>
    <Badge
      variant="outline"
      className={cn("max-w-max", getStatusColor(status!))}
    >
      {status}
    </Badge>

    <h3 className="mb-2 mt-3 truncate text-2xl font-bold tracking-tighter text-gray-100">
      {title}
    </h3>
    <p className="truncate text-gray-100">{description}</p>
  </div>
)

const isCourseActive = (status: CourseAvailability) =>
  status === CourseAvailability.ACTIVE

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
    <HoverCard>
      <HoverCardTrigger asChild>
        <Link href={`/peserta/course/detail/${props.courseId}`} passHref>
          <div className="group relative aspect-[4/3] overflow-hidden rounded-2xl">
            <Image
              fill
              className={cn("m-0 w-full object-cover", {
                "grayscale filter": !isCourseActive(courseStatus), // Step 2: Use cn for conditional classes
              })}
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
            {/* Countdown Timer with "Deadline" */}
            <div className="absolute left-4 top-4 rounded-lg bg-white/80 px-2 py-1">
              <CountdownTimer endDate={new Date(props.endDate)} />{" "}
              {/* Example deadline date */}
            </div>
          </div>
        </Link>
      </HoverCardTrigger>
      <HoverCardContent className="w-full">
        <div className="flex w-full flex-col space-y-4 p-4">
          <h3 className="text-xl font-bold">{courseTitle}</h3>
          <div>
            <table className="w-full text-gray-500">
              <tbody>
                <tr>
                  <td className="pr-2">Mulai</td>
                  <td className="px-1">:</td>
                  <td>
                    {new Date(props.startDate).toLocaleString("id-ID", {
                      weekday: "long",
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </td>
                </tr>
                <tr>
                  <td className="pr-2">Deadline</td>
                  <td className="px-1">:</td>
                  <td>
                    {new Date(props.endDate).toLocaleString("id-ID", {
                      weekday: "long",
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  )
}
