import { MenuListResNew } from "@/types/menu/res"
import { GlobalCountRes } from "@/types/menu/res/menu-global-count"

interface GetMenuProps {
  token: string | undefined
  idRole: string
}

export async function getMenu({
  token,
  idRole,
}: GetMenuProps): Promise<MenuListResNew> {
  let url = `${process.env.NEXT_PUBLIC_BASE_URL}/secure/menu/role/${idRole}`

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

interface GetGlobalCountProps {
  token: string | undefined
}

export async function getGlobalCount({
  token,
}: GetGlobalCountProps): Promise<GlobalCountRes> {
  let url = `${process.env.NEXT_PUBLIC_BASE_URL}/secure/menu/globalCount`

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
