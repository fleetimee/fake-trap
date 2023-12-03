import { QuizOneRes } from "@/types/quiz/res"
import { ReferenceListRes } from "@/types/references/res"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"





interface QuizTypeCardProps {
  detailQuizData: QuizOneRes
  detailQuizType: ReferenceListRes
}

export function QuizTypeCard({
  detailQuizType,
  detailQuizData,
}: QuizTypeCardProps) {
  const quizType = detailQuizType.data.find(
    (item) => item.code_ref2 === detailQuizData.data.quiz_type
  )?.value_ref1

  const getInitialQuizType = (name: string | undefined) => {
    const splitName = name?.split(" ")
    const firstLetter = splitName?.[0]?.[0]?.toUpperCase()
    const secondLetter = splitName?.[1]?.[0]?.toUpperCase()
    return `${firstLetter}${secondLetter}`
  }

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-lg">Tipe Kuis</CardTitle>
        <CardDescription>Tipe kuis ini adalah</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="flex items-center space-x-4">
          <Avatar>
            <AvatarFallback>{getInitialQuizType(quizType)}</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-medium leading-none">{quizType}</p>
            <p className="text-sm text-muted-foreground">
              Kuis ini merupakan{" "}
              <span className="font-semibold lowercase italic">{quizType}</span>
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
