export type UserNotes = {
  code: number
  message: string
  data: Data
}

export type Data = {
  id_note: number
  id_course: number
  user_uuid: string
  content: string
  created_at: Date
  updated_at: Date
  name: string
  profile_picture: string
}

interface GetUserNotesProps {
  token: string | undefined
  idCourse: string
}

export async function getUserNotes({
  token,
  idCourse,
}: GetUserNotesProps): Promise<UserNotes> {
  const baseUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/secure/notes/${idCourse}`

  const res = await fetch(baseUrl, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      ContentType: "application/json",
    },
    cache: "no-cache",
  })

  return await res.json()
}

interface CreateNoteProps {
  token: string | undefined
  body: BodyInit
}

export async function createNote({ token, body }: CreateNoteProps) {
  let url = `${process.env.NEXT_PUBLIC_BASE_URL}/secure/notes`

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: body,
  })

  return res
}
