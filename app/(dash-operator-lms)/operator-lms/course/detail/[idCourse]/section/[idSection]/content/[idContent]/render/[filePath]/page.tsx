import { PdfRender } from "@/components/content-renderer"

interface CourseContentPdfRendererProps {
  params: {
    filePath: string
  }
}

export default function CourseContentPdfRenderer({
  params,
}: CourseContentPdfRendererProps) {
  const filePath = `${process.env.NEXT_PUBLIC_BASE_URL}/static/files/content/${params.filePath}`

  return <PdfRender link={filePath} />
}
