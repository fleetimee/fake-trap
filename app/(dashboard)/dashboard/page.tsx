import Image from "next/image"

import { getNewestCourse } from "@/lib/fetcher/course/course-fetcher"
import { getNewestKnowledge } from "@/lib/fetcher/knowledge/knowledge-fetcher"
import CardDashboard from "@/components/card-dashboard"
import { DashboardHeader } from "@/components/header"
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

      <div className="flex flex-col items-center justify-center gap-6 md:grid lg:grid-cols-2">
        <div className="h-full">
          <CardDashboard
            icon="knowledge"
            title="Pengetahuan Baru"
            name={newKnowledge.data.knowledge_title}
            image={newKnowledge.data.image}
          />
        </div>
        <div className="h-full">
          <CardDashboard
            icon="course"
            title="Kursus Baru"
            name={newCourse.data.course_name}
            image={newCourse.data.image}
          />
        </div>
      </div>
    </DashboardShell>
  )
}
