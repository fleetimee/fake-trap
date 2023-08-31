import React from "react"

import { KnowledgeOneRes, KnowledgeOneResContent } from "@/types/knowledge/res"
import { ReferenceListResData } from "@/types/references/res"
import {
  CreateSectionContentSheet,
  DeleteSectionContentSheet,
  EditSectionContentSheet,
} from "@/components/app/knowledge/detail/content/operations"
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

interface KnowledgeSectionContentProps {
  content: KnowledgeOneResContent
  dataKnowledge: KnowledgeOneRes
  contentData: KnowledgeOneResContent
  setContentData: React.Dispatch<React.SetStateAction<KnowledgeOneResContent>>
  activeIndex: number
  setActiveIndex: React.Dispatch<React.SetStateAction<number>>
  contentTypeData: ReferenceListResData[]
}

export function KnowledgeSectionContent({
  content,
  dataKnowledge,
  contentData,
  setContentData,
  activeIndex,
  setActiveIndex,
  contentTypeData,
}: KnowledgeSectionContentProps) {
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
              <Button
                className="flex h-[65px] w-full justify-start rounded-md py-2 text-left font-heading active:bg-gray-800"
                onClick={() => {
                  setActiveIndex(content.id_content)
                  setContentData(content)

                  // go to the top of the page
                  window.scrollTo({
                    top: 0,
                    behavior: "instant",
                  })
                }}
                disabled={activeIndex == content.id_content}
              >
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
            {
              contentTypeData.find(
                (contentX) => contentX.code_ref2 === content.content_type
              )?.value_ref1
            }
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
          contentTypeData={contentTypeData}
        />
      ) : isEditSheetOpen ? (
        <EditSectionContentSheet
          item={content}
          open={open}
          setOpen={setOpen}
          contentTypeData={contentTypeData}
        />
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
