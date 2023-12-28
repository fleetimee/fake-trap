import {
  ApprovalOperatorLMSListRes,
  ApprovalRequestList,
  ApprovalSupervisorCourseListRes,
  ApprovalSupervisorCourseOneRes,
  ApprovalSupervisorPemateriListRes,
  ApprovalSupervisorPemateriOneRes,
} from "@/types/approval/res"
import { ContentOneRes } from "@/types/content/res"
import {
  FetchUserQuizListRes,
  QuizLinkedList,
  QuizMemberListRes,
  QuizOneRes,
  QuizOneUserCountRes,
  QuizQuestionListRes,
  QuizUserAttemptList,
  QuizUserResultListRes,
} from "@/types/quiz/res"
import { ReferenceListRes } from "@/types/references/res"
import { RoleListRes } from "@/types/role/res"
import { RuleOneRes } from "@/types/rule/res"
import { SectionOneRes } from "@/types/section/res"
import { UserRoleListRes } from "@/types/user/res"

interface GetExerciseUserSelectedAnswerProps {
  token: string | undefined
  idAttempt: string
  userUuid: string
}

/**
 * Retrieves the user-selected answer for a specific exercise attempt.
 * @param token - The authentication token.
 * @param idAttempt - The ID of the exercise attempt.
 * @param userUuid - The UUID of the user.
 * @returns A promise that resolves to the user-selected answer for the exercise attempt.
 */
export async function getExerciseUserSelectedAnswer({
  token,
  idAttempt,
  userUuid,
}: GetExerciseUserSelectedAnswerProps): Promise<QuizUserResultListRes> {
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

interface GetNewExerciseResultProps {
  token: string | undefined
  idUser: string
  page: number
  limit: number
  sortBy?: string
  orderBy?: string
  searchQuery?: string
  status?: string
  idQuiz?: string
}

/**
 * Fetches the exercise result for a user.
 * @param {GetExerciseResultProps} options - The options for fetching the exercise result.
 * @returns {Promise<any>} - The JSON response from the API.
 */
export async function getNewExerciseResult({
  token,
  idUser,
  page,
  limit,
  sortBy = "created_at",
  orderBy = "desc",
  searchQuery = "",
  status = "",
  idQuiz = "",
}: GetNewExerciseResultProps): Promise<FetchUserQuizListRes> {
  let url = `${process.env.NEXT_PUBLIC_BASE_URL}/secure/quiz/fetchUserQuiz/${idUser}`

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

  if (status) {
    urlObj.searchParams.append("status", status)
  }

  if (idQuiz) {
    urlObj.searchParams.append("idQuiz", idQuiz)
  }

  const res = await fetch(urlObj.toString(), {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },

    cache: "no-cache",
  })

  return await res.json()
}

interface GetOneSectionProps {
  token: string | undefined
  idSection: string
}

/**
 * Retrieves a single section from the server.
 * @param {GetOneSectionProps} options - The options for retrieving the section.
 * @param {string} options.token - The authentication token.
 * @param {string} options.idSection - The ID of the section to retrieve.
 * @returns {Promise<any>} - A promise that resolves to the JSON response from the server.
 */
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

interface GetUsersByGroupProps {
  token: string | undefined
  idGroup: number
}

/**
 * Retrieves a list of pemateri (user roles) from the server.
 *
 * @param {GetPemateriProps} options - The options for fetching the pemateri list.
 * @param {string} options.token - The authentication token.
 * @param {string} options.idGroup - The ID of the group.
 * @returns {Promise<UserRoleListRes>} - A promise that resolves to the pemateri list response.
 */
