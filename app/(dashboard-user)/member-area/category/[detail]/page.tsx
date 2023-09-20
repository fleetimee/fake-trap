interface MemberCategoryDetailPageProps {
  params: {
    detail: string
  }
}

export default async function MemberCategoryDetailPage({
  params,
}: MemberCategoryDetailPageProps) {
  return (
    <div>
      <p>{params.detail}</p>
    </div>
  )
}
