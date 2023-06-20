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
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

import { CreateKnowledgeContentButton } from "./create-knowledge-content-button"

enum ContentType {
  Video = 1,
  Files = 2,
}

export function SectionKnowledge({
  content: content,
}: {
  content: KnowledgeByIdSectionContentData
}) {
  const [isAddSheetOpen, setIsAddSheetOpen] = React.useState<boolean>(false)
  const [isEditSheetOpen, setIsEditSheetOpen] = React.useState<boolean>(false)

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
              console.log(isAddSheetOpen)
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
              console.log(isAddSheetOpen)
            }}
          >
            <ContextMenuItem inset>Edit Konten</ContextMenuItem>
          </SheetTrigger>
          <ContextMenuSeparator />
          <ContextMenuItem inset className="text-red-500">
            Hapus Konten
          </ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
      {isAddSheetOpen ? (
        <CreateKnowledgeContentButton
          id_section={content.id_section}
          open={open}
          setOpen={setOpen}
        />
      ) : (
        <SheetContent size="sm">
          <SheetHeader>
            <SheetTitle>Nigga</SheetTitle>
            <SheetDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      )}
    </Sheet>
  )
}
