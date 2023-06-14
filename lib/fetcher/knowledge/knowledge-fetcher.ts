import { revalidatePath } from "next/cache"

import { Knowledge } from "@/types/knowledge"

export async function getKnowledge(limit: number): Promise<Knowledge> {
  const path = `${process.env.NEXT_PUBLIC_BASE_URL}/secure/knowledge?limit=${limit}`

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/secure/knowledge?limit=${limit}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImVheEBnbWFpbC5jb20iLCJleHAiOjE2ODY4MTM3NDQsImlkIjoiMjk3YTZlNTAtOTI5ZC00YWVmLWJhNmYtNzZmMzQxMjcyZWUzIiwib3JpZ19pYXQiOjE2ODY3MjczNDQsInJvbGUiOlt7ImlkX3JvbGUiOjEsInJvbGVfbmFtZSI6IkFkbWluIiwicm9sZV9kZXNjcmlwdGlvbiI6IkdyYW50IHVzZXIgYWxsIHJlc291cmNlcyJ9XSwidXNlcm5hbWUiOiJvY3RhdmlhIn0.FzV70kXw019nADZHQQyHsjC5qBV40nh0_5Y0glDb4yc",
      },
      next: {
        revalidate: 3,
      },
    }
  )

  revalidatePath(path)
  const data = await res.json()
  return data
}
