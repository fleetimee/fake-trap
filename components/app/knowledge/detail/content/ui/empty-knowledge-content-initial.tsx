"use client"

import React from "react"

import { ReferenceListResData } from "@/types/references/res"
import { CreateSectionContentSheet } from "@/components/app/knowledge/detail/content/operations/create-section-content-sheet"
import { EmptyContent } from "@/components/app/knowledge/detail/ui/knowledge-detail-sidebar-empty"
import { AccordionContent } from "@/components/ui/accordion"
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"
import { Sheet, SheetTrigger } from "@/components/ui/sheet"

interface EmptyKnowledgeContentInitialProps {
  id_section: number
  contentTypeData: ReferenceListResData[]
}

export function EmptyKnowledgeContentInitial({
  id_section,
  contentTypeData,
}: EmptyKnowledgeContentInitialProps) {
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
                Klik kanan untuk menambah konten
              </EmptyContent.Description>
            </EmptyContent>
          </AccordionContent>
        </ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuItem inset disabled>
            ID Section: {id_section}
          </ContextMenuItem>
          <ContextMenuSeparator />
          <SheetTrigger>
            <ContextMenuItem inset>Tambah Konten</ContextMenuItem>
          </SheetTrigger>
        </ContextMenuContent>
      </ContextMenu>
      <CreateSectionContentSheet
        id_section={id_section}
        open={open}
        setOpen={setOpen}
        contentTypeData={contentTypeData}
      />
    </Sheet>
  )
}
