import { redirect } from "next/navigation"

import { authOptions } from "@/lib/auth"
import { getCurrentUser } from "@/lib/session"
import { Editor } from "@/components/editor"

interface EditorPageProps {
  params: { threadId: string }
}

export default async function EditorPage({ params }: EditorPageProps) {
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  return (
    <Editor
      post={{
        id_threads: params.threadId,
        content: "",
        user_uuid: "",
      }}
    />
  )
}
