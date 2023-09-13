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
import { getCurrentUser } from "@/lib/session"
import { extractToken } from "@/lib/utils"
import {
  AvgScoreCard,
  CourseContainerCard,
  ProfileCard,
  RecentPostCard,
  RecentQuizCard,
  QuizGrouped,
} from "@/components/app/me/ui"
import { DashboardHeader } from "@/components/header"
import { BreadCrumbs } from "@/components/pagers/breadcrumb"
import { DashboardShell } from "@/components/shell"


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
  limit?: number
  page?: number
}

async function getUserQuizTakenList({
  token,
  uuid,
  limit = 5,
  page = 1,
}: GetUserQuizTakenList): Promise<UserQuizTakenListRes> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/secure/users/${uuid}/getQuizThatUserTaken?limit=${limit}&page=${page}`,
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
        <QuizGrouped quizGrouped={quizGrouped} />
        <CourseContainerCard enrolledCourseList={enrolledCourseList} />
      </div>
    </DashboardShell>
  )
}
