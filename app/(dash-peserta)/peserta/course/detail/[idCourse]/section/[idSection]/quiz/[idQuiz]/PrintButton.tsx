"use client"

import Link from "next/link"
import { PrinterIcon } from "lucide-react"

import { buttonVariants } from "@/components/ui/button"

interface PrintButtonProps {
  url: string
}

export function PrintButtonNilai({ url }: PrintButtonProps) {
  const handlePrint = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    // Get screen dimensions
    const screenWidth = window.screen.width
    const screenHeight = window.screen.height

    // Calculate window size (80% of screen size)
    const windowWidth = Math.min(1280, Math.floor(screenWidth * 0.8))
    const windowHeight = Math.min(720, Math.floor(screenHeight * 0.8))

    // Calculate position to center the window
    const left = Math.floor((screenWidth - windowWidth) / 2)
    const top = Math.floor((screenHeight - windowHeight) / 2)

    const windowFeatures = [
      `width=${windowWidth}`,
      `height=${windowHeight}`,
      `left=${left}`,
      `top=${top}`,
      "menubar=no",
      "toolbar=no",
      "location=no",
      "status=no",
      "addressbar=no",
      "directories=no",
      "scrollbars=yes",
      "resizable=yes",
      "chrome=no",
      "centerscreen=yes",
      "alwaysRaised=yes",
    ].join(",")

    const newWindow = window.open(url, "_blank", windowFeatures)
    if (newWindow) {
      newWindow.focus()
    }
  }

  return (
    <Link
      onClick={handlePrint}
      className={buttonVariants({
        size: "icon",
        className:
          "mt-4 w-full bg-blue-500 text-center text-white hover:bg-blue-600",
      })}
      href="#"
    >
      <PrinterIcon className="size-4" />
    </Link>
  )
}
