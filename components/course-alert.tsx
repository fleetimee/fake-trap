"use client"

import React from "react"
import Link from "next/link"
import { DrawingPinFilledIcon } from "@radix-ui/react-icons"
import { ChevronsUpDown } from "lucide-react"

import { CourseKnowledgeSectionListRes } from "@/types/course/res"
import { MotionDiv } from "@/components/framer-wrapper"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"

interface CourseAlertProps {
  knowledgeSection: CourseKnowledgeSectionListRes
  singleLink?: string
  multipleLink?: boolean
}

export function CourseAlert({
  knowledgeSection,
  singleLink,
}: CourseAlertProps) {
  return (
    <Collapsible className="space-y-4">
      <div className="flex items-center justify-between space-x-4  px-4">
        <h4 className="text-sm font-semibold italic">
          Pelatihan ini memiliki{" "}
          {knowledgeSection.data ? knowledgeSection.data.length : 0} materi
        </h4>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" size="sm" className="w-9 p-0">
            <ChevronsUpDown className="h-4 w-4" />
            <span className="sr-only">Toggle</span>
          </Button>
        </CollapsibleTrigger>
      </div>
      {knowledgeSection ? (
        <MotionDiv
          className="flex flex-row gap-4 px-2"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Alert className="basis-full">
            <DrawingPinFilledIcon className="h-4 w-4" />
            <AlertTitle className="text-red-600">Informasi!</AlertTitle>
            <AlertDescription>
              Pelatihan ini berdasarkan pada pengetahuan{" "}
              <span className="font-bold">
                <Link
                  href={
                    singleLink
                      ? `${singleLink}/${knowledgeSection.data[0].id_knowledge}`
                      : `#`
                  }
                  className="text-blue-500 hover:underline"
                >
                  {knowledgeSection.data[0].knowledge_title}
                </Link>
              </span>
            </AlertDescription>
          </Alert>
        </MotionDiv>
      ) : null}
      <CollapsibleContent className="space-y-6">
        {knowledgeSection.data?.slice(1).map((section) => (
          <div className="flex flex-col gap-4 px-2" key={section.id_knowledge}>
            <Alert className="basis-full">
              <DrawingPinFilledIcon className="h-4 w-4" />
              <AlertTitle className="font-semibold text-red-600">
                Informasi!
              </AlertTitle>
              <AlertDescription>
                Pelatihan ini berdasarkan pada pengetahuan{" "}
                <span className="font-bold">
                  <Link
                    href={
                      singleLink ? `${singleLink}/${section.id_knowledge}` : `#`
                    }
                    className="text-blue-500 hover:underline"
                  >
                    {section.knowledge_title}
                  </Link>
                </span>
              </AlertDescription>
            </Alert>
          </div>
        ))}
      </CollapsibleContent>
    </Collapsible>
  )
}
