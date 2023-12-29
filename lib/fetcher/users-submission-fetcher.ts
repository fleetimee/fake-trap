interface CreateUserAnswerProps {
  token: string | undefined
  body: BodyInit
}

export async function createUserAnswer({ token, body }: CreateUserAnswerProps) {
  let url = `${process.env.NEXT_PUBLIC_BASE_URL}/secure/user-answer`

  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: body,
  })

  return res
}
