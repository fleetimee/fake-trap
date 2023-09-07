import { redirect } from "next/navigation"

import {
  UserAvgScoreRes,
  UserCourseCountRes,
  UserPostCountRes,
  UserQuizCountRes,
  UserQuizTakenListRes,
  UserRecentPostListRes,
} from "@/types/me/res"
import { authOptions } from "@/lib/auth"
import { getCurrentUser } from "@/lib/session"
import { convertDatetoStringShort, extractToken } from "@/lib/utils"
import {
  AvgScoreCard,
  ProfileCard,
  RecentPostCard,
} from "@/components/app/me/ui"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

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

      <Card className="col-span-7 flex min-h-[350px] flex-col gap-6 p-6 lg:col-span-7">
        <div className="flex items-center justify-between">
          <h1 className="font-heading text-2xl font-light">Riwayat Quiz</h1>

          <Button variant="outline">Lihat semua</Button>
        </div>

        <Table>
          <TableCaption>Sebagian quiz ditampilkan</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">ID Quiz</TableHead>
              <TableHead>Judul</TableHead>
              <TableHead>Tipe</TableHead>
              <TableHead>Tanggal</TableHead>
              <TableHead className="text-right">Skor</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {quizTakenList.data.map((invoice) => (
              <TableRow key={invoice.id_quiz}>
                <TableCell className="font-medium">{invoice.id_quiz}</TableCell>
                <TableCell>{invoice.quiz_title}</TableCell>
                <TableCell>{invoice.quiz_type}</TableCell>
                <TableCell>
                  {convertDatetoStringShort(
                    new Date(invoice.created_at).toString()
                  )}
                </TableCell>
                <TableCell className="text-right">{invoice.score}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  )
}
