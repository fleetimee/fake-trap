import { PostsListRes } from "@/types/posts/res"

interface GetPostsListProps {
  token: string | undefined
  idThreads: string
  limit: number
  page: number
}

export async function getPostsList({
  token,
  idThreads,
  limit,
  page,
}: GetPostsListProps): Promise<PostsListRes> {
  let url = `${process.env.NEXT_PUBLIC_BASE_URL}/secure/threads/${idThreads}/posts?`

  const urlObj = new URL(url)

  if (page) {
    urlObj.searchParams.append("page", page.toString())
  }

  if (limit) {
    urlObj.searchParams.append("limit", limit.toString())
  }

  const res = await fetch(urlObj.toString(), {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  })

  return await res.json()
}
