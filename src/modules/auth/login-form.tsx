import { FormAuthInput } from '@/components/forms'
import * as React from 'react'
import { FormProvider, useForm } from 'react-hook-form'

export interface IProps {}

export default function (props: IProps) {
  const methods = useForm({
    mode: 'onChange',
    defaultValues: {
      username: '',
      password: '',
    },
  })

  return (
    <FormProvider {...methods}>
      <FormAuthInput
        name="email"
        placeholder={'Tài khoản'}
        rules={{
          required: 'Vui lòng nhập tài khoản',
        }}
        className="h-[54px]"
      />
    </FormProvider>
  )
}
