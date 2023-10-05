import { ReactElement, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import Head from 'next/head'

import { NextPageWithLayout } from '@/pages/_app'
import { breadcrumbAction } from '@/store/slices/loggedSlice/breadcrumbSlice'
import { Layout } from '@/components'
import { Gender as GenderIcon } from '@/components/icon'

//tab về thông tin user thợ
import EKYCTab from '@/modules/workers-management/workers-info/EKYC'
import JobTab from '@/modules/workers-management/workers-info/job'
import TotalSalaryTab from '@/modules/workers-management/workers-info/total-salary'
import WorkerReviewTab from '@/modules/workers-management/workers-info/worker-review'
import HowToKnowTab from '@/modules/workers-management/workers-info/how-to-know'
import TransactionTab from '@/modules/workers-management/workers-info/transaction-history'

import { Avatar } from '@nextui-org/react'
import {
  Building4 as BuildingIcon,
  Cake as CakeIcon,
  Call as CallIcon,
  Sms as SmsIcon,
} from 'iconsax-react'
import { Tabs, Tab } from '@nextui-org/react'

const PageDetailsUser: NextPageWithLayout = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(
      breadcrumbAction.updateBreadcrumb([
        {title: 'Trang chủ', url: '/'}, 
        {title: 'Quản lý User thợ', url: '/worker-management'},
        {title: 'Chi tiết User thợ'}
      ]),
    )
  }, [])

  const router = useRouter()
  const params = router.query

  const tabs = [
    {
      id: 'EKYC',
      label: 'EKYC',
      content: <EKYCTab />,
    },
    {
      id: 'job',
      label: 'Ngành nghề',
      content: <JobTab />,
    },
    {
      id: 'totalPrice',
      label: 'Tổng quan thu nhập',
      content: <TotalSalaryTab />,
    },
    {
      id: 'rateUser',
      label: 'Đánh giá thợ',
      content: <WorkerReviewTab />,
    },
    {
      id: 'budgetUser',
      label: 'Tài chính thợ',
      content: <TransactionTab />,
    },
    {
      id: 'howKnow',
      label: 'Biết đến Vua Thợ?',
      content: <HowToKnowTab />,
    },
  ]
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
    <div className="w-full flex flex-col bg-[#f9f9f9] ">
      <div className="flex gap-4 items-center px-6 bg-white pt-6 rounded-t-2xl">
        <Avatar
          src="/images/Rectangle 3538.png"
          className="h-[120px] min-w-[120px]"
        />
        <div className="w-full flex flex-col gap-8">
          <div className="text-base-black-1">
            <h4 className="text-2xl font-bold">Lâm Hoài Bảo</h4>
            <span className="text-base">ID: {params.userId}</span>
          </div>
          <div className="w-full flex gap-4">
            {listItemInfo.map(i => (
              <ItemInfo desc={i.desc} icon={i.icon} key={i.id} />
            ))}
          </div>
        </div>
      </div>
      <Tabs
        aria-label="Tab about information user"
        items={tabs}
        variant="underlined"
        color="primary"
        classNames={{
          base: 'bg-white pb-4 rounded-b-2xl mb-3 pt-2 ',
          tabList:'gap-6 w-full relative rounded-none p-0 border-b border-divider mx-6',
          cursor: 'w-full bg-[#246BFD]',
          tab: 'max-w-fit px-2 h-12',
          tabContent:'group-data-[selected=true]:text-[#246BFD] font-[600] text-xs 13inch:text-base',
          panel: 'px-0'
        }}
      >
        {item => (
          <Tab key={item.id} title={item.label}>
            <div className="bg-white rounded-2xl px-6 py-4 min-h-[300px]">
              {item.content}
            </div>
          </Tab>
        )}
      </Tabs>
    </div>
  )
}

PageDetailsUser.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      <Head>
        <title>Chi tiết User thợ</title>
      </Head>
      <>{page}</>
    </Layout>
  )
}

export default PageDetailsUser

const ItemInfo = ({ icon, desc }: { icon: any; desc: any }) => {
  return (
    <div className="w-full flex items-center justify-between p-2 bg-base-gray rounded-lg">
      {icon}
      <span className="text-base-black-1 text-xs 13inch:text-sm">{desc}</span>
    </div>
  )
}
