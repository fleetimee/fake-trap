import { Metadata } from "next"
import { redirect } from "next/navigation"

import { authOptions } from "@/lib/auth"
import { getCurrentUser } from "@/lib/session"
import { NotesEditor } from "@/components/editorNote"

interface EditorPageProps {
  params: {
    idCourse: string
  }
}

export const metadata: Metadata = {
  title: "Buat Note",
}

export default async function EditorPage({ params }: EditorPageProps) {
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  return <NotesEditor id_course={parseInt(params.idCourse)} />
}
