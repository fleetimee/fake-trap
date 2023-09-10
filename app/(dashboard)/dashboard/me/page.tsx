import Link from "next/link"
import { redirect } from "next/navigation"

import {
  UserAvgScoreRes,
  UserCourseCountRes,
  UserEnrolledCourseListRes,
  UserPostCountRes,
  UserQuizCountRes,
  UserQuizGroupedRes,
  UserQuizTakenListRes,
  UserRecentPostListRes,
} from "@/types/me/res"
import { authOptions } from "@/lib/auth"
import { getRandomPatternStyle } from "@/lib/generate-pattern"
import { getCurrentUser } from "@/lib/session"
import { cn, extractToken } from "@/lib/utils"
import {
  AvgScoreCard,
  CourseContainerCard,
  ProfileCard,
  RecentPostCard,
  RecentQuizCard,
} from "@/components/app/me/ui"
import { DashboardHeader } from "@/components/header"
import { BreadCrumbs } from "@/components/pagers/breadcrumb"
import { DashboardShell } from "@/components/shell"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export const metadata = {
  title: "Profil Saya",
  description: "Detail mengenai profil anda",
}

interface GetUserPostCount {
  token: string | undefined
  uuid: string | undefined
}

async function getUserPostCount({
  token,
  uuid,
}: GetUserPostCount): Promise<UserPostCountRes> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/secure/users/${uuid}/getPostCount`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    }
  )

  return await res.json()
}

interface GetUserCourseCount {
  token: string | undefined
  uuid: string | undefined
}

async function getUserCourseCount({
  token,
  uuid,
}: GetUserCourseCount): Promise<UserCourseCountRes> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/secure/users/${uuid}/getCourseCount`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    }
  )

  return await res.json()
}

interface GetUserQuizCount {
  token: string | undefined
  uuid: string | undefined
}

async function getUserQuizCount({
  token,
  uuid,
}: GetUserQuizCount): Promise<UserQuizCountRes> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/secure/users/${uuid}/getQuizCount`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    }
  )

  return await res.json()
}

interface GetUserAvgQuizScore {
  token: string | undefined
  uuid: string | undefined
}

async function getUserAvgQuizScore({
  token,
  uuid,
}: GetUserAvgQuizScore): Promise<UserAvgScoreRes> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/secure/users/${uuid}/getAverageUserQuiz`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    }
  )

  return await res.json()
}

interface GetUserRecentPostList {
  token: string | undefined
  uuid: string | undefined
}

async function getUserRecentPostList({
  token,
  uuid,
}: GetUserRecentPostList): Promise<UserRecentPostListRes> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/secure/users/${uuid}/getRecentPost`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    }
  )

  return await res.json()
}

interface GetUserQuizTakenList {
  token: string | undefined
  uuid: string | undefined
}

async function getUserQuizTakenList({
  token,
  uuid,
}: GetUserQuizTakenList): Promise<UserQuizTakenListRes> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/secure/users/${uuid}/getQuizThatUserTaken`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    }
  )

  return await res.json()
}

interface GetUserEnrolledCourseList {
  token: string | undefined
  uuid: string | undefined
  limit: number
  page: number
  searchQuery?: string
}

async function getUserEnrolledCourseList({
  token,
  uuid,
  limit,
  page,
  searchQuery,
}: GetUserEnrolledCourseList): Promise<UserEnrolledCourseListRes> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/secure/users/${uuid}/getEnrolledCourse?limit=${limit}&page=${page}&search=${searchQuery}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    }
  )

  return await res.json()
}

interface GetQuizGroupedByCourse {
  token: string | undefined
  uuid: string | undefined
  page: number
  limit: number
}

async function getQuizGroupedByCourse({
  token,
  uuid,
  page,
  limit,
}: GetQuizGroupedByCourse): Promise<UserQuizGroupedRes> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/secure/users/${uuid}/getDistinctQuizGroupedAndAveraged?limit=${limit}&page=${page}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    }
  )
  return await res.json()
}

