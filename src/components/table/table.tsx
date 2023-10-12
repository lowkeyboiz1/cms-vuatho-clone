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
  page: number
  setPage: any
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
  page,
  setPage,
}) => {
  const [data, setData] = useState<any[]>(initialData)

  const items = useMemo(() => {
    const start = (page - 1) * (rowsPerPage || 5)
    const end = start + (rowsPerPage || 5)

    return data.slice(start, end)
  }, [page, data])

  // const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
  //   column: 'id',
  //   direction: 'descending',
  // })

  // useEffect(() => {
  //   const sortedData = [...data].sort((a, b) => {
  //     const first = a[sortDescriptor.column as keyof typeof a] as number
  //     const second = b[sortDescriptor.column as keyof typeof b] as number
  //     const cmp = first < second ? -1 : first > second ? 1 : 0

  //     return sortDescriptor.direction === 'descending' ? -cmp : cmp
  //   })

  //   setData(sortedData)
  //   setPage(1)
  // }, [sortDescriptor])

  // const handleSortChange = (newSortDescriptor: SortDescriptor) => {
  //   setSortDescriptor(newSortDescriptor)
  // }

  useEffect(() => {
    initialData && setData(initialData)
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
      bottomContentPlacement="outside"
      selectionMode={multiSelectTable || 'none'}
      // onSortChange={handleSortChange}
      // sortDescriptor={sortDescriptor}
      classNames={{
        wrapper: Style.wrapperTable,
        th: Style.thTable,
        tbody: Style.tbodyTable,
        td: `${Style.tdTable} ${onRowAction && 'cursor-pointer'}`,
      }}
      onRowAction={onRowAction}
      className='pb-10'
    >
      <TableHeader columns={columns}>
        {column => (
          <TableColumn key={column.id} allowsSorting={column.sortable}>
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody items={data} emptyContent={'Chưa có dữ liệu'}>
        {item => (
          <TableRow key={item.id}>
            {columnKey => (
              <TableCell>
                {renderCell ? renderCell(item, columnKey) : (item as any)[columnKey]}
              </TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  )
}

export default TableComponent
