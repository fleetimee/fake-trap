import { useSession } from "next-auth/react"

function useHasRestrictedRole() {
  const { data: session } = useSession()
  const hasRestrictedRole = session?.expires.role.some((role) =>
    [3, 4].includes(role.id_role)
  )

  return hasRestrictedRole
}

export default useHasRestrictedRole
