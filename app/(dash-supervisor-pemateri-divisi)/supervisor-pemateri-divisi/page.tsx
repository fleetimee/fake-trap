import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { redirect } from "next/navigation"
import { formatDistanceToNow } from "date-fns"
import { PartyPopper } from "lucide-react"

import { authOptions } from "@/lib/auth"
import {
  getSupervisorPemateriDivisiCount,
  getSupervisorPemateriDivisiNotificationList,
} from "@/lib/fetcher/approval-fetcher"
import { getLoggedOnUser } from "@/lib/fetcher/auth-fetcher"
import { getCurrentUser } from "@/lib/session"
import { dateNow, extractToken, getDayWithText } from "@/lib/utils"
import { MotionDiv } from "@/components/framer-wrapper"
import { DashboardHeader } from "@/components/header"
import { Icons } from "@/components/icons"
import { BreadCrumbs } from "@/components/pagers/breadcrumb"
import { DashboardShell } from "@/components/shell"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Separator } from "@/components/ui/separator"
import { Widget } from "@/components/widget"

export const metadata: Metadata = {
  title: "Dashboard",
}

export default async function SupervisorPemateriDivisiPage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  const tokenExtracted = extractToken(user?.token)

  const loggedOnUser = await getLoggedOnUser({
    token: user?.token,
    uuid: tokenExtracted?.id,
  })

  // Fetch Approval Count
  const approvalCount = await getSupervisorPemateriDivisiCount({
    token: user?.token,
    userUuid: tokenExtracted?.id,
  })

  // Fetch Recent Notificaitons
  const notifications = await getSupervisorPemateriDivisiNotificationList({
    token: user?.token,
    userUuid: tokenExtracted?.id,
  })

  const notificationsCount =
    notifications.data.length > 0 ? notifications.data.length : 0

  return (
    <DashboardShell>
      <BreadCrumbs
        segments={[
          {
            href: "/pemateri-divisi",
            title: "Dashboard",
          },
        ]}
      />

      <MotionDiv
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <DashboardHeader heading="Supervisor Divisi" description={dateNow} />
      </MotionDiv>

      <MotionDiv
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
      >
        <Alert>
          <PartyPopper className="size-5" />
          <AlertTitle>
            Halo,{" "}
            <span className="font-heading uppercase text-primary">
              {loggedOnUser.data?.name}
            </span>
          </AlertTitle>
          <AlertDescription>
            Have a Nice{" "}
            <span className="font-heading uppercase">{getDayWithText}</span> !
          </AlertDescription>
        </Alert>
      </MotionDiv>

      <div
        className="grid grid-cols-1 gap-4"
        style={{ gridTemplateRows: "auto 1fr" }}
      >
        <div className=" grid grid-cols-2 gap-4 xl:grid-cols-4">
          {approvalCount.data.map((item, index) => {
            return (
              <Widget
                key={index}
                icon={
                  item.status === "approved" ? (
                    <Icons.mailCheck className="text-blue-500" />
                  ) : item.status === "pending" ? (
                    <Icons.mailQuestion className="text-green-500" />
                  ) : (
                    <Icons.mailX className="text-red-500" />
                  )
                }
                title={
                  item.status === "approved"
                    ? "Approved"
                    : item.status === "pending"
                      ? "Pending"
                      : "Rejected"
                }
                subtitle={item.count.toString()}
              />
            )
          })}
        </div>
      </div>

      {notifications.data.length > 0 && (
        <Alert className="border border-red-500">
          <Icons.note className="size-4" />
          <AlertTitle className="text-red-500">Heads up!</AlertTitle>
          <AlertDescription>
            Segera lakukan tindakan pada pengajuan materi yang masuk
          </AlertDescription>
        </Alert>
      )}

      <Card className="w-full lg:min-w-[600px]">
        <CardHeader className="space-y-2 pb-4">
          <CardTitle>
            <Icons.bell className="mr-2 inline-flex size-6 animate-pulse text-red-500" />
            Kotak Masuk
          </CardTitle>
          <CardDescription>
            Ada {notificationsCount} Pengajuan Materi yang perlu dilakukan
            tindakan
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="border-t border-gray-200 dark:border-gray-700">
            <div className="grid gap-4 space-y-4 p-4">
              {notifications.data.length > 0 ? (
                notifications.data.map((item, index) => {
                  return (
                    <div
                      className="grid gap-1.5"
                      key={item.id_approval_knowledge}
                    >
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium">
                          Dari: {item.requester_name}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {formatDistanceToNow(new Date(item.updated_at), {
                            addSuffix: true,
                          })}
                        </p>
                      </div>

                      <p className="text-sm">
                        Perihal:{" "}
                        {item.status === "0051"
                          ? "Pengajuan Materi"
                          : item.status === "0053"
                            ? "Revisi Pengajuan Materi"
                            : "Pengajuan Materi"}
                        <span className="inline-flex">
                          <Badge
                            variant="secondary"
                            className="ml-2 bg-yellow-500"
                          >
                            {item.status_name}
                          </Badge>
                        </span>
                      </p>

                      <div className="flex flex-col items-end justify-between gap-2 md:flex-row md:gap-0">
                        <div className="flex  w-full max-w-lg items-start space-x-2 rounded-md border border-primary p-2">
                          <Image
                            src={`${process.env.NEXT_PUBLIC_BASE_URL}${item.knowledge_image}`}
                            alt={item.knowledge_title}
                            width={100}
                            height={100}
                          />
                          <div>
                            <p className="font-heading">
                              {item.knowledge_title}
                            </p>
                            <p className="line-clamp-3 text-sm text-gray-500 dark:text-gray-400">
                              {item.description}
                            </p>
                          </div>
                        </div>

                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button className="w-full md:w-auto">Aksi</Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent className="w-44">
                            <DropdownMenuLabel>Opsi</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuGroup>
                              <Link
                                href={`supervisor-pemateri-divisi/approval/detail/${item.id_approval_knowledge}/knowledge/${item.id_knowledge}`}
                              >
                                <DropdownMenuItem>
                                  <Icons.bookmark className="mr-2 size-4" />
                                  <span>Detail</span>
                                  <DropdownMenuShortcut>
                                    ⌘+L
                                  </DropdownMenuShortcut>
                                </DropdownMenuItem>
                              </Link>

                              <Link
                                href={`supervisor-pemateri-divisi/approval/confirmation/${item.id_approval_knowledge}`}
                              >
                                <DropdownMenuItem>
                                  <Icons.edit className="mr-2 size-4" />
                                  <span>Konfirmasi</span>
                                  <DropdownMenuShortcut>
                                    ⌘+E
                                  </DropdownMenuShortcut>
                                </DropdownMenuItem>
                              </Link>
                            </DropdownMenuGroup>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>

                      <div className="flex items-center py-2">
                        <Separator />
                      </div>
                    </div>
                  )
                })
              ) : (
                <div className="flex items-center justify-center">
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Tidak ada notifikasi
                  </p>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </DashboardShell>
  )
}
