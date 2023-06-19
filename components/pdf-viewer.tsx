"use client"

import { useState } from "react"
import getConfig from "next/config"
import { Document, Page, pdfjs } from "react-pdf"

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString()

const { publicRuntimeConfig } = getConfig()

export function PdfViewer() {
  const [numPages, setNumPages] = useState(null)
  const [pageNumber, setPageNumber] = useState(1)

  function onDocumentLoadSuccess({ numPages }: { numPages: any }) {
    setNumPages(numPages)
  }

  return (
    <div>
      <Document
        file={`${publicRuntimeConfig.basePath}/sample.pdf`}
        onLoadSuccess={onDocumentLoadSuccess}
      >
        <Page pageNumber={pageNumber} />
      </Document>
      <p>
        Page {pageNumber} of {numPages}
      </p>
    </div>
  )
}
