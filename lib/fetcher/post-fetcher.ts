import { PostOneRes, PostsListRes } from "@/types/posts/res"

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

interface GetPostByIdProps {
  token: string | undefined
  idPosts: string
}

export async function getPostById({
  token,
  idPosts,
}: GetPostByIdProps): Promise<PostOneRes> {
  let url = `${process.env.NEXT_PUBLIC_BASE_URL}/secure/threads/posts/${idPosts}`

  const res = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  })

  return await res.json()
}

interface CreatePostProps {
  token: string | undefined
  body: BodyInit
}

export async function createPost({ token, body }: CreatePostProps) {
  let url = `${process.env.NEXT_PUBLIC_BASE_URL}/secure/threads/posts/`

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

interface EditPostProps {
  token: string | undefined
  idPosts: string
  body: BodyInit
}

export async function editPost({ token, idPosts, body }: EditPostProps) {
  let url = `${process.env.NEXT_PUBLIC_BASE_URL}/secure/threads/posts/${idPosts}`

  const res = await fetch(url, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: body,
  })

  return res
}

interface DeletePostProps {
  token: string | undefined
  idPosts: string
}

export async function deletePost({ token, idPosts }: DeletePostProps) {
  let url = `${process.env.NEXT_PUBLIC_BASE_URL}/secure/threads/posts/${idPosts}`

  const res = await fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })

  return res
}
