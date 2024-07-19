"use client"

import React from "react"
import { useSearchParams } from "next/navigation"
import { DataTableFilterableColumn, DataTableSearchableColumn } from "@/types"
import { ColumnDef } from "@tanstack/react-table"
import { useSession } from "next-auth/react"

import { StrukturListResData } from "@/types/struktur-organisasi/res/struktur-list"
import { useDataTable } from "@/hooks/use-data-table"

import { DataTable, DataTableColumnHeader } from "../data-table"

interface StrukturOrganisasiTableProps {
  data: StrukturListResData[]
  pageCount: number
}

export function StrukturOrganisasiTableShell({
  data,
  pageCount,
}: StrukturOrganisasiTableProps) {
  const { data: session } = useSession()

  const searchParams = useSearchParams()

  const page = searchParams.get("page")
  const perPage = searchParams.get("per_page")
  const nama = searchParams.get("nama")
  const jabatan = searchParams.get("jabatan")
  const kodeKantor = searchParams.get("kodeKantor")
  const unitKerja = searchParams.get("unitKerja")

  const params = new URLSearchParams()

  if (nama) {
    params.append("nama", nama)
  }

  if (jabatan) {
    params.append("jabatan", jabatan)
  }

  if (kodeKantor) {
    params.append("kodeKantor", kodeKantor)
  }

  if (unitKerja) {
    params.append("unitKerja", unitKerja)
  }

  if (page) {
    params.append("page", page)
  }

  if (perPage) {
    params.append("per_page", perPage)
  }

  const columns = React.useMemo<ColumnDef<StrukturListResData, unknown>[]>(
    () => [
      {
        accessorKey: "nama",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Nama" />
        ),
      },
      {
        accessorKey: "kd_kantor",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Kode Kantor" />
        ),
      },
      {
        accessorKey: "unitkerja",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Unit Kerja" />
        ),
      },
      {
        accessorKey: "jabatan",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Jabatan" />
        ),
      },
      {
        accessorKey: "soid",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="SOID" />
        ),
      },
      {
        accessorKey: "mastersoid",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Master SOID" />
        ),
      },
    ],
    []
  )

  const searchableColumns: DataTableSearchableColumn<StrukturListResData>[] = [
    {
      id: "nama",
      title: "Nama",
    },
    {
      id: "kd_kantor",
      title: "Kode Kantor",
    },
  ]

  const filterableColumns: DataTableFilterableColumn<StrukturListResData>[] = [
    {
      id: "jabatan",
      options: [
        { value: "KONTRAK TELLER", label: "KONTRAK TELLER" },
        { value: "TELLER", label: "TELLER" },
        {
          value: "Pj. PEMIMPIN CABANG PEMBANTU KELAS 2",
          label: "Pj. PEMIMPIN CABANG PEMBANTU KELAS 2",
        },
        {
          value: "Pj. PEMIMPIN UNIT USAHA SYARIAH",
          label: "Pj. PEMIMPIN UNIT USAHA SYARIAH",
        },
        {
          value: "ANALIS KREDIT MIKRO YUNIOR",
          label: "ANALIS KREDIT MIKRO YUNIOR",
        },
        {
          value: "KONTROL INTERN CABANG CAB WATES",
          label: "KONTROL INTERN CABANG CAB WATES",
        },
        {
          value: "PEMIMPIN CABANG PEMBANTU SYARIAH KELAS 3",
          label: "PEMIMPIN CABANG PEMBANTU SYARIAH KELAS 3",
        },
        { value: "ACCOUNT OFFICER YUNIOR", label: "ACCOUNT OFFICER YUNIOR" },
        { value: "PENYELIA", label: "PENYELIA" },
        { value: "PROGRAMER YUNIOR I", label: "PROGRAMER YUNIOR I" },
        {
          value: "PEMIMPIN BIDANG CABANG SYARIAH",
          label: "PEMIMPIN BIDANG CABANG SYARIAH",
        },
        { value: "AUDITOR I", label: "AUDITOR I" },
        { value: "DEALER YUNIOR I", label: "DEALER YUNIOR I" },
        { value: "OFFICER YUNIOR", label: "OFFICER YUNIOR" },
        {
          value: "KONTRAK ANALIS KREDIT MIKRO YUNIOR",
          label: "KONTRAK ANALIS KREDIT MIKRO YUNIOR",
        },
        { value: "Pj. PEMIMPIN KELOMPOK", label: "Pj. PEMIMPIN KELOMPOK" },
        {
          value: "PEMIMPIN CABANG PEMBANTU KELAS 4, OFFICER YUNIOR",
          label: "PEMIMPIN CABANG PEMBANTU KELAS 4, OFFICER YUNIOR",
        },
        { value: "KONTRAK OFFICER YUNIOR", label: "KONTRAK OFFICER YUNIOR" },
        {
          value: "Pj. PENYELIA PELAYANAN & OPERASIONAL CABANG PEMBANTU",
          label: "Pj. PENYELIA PELAYANAN & OPERASIONAL CABANG PEMBANTU",
        },
        {
          value: "HEAD TELLER & CASH OPERATION",
          label: "HEAD TELLER & CASH OPERATION",
        },
        {
          value: "PEMIMPIN CABANG PEMBANTU KELAS 4, OFFICER SENIOR",
          label: "PEMIMPIN CABANG PEMBANTU KELAS 4, OFFICER SENIOR",
        },
        { value: "AUDITOR YUNIOR I", label: "AUDITOR YUNIOR I" },
        {
          value: "PEMIMPIN CABANG PEMBANTU SYARIAH KELAS 2",
          label: "PEMIMPIN CABANG PEMBANTU SYARIAH KELAS 2",
        },
        { value: "OFFICER", label: "OFFICER" },
        {
          value: "KONTROL INTERN CABANG CAB SYARIAH",
          label: "KONTROL INTERN CABANG CAB SYARIAH",
        },
        { value: "ANALIS YUNIOR", label: "ANALIS YUNIOR" },
        { value: "PEMIMPIN DIVISI", label: "PEMIMPIN DIVISI" },
        { value: "ANALIS KREDIT MIKRO", label: "ANALIS KREDIT MIKRO" },
        {
          value: "Pj. PEMIMPIN CABANG UTAMA",
          label: "Pj. PEMIMPIN CABANG UTAMA",
        },
        {
          value: "Pj. PEMIMPIN CABANG PEMBANTU KELAS 3",
          label: "Pj. PEMIMPIN CABANG PEMBANTU KELAS 3",
        },
        { value: "OFFICER SENIOR", label: "OFFICER SENIOR" },
        {
          value: "ANALIS TEKNOLOGI INFORMASI",
          label: "ANALIS TEKNOLOGI INFORMASI",
        },
        {
          value: "PENYELIA PELAYANAN & OPERASIONAL CABANG PEMBANTU",
          label: "PENYELIA PELAYANAN & OPERASIONAL CABANG PEMBANTU",
        },
        { value: "PEMIMPIN CABANG", label: "PEMIMPIN CABANG" },
        { value: "DEALER II", label: "DEALER II" },
        { value: "TELLER YUNIOR", label: "TELLER YUNIOR" },
        { value: "PENYELIA CABANG UTAMA", label: "PENYELIA CABANG UTAMA" },
        { value: "Pj. PENYELIA", label: "Pj. PENYELIA" },
        { value: "DIREKTUR UTAMA", label: "DIREKTUR UTAMA" },
        {
          value: "KONTROL INTERN CABANG CAB SLEMAN",
          label: "KONTROL INTERN CABANG CAB SLEMAN",
        },
        {
          value: "Pj. PEMIMPIN CABANG PEMBANTU KELAS 1",
          label: "Pj. PEMIMPIN CABANG PEMBANTU KELAS 1",
        },
        {
          value: "Pj. PEMIMPIN SATUAN KERJA AUDIT INTERNAL",
          label: "Pj. PEMIMPIN SATUAN KERJA AUDIT INTERNAL",
        },
        {
          value: "PEMIMPIN CABANG PEMBANTU KELAS 1",
          label: "PEMIMPIN CABANG PEMBANTU KELAS 1",
        },
        {
          value: "PEMIMPIN CABANG PEMBANTU KELAS 3",
          label: "PEMIMPIN CABANG PEMBANTU KELAS 3",
        },
        { value: "PEMIMPIN KELOMPOK", label: "PEMIMPIN KELOMPOK" },
        {
          value: "PEMIMPIN CABANG PEMBANTU KELAS 4, MARKETING OFFICER",
          label: "PEMIMPIN CABANG PEMBANTU KELAS 4, MARKETING OFFICER",
        },
        {
          value: "PEMIMPIN UNIT KERJA KHUSUS",
          label: "PEMIMPIN UNIT KERJA KHUSUS",
        },
        { value: "SEKRETARIS", label: "SEKRETARIS" },
        { value: "ACCOUNT OFFICER", label: "ACCOUNT OFFICER" },
        {
          value: "KONTROL INTERN CABANG CAB SENOPATI",
          label: "KONTROL INTERN CABANG CAB SENOPATI",
        },
        {
          value: "PEMIMPIN CABANG PEMBANTU KELAS 4, OFFICER",
          label: "PEMIMPIN CABANG PEMBANTU KELAS 4, OFFICER",
        },
        { value: "ANALIS SENIOR", label: "ANALIS SENIOR" },
        { value: "Pj. PEMIMPIN CABANG", label: "Pj. PEMIMPIN CABANG" },
        { value: "ANALIS UTAMA", label: "ANALIS UTAMA" },
        {
          value: "TEAM LEADER KREDIT MIKRO, ANALIS KREDIT MIKRO YUNIOR",
          label: "TEAM LEADER KREDIT MIKRO, ANALIS KREDIT MIKRO YUNIOR",
        },
        { value: "Pj. PEMIMPIN DIVISI", label: "Pj. PEMIMPIN DIVISI" },
        { value: "PROGRAMER II", label: "PROGRAMER II" },
        { value: "DIREKTUR", label: "DIREKTUR" },
        {
          value: "KONTRAK ACCOUNT OFFICER YUNIOR",
          label: "KONTRAK ACCOUNT OFFICER YUNIOR",
        },
        {
          value: "PEMIMPIN CABANG PEMBANTU KELAS 2",
          label: "PEMIMPIN CABANG PEMBANTU KELAS 2",
        },
        { value: "AUDITOR SENIOR II", label: "AUDITOR SENIOR II" },
        { value: "KONTRAK PENGEMUDI", label: "KONTRAK PENGEMUDI" },
        { value: "ANALIS", label: "ANALIS" },
        {
          value: "MARKETING OFFICER YUNIOR",
          label: "MARKETING OFFICER YUNIOR",
        },
        {
          value: "KONTROL INTERN CABANG CAB WONOSARI",
          label: "KONTROL INTERN CABANG CAB WONOSARI",
        },
        {
          value: "KONTROL INTERN CABANG UTAMA",
          label: "KONTROL INTERN CABANG UTAMA",
        },
        { value: "PEMIMPIN DESK", label: "PEMIMPIN DESK" },
        { value: "PEMIMPIN BIDANG", label: "PEMIMPIN BIDANG" },
        { value: "MARKETING OFFICER", label: "MARKETING OFFICER" },
        { value: "PEMIMPIN UNIT", label: "PEMIMPIN UNIT" },
        {
          value: "KONTRAK PROGRAMMER YUNIOR",
          label: "KONTRAK PROGRAMMER YUNIOR",
        },
        {
          value: "TEAM LEADER KREDIT MIKRO, ANALIS KREDIT MIKRO",
          label: "TEAM LEADER KREDIT MIKRO, ANALIS KREDIT MIKRO",
        },
        {
          value: "KONTRAK MARKETING OFFICER YUNIOR",
          label: "KONTRAK MARKETING OFFICER YUNIOR",
        },
        { value: "KONTRAK SATPAM", label: "KONTRAK SATPAM" },
        { value: "PROGRAMER YUNIOR II", label: "PROGRAMER YUNIOR II" },
        {
          value: "KONTROL INTERN CABANG CAB BANTUL",
          label: "KONTROL INTERN CABANG CAB BANTUL",
        },
      ],
      title: "Jabatan",
    },
    {
      id: "unitkerja",
      options: [],
      title: "Unit Kerja",
    },
  ]

  const { dataTable } = useDataTable({
    data,
    columns,
    pageCount,
    searchableColumns,
    filterableColumns,
  })

  return (
    <DataTable
      dataTable={dataTable}
      columns={columns}
      searchableColumns={searchableColumns}
      filterableColumns={filterableColumns}
    />
  )
}
