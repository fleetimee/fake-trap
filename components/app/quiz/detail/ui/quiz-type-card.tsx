import { ReferenceListRes } from "@/types/references/res"
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

interface QuizTypeCardProps {
  detailQuizType: ReferenceListRes
}

export function QuizTypeCard({ detailQuizType }: QuizTypeCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Report an issue</CardTitle>
        <CardDescription>Tipe kuis ini</CardDescription>
      </CardHeader>
    </Card>
  )
}
