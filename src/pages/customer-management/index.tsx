import { ReactElement, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import Head from 'next/head'
import { useRouter } from 'next/router'

import { Layout } from '@/components'
import { NextPageWithLayout } from '../_app'
import { breadcrumbAction } from '@/store/slices/loggedSlice/breadcrumbSlice'

import PersonalCustomerTab from '@/modules/customer-management/personal-tab'
import BusinessCustomerTab from '@/modules/customer-management/business-tab'

import { Tabs, Tab } from '@nextui-org/react'

const Page: NextPageWithLayout = () => {
  const dispatch = useDispatch()
  const router = useRouter()

  const [select, setSelect] = useState<string | undefined>(undefined)

  useEffect(() => {
    dispatch(
      breadcrumbAction.updateBreadcrumb([
        {title: 'Trang chủ', url: '/'}, 
        {title: 'Quản lý User khách'}
      ])
    )
  }, [])

  useEffect(() => {
    const { query } = router
    const tabFromQuery = query.tab

    if (tabFromQuery) {
      setSelect(tabFromQuery as string)
    }
  }, [router.query.tab])

  useEffect(() => {
    if (select) {
      router.push(`/customer-management?tab=${select}`)
    }
  }, [select])

  const tabs = [
    {
      id: 'personal',
      label: 'KHÁCH HÀNG CÁ NHÂN',
      content: <PersonalCustomerTab />,
    },
    {
      id: 'business',
      label: 'KHÁCH HÀNG DOANH NGHIỆP',
      content: <BusinessCustomerTab />,
    },
  ]

  const _HandleChangeTab = (value: any) => {
    router.push({
      pathname: '/customer-management',
      query: { tab: value },
    })
    setSelect(value)
  }

  return (
    <Tabs
      aria-label="Tab about personal customers and bussiness customers"
      items={tabs}
      variant="underlined"
      color="primary"
      defaultSelectedKey={select?.toString() || 'personal'}
      selectedKey={select?.toString()}
      onSelectionChange={_HandleChangeTab}
      classNames={{
        base: 'pb-2 rounded-b-2xl w-full',
        tabList:
          'gap-6 w-full relative rounded-none p-0 border-b border-divider',
        cursor: 'w-full bg-[#246BFD]',
        tab: 'max-w-fit px-2 h-12',
        tabContent:
          'group-data-[selected=true]:text-[#246BFD] font-semibold text-xs 13inch:text-base',
      }}
    >
      {item => (
        <Tab key={item.id} title={item.label}>
          <div>{item.content}</div>
        </Tab>
      )}
    </Tabs>
  )
}

Page.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      <Head>
        <title>Quản lí user khách hàng</title>
      </Head>
      <>{page}</>
    </Layout>
  )
}

export default Page
