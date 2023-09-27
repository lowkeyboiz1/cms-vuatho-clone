import { ReactElement, useEffect } from 'react'

import { NextPageWithLayout } from '../_app'
import Image from 'next/image'
import { Activity, Add, DollarCircle, Minus, SecurityUser } from 'iconsax-react'
import { Button, Input } from '@nextui-org/react'

const Page: NextPageWithLayout = () => {
  return (
    <div className="flex w-full p-6">
      <div className="w-[60%] text-center">
        <p>Đấu giá viên: Nguyễn Văn A</p>
        <div className="w-full h-[400px] mt-2 relative">
          <Image src="/images/dat.jpg" alt="" fill />
        </div>
      </div>
      <div className="w-[36%] flex flex-col gap-2 fixed right-6">
        <div className="flex items-center justify-between">
          <p className="">Phòng: 1243</p>
          <span className="">17N người</span>
        </div>
        <div className="border-[1px] border-[#ccc] rounded-xl">
          <div className="border-b-[1px] border-[#ccc]">
            <div className="flex items-center px-4 py-2 justify-between">
              <div className="flex gap-2">
                <Activity />
                <p>Diễn biến cuộc đấu giá</p>
              </div>
              <Button size="md" variant="light">
                Xem tất cả
              </Button>
            </div>
          </div>
          <div className="list-item-price p-4 flex flex-wrap gap-4">
            <div className="item-price flex items-center justify-between w-full">
              <div className="">
                <div className="">5.000.000 Đ</div>
                <div className="">18/09/2023•10:10:32:243</div>
              </div>
              <div className="flex gap-2 items-center">
                <SecurityUser size={24} />
                <span>ID User: 123456</span>
              </div>
            </div>
            <div className="item-price flex items-center justify-between w-full">
              <div className="">
                <div className="">5.000.000 Đ</div>
                <div className="">18/09/2023•10:10:32:243</div>
              </div>
              <div className="flex gap-2 items-center">
                <SecurityUser size={24} />
                <span>ID User: 123456</span>
              </div>
            </div>
            <div className="item-price flex items-center justify-between w-full">
              <div className="">
                <div className="">5.000.000 Đ</div>
                <div className="">18/09/2023•10:10:32:243</div>
              </div>
              <div className="flex gap-2 items-center">
                <SecurityUser size={24} />
                <span>ID User: 123456</span>
              </div>
            </div>
          </div>
        </div>
        <div className="border-[1px] border-[#ccc] rounded-xl">
          <div className="border-b-[1px] border-[#ccc]">
            <div className="flex items-center px-4 py-2 justify-between">
              <div className="flex gap-2">
                <DollarCircle />
                <p>Giá hiện tại</p>
              </div>
              <div className="">10.000.000 Đ</div>
            </div>
          </div>
          <div className="p-4 flex flex-col gap-4">
            <div className="flex gap-2 items-center justify-cente">
              <Input
                type="url"
                placeholder="Giá thêm"
                labelPlacement="outside"
                endContent={
                  <div className="pointer-events-none flex items-center">
                    <span className="text-default-400 text-small">VNĐ</span>
                  </div>
                }
              />
              <span className="rotate-45">
                <Add />
              </span>
              <div className="w-[40%] p-1 rounded-full flex gap-2 items-center border-[1px] border-[#ccc] justify-between">
                <Button radius="full" size="sm" isIconOnly>
                  <Minus />
                </Button>
                <div className="">2</div>
                <Button radius="full" size="sm" isIconOnly>
                  <Add />
                </Button>
              </div>
              <span className="font-semibold text-2xl">=</span>
              <Input
                type="url"
                placeholder="Tổng giá thêm"
                labelPlacement="outside"
                endContent={
                  <div className="pointer-events-none flex items-center">
                    <span className="text-default-400 text-small">VNĐ</span>
                  </div>
                }
              />
            </div>
            <Button className="w-full">Trả giá 20.000.000 đ</Button>
            <p className="text-center ">Hai mươi triệu đồng</p>
          </div>
        </div>
      </div>
    </div>
  )
}

Page.getLayout = function getLayout(page: ReactElement) {
  return <>{page}</>
}

export default Page
