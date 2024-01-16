"use client"

import { useState } from "react"
import { Document, Page, pdfjs } from "react-pdf"

import "react-pdf/dist/esm/Page/TextLayer.css"
import "react-pdf/dist/esm/Page/AnnotationLayer.css"

import { Card } from "./ui/card"
import { ScrollArea } from "./ui/scroll-area"

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString()

interface PdfViewerProps {
  link: string
}

export function PdfViewer({ link }: PdfViewerProps) {
  const [numPages, setNumPages] = useState(null)
  const [pageNumber, setPageNumber] = useState(1)

  function onDocumentLoadSuccess({ numPages }: { numPages: any }) {
    setNumPages(numPages)
  }

  return (
    <Card className="h-full w-full rounded-2xl">
      <ScrollArea className="h-[695px] w-full">
        <Document
          file={`${link}`}
          onLoadSuccess={onDocumentLoadSuccess}
          options={{
            standardFontDataUrl: `https://unpkg.com/pdfjs-dist@${pdfjs.version}/standard_fonts`,
          }}
          className="flex flex-wrap items-center justify-center py-2"
        >
          {Array.from(new Array(numPages), (_el, index) => (
            <Page
              key={`page_${index + 1}`}
              pageNumber={index + 1}
              renderMode="canvas"
              scale={1.2}
              className="inline-block items-center justify-center rounded-2xl text-center"
            />
          ))}
        </Document>
      </ScrollArea>
    </Card>
  )
}
