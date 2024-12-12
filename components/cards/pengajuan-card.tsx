import Link from "next/link"
import { ArrowRightIcon, Book, X } from "lucide-react"

import { Icons } from "@/components/icons"
import { Badge } from "@/components/ui/badge"
import { Button, buttonVariants } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

enum Status {
  Pending = "PENDING",
  Approved = "APPROVED",
  Rejected = "REJECTED",
}

interface PengajuanCardProps {
  approverName: string
  approverHandle: string
  date: string
  status: string
  statusCode: string
  sender: string
  knowledgeTitle: string
  baseeUrl: string
}

export function PengajuanCard({ ...props }: PengajuanCardProps) {
  return (
    <Card className="group relative mb-4 overflow-hidden border-blue-100/50 bg-gradient-to-br from-white to-blue-50/30 shadow-lg transition-all hover:border-blue-200/50 hover:shadow-blue-100/50 dark:border-blue-900/50 dark:from-gray-900 dark:to-blue-900/10">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />

      <CardHeader className="space-y-2 border-b border-blue-100/50 bg-blue-50/50 dark:border-blue-900/50 dark:bg-blue-950/10">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="rounded-full bg-blue-100/80 p-2 dark:bg-blue-900/50">
              <Icons.send className="size-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h3 className="font-heading text-sm font-medium">
                Kepada: {props.approverName}
              </h3>
            </div>
          </div>
          {getBadge(props.status as Status)}
        </div>
      </CardHeader>

      <CardContent className="space-y-4 p-6">
        <div className="flex flex-col space-y-3 md:flex-row md:items-center md:justify-between md:space-x-4 md:space-y-0">
          <div className="space-y-3 md:flex-1">
            <InfoItem
              icon={<Book className="size-4 text-blue-500" />}
              label="Judul"
              value={props.knowledgeTitle}
            />
            <div className="flex flex-wrap gap-4">
              <InfoItem
                icon={<Icons.calendar className="size-4 text-blue-500" />}
                label="Tanggal"
                value={props.date}
              />
              <InfoItem
                icon={<Icons.user className="size-4 text-blue-500" />}
                label="Pengirim"
                value={props.sender}
              />
            </div>
          </div>

          <Button
            asChild
            variant="outline"
            className="border-blue-200 bg-white hover:bg-blue-50 hover:text-blue-600 dark:border-blue-800 dark:bg-gray-900 dark:hover:bg-blue-950"
          >
            <Link href={props.baseeUrl}>
              Lihat Detail
              <ArrowRightIcon className="ml-2 size-4" />
            </Link>
          </Button>
        </div>
      </CardContent>

      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
    </Card>
  )
}

function getBadge(status: Status) {
  switch (status) {
    case Status.Pending:
      return (
        <Badge
          variant="outline"
          className="border-yellow-500 bg-yellow-50 text-yellow-600 dark:border-yellow-600/50 dark:bg-yellow-950/50"
        >
          <Icons.clock className="mr-1 size-3" />
          {status}
        </Badge>
      )
    case Status.Approved:
      return (
        <Badge
          variant="outline"
          className="border-green-500 bg-green-50 text-green-600 dark:border-green-600/50 dark:bg-green-950/50"
        >
          <Icons.check className="mr-1 size-3" />
          {status}
        </Badge>
      )
    case Status.Rejected:
      return (
        <Badge
          variant="outline"
          className="border-red-500 bg-red-50 text-red-600 dark:border-red-600/50 dark:bg-red-950/50"
        >
          <X className="mr-1 size-3" />
          {status}
        </Badge>
      )
    default:
      return <Badge variant="outline">{status}</Badge>
  }
}

function InfoItem({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode
  label: string
  value: string
}) {
  return (
    <div className="flex items-center space-x-2">
      {icon}
      <span className="text-sm font-medium text-muted-foreground">
        {label}:
      </span>
      <span className="flex-1 text-sm">{value}</span>
    </div>
  )
}
