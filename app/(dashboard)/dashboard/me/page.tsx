import { redirect } from "next/navigation"
import { generateFromString } from "generate-avatar"

import { authOptions } from "@/lib/auth"
import { getCurrentUser } from "@/lib/session"
import { extractToken } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card } from "@/components/ui/card"

export const metadata = {
  title: "Profil Saya",
  description: "Detail mengenai profil anda",
}

export default async function MePages() {
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  const tokenExtract = extractToken(user?.token)

  return (
    <div className="grid grid-cols-5 items-start justify-between">
      <Card className="col-span-5 flex  h-auto min-h-[300px] w-auto min-w-[200px] flex-col gap-4 p-4 sm:col-span-3 lg:col-span-2">
        <h1 className="font-heading text-2xl font-light">Data User</h1>

        <div className="flex items-start justify-start gap-6 space-y-4">
          <Avatar className="h-20 w-20">
            <AvatarImage
              src={`data:image/svg+xml;utf8,${generateFromString(
                tokenExtract.username
              )}`}
            />
            <AvatarFallback />
          </Avatar>

          <div className="flex flex-col items-start justify-between gap-1 ">
            <span className=" text-xl font-semibold">
              {tokenExtract.username}
            </span>
            <span className=" text-sm font-semibold">{tokenExtract.email}</span>
          </div>
        </div>
      </Card>
    </div>
  )
}
