import React, { useState, useMemo, useEffect } from 'react'
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
  SortDescriptor,
} from '@nextui-org/react'

import Style from './table.module.css'

interface Column {
  id: string
  name: string
  sortable?: boolean
}

interface DataItem {
  id: any
  [key: string]: any
}

type TableType = {
  initialData: DataItem[]
  columns: Column[]
  rowsPerPage?: number
  labelTable?: string
  multiSelectTable?: 'single' | 'multiple' | 'none'
  renderCell?: (dataItem: any, columnKey: React.Key) => React.ReactNode
  onRowAction?: (key: any) => void
  handleSelected?: any
}

const TableComponent: React.FC<TableType> = ({
  rowsPerPage,
  initialData,
  columns,
  labelTable,
  multiSelectTable,
  renderCell,
  onRowAction,
  handleSelected,
}) => {
  const [page, setPage] = useState<number>(1)
  const [data, setData] = useState<any[]>(initialData)

  const RowsPerPage = rowsPerPage ? rowsPerPage : 3

  const pages = Math.ceil(data.length / RowsPerPage)

  const items = useMemo(() => {
    const start = (page - 1) * RowsPerPage
    const end = start + RowsPerPage

    return data.slice(start, end)
  }, [page, data])

  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: 'id',
    direction: 'descending',
  })

  useEffect(() => {
    const sortedData = [...data].sort((a, b) => {
      const first = a[sortDescriptor.column as keyof typeof a] as number
      const second = b[sortDescriptor.column as keyof typeof b] as number
      const cmp = first < second ? -1 : first > second ? 1 : 0

      return sortDescriptor.direction === 'descending' ? -cmp : cmp
    })

    setData(sortedData)
  }, [sortDescriptor])

  const handleSortChange = (newSortDescriptor: SortDescriptor) => {
    setSortDescriptor(newSortDescriptor)
  }

  useEffect(() => {
    setData(initialData)
    setPage(1)
  }, [initialData])

  return (
    <Table
      aria-label={`Table about ${labelTable}`}
      onSelectionChange={
        handleSelected
          ? (value: any) => {
              handleSelected(value === 'all' ? initialData : Array.from(value))
            }
          : () => {}
      }
      bottomContent={
        <div className="flex w-full justify-center">
          <Pagination
            isCompact
            showControls
            color="secondary"
            page={page}
            total={pages}
            onChange={page => setPage(page)}
            classNames={{
              item: Style.itemPagi,
              cursor: 'bg-[#282828] text-white',
              wrapper: 'gap-3 shadow-none',
              prev: Style.controlPagi,
              next: Style.controlPagi,
            }}
            radius="full"
            size="md"
          />
        </div>
      }
      bottomContentPlacement="outside"
      selectionMode={multiSelectTable || 'none'}
      onSortChange={handleSortChange}
      sortDescriptor={sortDescriptor}
      classNames={{
        wrapper: Style.wrapperTable,
        th: Style.thTable,
        tbody: Style.tbodyTable,
        td: `${Style.tdTable} ${onRowAction && 'cursor-pointer'}`,
      }}
      onRowAction={onRowAction}
    >
      <TableHeader columns={columns}>
        {column => (
          <TableColumn key={column.id} allowsSorting={column.sortable}>
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody items={items} emptyContent={'Chưa có dữ liệu'}>
        {item => (
          <TableRow key={item.id}>
            {columnKey => (
              <TableCell>
                {renderCell
                  ? renderCell(item, columnKey)
                  : (item as any)[columnKey]}
              </TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  )
}

export default TableComponent
