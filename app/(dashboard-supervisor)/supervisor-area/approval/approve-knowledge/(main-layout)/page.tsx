import Link from "next/link"
import { redirect } from "next/navigation"
import { Variants } from "framer-motion"

import { ApprovalCount } from "@/types/approval/res"
import {
  ApprovalKnowledgeListRes,
  ApprovalKnowledgeListResData,
} from "@/types/approval/res/approval-list"
import { authOptions } from "@/lib/auth"
import { getCurrentUser } from "@/lib/session"
import { convertDatetoStringShort } from "@/lib/utils"
import { MotionDiv } from "@/components/framer-wrapper"
import { Icons } from "@/components/icons"
import { SupervisorApprovalCountCard } from "@/components/supervisor/card"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

interface GetKnowledgeApprovalCount {
  token: string | undefined
}

async function getKnowledgeApprovalCount({
  token,
}: GetKnowledgeApprovalCount): Promise<ApprovalCount> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/secure/approval/knowledge/count`,
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

interface GetAllKnowledgeApproval {
  token: string | undefined
  limit: number
  page: number
}

async function getAllKnowledgeApproval({
  token,
  limit,
  page,
}: GetAllKnowledgeApproval): Promise<ApprovalKnowledgeListRes> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/secure/approval/knowledge/?limit=${limit}&page=${page}&sortBy=created_at&orderBy=desc`,
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

const parentVariant: Variants = {
  initial: {
    opacity: 0,
    x: -100,
  },
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      staggerChildren: 0.2,
    },
  },
}

const childrenVariant: Variants = {
  initial: {
    opacity: 0,
    x: -100,
  },
  animate: {
    opacity: 1,
    x: 0,

    transition: {
      type: "spring",
      stiffness: 100,
    },
  },
}

interface BadgeSwitchProps {
  approval: ApprovalKnowledgeListResData
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

export default async function SupervisorApproveCoursePage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  const [approvalCountResp, allApproval] = await Promise.all([
    getKnowledgeApprovalCount({
      token: user?.token,
    }),
    getAllKnowledgeApproval({
      token: user?.token,
      limit: 5,
      page: 1,
    }),
  ])

  return (
    <MotionDiv
      className="space-y-4"
      variants={parentVariant}
      initial="initial"
      animate="animate"
    >
      <div className="child grid min-h-[200px] gap-6 md:grid-cols-1 lg:grid-cols-3">
        <MotionDiv className="child" variants={childrenVariant}>
          <SupervisorApprovalCountCard
            approvalCount={approvalCountResp?.data?.approved}
            title="Pengetahuan Di Setujui"
            icon={<Icons.check className="h-6 w-6 text-green-500" />}
            description="Pengetahuan yang telah di setujui oleh supervisor"
          />
        </MotionDiv>

        <MotionDiv className="child" variants={childrenVariant}>
          <SupervisorApprovalCountCard
            approvalCount={approvalCountResp?.data?.pending}
            title="Pengetahuan Pending"
            icon={<Icons.pending className="h-6 w-6 text-yellow-500" />}
            description="Pengetahuan yang masih menunggu persetujuan"
          />
        </MotionDiv>

        <MotionDiv className="child" variants={childrenVariant}>
          <SupervisorApprovalCountCard
            approvalCount={approvalCountResp?.data?.rejected}
            title="Pengetahuan Di Tolak"
            icon={<Icons.close className="h-6 w-6 text-red-500" />}
            description="Pengetahuan yang telah di tolak"
          />
        </MotionDiv>
      </div>

      <MotionDiv
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Card className="flex h-full flex-col justify-between hover:border-primary">
          <CardHeader className="pb-8">
            <CardTitle className="inline-flex items-center text-lg">
              Aksi Terbaru
            </CardTitle>
            <CardDescription>
              Daftar pengetahuan yang telah di buat dan di approve atau di tolak
              oleh supervisor diurutkan berdasarkan tanggal pembuatan terbaru
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nama Pengetahuan</TableHead>
                  <TableHead>Pembuat Materi</TableHead>
                  <TableHead>Approver</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Tanggal Buat</TableHead>
                  <TableHead>Tanggal Approve</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {allApproval?.data?.map((approval) => (
                  <TableRow key={approval.id_approval_knowledge}>
                    <TableCell>
                      <Link
                        href={`/supervisor-area/approval/approve-knowledge/preview-knowledge/${approval.id_knowledge}`}
                        className="font-semibold text-primary hover:underline"
                      >
                        {approval.knowledge_title}
                      </Link>
                    </TableCell>
                    <TableCell>{approval.user_request}</TableCell>
                    <TableCell>
                      {approval.user_approver ? approval.user_approver : "-"}
                    </TableCell>
                    <TableCell>
                      {badgeSwitch({
                        approval: approval,
                      })}
                    </TableCell>
                    <TableCell>
                      {convertDatetoStringShort(
                        new Date(approval.created_at).toString()
                      )}
                    </TableCell>
                    <TableCell>
                      {approval.approved_at.toString() ===
                      "0001-01-01T00:00:00Z"
                        ? "-"
                        : convertDatetoStringShort(
                            new Date(approval.approved_at).toString()
                          )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </MotionDiv>
    </MotionDiv>
  )
}
