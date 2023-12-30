interface ChangePasswordProps {
  token: string | undefined
  uuid: string | undefined
  body: BodyInit
}

export async function changePassword({
  token,
  uuid,
  body,
}: ChangePasswordProps) {
  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/secure/${uuid}/change-password`

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

interface ForgotPasswordProps {
  email: string
}

export async function forgotPassword({ email }: ForgotPasswordProps) {
  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/public/reset-password/${email}`

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  })

  return res
}
