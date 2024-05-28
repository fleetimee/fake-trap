"use client"

import * as React from "react"
import type {
  DataTableFilterableColumn,
  DataTableSearchableColumn,
} from "@/types"
import {
  flexRender,
  type ColumnDef,
  type Table as TanstackTable,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { ScrollArea, ScrollBar } from "../ui/scroll-area"
import { DataTablePagination } from "./data-table-pagination"
import { DataTableToolbar } from "./data-table-toolbar"

interface DataTableProps<TData, TValue> {
  /**
   * The table instance returned from useDataTable hook with pagination, sorting, filtering, etc.
   * @type TanstackTable<TData>
   */
  dataTable: TanstackTable<TData>

  /**
   * The columns of the table
   * @default []
   * @type ColumnDef<TData, TValue>[]
   */
  columns: ColumnDef<TData, TValue>[]

  /**
   * The searchable columns of the table
   * @default []
   * @type {id: keyof TData, title: string}[]
   * @example searchableColumns={[{ id: "title", title: "titles" }]}
   */
  searchableColumns?: DataTableSearchableColumn<TData>[]

  /**
   * The filterable columns of the table. When provided, renders dynamic faceted filters, and the advancedFilter prop is ignored.
   * @default []
   * @type {id: keyof TData, title: string, options: { label: string, value: string, icon?: React.ComponentType<{ className?: string }> }[]
   * @example filterableColumns={[{ id: "status", title: "Status", options: ["todo", "in-progress", "done", "canceled"]}]}
   */
  filterableColumns?: DataTableFilterableColumn<TData>[]

  /**
   * The link to create a new row in the table (optional)
   */
  newRowLink?: string

  /**
   * Whether the table is exportable
   * @default false
   * @type boolean
   * @example isExportable={true}
   */
  isExportable?: boolean

  /**
   * The action to export the table
   * @default undefined
   * @type string | undefined
   * @example exportAction="/api/export"
   */
  exportAction?: string

  /**
   * The action to delete rows
   * @default undefined
   * @type React.MouseEventHandler<HTMLButtonElement> | undefined
   * @example deleteRowsAction={(event) => deleteSelectedRows(dataTable, event)}
   */
  deleteRowsAction?: React.MouseEventHandler<HTMLButtonElement>
}

export function DataTable<TData, TValue>({
  dataTable,
  columns,
  searchableColumns = [],
  filterableColumns = [],
  newRowLink,
  exportAction,
  isExportable = false,
  deleteRowsAction,
}: DataTableProps<TData, TValue>) {
  const [isMouseDown, setIsMouseDown] = React.useState(false)
  const [startX, setStartX] = React.useState(0)
  const [scrollLeft, setScrollLeft] = React.useState(0)

  const scrollAreaRef = React.useRef<HTMLDivElement>(null)

  const onMouseDown = (e: React.MouseEvent) => {
    setIsMouseDown(true)
    setStartX(e.pageX - scrollAreaRef.current!.offsetLeft)
    setScrollLeft(scrollAreaRef.current!.scrollLeft)
  }

  const onMouseLeave = () => {
    setIsMouseDown(false)
  }

  const onMouseUp = () => {
    setIsMouseDown(false)
  }

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isMouseDown) return
    e.preventDefault()
    const x = e.pageX - scrollAreaRef.current!.offsetLeft
    const walk = (x - startX) * 3 //scroll-fast
    scrollAreaRef.current!.scrollLeft = scrollLeft - walk
  }

  return (
    <div className="w-full space-y-2.5 overflow-auto">
      <DataTableToolbar
        table={dataTable}
        filterableColumns={filterableColumns}
        searchableColumns={searchableColumns}
        newRowLink={newRowLink}
        exportAction={exportAction}
        isExportable={isExportable}
        deleteRowsAction={deleteRowsAction}
      />
      <div className="rounded-md border">
        <ScrollArea
          ref={scrollAreaRef}
          onMouseDown={onMouseDown}
          onMouseLeave={onMouseLeave}
          onMouseUp={onMouseUp}
          onMouseMove={onMouseMove}
          className={isMouseDown ? "cursor-grabbing" : "cursor-grab"}
        >
          <Table>
            <TableHeader>
              {dataTable.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    )
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {dataTable.getRowModel().rows?.length ? (
                dataTable.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
      <div className="space-y-2.5">
        <DataTablePagination table={dataTable} />
      </div>
    </div>
  )
}
