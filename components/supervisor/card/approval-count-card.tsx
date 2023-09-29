"use client"

import React from "react"

import { MotionDiv } from "@/components/framer-wrapper"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

interface SupervisorApprovalCountCardProps {
  approvalCount: number
  description: string
  icon: React.ReactNode
  title: string
}

export function SupervisorApprovalCountCard({
  ...props
}: SupervisorApprovalCountCardProps) {
  return (
    <Card className="flex h-full flex-col justify-between hover:border-primary">
      <CardHeader className="pb-3">
        <CardTitle className="inline-flex items-center text-lg">
          <span className="mr-2">{props.icon}</span>
          {props.title}
        </CardTitle>
        <CardDescription>{props.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <MotionDiv animate={{ scale: [0, 1] }} transition={{ duration: 0.5 }}>
          <p className="font-heading text-6xl text-primary">
            {props.approvalCount}
          </p>
        </MotionDiv>
      </CardContent>
    </Card>
  )
}
