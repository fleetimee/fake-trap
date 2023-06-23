import { get } from "http"
import Image from "next/image"

import { Knowledge } from "@/types/knowledge-res"
import { getCourse } from "@/lib/fetcher/course/course-fetcher"
import { getKnowledge } from "@/lib/fetcher/knowledge/knowledge-fetcher"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { CreateButton } from "@/components/create-button"
import { CreateCourseButton } from "@/components/create-course-sheet"
import { DashboardHeader } from "@/components/header"
import { DashboardShell } from "@/components/shell"

export const metadata = {
  title: "Kursus",
  description: "Kursus yang tersedia di e-learning",
}

export default async function CoursePage() {
  const dataCourse = getCourse(1000)
  const dataKnowledge = getKnowledge(1000)

  const [courseResp, knowledgeResp] = await Promise.all([
    dataCourse,
    dataKnowledge,
  ])

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Kursus"
        description="Kursus yang tersedia di e-learning"
      >
        <CreateCourseButton data={knowledgeResp} />
      </DashboardHeader>
      <div className="grid grid-cols-1 grid-rows-3 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {courseResp.data.map((item) => (
          <Card
            className="flex flex-col items-start justify-center hover:bg-accent hover:text-accent-foreground"
            key={item.id_course}
          >
            <CardHeader className="h-22 w-full flex-none">
              <p className="line-clamp-2 font-heading text-lg lg:text-xl">
                {item.course_name}
              </p>
            </CardHeader>
            <CardContent className="flex-none">
              <Image
                src={item.image}
                alt="Picture of the author"
                width={1200}
                height={1200}
                className="aspect-video flex-none rounded-lg object-cover"
              />
            </CardContent>
          </Card>
        ))}
      </div>
    </DashboardShell>
  )
}
