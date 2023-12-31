import { RuleOneRes } from "@/types/rule/res"

interface GetRuleProps {
  token: string | undefined
  idRole: string
}

export async function getRule({
  token,
  idRole,
}: GetRuleProps): Promise<RuleOneRes> {
  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/secure/rule/role/${idRole}`

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

interface UpdateRuleProps {
  token: string | undefined
  idRole: number
  body: BodyInit
}

export async function updateRule({ token, idRole, body }: UpdateRuleProps) {
  let url = `${process.env.NEXT_PUBLIC_BASE_URL}/secure/rule/role/${idRole}`

  const res = await fetch(url, {
    method: "PATCH",
    headers: {
      ContentType: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: body,
    cache: "no-cache",
  })

  return res
}
