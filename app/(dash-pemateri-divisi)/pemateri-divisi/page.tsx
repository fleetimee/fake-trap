import { Metadata } from "next"
import { redirect } from "next/navigation"
import HelloLottie from "@/public/lottie/hello.json"
import { PartyPopper } from "lucide-react"

import { authOptions } from "@/lib/auth"
import { getLoggedOnUser } from "@/lib/fetcher/auth-fetcher"
import { getQuizCreatedByUser } from "@/lib/fetcher/exercise-fetcher"
import {
  getKnowledgeByCreatedByUser,
  getKnowledgeStatusCount,
} from "@/lib/fetcher/knowledge-fetcher"
import { getCurrentUser } from "@/lib/session"
import { dateNow, extractToken, getDayWithText } from "@/lib/utils"
import { DashboardKnowledgeHighlight } from "@/components/app/dashboard/ui/highlight/knowledge-highlight"
import { DashboardHeader } from "@/components/header"
import { Icons } from "@/components/icons"
import { LottieClient } from "@/components/lottie-anim"
import { BreadCrumbs } from "@/components/pagers/breadcrumb"
import { DashboardShell } from "@/components/shell"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Widget } from "@/components/widget"

import { KnowledgeStatusCount } from "./component/timeline"

export const metadata: Metadata = {
  title: "Dashboard",
}

export default async function PemateriDivisiDashboardPage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  const tokenExtracted = extractToken(user?.token)

  const loggedOnUser = await getLoggedOnUser({
    token: user?.token,
    uuid: tokenExtracted.id,
  })

  const { count: KnowledgeCount } = await getKnowledgeByCreatedByUser({
    token: user?.token,
    userUuid: tokenExtracted.id,
    limit: 1,
    page: 1,
  })

  const { count: TestCount } = await getQuizCreatedByUser({
    token: user?.token,
    createdBy: tokenExtracted.id,
    limit: 1,
    page: 1,
  })

  const knowledgeGraph = await getKnowledgeStatusCount({
    token: user?.token,
    userUuid: tokenExtracted.id,
  })

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

      <DashboardHeader heading="Pemateri Divisi" description={dateNow} />

      <Separator />

      <Alert>
        <PartyPopper className="text-orange-500" />
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
        className="grid grid-cols-1 gap-4 xl:grid-cols-2"
        style={{ marginTop: "1rem" }}
      >
        <Widget
          icon={<Icons.knowledge className="text-green-500" />}
          title={"Pengetahuan"}
          subtitle={KnowledgeCount.toString()}
        />
        <Widget
          icon={<Icons.quiz className="text-blue-600" />}
          title={"Test"}
          subtitle={TestCount.toString()}
        />
      </div>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        <DashboardKnowledgeHighlight
          token={user?.token}
          userUuid={tokenExtracted.id}
          baseUrl="/pemateri-divisi/knowledge/detail"
        />

        <LottieClient className="hidden lg:block" animationData={HelloLottie} />
      </div>

      <Card>
        <CardHeader>
          <div className="flex-col md:flex md:flex-row md:items-center md:justify-between">
            <div className="space-y-2">
              <CardTitle>Overview Pengajuan</CardTitle>
              <CardDescription>
                Berikut adalah overview pengajuan materi yang sudah kamu ajukan
              </CardDescription>
            </div>

            <div className="flex justify-end">
              <Button>
                <span>Lihat Semua</span>
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pl-2">
          <KnowledgeStatusCount data={knowledgeGraph.data} />
        </CardContent>
      </Card>
    </DashboardShell>
  )
}
