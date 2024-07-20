import { SettingOneRes } from "@/types/setting/res/setting-get-one"

interface GetSettingProps {
  token: string | undefined
  key: string
}

export async function getSetting({
  token,
  key,
}: GetSettingProps): Promise<SettingOneRes> {
  let url = `${process.env.NEXT_PUBLIC_BASE_URL}/secure/setting`

  const urlObj = new URL(url)

  if (key) {
    urlObj.searchParams.set("key", key)
  }

  try {
    const res = await fetch(urlObj.toString(), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      cache: "no-cache",
    })

    return res.json()
  } catch (error) {
    console.error(`Error fetching setting: ${error}`)
    throw error
  }
}
