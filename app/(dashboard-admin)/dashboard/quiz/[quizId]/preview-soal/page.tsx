import { redirect } from "next/navigation"
import { Variants } from "framer-motion"

import { QuizQuestionListRes } from "@/types/quiz/res"
import { authOptions } from "@/lib/auth"
import { getCurrentUser } from "@/lib/session"
import { MotionDiv } from "@/components/framer-wrapper"
import { DashboardShell } from "@/components/shell"
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export const metadata = {
  title: "Preview Soal",
  description: "Halaman untuk melihat preview soal",
}

interface GetQuizLessonProps {
  token: string | undefined
  quizId: string
}

async function getQuizLesson({
  token,
  quizId,
}: GetQuizLessonProps): Promise<QuizQuestionListRes> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/secure/quiz/${quizId}/getLesson`,
    {
      method: "GET",
      headers: {
        ContentType: "application/json",
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    }
  )

  return await res.json()
}

interface PreviewSoalPageProps {
  params: {
    quizId: string
  }
}

export default async function PreviewSoalPage({
  params,
}: PreviewSoalPageProps) {
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  const getQuizResp = await getQuizLesson({
    token: user?.token,
    quizId: params.quizId,
  })

  const parentVariants: Variants = {
    initial: {
      opacity: 0,
    },
    animate: {
      opacity: 1,
      transition: {
        staggerChildren: 0.5,
      },
    },
  }

  const childVariants: Variants = {
    initial: {
      opacity: 0,
      y: 50,
    },
    animate: {
      opacity: 1,
      y: 0,
    },
  }

  return (
    <DashboardShell>
      <Card className="min-h-[40rem] p-2">
        <MotionDiv
          initial={{ opacity: 0, y: -50 }}
          animate={{
            opacity: 1,
            y: 0,
            transition: {
              delay: 0.2,
              stiffness: 100,
              damping: 20,
              bounceDamping: 10,
            },
          }}
        >
          <CardHeader className="flex justify-between">
            <CardTitle className="font-heading">Preview Soal</CardTitle>
            <CardDescription>
              Berikut adalah tampilan soal yang sudah anda buat
            </CardDescription>
          </CardHeader>
        </MotionDiv>
        <MotionDiv
          variants={parentVariants}
          initial="initial"
          animate="animate"
        >
          {getQuizResp?.data?.map((item, index) => {
            return (
              <MotionDiv
                key={item.id_question}
                className="child flex flex-col items-start justify-between gap-6 p-6"
                variants={childVariants}
              >
                <p className="font-heading leading-8 ">
                  {index + 1}. {item.question_text}
                </p>
                <div className="grid grid-cols-2 gap-6">
                  {item?.answers?.map((answer, index) => {
                    return (
                      <RadioGroup
                        key={answer.id_answer}
                        className="flex items-center space-x-3 space-y-0"
                      >
                        <RadioGroupItem
                          checked={answer.is_correct}
                          value={answer.id_answer.toString()}
                          disabled
                        />
                        <Label>{answer.answer_text}</Label>
                      </RadioGroup>
                    )
                  })}
                </div>
              </MotionDiv>
            )
          })}
        </MotionDiv>
      </Card>
    </DashboardShell>
  )
}
