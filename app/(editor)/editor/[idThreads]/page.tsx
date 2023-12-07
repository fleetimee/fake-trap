import { Metadata } from "next"
import { notFound, redirect } from "next/navigation"

import { authOptions } from "@/lib/auth"
import { getOneThread } from "@/lib/fetcher"
import { getCurrentUser } from "@/lib/session"
import { Editor } from "@/components/editor"

interface EditorPageProps {
  params: {
    idThreads: string
  }
}

export const metadata: Metadata = {
  title: "Buat post baru",
}

export default async function EditorPage({ params }: EditorPageProps) {
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  const thread = await getOneThread({
    token: user.token,
    idThreads: params.idThreads,
  })

  if (thread.code !== 200) {
    return notFound()
  }

  return <Editor id_threads={parseInt(params.idThreads)} />
}
