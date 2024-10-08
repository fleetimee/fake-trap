import * as process from "process"

import {
  UserAvgScoreRes,
  UserCourseCountRes,
  UserEnrolledCourseListRes,
  UserPostCountRes,
  UserQuizCountRes,
  UserQuizGroupedRes,
  UserQuizTakenListRes,
  UserRecentPostListRes,
} from "@/types/me/res"
import { QuizUserResultListRes } from "@/types/quiz/res"
import {
  UserListRes,
  UserOneRes,
  UserPastResultListRes,
  UserRoleListRes,
} from "@/types/user/res"
import { UserOneLeaderboardRes } from "@/types/user/res/user-get-leaderboard"
import { UserOnePretestCheckRes } from "@/types/user/res/user-get-pretest-check"
import { UserOrgOneRes } from "@/types/user/res/user-org-get-one"
import { UserPastCourseKnowledgeListRes } from "@/types/user/res/user-past-knowledge-list"

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
  sortBy = "name",
  orderBy = "asc",
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

interface GetUserEnrolledCourseList {
  token: string | undefined
  uuid: string | undefined
  limit: number
  page: number
  sortBy?: string
  orderBy?: string
  searchQuery?: string
}

export async function getPesertaEnrolledCourses({
  token,
  uuid,
  limit,
  page,
  sortBy = "created_at",
  orderBy = "desc",
  searchQuery = "",
}: GetUserEnrolledCourseList): Promise<UserEnrolledCourseListRes> {
  let baseUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/secure/users/${uuid}/getEnrolledCourse`

  const url = new URL(baseUrl)

  if (page) {
    url.searchParams.append("page", page.toString())
  }

  if (limit) {
    url.searchParams.append("limit", limit.toString())
  }

  if (sortBy) {
    url.searchParams.append("sortBy", sortBy)
  }

  if (orderBy) {
    url.searchParams.append("orderBy", orderBy)
  }

  if (searchQuery) {
    url.searchParams.append("searchQuery", searchQuery)
  }

  try {
    const res = await fetch(url.toString(), {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-cache",
    })

    return await res.json()
  } catch (err) {
    console.error(`Fetch request failed: ${err}`)

    throw err
  }
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

interface GetUsersSupervisorProps {
  token: string | undefined
  email: string
}

export async function getUsersSupervisor({
  token,
  email,
}: GetUsersSupervisorProps): Promise<UserListRes> {
  let url = `${process.env.NEXT_PUBLIC_BASE_URL}/secure/users/supervisor/`

  const urlObj = new URL(url)

  if (email) {
    urlObj.searchParams.append("email", email)
  }

  const res = await fetch(urlObj.toString(), {
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

interface CheckUserEnrolledProps {
  token: string | undefined
  idCourse: string
  uuid: string
}

export async function getCheckUserCourseEnrollmentStatus({
  token,
  idCourse,
  uuid,
}: CheckUserEnrolledProps) {
  let url = `${process.env.NEXT_PUBLIC_BASE_URL}/secure/users/${uuid}/checkIfUserEnrolled/${idCourse}`

  try {
    const res = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-cache",
    })

    return await res.json()
  } catch (err) {
    console.error(`Fetch request failed: ${err}`)

    throw err
  }
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

interface GetUserPostCount {
  token: string | undefined
  uuid: string | undefined
}

export async function getUserPostCount({
  token,
  uuid,
}: GetUserPostCount): Promise<UserPostCountRes> {
  let url = `${process.env.NEXT_PUBLIC_BASE_URL}/secure/users/${uuid}/getPostCount`

  const res = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  })

  return await res.json()
}

interface GetUserCourseCount {
  token: string | undefined
  uuid: string | undefined
}

export async function getUserCourseCount({
  token,
  uuid,
}: GetUserCourseCount): Promise<UserCourseCountRes> {
  let url = `${process.env.NEXT_PUBLIC_BASE_URL}/secure/users/${uuid}/getCourseCount`

  const res = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  })

  return await res.json()
}

interface GetUserQuizCount {
  token: string | undefined
  uuid: string | undefined
}

export async function getUserQuizCount({
  token,
  uuid,
}: GetUserQuizCount): Promise<UserQuizCountRes> {
  let url = `${process.env.NEXT_PUBLIC_BASE_URL}/secure/users/${uuid}/getQuizCount`

  const res = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  })

  return await res.json()
}

interface GetUserRecentPostList {
  token: string | undefined
  uuid: string | undefined
}

export async function getUserRecentPostList({
  token,
  uuid,
}: GetUserRecentPostList): Promise<UserRecentPostListRes> {
  let url = `${process.env.NEXT_PUBLIC_BASE_URL}/secure/users/${uuid}/getRecentPost`

  const res = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  })

  return await res.json()
}

interface GetUserRecentPostsList {
  token: string | undefined
  uuid: string | undefined
}

export async function getUserRecentPostsList({
  token,
  uuid,
}: GetUserRecentPostsList): Promise<UserRecentPostListRes> {
  let url = `${process.env.NEXT_PUBLIC_BASE_URL}/secure/users/${uuid}/getRecentPosts`

  const res = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  })

  return await res.json()
}

interface GetUserAvgQuizScore {
  token: string | undefined
  uuid: string | undefined
}

export async function getUserAvgQuizScore({
  token,
  uuid,
}: GetUserAvgQuizScore): Promise<UserAvgScoreRes> {
  let url = `${process.env.NEXT_PUBLIC_BASE_URL}/secure/users/${uuid}/getAverageUserQuiz`

  const res = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  })

  return await res.json()
}

interface GetUserQuizAttempts {
  token: string | undefined
  uuid: string | undefined
  limit?: number
  page?: number
}

export async function getUserQuizAttempts({
  token,
  uuid,
  limit = 5,
  page = 1,
}: GetUserQuizAttempts): Promise<UserQuizTakenListRes> {
  let url = `${process.env.NEXT_PUBLIC_BASE_URL}/secure/users/${uuid}/getQuizThatUserTaken?`

  const urlObj = new URL(url)

  if (page) {
    urlObj.searchParams.append("page", page.toString())
  }

  if (limit) {
    urlObj.searchParams.append("limit", limit.toString())
  }

  const res = await fetch(urlObj.toString(), {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  })

  return await res.json()
}

interface GetQuizGroupedByCourse {
  token: string | undefined
  uuid: string | undefined
  page: number
  limit: number
}

export async function getUserQuizResultsGroupedByCourse({
  token,
  uuid,
  page,
  limit,
}: GetQuizGroupedByCourse): Promise<UserQuizGroupedRes> {
  let url = `${process.env.NEXT_PUBLIC_BASE_URL}/secure/users/${uuid}/getDistinctQuizGroupedAndAveraged?`

  const urlObj = new URL(url)

  if (page) {
    urlObj.searchParams.append("page", page.toString())
  }

  if (limit) {
    urlObj.searchParams.append("limit", limit.toString())
  }

  const res = await fetch(urlObj.toString(), {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  })

  return await res.json()
}

interface GetUserOrgProps {
  token: string | undefined
  email: string
}

export async function getUserOrg({
  token,
  email,
}: GetUserOrgProps): Promise<UserOrgOneRes> {
  let url = `${process.env.NEXT_PUBLIC_BASE_URL}/secure/users/org?`

  const urlObj = new URL(url)

  if (email) {
    urlObj.searchParams.append("email", email)
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

interface GetUserLeaderboardProps {
  token: string | undefined
  userUuid: string
  idQuiz: string
}

export async function getUserLeaderboard({
  token,
  userUuid,
  idQuiz,
}: GetUserLeaderboardProps): Promise<UserOneLeaderboardRes> {
  let url = `${process.env.NEXT_PUBLIC_BASE_URL}/secure/users/${userUuid}/getQuizLeaderboardPosition/${idQuiz}`

  try {
    const res = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    })

    return await res.json()
  } catch (error) {
    console.error(`Fetch request failed: ${error}`)
    throw error
  }
}

interface GetUserPretestCheckProps {
  token: string | undefined
  userUuid: string
  idCourse: string
}

export async function getUserPretestCheck({
  token,
  userUuid,
  idCourse,
}: GetUserPretestCheckProps): Promise<UserOnePretestCheckRes> {
  let url = `${process.env.NEXT_PUBLIC_BASE_URL}/secure/users/${userUuid}/getCheckPretest/${idCourse}`

  try {
    const res = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    })

    return await res.json()
  } catch (error) {
    console.error(`Fetch request failed: ${error}`)
    throw error
  }
}

interface GetUserCourseTrackerCount {
  token: string | undefined
  uuid: string | undefined
}

export async function getUserCourseTrackerCount({
  token,
  uuid,
}: GetUserCourseTrackerCount) {
  let url = `${process.env.NEXT_PUBLIC_BASE_URL}/secure/users/${uuid}/getCourseCountTracker`

  const res = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  })

  return await res.json()
}

interface MarkCourseAsAccessedProps {
  token: string | undefined
  uuid: string
  idCourse: string
}

export async function markCourseAsAccessed({
  token,
  uuid,
  idCourse,
}: MarkCourseAsAccessedProps) {
  let url = `${process.env.NEXT_PUBLIC_BASE_URL}/secure/users/${uuid}/markCourseAsAccessed/${idCourse}`

  const res = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  })

  return res
}

interface GetUserPastResultProps {
  token: string | undefined
  userUuid: string
}

export async function getUserPastResult({
  token,
  userUuid,
}: GetUserPastResultProps): Promise<UserPastResultListRes> {
  let url = `${process.env.NEXT_PUBLIC_BASE_URL}/secure/users/${userUuid}/userLibraryResult`

  const res = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  })

  return await res.json()
}

interface GetUserPastCourseKnowledgeProps {
  token: string | undefined
  userUuid: string
}

export async function getUserPastCourseKnowledge({
  token,
  userUuid,
}: GetUserPastCourseKnowledgeProps): Promise<UserPastCourseKnowledgeListRes> {
  let url = `${process.env.NEXT_PUBLIC_BASE_URL}/secure/users/${userUuid}/userLibraryKnowledge`

  const res = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  })

  return await res.json()
}

interface GetUserKnowledgeEligibilityProps {
  token: string | undefined
  userUuid: string
  idKnowledge: string
}

export async function getUserKnowledgeEligibility({
  token,
  userUuid,
  idKnowledge,
}: GetUserKnowledgeEligibilityProps) {
  let url = `${process.env.NEXT_PUBLIC_BASE_URL}/secure/users/${userUuid}/getCheckKnowledgeEligibility/${idKnowledge}`

  const res = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
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

export async function updateUser({ token, uuid, body }: UpdateUserProps) {
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

interface UpdateNameUserProps {
  token: string | undefined
  uuid: string
  body: BodyInit
}

export async function updateNameUser({
  token,
  uuid,
  body,
}: UpdateNameUserProps) {
  let url = `${process.env.NEXT_PUBLIC_BASE_URL}/secure/users/${uuid}/updateName`

  const res = await fetch(url, {
    method: "PATCH",
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
