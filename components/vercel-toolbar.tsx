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
    <div className="flex max-w-max items-center justify-between rounded-xl border-2 border-black bg-white p-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:border-white dark:bg-zinc-900 dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]">
      <div className="mr-2 flex space-x-2 border-r-2 border-black pr-4 dark:border-white">
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
      <div className="flex space-x-2 pl-2">
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
          className="rounded-lg border-2 border-black bg-[#4D9DE0] text-white
                     shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]
                     transition-all duration-200
                     hover:translate-x-[-2px] hover:translate-y-[-2px]
                     hover:bg-[#3D8DD0] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
                     dark:border-white dark:bg-[#60A5FA] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)]
                     dark:hover:bg-[#3B82F6] dark:hover:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]"
          size="icon"
          variant="ghost"
          onClick={onClick}
        >
          {children}
        </Button>
      </TooltipTrigger>
      <TooltipContent className="border-2 border-black bg-white font-bold text-black dark:border-white dark:bg-zinc-900 dark:text-white">
        <span>{tooltipText}</span>
      </TooltipContent>
    </Tooltip>
  )
}
