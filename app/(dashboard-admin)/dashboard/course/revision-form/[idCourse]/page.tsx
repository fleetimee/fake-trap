import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Revisi Pelatihan",
  description: "Revisi Pelatihan",
}

interface CourseRevisionProps {
  params: {
    idCourse: string
  }
}

interface GetOneApprovalCourseProps {
  token: string | undefined
  idCourse: number
}

async function getOneApprovalCourse({
  token,
  idCourse,
}: GetOneApprovalCourseProps) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/secure/approval/course/detail/${idCourse}`,
    {
      headers: {
        ContentType: "application/json",
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    }
  )

  return await res.json()
}
