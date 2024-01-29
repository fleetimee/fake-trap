"use client"

import { useState } from "react"
import { Document, Page, pdfjs } from "react-pdf"

import "react-pdf/dist/esm/Page/AnnotationLayer.css"
import "react-pdf/dist/esm/Page/TextLayer.css"

import { Card } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"

const options = {
  cMapUrl: "/cmaps/",
  standardFontDataUrl: "/standard_fonts/",
}

// pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`

// pdfjs.GlobalWorkerOptions.workerSrc = new URL(
//   "pdfjs-dist/build/pdf.worker.min.js",
//   import.meta.url
// ).toString()

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
    // <Card className="h-full w-full rounded-2xl">
    //   <ScrollArea className="h-[695px] w-full">
    //     <Document
    //       file={`${link}`}
    //       // file="/sample.pdf"
    //       onLoadSuccess={onDocumentLoadSuccess}
    //       options={options}
    //       className="flex flex-wrap items-center justify-center py-2"
    //     >
    //       {Array.from(new Array(numPages), (_el, index) => (
    //         <Page
    //           key={`page_${index + 1}`}
    //           pageNumber={index + 1}
    //           scale={1.2}
    //           className="inline-block items-center justify-center rounded-2xl text-center"
    //         />
    //       ))}
    //     </Document>
    //   </ScrollArea>
    // </Card>

    <div style={{ width: "100%", height: "100%" }}>
      <embed
        src={link}
        type="application/pdf"
        height={900}
        width={500}
        style={{
          width: "100%",
        }}
      />
    </div>
  )
}
