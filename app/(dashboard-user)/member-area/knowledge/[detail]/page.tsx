interface MemberKnowledgeDetailPageProps {
  params: {
    detail: string
  }
}

export default function MemberKnowledgeDetailPage({
  params,
}: MemberKnowledgeDetailPageProps) {
  return (
    <div>
      <p>{params.detail}</p>
    </div>
  )
}
