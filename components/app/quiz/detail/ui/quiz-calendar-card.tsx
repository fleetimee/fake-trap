import { QuizOneResData } from "@/types/quiz/res"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface QuizCalendarCardProps {
  data: QuizOneResData
}

export function QuizCalendarCard({ data }: QuizCalendarCardProps) {
  return (
    <Card className="col-span-1 row-span-1 h-auto">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg">Tanggal Pembuatan</CardTitle>
      </CardHeader>
      <CardContent className="grid">
        <Calendar
          mode="default"
          disableNavigation
          today={new Date(data.created_at)}
          className="items-center justify-center"
          numberOfMonths={2}
          selected={new Date(data.created_at)}
        />
      </CardContent>
    </Card>
  )
}
