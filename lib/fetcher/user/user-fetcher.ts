import { UserResponse } from "@/types/user-res"
import { toast } from "@/components/ui/use-toast"

import { headersObj } from "../knowledge/knowledge-fetcher"

enum UserUrl {
  user = "secure/users",
}

/**
 * Fetches user data from the server.
 * @returns {Promise<UserResponse>} A promise that resolves to the user data.
 */
async function getUser(): Promise<UserResponse> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/${UserUrl.user}`,
      {
        method: "GET",
        headers: headersObj,
        cache: "no-cache",
      }
    )

    const data: UserResponse = await response.json()

    return data
  } catch (error) {
    console.error(error)
    throw error
  }
}

export { getUser }