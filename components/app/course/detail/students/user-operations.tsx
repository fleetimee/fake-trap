import React from "react"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"

async function deleteUserFromCourse(path: string, token: string | undefined) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/secure/course/${path}/users`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  )
}

export function UserOperations() {
  const router = useRouter()

  const { data: session } = useSession()

  const [openDeleteAlert, setOpenDeleteAlert] = React.useState<boolean>(false)

  const [isDeleteLoading, setIsDeleteLoading] = React.useState<boolean>(false)
}
