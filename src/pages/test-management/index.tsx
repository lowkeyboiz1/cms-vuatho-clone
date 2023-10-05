import { Layout } from '@/components'
import { NextPageWithLayout } from '../_app'
import { ReactElement, useEffect } from 'react'
import { Tab, Tabs } from '@nextui-org/react'
import { useDispatch } from 'react-redux'
import { breadcrumbAction } from '@/store/slices/loggedSlice/breadcrumbSlice'
import Head from 'next/head'
import CodeOfConduct from '@/modules/manager-test/CodeOfConduct'

const Page: NextPageWithLayout = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(
      breadcrumbAction.updateBreadcrumb([
        {title: 'Trang chủ', url: '/'}, 
        {title: 'Quản lí bài test'}
      ]),
    )
  }, [])

  const tabs = [
    {
      id: 'employee',
      label: 'QUY TẮC ỨNG XỬ',
      content: <CodeOfConduct />,
    },
    {
      id: 'Department',
      label: 'NGHIỆP VỤ',
      content: <div>Khang2</div>,
    },
  ]
  return (
    <>
      <Tabs
        aria-label="Tab about personal customers and bussiness customers"
        items={tabs}
        variant="underlined"
        color="primary"
        classNames={{
          base: 'pb-2 rounded-b-2xl w-full',
          tabList:
            'gap-6 w-full relative rounded-none p-0 border-b border-divider',
          cursor: 'w-full bg-[#246BFD]',
          tab: 'max-w-fit px-2 h-12',
          tabContent:
            'group-data-[selected=true]:text-[#246BFD] font-semibold text-xs 13inch:text-base',
          panel: 'px-0',
        }}
      >
        {item => (
          <Tab key={item.id} title={item.label}>
            <div>{item.content}</div>
          </Tab>
        )}
      </Tabs>
    </>
  )
}
Page.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      <Head>
        <title>Quản lí bài test</title>
      </Head>
      <>{page}</>
    </Layout>
  )
}

export default Page
