"use client"

/**
 * v0 by Vercel.
 * @see https://v0.dev/t/aLUPWlh
 */
import { JSX, SVGProps } from "react"
import { usePathname, useRouter } from "next/navigation"
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ChatBubbleIcon,
  HomeIcon,
  PersonIcon,
} from "@radix-ui/react-icons"

import { Button } from "@/components/ui/button"

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip"

interface VercelToolbarProps {
  homeButton?: string
  userButton?: string
  forumButton?: string
}

export function VercelToolbar({ ...props }: VercelToolbarProps) {
  const router = useRouter()

  const pathname = usePathname()

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
      <div className="flex space-x-2 border-r border-zinc-600 px-3">
        <TooltipButton
          tooltipText="Tambah Peserta"
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
      </div>
      <div className="flex items-center justify-center space-x-2 pl-1">
        <Button
          className="rounded-full text-zinc-100 hover:bg-gray-600 hover:text-zinc-100"
          size="icon"
          variant="ghost"
        >
          <IconShare className="h-6 w-6 stroke-1" />
          <span className="sr-only">Open share UI</span>
        </Button>
        <Button
          className="rounded-full text-zinc-100 hover:bg-gray-600 hover:text-zinc-100"
          size="icon"
          variant="ghost"
        >
          <IconMenu className="h-6 w-6 stroke-1" />
          <span className="sr-only">Open menu</span>
        </Button>
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
    <TooltipProvider>
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
    </TooltipProvider>
  )
}

function IconMenu(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  )
}

function IconShare(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
      <polyline points="16 6 12 2 8 6" />
      <line x1="12" x2="12" y1="2" y2="15" />
    </svg>
  )
}
