import Image from "next/image"
import { Activity, CreditCard, DollarSign, Users } from "lucide-react"

import { getNewestCourse } from "@/lib/fetcher/course/course-fetcher"
import { getNewestKnowledge } from "@/lib/fetcher/knowledge/knowledge-fetcher"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import CardDashboard from "@/components/card-dashboard"
import { CardDashboardIndicator } from "@/components/card-dashboard-indicator"
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
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <CardDashboardIndicator
          title="User"
          icon="gitHub"
          content="100"
          description="User yang terdaftar"
        />
        <CardDashboardIndicator
          title="User"
          icon="gitHub"
          content="100"
          description="User yang terdaftar"
        />
        <CardDashboardIndicator
          title="User"
          icon="gitHub"
          content="100"
          description="User yang terdaftar"
        />
        <CardDashboardIndicator
          title="User"
          icon="gitHub"
          content="100"
          description="User yang terdaftar"
        />
      </div>
      <div className="flex flex-col items-center justify-between gap-6 md:grid lg:grid-cols-2">
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
