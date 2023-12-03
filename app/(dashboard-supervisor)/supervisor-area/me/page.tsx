import { Metadata } from "next"
import Link from "next/link"
import { redirect } from "next/navigation"
import { Variants } from "framer-motion"

import {
  ApprovalCourseSpvListRes,
  ApprovalKnowledgeSpvListRes,
  SupervisorCountOneRes,
} from "@/types/approval/res"
import { authOptions } from "@/lib/auth"
import { getCurrentUser } from "@/lib/session"
import {
  convertDatetoString,
  convertDatetoStringShort,
  extractToken,
} from "@/lib/utils"
import { MotionDiv } from "@/components/framer-wrapper"
import { DashboardHeader } from "@/components/header"
import { Icons } from "@/components/icons"
import { BreadCrumbs } from "@/components/pagers/breadcrumb"
import { DashboardShell } from "@/components/shell"
import { Badge } from "@/components/ui/badge"
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





const invoices = [
  {
    invoice: "INV001",
    paymentStatus: "Paid",
    totalAmount: "$250.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV002",
    paymentStatus: "Pending",
    totalAmount: "$150.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV003",
    paymentStatus: "Unpaid",
    totalAmount: "$350.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV004",
    paymentStatus: "Paid",
    totalAmount: "$450.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV005",
    paymentStatus: "Paid",
    totalAmount: "$550.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV006",
    paymentStatus: "Pending",
    totalAmount: "$200.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV007",
    paymentStatus: "Unpaid",
    totalAmount: "$300.00",
    paymentMethod: "Credit Card",
  },
]

interface GetSupervisorAcceptedKnowledgeCountProps {
  token: string | undefined
  status: string
  uuid: string
}

async function getSupervisorKnowledgeCount({
  token,
  status,
  uuid,
}: GetSupervisorAcceptedKnowledgeCountProps): Promise<SupervisorCountOneRes> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/secure/approval/knowledge/${status}/${uuid}/count`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  )

  return await res.json()
}

interface GetSupervisorCourseCountProps {
  token: string | undefined
  status: string
  uuid: string
}

async function getSupervisorCourseCount({
  token,
  status,
  uuid,
}: GetSupervisorCourseCountProps): Promise<SupervisorCountOneRes> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/secure/approval/course/${status}/${uuid}/count`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  )

  return await res.json()
}

interface GetSupervisorCourseList {
  token: string | undefined
  uuid: string
}

async function getSupervisorCourseList({
  token,
  uuid,
}: GetSupervisorCourseList): Promise<ApprovalCourseSpvListRes> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/secure/approval/course/list/${uuid}?limit=100`,
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

interface GetSupervisorKnowledgeList {
  token: string | undefined
  uuid: string
}

async function getSupervisorKnowledgeList({
  token,
  uuid,
}: GetSupervisorKnowledgeList): Promise<ApprovalKnowledgeSpvListRes> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/secure/approval/knowledge/list/${uuid}?limit=100`,
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

export const metadata: Metadata = {
  title: "Profil Saya",
  description: "Detail mengenai profil anda",
}

