import { ErrorMessage } from '@hookform/error-message'
import clsx from 'clsx'
import React from 'react'
import {
  Controller,
  FieldValues,
  SubmitHandler,
  UseControllerProps,
  useFormContext,
} from 'react-hook-form'
import { CloseCircle } from 'iconsax-react'
import Image from 'next/image'
import styled from 'styled-components'

type TProps = Omit<any, 'name' | 'status'> &
  Pick<UseControllerProps, 'rules'> & {
    name: string
    required?: boolean
    handlePressEnter?: Function
  }

const FormInput: React.FC<TProps> = ({
  onChange: onChange1,
  onBlur: onBlur1,
  name,
  rules,
  required = false,
  className,
  allowClear = false,
  handlePressEnter,
  ...props
}) => {
  const { control } = useFormContext()

  return (
    <div className={'w-full'}>
      <Controller
        control={control}
        name={name}
        rules={rules}
        render={({
          fieldState: { error },
          field: { onChange, onBlur, ...field },
          formState: { errors },
        }) => {
          return (
            <div className="w-full">
              <input
                onChange={e => {
                  onChange(e)
                  onChange1?.(e)
                }}
                onBlur={e => {
                  onBlur()
                  onBlur1?.(e)
                }}
                {...{ ...props, ...field }}
                className={clsx(
                  className,
                  error &&
                    '!border-b-red border-x-0 border-t-0 hover:!border-red',
                  `h-[40px] text-base border-t-0 !border-x-0 !bg-transparent 
                  hover:border-x-none !shadow-none hover:!border-golden
                  text-text-blur !border-b border-gray rounded-none !bg-none focus-within:border-golden pl-0`,
                )}
              />
              <ErrorMessage
                errors={errors}
                name={name}
                render={({ message }) => (
                  <p className="text-red text-xs font-medium ml-4 mt-1">
                    {message}
                  </p>
                )}
              />
            </div>
          )
        }}
      />
    </div>
  )
}

export default FormInput
