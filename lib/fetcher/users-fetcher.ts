import { QuizUserResultListRes } from "@/types/quiz/res"
import { UserListRes, UserOneRes, UserRoleListRes } from "@/types/user/res"

interface GetUserV2Props {
  token: string | undefined
  page: number
  limit: number
  sortBy?: string
  orderBy?: string
  searchQuery?: string
}

export async function getUserV2({
  token,
  page,
  limit,
  sortBy = "created_at",
  orderBy = "desc",
  searchQuery = "",
}: GetUserV2Props): Promise<UserListRes> {
  let url = `${process.env.NEXT_PUBLIC_BASE_URL}/secure/users/v2?`

  const urlObj = new URL(url)

  if (page) {
    urlObj.searchParams.append("page", page.toString())
  }

  if (limit) {
    urlObj.searchParams.append("limit", limit.toString())
  }

  if (sortBy) {
    urlObj.searchParams.append("sortBy", sortBy)
  }

  if (orderBy) {
    urlObj.searchParams.append("orderBy", orderBy)
  }

  if (searchQuery) {
    urlObj.searchParams.append("searchQuery", searchQuery)
  }

  const res = await fetch(urlObj.toString(), {
    method: "GET",
    headers: {
      ContentType: "application/json",
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  })

  return await res.json()
}

interface GetUsersByGroupIdProps {
  token: string | undefined
  idGroup: number
}

export async function getUsersByGroupId({
  token,
  idGroup,
}: GetUsersByGroupIdProps): Promise<UserRoleListRes> {
  let url = `${process.env.NEXT_PUBLIC_BASE_URL}/secure/users/group/${idGroup}/`

  const res = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  })

  return await res.json()
}

interface GetOneUserProps {
  token: string | undefined
  uuid: string
}

export async function getOneUser({
  token,
  uuid,
}: GetOneUserProps): Promise<UserOneRes> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/secure/users/${uuid}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    }
  )
  return await res.json()
}

interface GetUserAnswerProps {
  token: string | undefined
  idAttempt: string
  userUuid: string
}

export async function getUserAnswer({
  token,
  idAttempt,
  userUuid,
}: GetUserAnswerProps): Promise<QuizUserResultListRes> {
  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/secure/users/${userUuid}/getSelectedAnswer/${idAttempt}`

  const res = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: "no-cache",
  })

  return await res.json()
}

interface CreateUserProps {
  token: string | undefined
  body: BodyInit
}

export async function createUser({ token, body }: CreateUserProps) {
  let url = `${process.env.NEXT_PUBLIC_BASE_URL}/secure/users/`

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

interface UpdateUserProps {
  token: string | undefined
  uuid: string
  body: BodyInit
}

export async function updateUser({
  token,
  uuid,
  body,
}: UpdateUserProps): Promise<Response> {
  let url = `${process.env.NEXT_PUBLIC_BASE_URL}/secure/users/${uuid}`

  const res = await fetch(url, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: body,
    cache: "no-store",
  })

  return res
}

interface DeleteUserProps {
  token: string | undefined
  uuid: string
}

export async function deleteUser({ token, uuid }: DeleteUserProps) {
  let url = `${process.env.NEXT_PUBLIC_BASE_URL}/secure/users/${uuid}`

  try {
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
  } catch (error) {
    console.error(`Fetch request failed: ${error}`)
    throw error
  }
}
