import { Knowledge } from "@/types/knowledge-res"
import { NewestKnowledge } from "@/types/newest-knowledge-res"

enum KnowledgeUrl {
  knowledge = "secure/knowledge",
  newestKnowledge = "secure/knowledge/newest",
}

export const headersObj = {
  "Content-Type": "application/json",
  Authorization:
    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImVheEBnbWFpbC5jb20iLCJleHAiOjE2ODY5MDA3OTEsImlkIjoiMjk3YTZlNTAtOTI5ZC00YWVmLWJhNmYtNzZmMzQxMjcyZWUzIiwib3JpZ19pYXQiOjE2ODY4MTQzOTEsInJvbGUiOlt7ImlkX3JvbGUiOjEsInJvbGVfbmFtZSI6IkFkbWluIiwicm9sZV9kZXNjcmlwdGlvbiI6IkdyYW50IHVzZXIgYWxsIHJlc291cmNlcyJ9XSwidXNlcm5hbWUiOiJvY3RhdmlhIn0.xIn_Gom7fhtEWhoSQDP7UBYyRty-YFR_7KzDVCI_-98",
}

/**
 * Fetches knowledge data from the server.
 * @param limit The maximum number of knowledge items to fetch.
 * @returns A Promise that resolves to the fetched knowledge data.
 */
async function getKnowledge(limit: number): Promise<Knowledge> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/${KnowledgeUrl.knowledge}?limit=${limit}`,
    {
      method: "GET",
      headers: headersObj,
      cache: "no-cache",
    }
  )

  const data = await res.json()

  // await new Promise((resolve) => setTimeout(resolve, 1500))

  return data
}

/**
 * Fetches the newest knowledge data from the server.
 * @returns A Promise that resolves to the fetched newest knowledge data.
 */
async function getNewestKnowledge(): Promise<NewestKnowledge> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/${KnowledgeUrl.newestKnowledge}`,
    {
      method: "GET",
      headers: headersObj,
      cache: "no-cache",
    }
  )

  const data = await res.json()

  // await new Promise((resolve) => setTimeout(resolve, 1500))

  return data
}

export { getKnowledge, getNewestKnowledge }
