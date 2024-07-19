import { StrukturListRes } from "@/types/struktur-organisasi/res/struktur-list"

interface StrukturOrganisasiFetcherProps {
  token: string | undefined
  limit: number
  page: number
  sortField?: string
  orderBy?: string
  nama?: string
  jabatan?: string
  kodeKantor?: string
  unitKerja?: string
}

export async function getStrukturOrganisasi({
  token,
  limit,
  page,
  sortField = "soid",
  orderBy = "asc",
  nama = "",
  jabatan = "",
  kodeKantor = "",
  unitKerja = "",
}: StrukturOrganisasiFetcherProps): Promise<StrukturListRes> {
  let baseUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/secure/struktur-organisasi`

  const url = new URL(baseUrl)

  if (page) {
    url.searchParams.append("page", page.toString())
  }

  if (limit) {
    url.searchParams.append("limit", limit.toString())
  }

  if (nama) {
    url.searchParams.append("nama", nama)
  }

  if (jabatan) {
    url.searchParams.append("jabatan", jabatan)
  }

  if (kodeKantor) {
    url.searchParams.append("kodeKantor", kodeKantor)
  }

  if (unitKerja) {
    url.searchParams.append("unitKerja", unitKerja)
  }

  if (sortField) {
    url.searchParams.append("sortBy", sortField)
  }

  if (orderBy) {
    url.searchParams.append("orderBy", orderBy)
  }

  try {
    const res = await fetch(url.toString(), {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    })

    return await res.json()
  } catch (error) {
    console.error(error)
    throw error
  }
}

interface StrukturOrganisasiSyncProps {
  token: string | undefined
}

export async function syncStrukturOrganisasi({
  token,
}: StrukturOrganisasiSyncProps) {
  const baseUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/secure/hrmis/employee/post`

  const url = new URL(baseUrl)

  try {
    const res = await fetch(url.toString(), {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    })

    return await res.json()
  } catch (error) {
    console.error(error)
    throw error
  }
}
