import { redirect } from "next/navigation"
import { Variants } from "framer-motion"

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
  QuizGrouped,
  RecentPostCard,
  RecentQuizCard,
} from "@/components/app/me/ui"
import { MotionDiv } from "@/components/framer-wrapper"
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

const parentVariant: Variants = {
  initial: {
    opacity: 0,
    y: -100,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const childVariant: Variants = {
  initial: {
    opacity: 0,
    y: -100,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 10,
    },
  },
}

export default async function MemberAreaMePage() {
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
            href: "/member-area",
            title: "Member Area",
          },
          {
            href: "/member-area/me",
            title: `${tokenExtract.username} - (${tokenExtract.email})`,
          },
        ]}
      />

      <MotionDiv
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <DashboardHeader
          heading={`Halo, ${tokenExtract.username}!`}
          description="Disini anda dapat melihat detail mengenai profil anda"
        />
      </MotionDiv>

      <MotionDiv
        className="grid grid-cols-7 items-center justify-between gap-4"
        variants={parentVariant}
        initial="initial"
        animate="animate"
      >
        <MotionDiv
          className=" child col-span-7  lg:col-span-2"
          variants={childVariant}
        >
          <ProfileCard
            username={tokenExtract.username}
            email={tokenExtract.email}
            numberOfPost={postCount.data.number_of_post}
            numberOfCourse={courseCount.data.number_of_course}
            numberOfQuiz={quizCount.data.number_of_quiz}
          />
        </MotionDiv>

        <MotionDiv
          className="child col-span-7 lg:col-span-2"
          variants={childVariant}
        >
          <AvgScoreCard avgScore={avgScore.data.average_score} />
        </MotionDiv>

        <MotionDiv
          className="child col-span-7 lg:col-span-3"
          variants={childVariant}
        >
          <RecentPostCard recentPostList={recentPostList} />
        </MotionDiv>

        <MotionDiv
          className="child col-span-7 lg:col-span-4"
          variants={childVariant}
        >
          <RecentQuizCard quizTakenList={quizTakenList} />
        </MotionDiv>

        <MotionDiv
          className="child col-span-7 lg:col-span-3"
          variants={childVariant}
        >
          <QuizGrouped quizGrouped={quizGrouped} />
        </MotionDiv>

        <MotionDiv className="child col-span-7" variants={childVariant}>
          <CourseContainerCard enrolledCourseList={enrolledCourseList} />
        </MotionDiv>
      </MotionDiv>
    </DashboardShell>
  )
}
