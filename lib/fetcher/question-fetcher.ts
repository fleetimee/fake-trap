interface DeleteAllQuizQuestionProps {
  token: string | undefined
  idQuiz: number
}

export async function deleteAllQuizQuestion({
  token,
  idQuiz,
}: DeleteAllQuizQuestionProps) {
  let url = `${process.env.NEXT_PUBLIC_BASE_URL}/secure/quiz/${idQuiz}/deleteAllQuestion`

  const res = await fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  })

  if (!res.ok) {
    return false
  }

  return true
}

interface DeleteQuizQuestionProps {
  token: string | undefined
  idQuestion: number
}

export async function deleteSelectedQuestion({
  token,
  idQuestion,
}: DeleteQuizQuestionProps) {
  let url = `${process.env.NEXT_PUBLIC_BASE_URL}/secure/question/${idQuestion}/deleteSelectedQuestion`

  const res = await fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  })

  if (!res.ok) {
    return false
  }

  return true
}
