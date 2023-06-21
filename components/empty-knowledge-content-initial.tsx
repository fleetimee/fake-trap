"use client"

import React from "react"

import { AccordionContent } from "@/components/ui/accordion"
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"
import { Sheet, SheetTrigger } from "@/components/ui/sheet"
import { EmptyContent } from "@/components/detail-sidebar-empty-content"

import { CreateKnowledgeContentSheet } from "./create-knowledge-content-sheet"

export function EmptyContentInitial({ id_section }: { id_section: number }) {
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
      <CreateKnowledgeContentSheet
        id_section={id_section}
        open={open}
        setOpen={setOpen}
      />
    </Sheet>
  )
}
