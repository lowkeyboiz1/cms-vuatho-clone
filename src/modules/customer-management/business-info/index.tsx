import React from 'react'
import { useRouter } from 'next/router'

import { Gender as GenderIcon } from '@/components/icon'

import { Avatar, Button } from '@nextui-org/react'
import {
  Building4 as BuildingIcon,
  Cake as CakeIcon,
  Call as CallIcon,
  Sms as SmsIcon,
  Trash,
} from 'iconsax-react'
import { Tabs, Tab } from '@nextui-org/react'
import { color } from 'framer-motion'
// import HowToKnowTab from '@/modules/manage-workers-user/info-workers-user/how-to-know';

const InfoBusinessCustomer = () => {
  const router = useRouter()
  const customerIdParam = router.query.info

  if (Array.isArray(customerIdParam)) {
    return <div>Invalid customer ID parameter</div>
  }
  const customerId = customerIdParam ? customerIdParam.split('=')[1] : null

  const tabs = [
    {
      id: 'delegate',
      label: 'Người đại diện',
      content: <DelegateTab />,
    },
    {
      id: 'branch',
      label: 'Chi nhánh',
      content: <BranchTab />,
    },
    {
      id: 'collab docs',
      label: 'Giấy tờ hợp pháp',
      content: <CollabDocsTab />,
    },
  ]

  return (
    <div className="w-full flex flex-col bg-[#f9f9f9] ">
      <div className="px-6 bg-white pt-6 rounded-t-2xl">
        <div className="flex gap-4 items-center">
          <Avatar
            src="/images/Rectangle 3538.png"
            className="h-[120px] min-w-[120px]"
          />
          <div>
            <div className="text-2xl font-bold">Lâm Hoài Bảo</div>
            <div className="">ID: {customerId}</div>
          </div>
        </div>
        <div className="flex gap-5 pt-3">
          <div className="space-y-2 w-full">
            <span className="text-sm font-[600]">Quy mô doanh nghiệp</span>
            <div className="bg-base-gray rounded-lg px-3 py-2">
              <span className="text-sm font-[400]">Lớn</span>
            </div>
          </div>
          <div className="space-y-2 w-full">
            <span className="text-sm font-[600]">Địa chỉ doanh nghiệp</span>
            <div className="bg-base-gray rounded-lg px-3 py-2">
              <span className="text-sm font-[400]">
                2972 Westheimer Rd. Santa Ana, Illinois 85486{' '}
              </span>
            </div>
          </div>
        </div>
        <div className="flex gap-5 pt-5">
          <div className="space-y-2 w-full">
            <span className="text-sm font-[600]">Email</span>
            <div className="bg-base-gray rounded-lg px-3 py-2">
              <span className="text-sm font-[400]">baone@gmail.com</span>
            </div>
          </div>
          <div className="space-y-2 w-full">
            <span className="text-sm font-[600]">Số điện thoại</span>
            <div className="bg-base-gray rounded-lg px-3 py-2">
              <span className="text-sm font-[400]">123456789</span>
            </div>
          </div>
        </div>
      </div>
      <Tabs
        aria-label="Tab about information user"
        items={tabs}
        variant="underlined"
        color="primary"
        classNames={{
          base: 'bg-white pb-4 rounded-b-2xl mb-3 pt-4',
          tabList:
            'gap-6 w-full relative rounded-none p-0 border-b border-divider mx-6',
          cursor: 'w-full bg-[#246BFD]',
          tab: 'max-w-fit px-2 h-12',
          tabContent:
            'group-data-[selected=true]:text-[#246BFD] font-[600] text-base',
        }}
      >
        {item => (
          <Tab key={item.id} title={item.label}>
            <div className="bg-white rounded-2xl px-6 py-4 min-h-[300px]">{item.content}</div>
          </Tab>
        )}
      </Tabs>
    </div>
  )
}

