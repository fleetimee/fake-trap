import {
  ApprovalOperatorLMSListRes,
  ApprovalRequestList,
  ApprovalSupervisorCourseListRes,
  ApprovalSupervisorCourseOneRes,
  ApprovalSupervisorPemateriListRes,
  ApprovalSupervisorPemateriOneRes,
} from "@/types/approval/res"

/*
 ___                                             ___                ___
(   )                                           (   )              (   )
 | |   ___    ___ .-.     .--.    ___  ___  ___  | |    .--.     .-.| |    .--.     .--.
 | |  (   )  (   )   \   /    \  (   )(   )(   ) | |   /    \   /   \ |   /    \   /    \
 | |  ' /     |  .-. .  |  .-. ;  | |  | |  | |  | |  |  .-. ; |  .-. |  ;  ,-. ' |  .-. ;
 | |,' /      | |  | |  | |  | |  | |  | |  | |  | |  |  | | | | |  | |  | |  | | |  | | |
 | .  '.      | |  | |  | |  | |  | |  | |  | |  | |  |  |/  | | |  | |  | |  | | |  |/  |
 | | `. \     | |  | |  | |  | |  | |  | |  | |  | |  |  ' _.' | |  | |  | |  | | |  ' _.'
 | |   \ \    | |  | |  | '  | |  | |  ; '  | |  | |  |  .'.-. | '  | |  | '  | | |  .'.-.
 | |    \ .   | |  | |  '  `-' /  ' `-'   `-' '  | |  '  `-' / ' `-'  /  '  `-' | '  `-' /
(___ ) (___) (___)(___)  `.__.'    '.__.'.__.'  (___)  `.__.'   `.__,'    `.__. |  `.__.'
                                                                          ( `-' ;                                                                     `.__.
 */

interface GetPemateriApprovalRequestProps {
  idRequester: string
  token: string | undefined
  limit: number
  page: number
  sortBy?: string
  orderBy?: string
  searchQuery?: string
}

export async function getPemateriApprovalRequests({
  idRequester,
  token,
  limit,
  page,
  sortBy = "created_at",
  orderBy = "desc",
  searchQuery = "",
}: GetPemateriApprovalRequestProps): Promise<ApprovalRequestList> {
  let baseUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/secure/approval/requester/${idRequester}`

  const url = new URL(baseUrl)

  if (page) {
    url.searchParams.append("page", page.toString())
  }

  if (limit) {
    url.searchParams.append("limit", limit.toString())
  }

  if (sortBy) {
    url.searchParams.append("sortBy", sortBy)
  }

  if (orderBy) {
    url.searchParams.append("orderBy", orderBy)
  }

  if (searchQuery) {
    url.searchParams.append("searchQuery", searchQuery)
  }

  const res = await fetch(url.toString(), {
    method: "GET",
    headers: {
      ContentType: "application/json",
      Authorization: `Bearer ${token}`,
    },
    cache: "no-cache",
  })

  return await res.json()
}

interface GetSupervisorPemateriApprovalRequestProps {
  idApprover: string
  token: string | undefined
  limit: number
  page: number
  sortBy?: string
  orderBy?: string
  searchQuery?: string
  status?: string
}

export async function getSupervisorPemateriApprovalRequests({
  idApprover,
  token,
  limit,
  page,
  sortBy = "created_at",
  orderBy = "desc",
  searchQuery = "",
  status = "",
}: GetSupervisorPemateriApprovalRequestProps): Promise<ApprovalSupervisorPemateriListRes> {
  let baseUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/secure/approval/knowledge/approver/${idApprover}`
  const url = new URL(baseUrl)

  if (page) {
    url.searchParams.append("page", page.toString())
  }

  if (limit) {
    url.searchParams.append("limit", limit.toString())
  }

  if (sortBy) {
    url.searchParams.append("sortBy", sortBy)
  }

  if (orderBy) {
    url.searchParams.append("orderBy", orderBy)
  }

  if (searchQuery) {
    url.searchParams.append("searchQuery", searchQuery)
  }

  if (status) {
    url.searchParams.append("status", status)
  }

  const res = await fetch(url.toString(), {
    method: "GET",
    headers: {
      ContentType: "application/json",
      Authorization: `Bearer ${token}`,
    },
    cache: "no-cache",
  })

  return await res.json()
}

interface GetDetailKnowledgeApprovalProps {
  idApproval: string
  token: string | undefined
}

