import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { redirect } from "next/navigation"
import NoNotification from "@/public/lottie/no-notification.json"
import { formatDistanceToNow } from "date-fns"
import { PartyPopper } from "lucide-react"

import { authOptions } from "@/lib/auth"
import {
  getSupervisorLmsCount,
  getSupervisorLmsNotificationList,
} from "@/lib/fetcher/approval-fetcher"
import { getLoggedOnUser } from "@/lib/fetcher/auth-fetcher"
import { getCurrentUser } from "@/lib/session"
import { dateNow, extractToken, getDayWithText } from "@/lib/utils"
import { DashboardHeader } from "@/components/header"
import { Icons } from "@/components/icons"
import { LottieClient } from "@/components/lottie-anim"
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

export default async function SupervisorLmsProfilePage() {
  const user = await getCurrentUser()

  const tokenExtracted = extractToken(user?.token)

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  const loggedOnUser = await getLoggedOnUser({
    token: user?.token,
    uuid: tokenExtracted?.id,
  })

  // Fetch supervisor LMS Count
  const approvalCount = await getSupervisorLmsCount({
    token: user?.token,
    userUuid: tokenExtracted?.id,
  })

  // Fetch supervisor LMS Notification
  const notifications = await getSupervisorLmsNotificationList({
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
            href: "/supervisor-lms",
            title: "Dashboard",
          },
        ]}
      />

      <DashboardHeader heading="Approval LMS" description={dateNow} />

      <Alert>
        <PartyPopper className="size-5" />
        <AlertTitle>
          Halo,{" "}
          <span className="font-heading uppercase text-primary">
            {loggedOnUser.data?.name}
          </span>
        </AlertTitle>
        <AlertDescription>
          Selamat beraktifitas, hari ini hari{" "}
          <span className="font-heading uppercase">{getDayWithText}</span> !
        </AlertDescription>
      </Alert>

      <div
        className="grid grid-cols-1 gap-4"
        style={{ gridTemplateRows: "auto 1fr" }}
      >
        <div className=" grid grid-cols-2 gap-4 xl:grid-cols-4">
          {approvalCount.data.map((item, index) => {
            return (
              <Link
                href={`supervisor-lms/approval?page=1&status_text=${item.status_code}`}
              >
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
              </Link>
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
            {notificationsCount > 0
              ? `Anda memiliki ${notificationsCount} notifikasi`
              : "Belum ada notifikasi yang masuk, santai saja!"}
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="border-t border-gray-200 dark:border-gray-700">
            <div className="grid gap-4 space-y-4 p-4">
              {notifications.data.length > 0 ? (
                notifications.data.map((item, index) => {
                  return (
                    <div
                      className="grid gap-1.5 space-y-4"
                      key={item.id_approval_course}
                    >
                      <div>
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
                      </div>

                      <div className="flex flex-col items-end justify-between gap-2 md:flex-row md:gap-0">
                        <div className="flex  min-h-[150px] w-full max-w-lg items-start space-x-2 rounded-md border border-primary p-2">
                          <Image
                            src={`${process.env.NEXT_PUBLIC_BASE_URL}${item.image}`}
                            alt={item.course_name}
                            width={100}
                            height={100}
                          />
                          <div>
                            <p className="font-heading">{item.course_name}</p>
                            <p className="line-clamp-4 text-sm text-gray-500 dark:text-gray-400">
                              {item.course_desc}
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
                                href={`supervisor-lms/approval/detail/${item.id_approval_course}/course/${item.id_course}`}
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
                                href={`supervisor-lms/approval/confirmation/${item.id_approval_course}`}
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
                <div className="flex flex-col items-center justify-center space-y-2">
                  <LottieClient
                    animationData={NoNotification}
                    className="w-1/2"
                  />

                  <p className="font-heading text-lg">Tidak Ada Notifikasi</p>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </DashboardShell>
  )
}
