import { Layout } from '@/components'
import * as React from 'react'
import { NextPageWithLayout } from '@/pages/_app'
import { ReactElement } from 'react'
import { AppTable } from '@/components/table'

export interface IPageProps {}
const Page: NextPageWithLayout = () => {
  return (
    <div className="container mx-auto mt-5">
      <p className="text-black"></p>
      {/* <AppTable /> */}
    </div>
  )
}

Page.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      <>{page}</>
    </Layout>
  )
}

export default Page