export async function fetchUsersByGroupId({
  token,
  idGroup,
}: GetUsersByGroupProps): Promise<UserRoleListRes> {
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

interface GetRoleProps {
  token: string | undefined
}

export async function getRole({ token }: GetRoleProps): Promise<RoleListRes> {
  let url = `${process.env.NEXT_PUBLIC_BASE_URL}/secure/role`

  const res = await fetch(url, {
    method: "GET",
    headers: {
      ContentType: "application/json",
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  })

  return await res.json()
}

interface GetRuleProps {
  token: string | undefined
  idRole: string
}

/**
 * Retrieves a rule based on the provided role ID.
 * @param {Object} props - The properties object.
 * @param {string} props.token - The authorization token.
 * @param {string} props.idRole - The ID of the role to retrieve the rule for.
 * @returns {Promise<RuleOneRes>} - A promise that resolves to the retrieved rule.
 */
export async function getRule({
  token,
  idRole,
}: GetRuleProps): Promise<RuleOneRes> {
  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/secure/rule/role/${idRole}`

  const res = await fetch(url, {
    method: "GET",
    headers: {
      ContentType: "application/json",
      Authorization: `Bearer ${token}`,
    },
    cache: "no-cache",
  })

  return await res.json()
}

interface GetReferenceProps {
  refCode: string
  token: string | undefined
}

/**
 * Retrieves a reference list from the server.
 * @param {Object} props - The properties object.
 * @param {string} props.token - The authentication token.
 * @param {string} props.refCode - The reference code.
 * @returns {Promise<ReferenceListRes>} - The reference list response.
 */
export async function getReference({
  token,
  refCode,
}: GetReferenceProps): Promise<ReferenceListRes> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/secure/references/${refCode}`,
    {
      method: "GET",
      headers: {
        ContentType: "application/json",
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    }
  )

  return await res.json()
}

interface GetOneContentProps {
  token: string | undefined
  idContent: string
}

/**
 * Retrieves a single content item from the server.
 * @param {GetOneContentProps} options - The options for retrieving the content.
 * @returns {Promise<ContentOneRes>} - A promise that resolves to the retrieved content.
 */
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

interface GetOneExerciseProps {
  token: string | undefined
  idExercise: string
}

/**
 * Retrieves a single exercise from the API.
 * @param {GetOneExerciseProps} params - The parameters for fetching the exercise.
 * @returns {Promise<QuizOneRes>} - A promise that resolves to the fetched exercise.
 */
export async function getOneExercise({
  token,
  idExercise,
}: GetOneExerciseProps): Promise<QuizOneRes> {
  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/secure/quiz/${idExercise}`

  const res = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: "no-cache",
  })

  return await res.json()
}

interface GetOneExerciseUserCountProps {
  token: string | undefined
  idExercise: string
}

/**
 * Retrieves the count of users who have attempted a specific exercise.
 * @param token - The authentication token.
 * @param idExercise - The ID of the exercise.
 * @returns A promise that resolves to the count of users who have attempted the exercise.
 */
export async function getOneExerciseUserCount({
  token,
  idExercise,
}: GetOneExerciseUserCountProps): Promise<QuizOneUserCountRes> {
  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/secure/quiz/${idExercise}/users/count`

  const res = await fetch(url, {
    method: "GET",
    headers: {
      ContentType: "application/json",
      Authorization: `Bearer ${token}`,
    },
    cache: "no-cache",
  })

  return await res.json()
}

interface GetOneExerciseLinkedCourseProps {
  token: string | undefined
  idExercise: string
}

/**
 * Retrieves a single exercise linked to a course.
 * @param {GetOneExerciseLinkedCourseProps} options - The options for retrieving the exercise.
 * @returns {Promise<QuizLinkedList>} - A promise that resolves to the linked exercise.
 */
export async function getOneExerciseLinkedCourse({
  token,
  idExercise,
}: GetOneExerciseLinkedCourseProps): Promise<QuizLinkedList> {
  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/secure/quiz/${idExercise}/linked-course`

  const res = await fetch(url, {
    method: "GET",
    headers: {
      ContentType: "application/json",
      Authorization: `Bearer ${token}`,
    },
    cache: "no-cache",
  })

  return await res.json()
}

interface GetOneExerciseLessonProps {
  token: string | undefined
  idExercise: string
}

/**
 * Retrieves a single quiz lesson.
 * @param {GetOneExerciseLessonProps} options - The options for retrieving the quiz lesson.
 * @returns {Promise<any>} - A promise that resolves to the JSON response of the quiz lesson.
 */
export async function getOneExerciseLesson({
  token,
  idExercise,
}: GetOneExerciseLessonProps): Promise<QuizQuestionListRes> {
  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/secure/quiz/${idExercise}/getLesson`

  const res = await fetch(url, {
    method: "GET",
    headers: {
      ContentType: "application/json",
      Authorization: `Bearer ${token}`,
    },
    cache: "no-cache",
  })

  return await res.json()
}

interface GetExerciseListMemberProps {
  token: string | undefined
  idExercise: string
  limit: number
  page: number
  sortBy: string
  orderBy: string
}

/**
 * Retrieves a list of exercise members.
 * @param token - The authentication token.
 * @param idExercise - The ID of the exercise.
 * @param limit - The maximum number of members to retrieve per page.
 * @param page - The page number.
 * @param sortBy - The field to sort the members by (default: "attempts").
 * @param orderBy - The order in which to sort the members (default: "desc").
 * @returns A promise that resolves to the list of exercise members.
 */
export async function getListExerciseMember({
  token,
  idExercise,
  limit,
  page,
  sortBy = "attempts",
  orderBy = "desc",
}: GetExerciseListMemberProps): Promise<QuizMemberListRes> {
  let baseUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/secure/quiz/${idExercise}/getMember`

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

  const res = await fetch(url.toString(), {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: "no-cache",
  })

  return await res.json()
}

interface GetExerciseResultProps {
  token: string | undefined
  idExercise: string
  limit: number
  page: number
  sortBy?: string
  orderBy?: string
}

/**
 * Retrieves a list of exercise results based on the provided parameters.
 * @param {GetExerciseResultProps} options - The options for fetching exercise results.
 * @param {string} options.token - The authentication token.
 * @param {string} options.idExercise - The ID of the exercise.
 * @param {number} options.limit - The maximum number of results to retrieve per page.
 * @param {number} options.page - The page number of the results to retrieve.
 * @param {string} [options.sortBy="created_at"] - The field to sort the results by. Defaults to "created_at".
 * @param {string} [options.orderBy="desc"] - The order in which to sort the results. Defaults to "desc".
 * @returns {Promise<any>} - A promise that resolves to the fetched exercise results.
 */
export async function getListExerciseResult({
  token,
  idExercise,
  limit,
  page,
  sortBy = "created_at",
  orderBy = "desc",
}: GetExerciseResultProps): Promise<QuizUserAttemptList> {
  let baseUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/secure/quiz/${idExercise}/getUserAttempt`

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

  const res = await fetch(url.toString(), {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      ContentType: "application/json",
    },
    cache: "no-cache",
  })

  return await res.json()
}

interface GetApprovaRequestListProps {
  idRequester: string
  token: string | undefined
  limit: number
  page: number
  sortBy?: string
  orderBy?: string
  searchQuery?: string
}

/**
 * Retrieves a list of approval requests based on the provided parameters.
 * @param idRequester - The ID of the requester.
 * @param token - The authentication token.
 * @param limit - The maximum number of approval requests to retrieve.
 * @param page - The page number of the results.
 * @param sortBy - The field to sort the approval requests by. Defaults to "created_at".
 * @param orderBy - The order in which to sort the approval requests. Defaults to "desc".
 * @param searchQuery - The search query to filter the approval requests.
 * @returns A Promise that resolves to the list of approval requests.
 */
export async function getApprovalRequestList({
  idRequester,
  token,
  limit,
  page,
  sortBy = "created_at",
  orderBy = "desc",
  searchQuery = "",
}: GetApprovaRequestListProps): Promise<ApprovalRequestList> {
  let baseUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/secure/approval/requester/${idRequester}`

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

  const res = await fetch(url.toString(), {
    method: "GET",
    headers: {
      ContentType: "application/json",
      Authorization: `Bearer ${token}`,
    },
    cache: "no-cache",
  })

  return await res.json()
}

interface GetApprovalApproverListProps {
  idApprover: string
  token: string | undefined
  limit: number
  page: number
  sortBy?: string
  orderBy?: string
  searchQuery?: string
  status?: string
}

/**
 * Retrieves the list of approval approvers based on the provided parameters.
 * @param idApprover - The ID of the approver.
 * @param token - The authorization token.
 * @param limit - The maximum number of results to retrieve per page.
 * @param page - The page number of the results to retrieve.
 * @param sortBy - The field to sort the results by. Defaults to "created_at".
 * @param orderBy - The order in which to sort the results. Defaults to "desc".
 * @param searchQuery - The search query to filter the results.
 * @param status - The status of the approvals to filter the results.
 * @returns A promise that resolves to the list of approval supervisors and pemateris.
 */
export async function getApprovalApproverList({
  idApprover,
  token,
  limit,
  page,
  sortBy = "created_at",
  orderBy = "desc",
  searchQuery = "",
  status = "",
}: GetApprovalApproverListProps): Promise<ApprovalSupervisorPemateriListRes> {
  let baseUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/secure/approval/knowledge/approver/${idApprover}`
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

  if (status) {
    url.searchParams.append("status", status)
  }

  const res = await fetch(url.toString(), {
    method: "GET",
    headers: {
      ContentType: "application/json",
      Authorization: `Bearer ${token}`,
    },
    cache: "no-cache",
  })

  return await res.json()
}

interface GetSingleApprovalRequestProps {
  idApproval: string
  token: string | undefined
}

/**
 * Retrieves a single approval request from the server.
 * @param {GetSingleApprovalRequestProps} options - The options for retrieving the approval request.
 * @returns {Promise<ApprovalSupervisorPemateriOneRes>} - A promise that resolves to the approval request data.
 */
export async function getSingleApprovalRequest({
  idApproval,
  token,
}: GetSingleApprovalRequestProps): Promise<ApprovalSupervisorPemateriOneRes> {
  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/secure/approval/requester/detail/${idApproval}`

  const res = await fetch(url, {
    method: "GET",
    headers: {
      ContentType: "application/json",
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  })

  return await res.json()
}

interface GetCourseApprovalRequestListProps {
  token: string | undefined
  idRequester: string
  limit: number
  page: number
  sortBy?: string
  orderBy?: string
  searchQuery?: string
  status?: string | string[] | undefined
  approverId?: string
  from?: string
  to?: string
}

/**
 * Retrieves a list of course approval requests.
 *
 * @param token - The authentication token.
 * @param idRequester - The ID of the requester.
 * @param limit - The maximum number of results to return per page.
 * @param page - The page number to retrieve.
 * @param sortBy - The field to sort the results by. Defaults to "created_at".
 * @param orderBy - The order in which to sort the results. Defaults to "desc".
 * @param searchQuery - The search query to filter the results.
 * @returns A promise that resolves to the list of course approval requests.
 */
export async function getCourseApprovalRequestList({
  token,
  idRequester,
  limit,
  page,
  sortBy = "created_at",
  orderBy = "desc",
  searchQuery = "",
  status = "",
  approverId,
  from,
  to,
}: GetCourseApprovalRequestListProps): Promise<ApprovalOperatorLMSListRes> {
  let baseUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/secure/approval/course/requester/${idRequester}`

  let url = new URL(baseUrl)

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

  if (status) {
    if (Array.isArray(status)) {
      url.searchParams.append("status", status.join("."))
    } else {
      url.searchParams.append("status", status)
    }
  }

  if (approverId) {
    url.searchParams.append("approverId", approverId)
  }

  if (from) {
    url.searchParams.append("from", from)
  }

  if (to) {
    url.searchParams.append("to", to)
  }

  const res = await fetch(url.toString(), {
    method: "GET",
    headers: {
      ContentType: "application/json",
      Authorization: `Bearer ${token}`,
    },
    cache: "no-cache",
  })

  return await res.json()
}

interface GetCourseApprovalApproverListProps {
  token: string | undefined
  idApprover: string
  limit: number
  page: number
  sortBy?: string
  orderBy?: string
  searchQuery?: string
  status?: string
}

/**
 * Retrieves the list of course approval approvers.
 *
 * @param token - The authentication token.
 * @param idApprover - The ID of the approver.
 * @param limit - The maximum number of results to return per page.
 * @param page - The page number.
 * @param sortBy - The field to sort the results by. Defaults to "created_at".
 * @param orderBy - The order in which to sort the results. Defaults to "desc".
 * @param searchQuery - The search query to filter the results.
 * @param status - The status of the course approvals to filter by.
 * @returns A promise that resolves to the list of course approval supervisors.
 */
export async function getCourseApprovalApproverList({
  token,
  idApprover,
  limit,
  page,
  sortBy = "created_at",
  orderBy = "desc",
  searchQuery = "",
  status = "",
}: GetCourseApprovalApproverListProps): Promise<ApprovalSupervisorCourseListRes> {
  let baseUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/secure/approval/course/approver/${idApprover}`
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

  if (status) {
    url.searchParams.append("status", status)
  }

  const res = await fetch(url.toString(), {
    method: "GET",
    headers: {
      ContentType: "application/json",
      Authorization: `Bearer ${token}`,
    },
    cache: "no-cache",
  })

  return await res.json()
}

interface GetSingleCourseApprovalRequestProps {
  idApproval: string
  token: string | undefined
}

/**
 * Retrieves a single course approval request from the server.
 * @param {GetSingleCourseApprovalRequestProps} options - The options for retrieving the approval request.
 * @returns {Promise<ApprovalSupervisorCourseOneRes>} - A promise that resolves to the approval request data.
 */
export async function getSingleCourseApprovalRequest({
  idApproval,
  token,
}: GetSingleCourseApprovalRequestProps): Promise<ApprovalSupervisorCourseOneRes> {
  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/secure/approval/course/single/requester/${idApproval}`

  const res = await fetch(url, {
    method: "GET",
    headers: {
      ContentType: "application/json",
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  })

  return await res.json()
}
