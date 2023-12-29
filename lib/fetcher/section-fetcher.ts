import { SectionOneRes } from "@/types/section/res"

interface GetOneSectionProps {
  token: string | undefined
  idSection: string
}

export async function getOneSection({
  token,
  idSection,
}: GetOneSectionProps): Promise<SectionOneRes> {
  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/secure/section/${idSection}`

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    cache: "no-cache",
  })

  return await response.json()
}

interface CreateSectionKnowledgeProps {
  token: string | undefined
  body: BodyInit
}

export async function createSectionKnowledge({
  token,
  body,
}: CreateSectionKnowledgeProps) {
  let url = `${process.env.NEXT_PUBLIC_BASE_URL}/secure/section`

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: body,
    cache: "no-store",
  })

  return res
}

interface UpdateSectionKnowledgeProps {
  token: string | undefined
  idSection: number
  body: BodyInit
}

export async function updateSectionKnowledge({
  token,
  idSection,
  body,
}: UpdateSectionKnowledgeProps) {
  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/secure/section/${idSection}`

  return await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: body,
  })
}

interface CreateSectionCourseProps {
  token: string | undefined
  idCourse: number
  body: BodyInit
}

export async function createSectionCourse({
  token,
  idCourse,
  body,
}: CreateSectionCourseProps) {
  let url = `${process.env.NEXT_PUBLIC_BASE_URL}/secure/course/${idCourse}/section`

  return await fetch(url, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: body,
    cache: "no-store",
  })
}

interface DeleteSectionProps {
  token: string | undefined
  idSection: string
}

export async function deleteSection({ token, idSection }: DeleteSectionProps) {
  let url = `${process.env.NEXT_PUBLIC_BASE_URL}/secure/section/${idSection}`

  const res = await fetch(url, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  if (!res.ok) {
    return false
  }

  return true
}
