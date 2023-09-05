import React from "react"

import { PdfViewer } from "@/components/pdf-viewer"

interface PdfRendererProps {
  link: string
}

export function PdfRender({ link }: PdfRendererProps) {
  return <PdfViewer link={link} />
}
