import { Metadata } from "next"
import Link from "next/link"
import { redirect } from "next/navigation"

import { UserOneRes } from "@/types/user/res"
import { authOptions } from "@/lib/auth"
import { getCurrentUser } from "@/lib/session"
import { Icons } from "@/components/icons"
import { BreadCrumbs } from "@/components/pagers/breadcrumb"
import { DashboardShell } from "@/components/shell"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

import { PromoteToSupervisorForm } from "./_components/promote-supervisor-form"

export const metadata: Metadata = {
  title: "Promosikan Ke Supervisor",
  description: "Promosikan Ke Supervisor",
}

interface PromoteSupervisorPageProps {
  params: {
    uuid: string
  }
}

interface GetOneUserProps {
  token: string | undefined
  uuid: string
}

async function getOneUser({
  token,
  uuid,
}: GetOneUserProps): Promise<UserOneRes> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/secure/users/${uuid}`,
    {
      method: "GET",
      headers: {
        ContentType: "application/json",
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    }
  )

  return await res.json()
}

export default async function PromoteSupervisorPage({
  params,
}: PromoteSupervisorPageProps) {
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions.pages?.signIn || "/login")
  }

  const userData = await getOneUser({ token: user.token, uuid: params.uuid })

  return (
    <DashboardShell>
      <BreadCrumbs
        segments={[
          {
            href: "/dashboard",
            title: "Dashboard",
          },
          {
            href: "/dashboard/user",
            title: "User",
          },
          {
            href: `/dashboard/user/promote-supervisor`,
            title: "Promote Supervisor",
          },
        ]}
      />

      <Card className="max-w-xl">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-between space-x-2">
            <CardTitle className="inline-flex items-center text-2xl">
              <span className="mr-2 inline-flex">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <Link href="/dashboard/user">
                        <Icons.chevronLeft className="h-6 w-6" />
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent className="p-4">
                      Kembali ke halaman sebelumnya
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </span>
              Promosikan Ke Supervisor
            </CardTitle>
          </div>
          <CardDescription className="space-y-2 px-8 text-sm">
            Upgrade user menjadi supervisor
          </CardDescription>
        </CardHeader>

        <CardContent className="grid grid-cols-1 gap-6">
          <ScrollArea className="max-h-96">
            <div className="flex flex-col space-y-4">
              <div className="grid grid-cols-2 items-center space-y-2">
                <div className="flex flex-col space-y-1">
                  <span className="text-sm font-medium">Username</span>
                  <span className="text-sm">{userData.data.username}</span>
                </div>

                <div className="flex flex-col space-y-1">
                  <span className="text-sm font-medium">Email</span>
                  <span className="text-sm">{userData.data.email}</span>
                </div>
              </div>
            </div>
          </ScrollArea>

          <PromoteToSupervisorForm uuid={userData.data.uuid} />
        </CardContent>
      </Card>
    </DashboardShell>
  )
}
