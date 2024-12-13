import { Metadata } from "next"
import { redirect } from "next/navigation"
import { BadgeInfo, Mail, User, UserCircle } from "lucide-react"

import { authOptions } from "@/lib/auth"
import { getOneUser } from "@/lib/fetcher/users-fetcher"
import { getCurrentUser } from "@/lib/session"
import { extractToken } from "@/lib/utils"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

export const metadata: Metadata = {
  title: "Informasi Profil",
}

export default async function PesertaSettingPage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  const tokenExtracted = extractToken(user?.token)
  const person = await getOneUser({
    token: user?.token,
    uuid: tokenExtracted?.id,
  })

  const profileData = [
    {
      label: "Nama Lengkap",
      value: person.data.name,
      icon: <UserCircle className="h-5 w-5 text-blue-600" />,
    },
    {
      label: "Email",
      value: person.data.email,
      icon: <Mail className="h-5 w-5 text-blue-600" />,
    },
    {
      label: "Username",
      value: person.data.username,
      icon: <BadgeInfo className="h-5 w-5 text-blue-600" />,
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 rounded-lg border border-blue-100 bg-gradient-to-r from-blue-50 to-blue-50/30 p-4">
        <User className="h-6 w-6 text-blue-600" />
        <div>
          <h3 className="text-lg font-medium text-blue-900">
            Informasi Pribadi
          </h3>
          <p className="text-sm text-blue-600/80">
            Detail informasi akun Anda di Sistem Pembelajaran
          </p>
        </div>
      </div>
      <Separator className="bg-blue-100" />

      <Card className="border-blue-100 bg-white/50 backdrop-blur-sm">
        <CardContent className="pt-6">
          <div className="mb-6 flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-blue-100 to-blue-50">
              <User className="h-8 w-8 text-blue-600" />
            </div>
            <div>
              <h4 className="text-xl font-semibold text-blue-700">
                {person.data.name}
              </h4>
              <p className="text-sm text-blue-600/80">Peserta Pembelajaran</p>
            </div>
          </div>

          <div className="grid gap-4">
            {profileData.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-3 rounded-lg border border-blue-100 p-4 transition-colors hover:bg-blue-50/50"
              >
                {item.icon}
                <div>
                  <p className="text-sm font-medium text-blue-600">
                    {item.label}
                  </p>
                  <p className="mt-1 text-base">{item.value}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