const DelegateTab: React.FC = () => {
  return (
    <div className="flex flex-col gap-4">
      <h6 className="text-xl font-[600]">Phạm Thị Tươi</h6>
      <div className="flex gap-5">
        <div className="space-y-2 w-full">
          <span className="text-sm font-[600]">Số điện thoại</span>
          <div className="bg-base-gray rounded-lg px-3 py-2">
            <span className="text-sm font-[400]">09888888888</span>
          </div>
        </div>
        <div className="space-y-2 w-full">
          <span className="text-sm font-[600]">Email</span>
          <div className="bg-base-gray rounded-lg px-3 py-2">
            <span className="text-sm font-[400]">Tuoine@gmail.com</span>
          </div>
        </div>
      </div>
    </div>
  )
}

const CollabDocsTab: React.FC = () => {
  return (
    <div>
      <div className="space-y-2 w-full">
        <span className="text-sm font-[600]">Hạng mục hợp tác</span>
        <div className="bg-base-gray rounded-lg px-3 py-2">
          <span className="text-sm font-[400]">Ngắn hạn</span>
        </div>
      </div>
      <div className="flex mt-5">
        <div className="flex gap-2">
          <span className="text-sm font-[600]">Hopdong.docx</span>
          <button className="text-primary-blue font-[600] text-sm">Xem</button>
        </div>
        <div className="flex gap-2" style={{ marginLeft: '50px' }}>
          <span className="text-sm font-[600]">Hopdong.pdf</span>
          <button className="text-primary-blue font-[600] text-sm">Xem</button>
        </div>
      </div>
    </div>
  )
}

const BranchTab: React.FC = () => {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex justify-between gap-8 items-center">
        <div className="border-[1px] border-base-gray-2 rounded-2xl w-full p-4 flex flex-col gap-4">
          <h1 className="text-base-black-1 font-bold text-2xl">Chi nhánh 1</h1>
          <div className="flex gap-5">
            <div className="w-full flex flex-col gap-2">
              <span className="text-sm font-semibold">Địa chỉ</span>
              <div className="bg-base-gray px-4 py-3 text-base-black-1">
                <span className="text-sm font-normal">123 An Phú, Song Hành, Quận 2, TPCHM</span>
              </div>
            </div>
            <div className="w-full flex flex-col gap-2">
              <span className="text-sm font-semibold">Số điện thoại</span>
              <div className="bg-base-gray px-4 py-3 text-base-black-1">
                <span className="text-sm font-normal">09888888888</span>
              </div>
            </div>
            <div className="w-full flex flex-col gap-2">
              <span className="text-sm font-semibold">Mail</span>
              <div className="bg-base-gray px-4 py-3 text-base-black-1">
                <span className="text-sm font-normal">Tuoine@gmail.com</span>
              </div>
            </div>
          </div>
        </div>
        <Button
          style={{ borderColor: '#FF4343', color: '#FF4343' }}
          className="border-[1px] bg-transparent rounded-2xl"
          isIconOnly
        >
          <Trash />
        </Button>
      </div>
      <div className="flex justify-between gap-8 items-center ">
        <div className="border-[1px] border-base-gray-2 rounded-2xl w-full p-4 flex flex-col gap-4">
          <h1 className="text-base-black-1 font-bold text-2xl">Chi nhánh 2</h1>
          <div className="flex gap-5">
            <div className="w-full flex flex-col gap-2">
              <span className="text-sm font-semibold">Địa chỉ</span>
              <div className="bg-base-gray px-4 py-3 text-base-black-1">
                <span className="text-sm font-normal">123 An Phú, Song Hành, Quận 2, TPCHM</span>
              </div>
            </div>
            <div className="w-full flex flex-col gap-2">
              <span className="text-sm font-semibold">Số điện thoại</span>
              <div className="bg-base-gray px-4 py-3 text-base-black-1">
                <span className="text-sm font-normal">09888888888</span>
              </div>
            </div>
            <div className="w-full flex flex-col gap-2">
              <span className="text-sm font-semibold">Mail</span>
              <div className="bg-base-gray px-4 py-3 text-base-black-1">
                <span className="text-sm font-normal">Tuoine@gmail.com</span>
              </div>
            </div>
          </div>
        </div>
        <Button
          style={{ borderColor: '#FF4343', color: '#FF4343' }}
          className="border-[1px] bg-transparent rounded-2xl"
          isIconOnly
        >
          <Trash />
        </Button>
      </div>
    </div>
  )
}

export default InfoBusinessCustomer
