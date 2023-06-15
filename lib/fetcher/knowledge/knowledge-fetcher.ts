import { Knowledge } from "@/types/knowledge"
import { NewestKnowledge } from "@/types/newest-knowledge-res"

enum KnowledgeUrl {
  knowledge = "/secure/knowledge",
  newestKnowledge = "/secure/knowledge/newest",
}

export const headersObj = {
  "Content-Type": "application/json",
  Authorization:
    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImVheEBnbWFpbC5jb20iLCJleHAiOjE2ODY4NzYxOTYsImlkIjoiMjk3YTZlNTAtOTI5ZC00YWVmLWJhNmYtNzZmMzQxMjcyZWUzIiwib3JpZ19pYXQiOjE2ODY3ODk3OTYsInJvbGUiOlt7ImlkX3JvbGUiOjEsInJvbGVfbmFtZSI6IkFkbWluIiwicm9sZV9kZXNjcmlwdGlvbiI6IkdyYW50IHVzZXIgYWxsIHJlc291cmNlcyJ9XSwidXNlcm5hbWUiOiJvY3RhdmlhIn0.1TgHqauxK0YDWCHc1IJRVt8SYqe-S8ZgmjOsSl568Mg",
}

async function getKnowledge(limit: number): Promise<Knowledge> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/${KnowledgeUrl.knowledge}?limit=${limit}`,
    {
      headers: headersObj,
      next: {
        revalidate: 3,
      },
    }
  )

  const data = await res.json()

  await new Promise((resolve) => setTimeout(resolve, 1500))

  return data
}

async function getNewestKnowledge(): Promise<NewestKnowledge> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/${KnowledgeUrl.newestKnowledge}`,
    {
      headers: headersObj,
      next: {
        revalidate: 3,
      },
    }
  )

  const data = await res.json()

  await new Promise((resolve) => setTimeout(resolve, 1500))

  return data
}

export { getKnowledge, getNewestKnowledge }
