import { RoleListRes } from "@/types/role/res"

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
