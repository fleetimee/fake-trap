import { redirect } from "next/navigation"

import { authOptions } from "@/lib/auth"
import { getRule } from "@/lib/fetcher"
import { getCurrentUser } from "@/lib/session"
import { RuleForm } from "@/components/forms/role-form"
import { Separator } from "@/components/ui/separator"

export default async function RoleOperatorLmsPage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  const rule = await getRule({
    token: user?.token,
    idRole: "6",
  })

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Executive</h3>
        <p className="text-sm text-muted-foreground">
          Berikut adalah daftar kewenangan yang dimiliki oleh Executive. Gunakan
          switch untuk mengaktifkan atau menonaktifkan kewenangan.
        </p>
      </div>
      <Separator />
      <RuleForm rule={rule.data} />
    </div>
  )
}
