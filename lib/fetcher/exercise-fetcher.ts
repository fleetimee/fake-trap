import { QuizListRes, QuizOneRes } from "@/types/quiz/res"

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
