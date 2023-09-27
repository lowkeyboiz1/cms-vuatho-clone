import React, { useEffect, ReactElement } from 'react'
import { useDispatch } from 'react-redux'
import Head from 'next/head'
import { useRouter } from 'next/router'

import { NextPageWithLayout } from '@/pages/_app'
import { Layout } from '@/components'
import { breadcrumbAction } from '@/store/slices/loggedSlice/breadcrumbSlice'
import { Gender as GenderIcon } from '@/components/icon'

import { Avatar } from '@nextui-org/react'
import {
  Building4 as BuildingIcon,
  Cake as CakeIcon,
  Call as CallIcon,
  Sms as SmsIcon,
} from 'iconsax-react'

const Page: NextPageWithLayout = () => {
  const router = useRouter()
  const params = router.query
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(
      breadcrumbAction.updateBreadcrumb([
        'Trang chủ',
        'Quản lí nhân viên Vua Thợ',
        'Chi tiết nhân viên',
      ]),
    )
  }, [])

  const listItemInfo = [
    {
      id: 1,
      icon: (
        <GenderIcon size="24" variant="Bulk" className="text-primary-blue-3" />
      ),
      desc: 'Nam',
    },
    {
      id: 2,
      icon: (
        <CakeIcon size="24" variant="Bulk" className="text-primary-blue-3" />
      ),
      desc: '11/08/1994',
    },
    {
      id: 3,
      icon: (
        <BuildingIcon
          size="24"
          variant="Bulk"
          className="text-primary-blue-3"
        />
      ),
      desc: 'Hốc môn',
    },
    {
      id: 4,
      icon: (
        <CallIcon size="24" variant="Bulk" className="text-primary-blue-3" />
      ),
      desc: '0123456789',
    },
    {
      id: 5,
      icon: (
        <SmsIcon size="24" variant="Bulk" className="text-primary-blue-3" />
      ),
      desc: 'hihi@gmail.com',
    },
  ]
  return (
    <div className="flex gap-4 items-start p-6 bg-white rounded-2xl h-screen">
      <Avatar
        src="/images/Rectangle 3538.png"
        className="h-[80px] 13inch:h-[120px] min-w-[80px] 13inch:min-w-[120px]"
      />
      <div className="w-full flex flex-col gap-8">
        <div className="text-base-black-1">
          <div className="text-xl 13inch:text-2xl font-bold">Lâm Hoài Bảo</div>
          <div className="text-base 13inch:text-xl">ID: {params.info}</div>
        </div>
        <div className="w-full flex gap-4">
          {listItemInfo.map(i => (
            <ItemInfo desc={i.desc} icon={i.icon} key={i.id} />
          ))}
        </div>
        <div className="flex gap-5">
          <div className="w-full flex flex-col gap-2">
            <span className="text-sm 13inch:text-base font-semibold">
              Mã sớ thuế
            </span>
            <div className="bg-base-gray p-2 13inch:px-4 13inch:py-3 text-base-black-1">
              <span className="text-xs 13inch:text-sm font-normal">
                thue1213456
              </span>
            </div>
          </div>
          <div className="w-full flex flex-col gap-2">
            <span className="text-sm 13inch:text-base font-semibold">
              Phòng ban
            </span>
            <div className="bg-base-gray p-2 13inch:px-4 13inch:py-3 text-base-black-1">
              <span className="text-xs 13inch:text-sm font-normal">
                Phòng Dell
              </span>
            </div>
          </div>
          <div className="w-full flex flex-col gap-2">
            <span className="text-sm 13inch:text-base font-semibold">
              Vị trí
            </span>
            <div className="bg-base-gray p-2 13inch:px-4 13inch:py-3 text-base-black-1">
              <span className="text-xs 13inch:text-sm font-normal">UX UI</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

Page.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      <Head>
        <title>Chi tiết nhân viên</title>
      </Head>
      <>{page}</>
    </Layout>
  )
}

export default Page

const ItemInfo = ({ icon, desc }: { icon: any; desc: any }) => {
  return (
    <div className="w-full flex items-center justify-between p-2 bg-base-gray rounded-lg">
      {icon}
      <span className="text-base-black-1 text-xs 13inch:text-sm">{desc}</span>
    </div>
  )
}
