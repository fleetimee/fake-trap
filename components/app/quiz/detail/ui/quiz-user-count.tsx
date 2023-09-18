"use client"

import { useEffect, useRef } from "react"
import { useInView, useMotionValue, useSpring } from "framer-motion"

import { MotionDiv } from "@/components/framer-wrapper"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

interface QuizUserCountCardProps {
  userCount: number
  direction?: "up" | "down"
}

export function QuizUserCountCard({ userCount }: QuizUserCountCardProps) {
  return (
    <Card className="flex h-full flex-col justify-between">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Peserta</CardTitle>
        <CardDescription>Peserta yang mengikuti kuis ini</CardDescription>
      </CardHeader>
      <CardContent>
        <MotionDiv animate={{ scale: [0, 1] }} transition={{ duration: 0.5 }}>
          <p className="font-heading text-6xl text-primary">{userCount}</p>
        </MotionDiv>
      </CardContent>
    </Card>
  )
}
