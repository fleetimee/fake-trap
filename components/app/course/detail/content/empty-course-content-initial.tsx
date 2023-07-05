"use client"

import React from "react"

import { AccordionContent } from "@/components/ui/accordion"
import { ContextMenu, ContextMenuTrigger } from "@/components/ui/context-menu"
import { Sheet } from "@/components/ui/sheet"
import { EmptyContent } from "@/components/app/knowledge/detail-sidebar-empty-content"

export function EmptyCourseContentInitial({}) {
  const [open, setOpen] = React.useState<boolean>(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <ContextMenu>
        <ContextMenuTrigger>
          <AccordionContent className="py-4">
            <EmptyContent className="h-[50px]">
              <EmptyContent.Icon name="empty" />
              <EmptyContent.Title>Tidak ada konten</EmptyContent.Title>
              <EmptyContent.Description>
                Klik kanan untuk menambah konten / quiz
              </EmptyContent.Description>
            </EmptyContent>
          </AccordionContent>
        </ContextMenuTrigger>
      </ContextMenu>
    </Sheet>
  )
}
