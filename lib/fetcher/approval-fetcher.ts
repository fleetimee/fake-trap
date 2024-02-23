import {
  ApprovalOperatorLMSListRes,
  ApprovalOperatorLMSNotificationListRes,
  ApprovalRequestList,
  ApprovalSupervisorCourseListRes,
  ApprovalSupervisorCourseOneRes,
  ApprovalSupervisorPemateriListRes,
  ApprovalSupervisorPemateriOneRes,
} from "@/types/approval/res"
import {
  ApprovalKnowledgeCountRes,
  ApprovalKnowledgeCountResData,
} from "@/types/approval/res/approval-knowledge-count-list"
import { ApprovalSupervisorPemateriDivisiCountListRes } from "@/types/approval/res/approval-supervisor-count-list"
import { ApprovalSupervisorNotificationListRes } from "@/types/approval/res/approval-supervisor-notification-list"

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
  status?: string | string[] | undefined
  approverId?: string
  from?: string
  to?: string
}

export async function getPemateriApprovalRequests({
  idRequester,
  token,
  limit,
  page,
  sortBy = "created_at",
  orderBy = "desc",
  searchQuery = "",
  status = "",
  approverId,
  from,
  to,
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

interface GetSupervisorPemateriApprovalRequestProps {
  idApprover: string
  token: string | undefined
  limit: number
  page: number
  sortBy?: string
  orderBy?: string
  searchQuery?: string
  status?: string
  from?: string
  to?: string
  statusCodes?: string | string[] | undefined
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
  from,
  to,
  statusCodes = "",
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

  if (from) {
    url.searchParams.append("from", from)
  }

  if (to) {
    url.searchParams.append("to", to)
  }

  if (statusCodes) {
    if (Array.isArray(statusCodes)) {
      url.searchParams.append("statusCode", statusCodes.join("."))
    } else {
      url.searchParams.append("statusCode", statusCodes)
    }
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

interface CreateKnowledgeApprovalProps {
  token: string | undefined
  body: BodyInit
}

export async function createKnowledgeApproval({
  token,
  body,
}: CreateKnowledgeApprovalProps) {
  let url = `${process.env.NEXT_PUBLIC_BASE_URL}/secure/approval/knowledge`

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: body,
  })

  return res
}

interface RevisionKnowledgeApprovalProps {
  token: string | undefined
  idApproval: string
  body: BodyInit
}

export async function revisionKnowledgeApproval({
  token,
  idApproval,
  body,
}: RevisionKnowledgeApprovalProps) {
  let url = `${process.env.NEXT_PUBLIC_BASE_URL}/secure/approval/knowledge/revision/${idApproval}`

  const res = await fetch(url, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: body,
  })

  return res
}

interface UpdateKnowledgeApprovalProps {
  token: string | undefined
  body: BodyInit
  idApproval: string
}

export async function updateKnowledgeApproval({
  token,
  body,
  idApproval,
}: UpdateKnowledgeApprovalProps) {
  let url = `${process.env.NEXT_PUBLIC_BASE_URL}/secure/approval/knowledge/${idApproval}`

  const res = await fetch(url, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: body,
  })

  return res
}

interface GetApprovalKnowledgeCountProps {
  token: string | undefined
  userUuid: string
  isSupervisor: boolean
}

export async function getApprovalKnowledgeCount({
  token,
  userUuid,
  isSupervisor,
}: GetApprovalKnowledgeCountProps): Promise<ApprovalKnowledgeCountRes> {
  let url = `${process.env.NEXT_PUBLIC_BASE_URL}/secure/approval/knowledge/count/${userUuid}`

  const urlObj = new URL(url)

  if (isSupervisor) {
    urlObj.searchParams.append("isSupervisor", isSupervisor.toString())
  }

  const res = await fetch(url, {
    method: "GET",
    headers: {
      ContentType: "application/json",
      Authorization: `Bearer ${token}`,
    },
    cache: "no-cache",
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

interface GetSupervisorPemateriDivisiCountProps {
  token: string | undefined
  userUuid: string
}

export async function getSupervisorPemateriDivisiCount({
  token,
  userUuid,
}: GetSupervisorPemateriDivisiCountProps): Promise<ApprovalSupervisorPemateriDivisiCountListRes> {
  let url = `${process.env.NEXT_PUBLIC_BASE_URL}/secure/approval/supervisor/${userUuid}/count`

  const res = await fetch(url, {
    method: "GET",
    headers: {
      ContentType: "application/json",
      Authorization: `Bearer ${token}`,
    },

    cache: "no-cache",
  })

  return await res.json()
}

interface GetSupervisorPemateriDivisiNotificationListProps {
  token: string | undefined
  userUuid: string
}

export async function getSupervisorPemateriDivisiNotificationList({
  token,
  userUuid,
}: GetSupervisorPemateriDivisiNotificationListProps): Promise<ApprovalSupervisorNotificationListRes> {
  let url = `${process.env.NEXT_PUBLIC_BASE_URL}/secure/approval/supervisor/${userUuid}/notification`

  const res = await fetch(url, {
    method: "GET",
    headers: {
      ContentType: "application/json",

      Authorization: `Bearer ${token}`,
    },

    cache: "no-cache",
  })

  return await res.json()
}

interface GetOperatorLmsNotificationListProps {
  token: string | undefined
  userUuid: string
}

export async function getOperatorLmsNotificationList({
  token,
  userUuid,
}: GetOperatorLmsNotificationListProps): Promise<ApprovalOperatorLMSNotificationListRes> {
  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/secure/approval/operator-lms/${userUuid}/notification`

  const res = await fetch(url, {
    method: "GET",
    headers: {
      ContentType: "application/json",
      Authorization: `Bearer ${token}`,
    },

    cache: "no-cache",
  })

  return await res.json()
}

interface CreateCourseApprovalProps {
  token: string | undefined
  body: BodyInit
}

export async function createCourseApproval({
  token,
  body,
}: CreateCourseApprovalProps) {
  let url = `${process.env.NEXT_PUBLIC_BASE_URL}/secure/approval/course`

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: body,
  })

  return res
}

interface RevisionCourseApprovalProps {
  token: string | undefined
  idApproval: string
  body: BodyInit
}

export async function revisionCourseApproval({
  token,
  idApproval,
  body,
}: RevisionCourseApprovalProps) {
  let url = `${process.env.NEXT_PUBLIC_BASE_URL}/secure/approval/course/revision/${idApproval}`

  const res = await fetch(url, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: body,
  })

  return res
}

interface UpdateCourseApprovalProps {
  token: string | undefined
  idApproval: string
  body: BodyInit
}

export async function updateCourseApproval({
  token,
  idApproval,
  body,
}: UpdateCourseApprovalProps) {
  let url = `${process.env.NEXT_PUBLIC_BASE_URL}/secure/approval/course/${idApproval}`

  const res = await fetch(url, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: body,
  })

  return res
}
