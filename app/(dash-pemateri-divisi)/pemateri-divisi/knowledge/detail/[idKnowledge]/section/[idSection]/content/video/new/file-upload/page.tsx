import { AddContentVideoUploadForm } from "@/components/forms/add-content-video-upload-form"

interface KnowledgeContentVideoUploadPageProps {
  params: {
    idKnowledge: string
    idSection: string
  }
}

export default function KnowledgeContentVideoUploadPage({
  params,
}: KnowledgeContentVideoUploadPageProps) {
  return <AddContentVideoUploadForm idSection={Number(params.idSection)} />
}
