import React from 'react'

import { Pagination } from '@nextui-org/react'

const Pagi: React.FC<{
  totalPage: number
  page: number
  onChange: (page: number) => void
  totalItem?: number
}> = ({ totalPage, page, onChange, totalItem }) => {
  return (
    <div
      className={`${
        totalItem
          ? 'grid grid-cols-4 items-center'
          : 'flex justify-center items-center'
      }`}
    >
      {totalItem && (
        <span className="text-base-drak-gray text-sm">
          Tổng hiển thị: {totalItem}
        </span>
      )}
      <div className="col-span-2 flex justify-center">
        <Pagination
          isCompact
          showControls
          color="secondary"
          page={page}
          total={totalPage}
          onChange={onChange}
          classNames={{
            item: 'bg-transparent text-xs 13inch:text-sm font-semibold !rounded-full text-[#282828] border-[1px] border-[#e1e1e1]',
            cursor: 'bg-[#282828] text-white',
            wrapper: 'gap-3 shadow-none',
            prev: 'bg-transparent rounded-full',
            next: 'bg-transparent rounded-full',
          }}
          radius="full"
          size="md"
        />
      </div>
    </div>
  )
}

export default Pagi
