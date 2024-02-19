import { notFound } from "next/navigation"

import { PdfRender } from "@/components/content-renderer"

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
  if (!searchParams.fullPath) {
    return notFound()
  }

  const filePath = `${process.env.NEXT_PUBLIC_BASE_URL}${searchParams.fullPath}`

  return <PdfRender link={filePath} />
}
