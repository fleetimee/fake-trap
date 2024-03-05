import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { redirect } from "next/navigation"
import NoNotification from "@/public/lottie/no-notification.json"
import { formatDistanceToNow } from "date-fns"
import { PartyPopper } from "lucide-react"

import { authOptions } from "@/lib/auth"
import { badgeSwitch } from "@/lib/badge-switch"
import { getOperatorLmsNotificationList } from "@/lib/fetcher/approval-fetcher"
import { getLoggedOnUser } from "@/lib/fetcher/auth-fetcher"
import { getNewestOperatorKnowledge } from "@/lib/fetcher/knowledge-fetcher"
import { getGlobalCount } from "@/lib/fetcher/menu-fetcher"
import { getCurrentUser } from "@/lib/session"
import { dateNow, extractToken, getDayWithText } from "@/lib/utils"
import { DashboardHeader } from "@/components/header"
import { Icons } from "@/components/icons"
import { LottieClient } from "@/components/lottie-anim"
import { BreadCrumbs } from "@/components/pagers/breadcrumb"
import { DashboardShell } from "@/components/shell"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button, buttonVariants } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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
  description: "Operator LMS Dashboard Page",
}
export default async function OperatorLMSDashboard() {
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  const tokenExtracted = extractToken(user?.token)

  const loggedOnUser = await getLoggedOnUser({
    token: user?.token,
    uuid: tokenExtracted.id,
  })

  // Get Newest Knowledge from Pemateri Divisi
  const getNewestKnowledgeOperator = await getNewestOperatorKnowledge({
    token: user?.token,
  })

  // Get Operator LMS Notification
  const notifications = await getOperatorLmsNotificationList({
    token: user?.token,
    userUuid: tokenExtracted.id,
  })

  // Get notification count
  const notificationsCount =
    notifications.data.length > 0 ? notifications.data.length : 0

  const globalCount = await getGlobalCount({
    token: user?.token,
  })

  return (
    <DashboardShell>
      <BreadCrumbs
        segments={[
          {
            href: "/operator-lms",
            title: "Dashboard",
          },
        ]}
      />

      <DashboardHeader heading="Operator LMS" description={dateNow} />

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

      <div
        className="grid grid-cols-2 gap-4 xl:grid-cols-4"
        style={{ marginTop: "1rem" }}
      >
        <Widget
          icon={<Icons.knowledge className="text-green-500" />}
          title="Materi"
          subtitle={globalCount.data?.knowledge_count.toString()}
        />

        <Widget
          icon={<Icons.category className="text-blue-500" />}
          title="Modul"
          subtitle={globalCount.data?.category_count.toString()}
        />

        <Widget
          icon={<Icons.quiz className="text-yellow-500" />}
          title="Test dan Latihan"
          subtitle={globalCount.data?.quiz_count.toString()}
        />

        <Widget
          icon={<Icons.course className="text-red-500" />}
          title="Pelatihan"
          subtitle={globalCount.data?.course_count.toString()}
        />
      </div>

      <div className="mt-4 grid min-h-[500px] grid-cols-1 gap-4 md:grid-cols-2">
        {/* Card New Materi */}
        <Card>
          <CardHeader>
            <CardTitle>Materi Terbaru</CardTitle>
            <CardDescription>
              Materi Terbaru yang di buat oleh Pemateri Divisi
            </CardDescription>
            <Separator />
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-4 space-y-4">
              {getNewestKnowledgeOperator.data.length > 0 ? (
                getNewestKnowledgeOperator.data.map((item, index) => (
                  <div className="flex flex-col gap-4 space-y-4 rounded-xl bg-white p-4 shadow-md dark:bg-gray-800 dark:shadow-none">
                    <div
                      key={index}
                      className="flex items-start gap-2 space-x-2 rounded-xl  p-2"
                    >
                      <Avatar>
                        <AvatarImage
                          sizes="40px"
                          src={`${process.env.NEXT_PUBLIC_BASE_URL}${item.image}`}
                          alt={item.knowledge_title}
                        />
                        <AvatarFallback>NA</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 space-y-2 overflow-hidden">
                        <Link
                          href={`/operator-lms/knowledge/detail/${item.id_knowledge}`}
                          className="text-blue-600 hover:underline"
                        >
                          <p className="text-primary-500 dark:text-primary-400 font-sans text-lg font-semibold">
                            {item.knowledge_title}
                          </p>
                        </Link>
                        <div className="text-muted-500 dark:text-muted-400 flex flex-col items-start gap-2 font-sans text-sm">
                          <div className="inline-flex items-center">
                            <Icons.user className="size-4" />
                            <span className="text-muted-500 dark:text-muted-400 ml-1 font-sans text-sm">
                              {item.requester_name}
                            </span>
                          </div>
                          <div className="inline-flex items-center">
                            <Icons.calendar className="size-4" />
                            <span className="text-muted-500 dark:text-muted-400 ml-1 font-sans text-sm">
                              {formatDistanceToNow(new Date(item.updated_at), {
                                addSuffix: true,
                              })}{" "}
                              |{" "}
                              <span>
                                {badgeSwitch({
                                  approval: {
                                    status_code: item.status,
                                    status_text: item.status_text,
                                  },
                                })}
                              </span>
                            </span>
                          </div>
                        </div>
                        <Separator />
                        <p className="text-muted-500 dark:text-muted-400 line-clamp-2 font-sans text-sm">
                          {item.description}
                        </p>
                      </div>
                    </div>

                    <Link
                      href={`/operator-lms/knowledge/detail/${item.id_knowledge}`}
                      className={buttonVariants({
                        variant: "outline",
                      })}
                    >
                      Lihat Detail
                    </Link>
                  </div>
                ))
              ) : (
                <p>Tidak Ada Data</p>
              )}
            </div>
          </CardContent>
          <CardFooter className="flex flex-col">
            <Link
              href="/operator-lms/knowledge"
              className="flex items-end justify-end"
            >
              <Button className="flex items-end " variant="outline">
                Lebih Banyak
              </Button>
            </Link>
          </CardFooter>
        </Card>

        {/* Card Notifikasi */}
        <Card className="h-fit">
          <CardHeader>
            <CardTitle>Notifikasi</CardTitle>
            <CardDescription>
              {notificationsCount > 0
                ? `Anda memiliki ${notificationsCount} notifikasi`
                : "Belum ada notifikasi yang masuk, santai saja!"}
            </CardDescription>
            <Separator />
          </CardHeader>
          <CardContent className="p-0">
            {notifications.data.length > 0 && (
              <div
                className="grid gap-4 space-y-4 p-4"
                style={{ marginTop: "-1rem" }}
              >
                <Alert className="border border-red-500">
                  <Icons.note className="size-4" />
                  <AlertTitle className="text-red-500">Heads up!</AlertTitle>
                  <AlertDescription>
                    Segera lakukan tindakan pada notifikasi yang ada.
                  </AlertDescription>
                </Alert>
              </div>
            )}

            <div className=" border-gray-200 dark:border-gray-700">
              <div className="grid gap-4 space-y-4 p-4">
                {notifications.data.length > 0 ? (
                  notifications.data.map((item, index) => (
                    <div
                      key={item.id_approval_course}
                      className="grid gap-1.5 space-y-4"
                    >
                      <div>
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-semibold">
                            Dari: {item.approver_name}
                          </p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {formatDistanceToNow(new Date(item.updated_at), {
                              addSuffix: true,
                            })}
                          </p>
                        </div>
                        <p className="inline-flex items-center text-sm">
                          Perihal:{" "}
                          {item.status === "0051"
                            ? "Pengajuan Pelatihan"
                            : item.status === "0053"
                              ? "Revisi Pengajuan Pelatihan"
                              : "Pengajuan Pelatihan"}
                          <span className="ml-2 inline-flex">
                            {badgeSwitch({
                              approval: {
                                status_code: item.status,
                                status_text: item.status_text,
                              },
                            })}
                          </span>
                        </p>
                      </div>

                      <div className="flex flex-col items-end justify-between gap-2 md:flex-row md:gap-4">
                        <div className="flex  min-h-[100px] w-full max-w-lg items-start space-x-2 rounded-md border border-primary p-2">
                          {/* <div className="flex items-start space-x-2 rounded-md border border-primary p-2"> */}
                          <Image
                            src={`${process.env.NEXT_PUBLIC_BASE_URL}${item.image}`}
                            alt={item.course_name}
                            width={100}
                            height={100}
                            className="rounded-md"
                          />
                          <div
                            className="flex flex-1 flex-col items-start space-y-2"
                            style={{ maxWidth: "calc(100% - 100px)" }}
                          >
                            <Link
                              href={`/operator-lms/course/detail/${item.id_course}`}
                              className="text-blue-600 hover:underline"
                            >
                              <p className="font-heading">{item.course_name}</p>
                            </Link>
                            <p className="line-clamp-3 text-sm text-gray-500 dark:text-gray-400">
                              {item.course_description}
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
                                href={`/operator-lms/course/detail/${item.id_approval_course}`}
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
                                href={`/operator-lms/approve/revision/${item.id_approval_course}`}
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

                      <Separator />
                    </div>
                  ))
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

          <CardFooter className="flex flex-col">
            <Link
              href="/operator-lms/approve"
              className="flex items-end justify-end"
            >
              <Button className="flex items-end " variant="outline">
                Lebih Banyak
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    </DashboardShell>
  )
}