export async function getDetailKnowledgeApproval({
  idApproval,
  token,
}: GetDetailKnowledgeApprovalProps): Promise<ApprovalSupervisorPemateriOneRes> {
  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/secure/approval/requester/detail/${idApproval}`

  const res = await fetch(url, {
    method: "GET",
    headers: {
      ContentType: "application/json",
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  })

  return await res.json()
}

/*
  .--.      .--.    ___  ___   ___ .-.        .--.      .--.       .--.
 /    \    /    \  (   )(   ) (   )   \     /  _  \    /    \    /  _  \
|  .-. ;  |  .-. ;  | |  | |   | ' .-. ;   . .' `. ;  |  .-. ;  . .' `. ;
|  |(___) | |  | |  | |  | |   |  / (___)  | '   | |  |  | | |  | '   | |
|  |      | |  | |  | |  | |   | |         _\_`.(___) |  |/  |  _\_`.(___)
|  | ___  | |  | |  | |  | |   | |        (   ). '.   |  ' _.' (   ). '.
|  '(   ) | '  | |  | |  ; '   | |         | |  `\ |  |  .'.-.  | |  `\ |
'  `-' |  '  `-' /  ' `-'  /   | |         ; '._,' '  '  `-' /  ; '._,' '
 `.__,'    `.__.'    '.__.'   (___)         '.___.'    `.__.'    '.___.'
 */

interface GetOperatorApprovalRequestProps {
  token: string | undefined
  idRequester: string
  limit: number
  page: number
  sortBy?: string
  orderBy?: string
  searchQuery?: string
  status?: string | string[] | undefined
  approverId?: string
  from?: string
  to?: string
}

export async function getOperatorApprovalRequests({
  token,
  idRequester,
  limit,
  page,
  sortBy = "created_at",
  orderBy = "desc",
  searchQuery = "",
  status = "",
  approverId,
  from,
  to,
}: GetOperatorApprovalRequestProps): Promise<ApprovalOperatorLMSListRes> {
  let baseUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/secure/approval/course/requester/${idRequester}`

  let url = new URL(baseUrl)

  if (page) {
    url.searchParams.append("page", page.toString())
  }

  if (limit) {
    url.searchParams.append("limit", limit.toString())
  }

  if (sortBy) {
    url.searchParams.append("sortBy", sortBy)
  }

  if (orderBy) {
    url.searchParams.append("orderBy", orderBy)
  }

  if (searchQuery) {
    url.searchParams.append("searchQuery", searchQuery)
  }

  if (status) {
    if (Array.isArray(status)) {
      url.searchParams.append("status", status.join("."))
    } else {
      url.searchParams.append("status", status)
    }
  }

  if (approverId) {
    url.searchParams.append("approverId", approverId)
  }

  if (from) {
    url.searchParams.append("from", from)
  }

  if (to) {
    url.searchParams.append("to", to)
  }

  const res = await fetch(url.toString(), {
    method: "GET",
    headers: {
      ContentType: "application/json",
      Authorization: `Bearer ${token}`,
    },
    cache: "no-cache",
  })

  return await res.json()
}

interface GetSupervisorLmsApprovalRequestProps {
  token: string | undefined
  idApprover: string
  limit: number
  page: number
  sortBy?: string
  orderBy?: string
  searchQuery?: string
  status?: string
}

export async function getSupervisorLmsApprovalRequests({
  token,
  idApprover,
  limit,
  page,
  sortBy = "created_at",
  orderBy = "desc",
  searchQuery = "",
  status = "",
}: GetSupervisorLmsApprovalRequestProps): Promise<ApprovalSupervisorCourseListRes> {
  let baseUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/secure/approval/course/approver/${idApprover}`
  const url = new URL(baseUrl)

  if (page) {
    url.searchParams.append("page", page.toString())
  }

  if (limit) {
    url.searchParams.append("limit", limit.toString())
  }

  if (sortBy) {
    url.searchParams.append("sortBy", sortBy)
  }

  if (orderBy) {
    url.searchParams.append("orderBy", orderBy)
  }

  if (searchQuery) {
    url.searchParams.append("searchQuery", searchQuery)
  }

  if (status) {
    url.searchParams.append("status", status)
  }

  const res = await fetch(url.toString(), {
    method: "GET",
    headers: {
      ContentType: "application/json",
      Authorization: `Bearer ${token}`,
    },
    cache: "no-cache",
  })

  return await res.json()
}

interface GetDetailCourseApprovalProps {
  idApproval: string
  token: string | undefined
}

export async function getDetailCourseApproval({
  idApproval,
  token,
}: GetDetailCourseApprovalProps): Promise<ApprovalSupervisorCourseOneRes> {
  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/secure/approval/course/single/requester/${idApproval}`

  const res = await fetch(url, {
    method: "GET",
    headers: {
      ContentType: "application/json",
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  })

  return await res.json()
}
