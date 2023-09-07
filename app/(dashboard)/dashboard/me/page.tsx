import { redirect } from "next/navigation"

import {
  UserAvgScoreRes,
  UserCourseCountRes,
  UserPostCountRes,
  UserQuizCountRes,
  UserRecentPostListRes,
} from "@/types/me/res"
import { authOptions } from "@/lib/auth"
import { getCurrentUser } from "@/lib/session"
import {
  convertDatetoString,
  convertDatetoStringShort,
  extractToken,
} from "@/lib/utils"
import {
  AvgScoreCard,
  ProfileCard,
  RecentPostCard,
} from "@/components/app/me/ui"
import { Card } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"

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
}: GetUserQuizTakenList): Promise<GetUserQuizTakenList> {
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
  ] = await Promise.all([
    getUserPostCount({ token: user?.token, uuid: tokenExtract.id }),
    getUserCourseCount({ token: user?.token, uuid: tokenExtract.id }),
    getUserQuizCount({ token: user?.token, uuid: tokenExtract.id }),
    getUserAvgQuizScore({ token: user?.token, uuid: tokenExtract.id }),
    getUserRecentPostList({ token: user?.token, uuid: tokenExtract.id }),
    getUserQuizTakenList({ token: user?.token, uuid: tokenExtract.id }),
  ])

  return (
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
    </div>
  )
}
