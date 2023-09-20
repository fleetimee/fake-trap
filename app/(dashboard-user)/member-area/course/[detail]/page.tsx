import { DashboardShell } from "@/components/shell"

interface MemberCourseDetailPageProps {
  params: {
    detail: string
  }
}

export default async function MemberCourseDetailPage({
  params,
}: MemberCourseDetailPageProps) {
  return (
    <DashboardShell>
      <p className="prose">Detail Course {params.detail}</p>
    </DashboardShell>
  )
}
