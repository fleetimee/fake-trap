import { PdfRender } from "@/components/content-renderer"





interface KnowledgeContentPdfRendererProps {
  params: {
    filePath: string
  }
}

export default function KnowledgeContentPdfRenderer({
  params,
}: KnowledgeContentPdfRendererProps) {
  const filePath = `${process.env.NEXT_PUBLIC_BASE_URL}/static/files/content/${params.filePath}`

  return <PdfRender link={filePath} />
}
