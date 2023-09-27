import React, { ReactElement, useState } from 'react'
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form'
import { Layout } from '@/components'
import type { NextPageWithLayout } from '@/pages/_app'
import { FormInput } from '@/components/forms'

const Page: NextPageWithLayout = () => {
  const method = useForm({
    mode: 'onChange',
    defaultValues: {
      abc: '',
    },
  })

  const onSubmit = () => {
    console.log(method.getValues())
  }
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
