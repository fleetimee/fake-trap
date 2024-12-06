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
    window.open(
      url,
      "_blank",
      "width=800,height=600,menubar=no,toolbar=no,location=no,status=no"
    )
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
