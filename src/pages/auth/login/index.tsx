import { AuthLayout } from '@/components'
import LoginForm from '@/modules/auth/login-form'
import type { NextPageWithLayout } from '@/pages/_app'
import React, { ReactElement } from 'react'

const Page: NextPageWithLayout = () => {
  return (
    <div>
      <h1>Đăng nhập</h1>
      <LoginForm />
    </div>
  )
}

Page.getLayout = function getLayout(page: ReactElement) {
  return (
    <AuthLayout>
      <>{page}</>
    </AuthLayout>
  )
}

export default Page
