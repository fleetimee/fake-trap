import { notFound, redirect } from "next/navigation"
import { Variants } from "framer-motion"

import { authOptions } from "@/lib/auth"
import {
  getOneUser,
  getPesertaEnrolledCourses,
  getUserAvgQuizScore,
  getUserCourseCount,
  getUserPostCount,
  getUserQuizAttempts,
  getUserQuizCount,
  getUserQuizResultsGroupedByCourse,
  getUserRecentPostList,
} from "@/lib/fetcher/users-fetcher"
import { getCurrentUser } from "@/lib/session"
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
import { DashboardShell } from "@/components/shell"

interface UserDetailPageProps {
  params: {
    idProfile: string
  }
}

export async function generateMetadata({ params }: UserDetailPageProps) {
  const user = await getCurrentUser()

  const person = await getOneUser({
    token: user?.token,
    uuid: params.idProfile,
  })

  if (person.code === 404) {
    return {
      title: "User tidak ditemukan",
      description: "User tidak ditemukan",
    }
  }

  return {
    title: `${person.data.username} - ${person.data.email}`,
    description: `Detail mengenai profil ${person.data.username}`,
  }
}

export default async function UserDetailPage({ params }: UserDetailPageProps) {
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

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
    getUserPostCount({ token: user?.token, uuid: params.idProfile }),
    getUserCourseCount({ token: user?.token, uuid: params.idProfile }),
    getUserQuizCount({ token: user?.token, uuid: params.idProfile }),
    getUserAvgQuizScore({ token: user?.token, uuid: params.idProfile }),
    getUserRecentPostList({ token: user?.token, uuid: params.idProfile }),
    getUserQuizAttempts({
      token: user?.token,
      uuid: params.idProfile,
    }),
    getPesertaEnrolledCourses({
      token: user?.token,
      uuid: params.idProfile,
      limit: 5,
      page: 1,
    }),
    getUserQuizResultsGroupedByCourse({
      token: user?.token,
      uuid: params.idProfile,
      limit: 1,
      page: 1,
    }),
  ])

  const person = await getOneUser({
    token: user?.token,
    uuid: params.idProfile,
  })

  if (person.code === 404) {
    return notFound()
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

  return (
    <DashboardShell>
      <MotionDiv
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <DashboardHeader
          heading={`Profil, ${person.data.username}!`}
          description="Berikut adalah informasi mengenai profil user ini."
        />
      </MotionDiv>
      <MotionDiv
        className="grid grid-cols-7 items-center justify-between gap-4"
        variants={parentVariant}
        initial="initial"
        animate="animate"
      >
        <MotionDiv
          className="child col-span-7  lg:col-span-2"
          variants={childVariant}
        >
          <ProfileCard
            username={person.data.username}
            email={person.data.email}
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
          <RecentQuizCard
            quizTakenList={quizTakenList}
            link={`/dashboard/user/${params.idProfile}/recent-quiz`}
            detailLink={`/dashboard/user/${params.idProfile}/recent-quiz`}
          />
        </MotionDiv>
        <MotionDiv
          className="child col-span-7 lg:col-span-3"
          variants={childVariant}
        >
          <QuizGrouped
            quizGrouped={quizGrouped}
            link={`/dashboard/user/${params.idProfile}/averaged-quiz`}
          />
        </MotionDiv>
        <MotionDiv className="child col-span-7" variants={childVariant}>
          <CourseContainerCard
            enrolledCourseList={enrolledCourseList}
            link={`/dashboard/user/${params.idProfile}/course`}
          />
        </MotionDiv>
      </MotionDiv>
    </DashboardShell>
  )
}
