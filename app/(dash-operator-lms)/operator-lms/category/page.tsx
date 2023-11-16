import { Metadata } from "next"
import { redirect } from "next/navigation"

import { authOptions } from "@/lib/auth"
import { getCurrentUser } from "@/lib/session"

export const metadata: Metadata = {
  title: "Kategori",
  description: "Operator LMS Category Page",
}

interface CategoryPageProps {
  searchParams: {
    [key: string]: string | string[] | undefined
  }
}

export default async function OperatorLmsCategoryPage({
  searchParams,
}: CategoryPageProps) {
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  return <div>OperatorLmsCategoryPage</div>
}