export default async function MePages() {
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  const tokenExtract = extractToken(user?.token)

  const [
    postCount,
    courseCount,
    quizCount,
    avgScore,
    recentPostList,
    quizTakenList,
    enrolledCourseList,
    quizGrouped,
  ] = await Promise.all([
    getUserPostCount({ token: user?.token, uuid: tokenExtract.id }),
    getUserCourseCount({ token: user?.token, uuid: tokenExtract.id }),
    getUserQuizCount({ token: user?.token, uuid: tokenExtract.id }),
    getUserAvgQuizScore({ token: user?.token, uuid: tokenExtract.id }),
    getUserRecentPostList({ token: user?.token, uuid: tokenExtract.id }),
    getUserQuizTakenList({ token: user?.token, uuid: tokenExtract.id }),
    getUserEnrolledCourseList({
      token: user?.token,
      uuid: tokenExtract.id,
      limit: 5,
      page: 1,
    }),
    getQuizGroupedByCourse({
      token: user?.token,
      uuid: tokenExtract.id,
      limit: 1,
      page: 1,
    }),
  ])

  return (
    <DashboardShell>
      <BreadCrumbs
        segments={[
          {
            href: "/dashboard",
            title: "Dashboard",
          },
          {
            href: "/dashboard/me",
            title: `${tokenExtract.username} - (${tokenExtract.email})`,
          },
        ]}
      />
      <DashboardHeader
        heading={`Halo, ${tokenExtract.username}!`}
        description="Disini anda dapat melihat detail mengenai profil anda"
      />
      <div className="grid grid-cols-7 items-center justify-between gap-4">
        <ProfileCard
          username={tokenExtract.username}
          email={tokenExtract.email}
          numberOfPost={postCount.data.number_of_post}
          numberOfCourse={courseCount.data.number_of_course}
          numberOfQuiz={quizCount.data.number_of_quiz}
        />
        <AvgScoreCard avgScore={avgScore.data.average_score} />
        <RecentPostCard recentPostList={recentPostList} />
        <RecentQuizCard quizTakenList={quizTakenList} />

        <Card className="col-span-7 flex  min-h-[370px]  flex-col gap-4 p-4 xl:col-span-3">
          <div className="flex items-center justify-between">
            <h1 className="font-heading text-2xl font-light">Quiz Anda</h1>

            <Button variant="outline">Lihat semua</Button>
          </div>

          {quizGrouped.data?.map((quiz) => (
            <Link href={`/dashboard/me/quiz/${quiz.id_quiz}`}>
              <Card className="max-h-none flex-grow overflow-clip">
                <AspectRatio ratio={21 / 9}>
                  <div className="absolute inset-0 bg-gradient-to-t from-transparent to-zinc-950/50" />
                  <Badge
                    className={cn(
                      "pointer-events-none absolute right-2 top-2 rounded-sm px-2 py-1 font-semibold",
                      quiz.quiz_type === "PRE TEST"
                        ? "border-green-600/20 bg-green-50 text-green-700"
                        : "border-red-600/10 bg-red-50 text-red-700"
                    )}
                  >
                    {quiz.quiz_type ? "Pre Test" : "Other"}
                  </Badge>
                  <div
                    className="h-full rounded-t-md border-b"
                    style={getRandomPatternStyle(String(quiz.quiz_title))}
                  />
                </AspectRatio>
                <CardHeader>
                  <CardTitle className="line-clamp-1 text-lg">
                    {quiz.quiz_title}
                  </CardTitle>
                  {quiz.quiz_desc ? (
                    <CardDescription className="line-clamp-2">
                      {quiz.quiz_desc}
                    </CardDescription>
                  ) : null}
                </CardHeader>
              </Card>
            </Link>
          ))}
        </Card>
        <CourseContainerCard enrolledCourseList={enrolledCourseList} />
      </div>
    </DashboardShell>
  )
}
