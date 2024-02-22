import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { redirect } from "next/navigation"
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
import { BreadCrumbs } from "@/components/pagers/breadcrumb"
import { DashboardShell } from "@/components/shell"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button, buttonVariants } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
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

  const getNewestKnowledgeOperator = await getNewestOperatorKnowledge({
    token: user?.token,
  })

  const getOperatorLmsNotification = await getOperatorLmsNotificationList({
    token: user?.token,
    userUuid: tokenExtracted.id,
  })

  console.log(getOperatorLmsNotification)

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
          title="Pengetahuan"
          subtitle={globalCount.data?.knowledge_count.toString()}
        />

        <Widget
          icon={<Icons.category className="text-blue-500" />}
          title="Kategori"
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
            <CardTitle>Pengetahuan Terbaru</CardTitle>
            <CardDescription>
              Pengetahuan Terbaru yang di buat oleh Pemateri Divisi
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
              Notifikasi terbaru terkait dengan Pengajuan Pelatihan baru.
            </CardDescription>
            <Separator />
          </CardHeader>
          <CardContent>
            <p>Card Content</p>
          </CardContent>
          <CardFooter>
            <p>Card Footer</p>
          </CardFooter>
        </Card>
      </div>
    </DashboardShell>
  )
}
