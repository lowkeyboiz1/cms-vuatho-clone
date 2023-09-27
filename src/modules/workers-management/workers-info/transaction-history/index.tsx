import React from 'react'

import TableComponent from '@/components/table/table'

const TransactionTab: React.FC = () => {
  const columns = [
    { id: 'time', name: 'Thời gian' },
    { id: 'paymentMethod', name: 'Phương thức thanh toán', sortable: true },
    { id: 'price', name: 'Số tiền', sortable: true },
  ]
  const initialData = [
    {
      id: 1,
      time: '17/03/2023',
      paymentMethod: 'Internet banking',
      price: '12/23/2000',
    },
    {
      id: 2,
      time: '16/04/2023',
      paymentMethod: 'Tiền mặt',
      price: '12/23/2000',
    },
    {
      id: 3,
      time: '15/05/2023',
      paymentMethod: 'Internet banking',
      price: '12/23/2000',
    },
    {
      id: 4,
      time: '14/06/2023',
      paymentMethod: 'Internet banking',
      price: '12/23/2000',
    },
    {
      id: 5,
      time: '13/07/2023',
      paymentMethod: 'Tiền mặt',
      price: '12/23/2000',
    },
    {
      id: 6,
      time: '11/08/2023',
      paymentMethod: 'Tiền mặt',
      price: '12/23/2000',
    },
  ]

  const renderCell = (
    dataItem: (typeof initialData)[number],
    columnKey: React.Key,
  ) => {
    const cellValue = dataItem[columnKey as keyof typeof dataItem]

    switch (columnKey) {
      case 'price':
        return <p>{cellValue.toLocaleString()}đ</p>
      default:
        return cellValue
    }
  }
  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-end">
        <p className="text-base 13inch:text-xl font-semibold text-base-black-1">
          Lịch sử giao dịch của thợ
        </p>
        <span className="font-normal text-sm 13inch:text-base">
          ID ví: 123456
        </span>
      </div>
      <TableComponent
        columns={columns}
        initialData={initialData}
        renderCell={renderCell}
      />
    </div>
  )
}

export default TransactionTab
