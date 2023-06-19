import { KnowledgeRequest } from "@/types/knowledge-req"
import { Knowledge, KnowledgeByIdResponse } from "@/types/knowledge-res"
import { NewestKnowledge } from "@/types/newest-knowledge-res"
import { toast } from "@/components/ui/use-toast"

enum KnowledgeUrl {
  knowledge = "secure/knowledge",
  newestKnowledge = "secure/knowledge/newest",
}

export const headersObj = {
  "Content-Type": "application/json",
  Authorization:
    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImVheEBnbWFpbC5jb20iLCJleHAiOjE2ODcyNTE0ODMsImlkIjoiMjk3YTZlNTAtOTI5ZC00YWVmLWJhNmYtNzZmMzQxMjcyZWUzIiwib3JpZ19pYXQiOjE2ODcxNjUwODMsInJvbGUiOlt7ImlkX3JvbGUiOjEsInJvbGVfbmFtZSI6IkFkbWluIiwicm9sZV9kZXNjcmlwdGlvbiI6IkdyYW50IHVzZXIgYWxsIHJlc291cmNlcyJ9XSwidXNlcm5hbWUiOiJvY3RhdmlhIn0.0Kp4C1dOyCBsf_-E8bpXS4oigXSrIm-XBe7UYJ9J_S8",
}

/**
 * Fetches knowledge data from the server.
 * @param limit The maximum number of knowledge items to fetch.
 * @returns A Promise that resolves to the fetched knowledge data.
 */
async function getKnowledge(limit: number): Promise<Knowledge> {
  try {
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
  } catch (error) {
    console.error(error)
    throw error
  }
}

/**
 * Fetches the newest knowledge data from the server.
 * @returns A Promise that resolves to the fetched newest knowledge data.
 */
async function getNewestKnowledge(): Promise<NewestKnowledge> {
  try {
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
  } catch (error) {
    console.error(error)
    throw error
  }
}

/**
 * Fetches knowledge data by ID from the server.
 * @param id The ID of the knowledge item to fetch.
 * @returns A Promise that resolves to the fetched knowledge data.
 */
async function getKnowledgeByid(id: number): Promise<KnowledgeByIdResponse> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/${KnowledgeUrl.knowledge}/${id}`,
      {
        method: "GET",
        headers: headersObj,
        cache: "no-cache",
      }
    )

    const data = await res.json()

    // await new Promise((resolve) => setTimeout(resolve, 1500))

    return data
  } catch (error) {
    console.error(error)
    throw error
  }
}

/**
 * Sends a POST request to add new knowledge data to the server.
 * @param input The knowledge data to add.
 * @returns A Promise that resolves when the knowledge data has been successfully added.
 */
async function postKnowledge(input: KnowledgeRequest): Promise<void> {
  try {
    const req = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/${KnowledgeUrl.knowledge}`,
      {
        method: "POST",
        headers: headersObj,
        body: JSON.stringify(input),
      }
    )

    const res = await req.json()

    if (res) {
      toast({
        title: "Success",
        description: "Pengetahuan berhasil ditambahkan!",
      })
    }
  } catch (error) {
    console.error(error)
    throw error
  }
}

/**
 * Sends a PUT request to update existing knowledge data on the server.
 * @param input The updated knowledge data.
 * @param id The ID of the knowledge item to update.
 * @returns A Promise that resolves when the knowledge data has been successfully updated.
 */
async function putKnowledge(
  input: KnowledgeRequest,
  id: number
): Promise<void> {
  try {
    const req = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/${KnowledgeUrl.knowledge}/${id}`,
      {
        method: "PUT",
        headers: headersObj,
        body: JSON.stringify(input),
      }
    )

    const res = await req.json()

    if (res) {
      toast({
        title: "Success",
        description: "Pengetahuan berhasil diubah!",
      })
    }
  } catch (error) {
    console.error(error)
    throw error
  }
}

/**
 * Sends a DELETE request to remove knowledge data from the server.
 * @param id The ID of the knowledge item to remove.
 * @returns A Promise that resolves when the knowledge data has been successfully removed.
 */
async function deleteKnowledge(id: number): Promise<void> {
  try {
    const req = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/${KnowledgeUrl.knowledge}/${id}`,
      {
        method: "DELETE",
        headers: headersObj,
      }
    )

    const res = await req.json()

    if (res) {
      toast({
        title: "Success",
        description: "Pengetahuan berhasil dihapus!",
      })
    }
  } catch (error) {
    console.error(error)
    throw error
  }
}

export {
  getKnowledge,
  getNewestKnowledge,
  getKnowledgeByid,
  postKnowledge,
  putKnowledge,
}
