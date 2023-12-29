import { ContentOneRes } from "@/types/content/res"

interface GetOneContentProps {
  token: string | undefined
  idContent: string
}

export async function getOneContent({
  token,
  idContent,
}: GetOneContentProps): Promise<ContentOneRes> {
  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/secure/content/${idContent}`

  const res = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    cache: "no-cache",
  })

  return await res.json()
}

interface CreateContentArticleProps {
  token: string | undefined
  body: BodyInit
}

export async function createContentArticle({
  token,
  body,
}: CreateContentArticleProps) {
  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/secure/content/article`

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    cache: "no-cache",
    body: body,
  })

  return res
}

interface CreateContentVideoProps {
  token: string | undefined
  body: BodyInit
}

export async function createContentVideo({
  token,
  body,
}: CreateContentVideoProps) {
  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/secure/content/youtube`

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: body,
  })

  return response
}

interface CreateContentFileProps {
  token: string | undefined
  body: BodyInit
}

export async function createContentFile({
  token,
  body,
}: CreateContentFileProps) {
  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/secure/content/file`

  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: body,
  })

  return response
}

interface DeleteContentProps {
  token: string | undefined
  idContent: string
}

export async function deleteContent({ token, idContent }: DeleteContentProps) {
  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/secure/content/${idContent}`

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
