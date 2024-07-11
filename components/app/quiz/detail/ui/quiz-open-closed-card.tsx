import { QuizOneResData } from "@/types/quiz/res"
import { convertDatetoString, convertDatetoStringWithTime } from "@/lib/utils"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

interface QuizOpenClosedCardProps {
  data: QuizOneResData
}

export function QuizOpenClosedCard({ data }: QuizOpenClosedCardProps) {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-lg">Open / Closed</CardTitle>
        <CardDescription>Jadwal Buka dan Tutup Ujian</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="flex flex-col items-start space-y-4">
          <p className="text-sm text-muted-foreground">
            Buka: {convertDatetoStringWithTime(data.jam_buka.toString())}
          </p>
          <p className="text-sm text-muted-foreground">
            Tutup: {convertDatetoStringWithTime(data.jam_tutup.toString())}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
