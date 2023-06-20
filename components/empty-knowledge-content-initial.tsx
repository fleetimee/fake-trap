"use client"

import React from "react"

import { AccordionContent } from "@/components/ui/accordion"
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"
import { CreateButton } from "@/components/create-button"
import { EmptyContent } from "@/components/detail-sidebar-empty-content"

export function EmptyContentInitial({}) {
  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <AccordionContent className="py-4">
          <EmptyContent className="h-[50px]">
            <EmptyContent.Icon name="empty" />
            <EmptyContent.Title>Tidak ada konten</EmptyContent.Title>
            <EmptyContent.Description>
              Konten tidak tersedia
            </EmptyContent.Description>
            <CreateButton variant="outline" name="Tambah" />
          </EmptyContent>
        </AccordionContent>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem>Profile</ContextMenuItem>
        <ContextMenuItem>Billing</ContextMenuItem>
        <ContextMenuItem>Team</ContextMenuItem>
        <ContextMenuItem>Subscription</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  )
}
