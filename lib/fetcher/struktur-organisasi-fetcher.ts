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
}: StrukturOrganisasiFetcherProps) {}
