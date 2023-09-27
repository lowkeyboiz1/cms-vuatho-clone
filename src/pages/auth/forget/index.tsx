import { AuthLayout } from '@/components'
import type { NextPageWithLayout } from '@/pages/_app'
import React, { ReactElement } from 'react'

const Page: NextPageWithLayout = () => {
  return <div>Quên mật khẩu</div>
}

Page.getLayout = function getLayout(page: ReactElement) {
  return (
    <AuthLayout>
      <>{page}</>
    </AuthLayout>
  )
}

export default React.memo(Page)
