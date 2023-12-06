"use client"

import { PrinterIcon } from "lucide-react"

import { Button } from "@/components/ui/button"





interface PrintButtonProps {
  pdfUrl: string
}

export function PrintButton({ pdfUrl }: PrintButtonProps) {
  const printDocument = () => {
    const printWindow = window.open(pdfUrl)
    printWindow?.addEventListener("load", function () {
      printWindow?.print()
    })
  }

  return (
    <Button className="w-32" onClick={printDocument}>
      <PrinterIcon className="mr-2 h-5 w-5" />
      Cetak
    </Button>
  )
}