const parentVariant: Variants = {
  initial: {
    opacity: 0,
    y: -100,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const childVariant: Variants = {
  initial: {
    opacity: 0,
    y: -100,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 10,
    },
  },
}

export default async function SupervisorMePage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions?.pages?.signIn || "login")
  }

  interface BadgeSwitchProps {
    approval: any
  }

  function badgeSwitch({ approval }: BadgeSwitchProps) {
    switch (approval.status) {
      case "0052":
        return <Badge className="bg-green-400">{approval.status_text}</Badge>
      case "0051":
        return <Badge className="bg-yellow-400">{approval.status_text}</Badge>
      case "0053":
        return <Badge className="bg-red-400">{approval.status_text}</Badge>
      default:
        return <Badge className="bg-orange-400">{approval.status_text}</Badge>
    }
  }

  const tokenExtracted = extractToken(user.token)

  const dateNow = convertDatetoString(new Date().toString())

  const getDayWithText = new Date().toLocaleString("en", {
    weekday: "long",
  })

  const userExtracted = extractToken(user.token)

  const approvedKnowledgeCount = await getSupervisorKnowledgeCount({
    token: user?.token,
    uuid: userExtracted.id,
    status: "0052",
  })

  const rejectedKnowledgeCount = await getSupervisorKnowledgeCount({
    token: user?.token,
    uuid: userExtracted.id,
    status: "0053",
  })

  const approvedCourseCount = await getSupervisorCourseCount({
    token: user?.token,
    uuid: userExtracted.id,
    status: "0052",
  })

  const rejectedCourseCount = await getSupervisorCourseCount({
    token: user?.token,
    uuid: userExtracted.id,
    status: "0053",
  })

  const supervisorCourseList = await getSupervisorCourseList({
    token: user?.token,
    uuid: userExtracted.id,
  })

  const supervisorKnowledgeList = await getSupervisorKnowledgeList({
    token: user?.token,
    uuid: userExtracted.id,
  })

  return (
    <DashboardShell className="items-center justify-center">
      <BreadCrumbs
        segments={[
          {
            href: "/supervisor-area",
            title: "Supervisor Area",
          },
          {
            href: "/supervisor-area/me",
            title: `${tokenExtracted.username} - ${tokenExtracted.email}`,
          },
        ]}
      />

      <MotionDiv
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <DashboardHeader
          heading={`Halo, ${tokenExtracted.username}!`}
          description="Berikut adalah statistik mengenai pengetahuan dan pelatihan yang anda approve dan reject"
        />
      </MotionDiv>

      <MotionDiv
        className="grid grid-cols-6 items-center justify-center gap-4"
        variants={parentVariant}
        initial="initial"
        animate="animate"
      >
        <Card className="col-span-6 flex h-auto min-h-[250px] flex-col gap-6 p-6 lg:col-span-2">
          <h1 className="font-heading text-2xl font-light">
            Pengetahuan Diapprove
          </h1>

          <div className="m-auto flex  flex-col">
            <p className="inline-flex items-center justify-center font-heading text-6xl">
              <span className="mr-4 text-green-500">
                <Icons.check className="h-16 w-16" />
              </span>
              {approvedKnowledgeCount.data.accepted}
            </p>
          </div>
        </Card>

        <Card className="col-span-6 flex h-auto min-h-[250px] flex-col gap-6 p-6 lg:col-span-2">
          <h1 className="font-heading text-2xl font-light">
            Pengetahuan Direject
          </h1>

          <div className="m-auto flex  flex-col">
            <p className="inline-flex items-center justify-center font-heading text-6xl">
              <span className="mr-4 text-red-500">
                <Icons.close className="h-16 w-16" />
              </span>
              {rejectedKnowledgeCount.data.accepted}
            </p>
          </div>
        </Card>
      </MotionDiv>

      <MotionDiv
        className="grid grid-cols-6 items-center justify-between gap-4"
        variants={parentVariant}
        initial="initial"
        animate="animate"
      >
        <Card className="col-span-6 flex h-auto min-h-[250px] flex-col gap-6 p-6 lg:col-span-2">
          <h1 className="font-heading text-2xl font-light">
            Pelatihan Diapprove
          </h1>

          <div className="m-auto flex  flex-col">
            <p className="inline-flex items-center justify-center font-heading text-6xl">
              <span className="mr-4 text-green-500">
                <Icons.check className="h-16 w-16" />
              </span>
              {approvedCourseCount.data.accepted}
            </p>
          </div>
        </Card>

        <Card className="col-span-6 flex h-auto min-h-[250px] flex-col gap-6 p-6 lg:col-span-2">
          <h1 className="font-heading text-2xl font-light">
            Pelatihan Direject
          </h1>

          <div className="m-auto flex  flex-col">
            <p className="inline-flex items-center justify-center font-heading text-6xl">
              <span className="mr-4 text-red-500">
                <Icons.close className="h-16 w-16" />
              </span>
              {rejectedCourseCount.data.accepted}
            </p>
          </div>
        </Card>
      </MotionDiv>

      <MotionDiv
        className="grid grid-cols-2 items-center justify-between gap-4"
        variants={parentVariant}
        initial="initial"
        animate="animate"
      >
        <Card className="col-span-2 flex h-auto min-h-[250px] flex-col gap-6 p-6 lg:col-span-2">
          <h1 className="font-heading text-2xl font-light">
            Riwayat Pengetahuan
          </h1>

          <Table>
            <TableCaption>
              Berikut adalah riwayat aksi pengetahuan yang anda tolak atau
              approve
            </TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[300px]">Nama Pengetahuan</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Dari</TableHead>
                <TableHead>Tgl Approve</TableHead>
                <TableHead className="text-right">Komentar</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {supervisorKnowledgeList.data.map((knowledge) => (
                <TableRow key={knowledge.approved_at.toString()}>
                  <TableCell className="font-medium">
                    <Link
                      href={`/supervisor-area/approval/approve-knowledge/preview-knowledge/${knowledge.id_knowledge}`}
                      className="cursor-pointer font-medium text-primary hover:underline"
                    >
                      {knowledge.knowledge_title}
                    </Link>
                  </TableCell>
                  <TableCell>
                    {badgeSwitch({
                      approval: knowledge,
                    })}
                  </TableCell>
                  <TableCell>{knowledge.user_request}</TableCell>
                  <TableCell>
                    {convertDatetoStringShort(knowledge.approved_at.toString())}
                  </TableCell>
                  <TableCell className="text-right">
                    {knowledge.comment}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>

        <Card className="col-span-2 flex h-auto min-h-[250px] flex-col gap-6 p-6 lg:col-span-2">
          <h1 className="font-heading text-2xl font-light">
            Riwayat Pelatihan
          </h1>

          <Table>
            <TableCaption>
              Berikut adalah riwayat aksi pelatihan yang anda tolak atau approve
            </TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[300px]">Nama Pelatihan</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Dari</TableHead>
                <TableHead>Tgl Approve</TableHead>
                <TableHead className="text-right">Komentar</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {supervisorCourseList.data.map((course) => (
                <TableRow key={course.approved_at.toString()}>
                  <TableCell className="font-medium">
                    <Link
                      href={`/supervisor-area/approval/approve-course/preview-course/${course.id_course}`}
                      className="cursor-pointer font-medium text-primary hover:underline"
                    >
                      {course.course_name}
                    </Link>
                  </TableCell>
                  <TableCell className="text-left">
                    {badgeSwitch({
                      approval: course,
                    })}
                  </TableCell>
                  <TableCell>{course.user_request}</TableCell>
                  <TableCell>
                    {convertDatetoStringShort(course.approved_at.toString())}
                  </TableCell>
                  <TableCell className="text-right">{course.comment}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </MotionDiv>
    </DashboardShell>
  )
}
