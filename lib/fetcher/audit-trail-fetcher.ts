import { AuditTrailListRes } from "@/types/audit-trail/res/audit-trail-list"

interface AuditTrailFetcherProps {
  token: string | undefined
  limit: number
  page: number
  sortField?: string
  orderBy?: string
  method?: string
  from?: string
  to?: string
}

export async function getAuditTrail({
  token,
  limit,
  page,
  sortField = "id",
  orderBy = "desc",
  method = "",
  from = "",
  to = "",
}: AuditTrailFetcherProps): Promise<AuditTrailListRes> {
  let baseUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/secure/audit-trail`

  const url = new URL(baseUrl)

  if (page) {
    url.searchParams.append("page", page.toString())
  }

  if (limit) {
    url.searchParams.append("limit", limit.toString())
  }

  if (method) {
    url.searchParams.append("method", method)
  }

  if (from) {
    url.searchParams.append("from", from)
  }

  if (to) {
    url.searchParams.append("to", to)
  }

  if (sortField) {
    url.searchParams.append("sortBy", sortField)
  }

  if (orderBy) {
    url.searchParams.append("orderBy", orderBy)
  }

  const response = await fetch(url.toString(), {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  return response.json()
}
