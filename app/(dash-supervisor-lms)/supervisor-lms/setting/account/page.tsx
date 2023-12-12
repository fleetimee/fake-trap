import { Metadata } from "next"
import { redirect } from "next/navigation"

import { authOptions } from "@/lib/auth"
import { getOneUser } from "@/lib/fetcher"
import { getCurrentUser } from "@/lib/session"
import { extractToken } from "@/lib/utils"
import { AccountForm } from "@/components/forms/account-form"
import { Separator } from "@/components/ui/separator"

export const metadata: Metadata = {
  title: "Akun",
  description: "Pengaturan",
}

export default async function SupervisorLmsAccountSettingPage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  const tokenExtracted = extractToken(user?.token)

  const person = await getOneUser({
    token: user?.token,
    uuid: tokenExtracted?.id,
  })

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Akun</h3>
        <p className="text-sm text-muted-foreground">
          Informasi pribadi anda yang akan ditampilkan secara publik.
        </p>
      </div>
      <Separator />
      <AccountForm person={person.data} />
    </div>
  )
}
