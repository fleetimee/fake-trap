import { Metadata } from "next"
import { redirect } from "next/navigation"

import { authOptions } from "@/lib/auth"
import { getCurrentUser } from "@/lib/session"
import { ChangePasswordForm } from "@/components/forms/password-form"
import { Separator } from "@/components/ui/separator"

export const metadata: Metadata = {
  title: "Keamanan",
  description: "Pengaturan",
}

export default async function SupervisorDivisiSettingPage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Keamanan</h3>
        <p className="text-sm text-muted-foreground">
          Ubah kata sandi Anda dan atur opsi keamanan lainnya.
        </p>
      </div>
      <Separator />
      <ChangePasswordForm />
    </div>
  )
}
