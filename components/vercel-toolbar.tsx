"use client"

import { usePathname, useRouter } from "next/navigation"
import {
  ArchiveIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  ChatBubbleIcon,
  HomeIcon,
  Pencil2Icon,
  PersonIcon,
} from "@radix-ui/react-icons"

import { Button } from "@/components/ui/button"

import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip"

interface VercelToolbarProps {
  homeButton?: string
  materiButton?: string
  userButton?: string
  forumButton?: string
  noteButton?: string
}

export function VercelToolbar({ ...props }: VercelToolbarProps) {
  const router = useRouter()
  usePathname()
  return (
    <div className="flex max-w-max items-center justify-between rounded-full bg-zinc-800 p-2">
      <div className="flex space-x-2 border-r border-zinc-600 pr-1">
        <TooltipButton
          tooltipText="Back"
          onClick={() => {
            router.back()
          }}
        >
          <ArrowLeftIcon className="h-6 w-6 stroke-1" />
          <span className="sr-only">Create a comment</span>
        </TooltipButton>

        <div className="relative">
          <TooltipButton
            tooltipText="Home"
            onClick={() => {
              router.push(props.homeButton || "/")
            }}
          >
            <HomeIcon className="h-6 w-6 stroke-1" />
            <span className="sr-only">Open inbox</span>
            <span className="absolute right-2 top-2 block h-2 w-2 rounded-full bg-blue-500" />
          </TooltipButton>
        </div>

        <TooltipButton
          tooltipText="Next"
          onClick={() => {
            router.forward()
          }}
        >
          <ArrowRightIcon className="h-6 w-6 stroke-1" />
          <span className="sr-only">Edit</span>
        </TooltipButton>
      </div>
      <div className="flex space-x-2  border-zinc-600 px-3">
        <TooltipButton
          tooltipText="Materi"
          onClick={() => {
            router.push(props.materiButton || "/")
          }}
        >
          <ArchiveIcon className="h-6 w-6 stroke-1" />
          <span className="sr-only">Materi</span>
        </TooltipButton>

        <TooltipButton
          tooltipText="Peserta"
          onClick={() => {
            router.push(props.userButton || "/")
          }}
        >
          <PersonIcon className="h-6 w-6 stroke-1" />
          <span className="sr-only">Edit</span>
        </TooltipButton>

        <TooltipButton
          tooltipText="Forum"
          onClick={() => {
            router.push(props.forumButton || "/")
          }}
        >
          <ChatBubbleIcon className="h-6 w-6 stroke-1" />
          <span className="sr-only">Edit</span>
        </TooltipButton>

        {props.noteButton && (
          <TooltipButton
            tooltipText="Note"
            onClick={() => {
              router.push(props.noteButton || "/")
            }}
          >
            <Pencil2Icon className="h-6 w-6 stroke-1" />
            <span className="sr-only">Edit</span>
          </TooltipButton>
        )}
      </div>
    </div>
  )
}

interface TooltipButtonProps {
  tooltipText: string
  onClick: () => void
  children: React.ReactNode
}

function TooltipButton({ tooltipText, onClick, children }: TooltipButtonProps) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          className="rounded-full text-zinc-100 hover:bg-gray-600 hover:text-zinc-100"
          size="icon"
          variant="ghost"
          onClick={onClick}
        >
          {children}
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <span>{tooltipText}</span>
      </TooltipContent>
    </Tooltip>
  )
}
