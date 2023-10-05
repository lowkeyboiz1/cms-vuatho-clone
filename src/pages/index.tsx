import React, { ReactElement, useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'

import type { NextPageWithLayout } from '@/pages/_app'
import { Layout } from '@/components'
import { FormInput } from '@/components/forms'
import { breadcrumbAction } from '@/store/slices/loggedSlice/breadcrumbSlice'

const Page: NextPageWithLayout = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(
      breadcrumbAction.updateBreadcrumb([
        {title: 'Trang chủ'},
      ])
    )
  }, [])
  return <>Khang</>
}

Page.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      <>{page}</>
    </Layout>
  )
}

export default Page
