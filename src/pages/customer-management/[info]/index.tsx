import React, { useEffect, ReactElement } from 'react'
import { useDispatch } from 'react-redux'
import Head from 'next/head'
import { useRouter } from 'next/router'

import { NextPageWithLayout } from '@/pages/_app'
import { Layout } from '@/components'
import { breadcrumbAction } from '@/store/slices/loggedSlice/breadcrumbSlice'

import InfoBusinessCustomer from '@/modules/customer-management/business-info'
import InfoPersonalCustomer from '@/modules/customer-management/customer-info'

const Page: NextPageWithLayout = () => {
  const router = useRouter()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(
      breadcrumbAction.updateBreadcrumb([
        'Trang chủ',
        'Quản lí user khách hàng',
        router.query.info?.includes('bussinessId')
          ? 'Chi tiết user khách hàng doanh nghiệp'
          : 'Chi tiết user khách hàng cá nhân',
      ]),
    )
  }, [])

  if (router.query.info?.includes('bussinessId')) {
    return <InfoBusinessCustomer />
  } else {
    return <InfoPersonalCustomer />
  }
}

Page.getLayout = function getLayout(page: ReactElement) {
  const router = useRouter()

  return (
    <Layout>
      <Head>
        <title>
          {router.query.info?.includes('bussinessId')
            ? 'Chi tiết user khách hàng doanh nghiệp'
            : 'Chi tiết user khách hàng cá nhân'}
        </title>
      </Head>
      <>{page}</>
    </Layout>
  )
}

export default Page
