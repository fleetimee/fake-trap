interface CreateQuizMultipleChoiceProps {
  token: string | undefined
  idSection: number
  body: BodyInit
}

export async function createQuizMultipleChoice({
  token,
  idSection,
  body,
}: CreateQuizMultipleChoiceProps) {
  let url = `${process.env.NEXT_PUBLIC_BASE_URL}/secure/section/${idSection}/quiz`

  const res = await fetch(url, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: body,
  })

  return res
}
