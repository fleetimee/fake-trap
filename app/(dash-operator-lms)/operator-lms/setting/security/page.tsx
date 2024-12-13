import { Metadata } from "next"
import { redirect } from "next/navigation"
import { Lock, Shield } from "lucide-react"

import { authOptions } from "@/lib/auth"
import { getCurrentUser } from "@/lib/session"
import { ChangePasswordForm } from "@/components/forms/password-form"
import { Separator } from "@/components/ui/separator"

export const metadata: Metadata = {
  title: "Ubah Password",
  description: "Pengaturan",
}

export default async function OperatorLMSSecuritySettingPage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  return (
    <div className="mx-auto max-w-4xl space-y-6 p-6">
      <div className="flex items-center gap-3 rounded-lg border border-blue-100 bg-gradient-to-r from-blue-50 to-blue-50/30 p-4">
        <Shield className="h-6 w-6 text-blue-600" />
        <div>
          <h3 className="text-lg font-medium text-blue-900">
            Pengaturan Password
          </h3>
          <p className="text-sm text-blue-600/80">
            Perbarui kata sandi Anda untuk meningkatkan keamanan akun.
          </p>
        </div>
      </div>
      <Separator className="bg-blue-100" />
      <ChangePasswordForm />
    </div>
  )
}
