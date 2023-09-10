import { UserQuizTakenListRes } from "@/types/me/res"
import { convertDatetoStringShort } from "@/lib/utils"
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

interface RecentQuizCard {
  quizTakenList: UserQuizTakenListRes
}

export function RecentQuizCard({ quizTakenList }: RecentQuizCard) {
  return (
    <Card className="col-span-7 flex min-h-[395px] flex-col gap-6 p-4 lg:col-span-4">
      <div className="flex items-center justify-between">
        <h1 className="font-heading text-2xl font-light">Riwayat Quiz</h1>

        <Button variant="outline">Lihat semua</Button>
      </div>

      <Table>
        <TableCaption>Sebagian quiz ditampilkan</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Judul</TableHead>
            <TableHead>Tipe</TableHead>
            <TableHead>Tanggal</TableHead>
            <TableHead className="text-right">Skor</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {quizTakenList.data?.map((invoice) => (
            <TableRow key={invoice.id_quiz}>
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
  )
}
