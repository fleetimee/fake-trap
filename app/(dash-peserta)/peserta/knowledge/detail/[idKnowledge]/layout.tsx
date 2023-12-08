import { redirect } from "next/navigation"

import { authOptions } from "@/lib/auth"
import { getCurrentUser } from "@/lib/session"

interface KnowledgeLayoutProps {
  children: React.ReactNode
}

export default async function KnowledgeLayout({
  children,
}: KnowledgeLayoutProps) {
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }
}
