import Link from "next/link"

import { UserEnrolledCourseListRes } from "@/types/me/res"
import { CourseListCard } from "@/components/app/me/ui"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

interface CourseContainerCardProps {
  enrolledCourseList: UserEnrolledCourseListRes
}

export function CourseContainerCard({
  enrolledCourseList,
}: CourseContainerCardProps) {
  return (
    <Card className="col-span-7 flex min-h-[300px] w-full flex-col gap-8 p-4">
      <div className="flex items-center justify-between">
        <h1 className="font-heading text-2xl font-light">
          Pelatihan Yang Diikuti
        </h1>

        <Link href={`/dashboard/me/course`}>
          <Button variant="outline">Lihat semua</Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 items-start justify-between gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {enrolledCourseList.data?.map((datum) => (
          <CourseListCard course={datum} key={datum.id_course} />
        ))}
      </div>
    </Card>
  )
}
