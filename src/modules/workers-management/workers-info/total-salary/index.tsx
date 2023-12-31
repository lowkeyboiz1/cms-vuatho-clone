import { ArrowDown2 } from 'iconsax-react'
import { useMemo, useState } from 'react'

import {
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from '@nextui-org/react'

const TotalSalaryTab = () => {

  const [selectedKeys, setSelectedKeys] = useState<any>('Ngành nghề')
  const [isSelect, setIsSelect] = useState(false)
  const selectedValue = useMemo(
    () => Array.from(selectedKeys).join('').replaceAll('_', ' '),
    [selectedKeys],
  )

  const handleAction = (key: any) => {
    setSelectedKeys(key)
    setIsSelect(true)
  }

  return (
    <div className="space-y-6">
      <div className="flex gap-6">
        <Button
          onClick={() => setIsSelect(false)}
          size="md"
          className={`text-white ${
            isSelect ? 'bg-base-gray text-base-black-1' : 'bg-primary-blue'
          } text-sm 13inch:text-base`}
        >Tất cả ngành nghề</Button>
        <Dropdown>
          <DropdownTrigger>
            <Button
              size="md"
              variant="bordered"
              className={`capitalize text-sm 13inch:text-base font-semibold ${
                isSelect ? 'bg-primary-blue text-white' : 'text-base-black-1'
              }`}
              endContent={
                <ArrowDown2 size={16} color={isSelect ? '#fff' : '#282828'} />
              }
            >
              {selectedValue}
            </Button>
          </DropdownTrigger>
          <DropdownMenu
            aria-label="Single selection actions"
            variant="flat"
            disallowEmptySelection
            selectionMode="single"
            selectedKeys={selectedKeys}
            // onSelectionChange={() => setSelectedKeys}
            onAction={key => handleAction(key)}
          >
            <DropdownItem key="text">Text</DropdownItem>
            <DropdownItem key="number">Number</DropdownItem>
            <DropdownItem key="date">Date</DropdownItem>
            <DropdownItem key="single_date">Single Date</DropdownItem>
            <DropdownItem key="iteration">Iteration</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
      <div className="grid grid-cols-3 gap-6">
        <div className='p-6 w-full flex flex-col gap-6 rounded-2xl bg-[#F1F6FF]'>
          <h6 className="text-base-black-1 text-sm 13inch:text-base font-semibold">Tổng thu nhập</h6>
          <span className={`text-xl 13inch:text-2xl font-bold text-[#246BFD]`}>
            200.000.000đ
          </span>
        </div>
        <div className='p-6 w-full  flex flex-col gap-6 rounded-2xl bg-[#F1F6FF]'>
          <h6 className="text-base-black-1 text-sm 13inch:text-base font-semibold">
            Tổng thu nhập
          </h6>
          <span className={`text-xl 13inch:text-2xl font-bold text-[#246BFD]`}>
            200.000.000đ
          </span>
        </div>
      </div>
    </div>
  )
}

export default TotalSalaryTab
