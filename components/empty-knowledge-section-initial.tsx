"use client"

import React from "react"

import { CreateSectionButton } from "@/components/create-section-button"
import { EmptyContent } from "@/components/detail-sidebar-empty-content"

export function EmptyKnowledgeSectionInitial({
  id_knowledge,
}: {
  id_knowledge: number
}) {
  return (
    <EmptyContent className="h-[625px] items-center justify-center">
      <EmptyContent.Icon name="empty" />
      <EmptyContent.Title>Tidak ada section</EmptyContent.Title>
      <EmptyContent.Description>
        Section tidak tersedia
      </EmptyContent.Description>
      {/* <CreateButton variant="outline" name="Tambah" /> */}

      <CreateSectionButton id_knowledge={id_knowledge} name="Tambah" />
    </EmptyContent>
  )
}
