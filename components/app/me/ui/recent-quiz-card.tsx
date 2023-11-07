import Link from "next/link"

import { UserQuizTakenListRes } from "@/types/me/res"
import { convertDatetoStringShort } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
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
  link?: string
}

export function RecentQuizCard({ quizTakenList, link }: RecentQuizCard) {
  return (
    <Card className="col-span-7 flex min-h-[395px] flex-col gap-6 p-4 lg:col-span-4">
      <div className="flex items-center justify-between">
        <h1 className="font-heading text-2xl font-light">Riwayat Quiz</h1>

        <Link href={link ?? "/dashboard/me/recent-quiz"}>
          <Button variant="outline">Lihat semua</Button>
        </Link>
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
              <TableCell>
                <Badge>{invoice.quiz_type}</Badge>
              </TableCell>
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
