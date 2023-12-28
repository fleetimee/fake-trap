import { UserOneRes } from "@/types/user/res"

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
