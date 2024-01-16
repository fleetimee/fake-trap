import { ReferenceListRes } from "@/types/references/res"

interface GetReferenceProps {
  refCode: string
  token: string | undefined
}

export async function getReference({
  token,
  refCode,
}: GetReferenceProps): Promise<ReferenceListRes> {
  let url = `${process.env.NEXT_PUBLIC_BASE_URL}/secure/references/${refCode}`

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
