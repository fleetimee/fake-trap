import {
  FetchUserQuizListRes,
  QuizLinkedList,
  QuizListRes,
  QuizMemberListRes,
  QuizOneRes,
  QuizOneUserCountRes,
  QuizQuestionListRes,
  QuizUserAttemptList,
  QuizUserResultListRes,
} from "@/types/quiz/res"

interface GetQuizProps {
  token: string | undefined
  page: number
  limit: number
  sortBy?: string
  orderBy?: string
  searchQuery?: string
  quizTypes?: string | string[] | undefined
  isNullSection?: boolean
}

export async function getOperatorQuiz({
  token,
  page,
  limit,
  sortBy = "id_quiz",
  orderBy = "asc",
  searchQuery = "",
  quizTypes = "",
  isNullSection,
}: GetQuizProps): Promise<QuizListRes> {
  let url = `${process.env.NEXT_PUBLIC_BASE_URL}/secure/quiz/`

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

  if (isNullSection) {
    urlObj.searchParams.append("isNullSection", isNullSection.toString())
  }

  if (quizTypes) {
    if (Array.isArray(quizTypes)) {
      urlObj.searchParams.append("quizTypes", quizTypes.join("."))
    } else {
      urlObj.searchParams.append("quizTypes", quizTypes)
    }
  }

  url = urlObj.toString()

  try {
    const res = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-cache",
    })

    // if (!res.ok) {
    //   throw new Error("Failed to fetch quiz")
    // }

    return await res.json()
  } catch (error) {
    console.error(`Fetch request failed: ${error}`)

    throw error
  }
}

interface GetQuizByCreatorProps {
  token: string | undefined
  page: number
  limit: number
  sortBy?: string
  orderBy?: string
  searchQuery?: string
  quizTypes?: string | string[] | undefined
  createdBy: string
}

export async function getQuizCreatedByUser({
  token,
  page,
  limit,
  sortBy = "id_quiz",
  orderBy = "asc",
  searchQuery = "",
  quizTypes = "",
  createdBy,
}: GetQuizByCreatorProps): Promise<QuizListRes> {
  let url = `${process.env.NEXT_PUBLIC_BASE_URL}/secure/quiz/by/${createdBy}`

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

  if (quizTypes) {
    if (Array.isArray(quizTypes)) {
      urlObj.searchParams.append("quizTypes", quizTypes.join("."))
    } else {
      urlObj.searchParams.append("quizTypes", quizTypes)
    }
  }

  url = urlObj.toString()

  try {
    const res = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-cache",
    })

    // if (!res.ok) {
    //   throw new Error("Failed to fetch quiz")
    // }

    return await res.json()
  } catch (error) {
    console.error(`Fetch request failed: ${error}`)

    throw error
  }
}

interface GetOneQuizProps {
  id: string
  token: string | undefined
}

export async function getOneQuiz({
  id,
  token,
}: GetOneQuizProps): Promise<QuizOneRes> {
  let url = `${process.env.NEXT_PUBLIC_BASE_URL}/secure/quiz/${id}`

  try {
    const res = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-cache",
    })

    // if (!res.ok) {
    //   throw new Error("Failed to fetch quiz")
    // }

    return await res.json()
  } catch (error) {
    console.error(`Fetch request failed: ${error}`)

    throw error
  }
}

interface GetLinkedCourseProps {
  token: string | undefined
  idExercise: string
}

export async function getLinkedCourse({
  token,
  idExercise,
}: GetLinkedCourseProps): Promise<QuizLinkedList> {
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

interface GetQuizUserCountProps {
  token: string | undefined
  idExercise: string
}

export async function getQuizUserCount({
  token,
  idExercise,
}: GetQuizUserCountProps): Promise<QuizOneUserCountRes> {
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

interface GetQuizLessonProps {
  token: string | undefined
  idExercise: string
}

export async function getQuizLesson({
  token,
  idExercise,
}: GetQuizLessonProps): Promise<QuizQuestionListRes> {
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

interface GetQuizMembersProps {
  token: string | undefined
  idExercise: string
  limit: number
  page: number
  sortBy: string
  orderBy: string
}

export async function getQuizMembers({
  token,
  idExercise,
  limit,
  page,
  sortBy = "attempts",
  orderBy = "desc",
}: GetQuizMembersProps): Promise<QuizMemberListRes> {
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

interface GetQuizAttemptProps {
  token: string | undefined
  idExercise: string
  limit: number
  page: number
  sortBy?: string
  orderBy?: string
}

export async function getQuizAttempts({
  token,
  idExercise,
  limit,
  page,
  sortBy = "created_at",
  orderBy = "desc",
}: GetQuizAttemptProps): Promise<QuizUserAttemptList> {
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

interface GetUserQuizResultsProps {
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

export async function getUserQuizResults({
  token,
  idUser,
  page,
  limit,
  sortBy = "created_at",
  orderBy = "desc",
  searchQuery = "",
  status = "",
  idQuiz = "",
}: GetUserQuizResultsProps): Promise<FetchUserQuizListRes> {
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

interface CreateExerciseProps {
  token: string | undefined
  body: BodyInit
}

export async function createExercise({ token, body }: CreateExerciseProps) {
  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/secure/quiz`

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: body,
    })

    // if (!res.ok) {
    //   throw new Error("Failed to create quiz")
    // }

    return res
  } catch (error) {
    console.error(`Fetch request failed: ${error}`)

    throw error
  }
}

interface CreateExerciseQuestionProps {
  token: string | undefined
  body: BodyInit
}

export async function createExerciseQuestion({
  token,
  body,
}: CreateExerciseQuestionProps) {
  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/secure/question/bulk`

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

interface UpdateExerciseProps {
  token: string | undefined
  idExercise: string
  body: BodyInit
}

export async function updateExercise({
  token,
  idExercise,
  body,
}: UpdateExerciseProps) {
  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/secure/quiz/${idExercise}`

  try {
    const res = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: body,
    })

    // if (!res.ok) {
    //   throw new Error("Failed to update quiz")
    // }

    return res
  } catch (error) {
    console.error(`Fetch request failed: ${error}`)

    throw error
  }
}

interface DeleteExerciseProps {
  token: string | undefined
  idExercise: string
}

export async function deleteExercise({
  token,
  idExercise,
}: DeleteExerciseProps) {
  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/secure/quiz/${idExercise}`

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
