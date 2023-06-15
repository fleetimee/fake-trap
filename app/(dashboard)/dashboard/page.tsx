import Image from "next/image"

import { getNewestCourse } from "@/lib/fetcher/course/course-fetcher"
import { getNewestKnowledge } from "@/lib/fetcher/knowledge/knowledge-fetcher"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { DashboardHeader } from "@/components/header"
import NewCourseCard from "@/components/new-course"
import NewKnowledgeCard from "@/components/new-knowledge"
import { DashboardShell } from "@/components/shell"

export default async function DashboardPage() {
  const newestKnowledge = getNewestKnowledge()
  const newestCourse = getNewestCourse()

  const [newKnowledge, newCourse] = await Promise.all([
    newestKnowledge,
    newestCourse,
  ])

  console.log(newCourse)

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Dashboard"
        description="Selamat datang di e-learning"
      />

      <div className="flex flex-col items-center justify-center gap-12 md:grid lg:grid-cols-2">
        <div className="h-full">
          <NewKnowledgeCard
            knowledgeName={newKnowledge.data.knowledge_title}
            knowledgeDescription={newKnowledge.data.description}
            knowledgeImage={newKnowledge.data.image}
          />
        </div>
        <div className="h-full">
          <NewCourseCard
            courseName={newCourse.data.course_name}
            courseImage={newCourse.data.image}
            courseDescription={newCourse.data.course_desc}
          />
        </div>
      </div>
    </DashboardShell>
  )
}
