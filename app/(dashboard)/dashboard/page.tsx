import { getCourse, getNewestCourse } from "@/lib/fetcher/course/course-fetcher"
import {
  getKnowledge,
  getNewestKnowledge,
} from "@/lib/fetcher/knowledge/knowledge-fetcher"
import { getUser } from "@/lib/fetcher/user/user-fetcher"
import { CardDashboard } from "@/components/card-dashboard"
import { CardDashboardIndicator } from "@/components/card-dashboard-indicator"
import { DashboardHeader } from "@/components/header"
import { DashboardShell } from "@/components/shell"

/**
 * Dashboard page component that displays user, knowledge, course, and quiz information.
 * @returns {JSX.Element} The dashboard page component.
 */
export default async function DashboardPage() {
  const userList = getUser()
  const knowledgeList = getKnowledge(6)
  const courseList = getCourse(6)
  const newestKnowledge = getNewestKnowledge()
  const newestCourse = getNewestCourse()

  const [newKnowledgeResp, newCourseResp, userResp, knowledgeResp, courseResp] =
    await Promise.all([
      newestKnowledge,
      newestCourse,
      userList,
      knowledgeList,
      courseList,
    ])

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Dashboard"
        description="Selamat datang di e-learning"
      />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <CardDashboardIndicator
          title="User"
          icon="user"
          content={userResp.count}
          description="User yang terdaftar"
        />
        <CardDashboardIndicator
          title="Pengetahuan"
          icon="knowledge"
          content={knowledgeResp.count}
          description="Pengetahuan yang tersedia"
        />
        <CardDashboardIndicator
          title="Kursus"
          icon="course"
          content={courseResp.count}
          description="Kursus yang dibuat"
        />
        <CardDashboardIndicator
          title="Quiz"
          icon="gitHub"
          content={400}
          description="User yang terdaftar"
        />
      </div>
      <div className="flex flex-col items-center justify-between gap-6 md:grid lg:grid-cols-2">
        <div className="h-full">
          <CardDashboard
            icon="knowledge"
            title="Pengetahuan Baru"
            name={newKnowledgeResp.data.knowledge_title}
            image={newKnowledgeResp.data.image}
          />
        </div>
        <div className="h-full">
          <CardDashboard
            icon="course"
            title="Kursus Baru"
            name={newCourseResp.data.course_name}
            image={newCourseResp.data.image}
          />
        </div>
      </div>
    </DashboardShell>
  )
}
