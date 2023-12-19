import Link from "next/link"

import { Icons } from "@/components/icons"
import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
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
    <div className="flex max-h-full min-h-[400px] w-full max-w-2xl flex-col justify-between overflow-hidden rounded-xl border-2 bg-white shadow-md hover:border-primary dark:bg-gray-800">
      <div>
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex space-x-4">
            <div>
              <Icons.gitHub className="h-12 w-12 text-gray-500 dark:text-gray-200" />
            </div>
            <div>
              <div className="text-lg font-bold dark:text-white">
                TO: {props.approverName}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-200">
                {props.approverHandle}
              </div>
            </div>
          </div>
        </div>
        <Separator />
      </div>
      <div className="grid grid-cols-1 gap-2 p-6">
        <InfoItem label="Judul:" value={props.knowledgeTitle} />
        <InfoItem label="Tgl Pengajuan:" value={props.date} />
        <InfoItem label="Status:" value={props.status} badgeAble />
        <InfoItem label="Pengirim:" value={props.sender} />
      </div>

      <div className="flex flex-col items-end justify-between space-x-4 border-t border-gray-200 p-4 dark:border-gray-700">
        <div className="flex items-end justify-end space-x-4">
          <Link
            href={props.baseeUrl ? `${props.baseeUrl}` : "/"}
            className={buttonVariants({
              variant: "outline",
              className: "rounded-md px-4 py-2 text-sm font-medium",
            })}
          >
            Lihat Detail
          </Link>
        </div>
      </div>
    </div>
  )
}

function getBadge(status: Status) {
  switch (status) {
    case Status.Pending:
      return <Badge className="bg-yellow-500">{status}</Badge>
    case Status.Approved:
      return <Badge className="bg-green-600">{status}</Badge>
    case Status.Rejected:
      return <Badge variant="destructive">{status}</Badge>
    default:
      return <Badge variant="default">{status}</Badge>
  }
}

function InfoItem({
  label,
  value,
  badgeAble = false,
}: {
  label: string
  value: string
  badgeAble?: boolean
}) {
  return (
    <div className="grid grid-cols-2 items-start justify-between">
      <div className="text-sm font-semibold">{label}</div>
      {badgeAble ? (
        <div className="flex justify-end text-sm font-semibold">
          {getBadge(value as Status)}
        </div>
      ) : (
        <div className="flex justify-end text-right text-sm  ">{value}</div>
      )}
    </div>
  )
}
