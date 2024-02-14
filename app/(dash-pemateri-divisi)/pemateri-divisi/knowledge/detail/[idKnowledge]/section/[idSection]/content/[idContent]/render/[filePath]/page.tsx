import { notFound } from "next/navigation"
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer"

import { PdfRender } from "@/components/content-renderer"

import { DocViewerClient } from "./DocViewer"

interface KnowledgeContentPdfRendererProps {
  params: {
    filePath: string
  }
  searchParams: {
    [key: string]: string | string[] | undefined
  }
}

export default function KnowledgeContentPdfRenderer({
  params,
  searchParams,
}: KnowledgeContentPdfRendererProps) {
  console.log(searchParams.fullPath)

  if (!searchParams.fullPath) {
    return notFound()
  }

  console.log(params.filePath)

  const filePath = `${process.env.NEXT_PUBLIC_BASE_URL}${searchParams.fullPath}`

  console.log(filePath)

  // return <PdfRender link={filePath} />

  const docs = [
    {
      uri: `${filePath}`,
    }, // Remote file
  ]

  return <DocViewerClient documents={docs} />
}
