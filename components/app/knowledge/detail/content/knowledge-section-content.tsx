"use client"

import React from "react"

import { KnowledgeByIdSectionContentData } from "@/types/knowledge-res"
import { AccordionContent } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"
import { Sheet, SheetTrigger } from "@/components/ui/sheet"
import { CreateSectionContentSheet } from "@/components/app/knowledge/detail/content/create-section-content-sheet"
import { EditSectionContentSheet } from "@/components/app/knowledge/detail/content/edit-section-content-sheet"

import { DeleteSectionContentSheet } from "./delete-section-content-sheet"

enum ContentType {
  Video = 1,
  Files = 2,
}

export function KnowledgeSectionContent({
  content: content,
}: {
  content: KnowledgeByIdSectionContentData
}) {
  const [isAddSheetOpen, setIsAddSheetOpen] = React.useState<boolean>(false)
  const [isEditSheetOpen, setIsEditSheetOpen] = React.useState<boolean>(false)
  const [isDeleteSheetOpen, setIsDeleteSheetOpen] =
    React.useState<boolean>(false)

  const [open, setOpen] = React.useState<boolean>(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <ContextMenu key={content.id_content}>
        <ContextMenuTrigger>
          <AccordionContent key={content.id_content} className="py-1">
            {content.content_title ? (
              <Button className="flex h-[65px] w-full justify-start rounded-md bg-gradient-to-r from-violet-500 to-fuchsia-500 py-2 text-left font-heading text-white hover:from-violet-600 hover:to-fuchsia-600">
                {content.content_title}
              </Button>
            ) : null}
          </AccordionContent>
        </ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuItem inset disabled>
            ID Konten: {content.id_content}
          </ContextMenuItem>
          <ContextMenuItem inset disabled>
            Tipe:{" "}
            {content.content_type == ContentType.Video ? "Video" : "Sub Judul"}
          </ContextMenuItem>
          <ContextMenuItem inset disabled>
            {content.content_title}
          </ContextMenuItem>
          <ContextMenuSeparator />
          <SheetTrigger
            className="w-full"
            asChild
            id="add"
            onClick={() => {
              setIsAddSheetOpen(true)
              setIsEditSheetOpen(false)
              setIsDeleteSheetOpen(false)
            }}
          >
            <ContextMenuItem inset>Tambah Konten</ContextMenuItem>
          </SheetTrigger>
          <SheetTrigger
            className="w-full"
            asChild
            id="edit"
            onClick={() => {
              setIsAddSheetOpen(false)
              setIsEditSheetOpen(true)
              setIsDeleteSheetOpen(false)
            }}
          >
            <ContextMenuItem inset>Edit Konten</ContextMenuItem>
          </SheetTrigger>
          <ContextMenuSeparator />
          <SheetTrigger
            className="w-full"
            asChild
            id="delete"
            onClick={() => {
              setIsDeleteSheetOpen(true)
              setIsAddSheetOpen(false)
              setIsEditSheetOpen(false)
            }}
          >
            <ContextMenuItem inset className="text-red-500">
              Hapus Konten
            </ContextMenuItem>
          </SheetTrigger>
        </ContextMenuContent>
      </ContextMenu>
      {isAddSheetOpen ? (
        <CreateSectionContentSheet
          id_section={content.id_section}
          open={open}
          setOpen={setOpen}
        />
      ) : isEditSheetOpen ? (
        <EditSectionContentSheet item={content} open={open} setOpen={setOpen} />
      ) : (
        <DeleteSectionContentSheet
          item={content}
          open={open}
          setOpen={setOpen}
        />
      )}
    </Sheet>
  )
}
