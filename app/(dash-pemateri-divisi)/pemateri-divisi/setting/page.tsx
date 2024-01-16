import { Metadata } from "next"
import { redirect } from "next/navigation"

import { authOptions } from "@/lib/auth"
import { getOneUser } from "@/lib/fetcher/users-fetcher"
import { getCurrentUser } from "@/lib/session"
import { extractToken } from "@/lib/utils"
import { ProfileForm } from "@/components/forms/profile-form"
import { Separator } from "@/components/ui/separator"

export const metadata: Metadata = {
  title: "Pengaturan",
}

export default async function PemateriDivisiSettingPage() {
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
        <h3 className="text-lg font-medium">Profil</h3>
        <p className="text-sm text-muted-foreground">
          Informasi pribadi anda untuk mengelola akun Anda termasuk login
          kedalam sistem.
        </p>
      </div>
      <Separator />
      <ProfileForm person={person.data} />
    </div>
  )
}
