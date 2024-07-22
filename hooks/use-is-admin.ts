import { useSession } from "next-auth/react"

export function useIsAdmin() {
  const { data: session } = useSession()
  const isAdmin = session?.expires.role.some((role) => role.id_role === 6)

  return isAdmin
}
