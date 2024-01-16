import { UserOneRes } from "@/types/user/res"

interface LoginProps {
  body: BodyInit
}

export async function login({ body }: LoginProps) {
  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/login`

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: body,
  })

  return res
}

interface GetLoggedOnUserProps {
  token: string | undefined
  uuid: string
}

export async function getLoggedOnUser({
  token,
  uuid,
}: GetLoggedOnUserProps): Promise<UserOneRes> {
  let url = `${process.env.NEXT_PUBLIC_BASE_URL}/secure/users/${uuid}`

  const res = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    cache: "no-cache",
  })

  return res.json()
}
