import { ErrorMessage } from '@hookform/error-message'
import clsx from 'clsx'
import React from 'react'
import { Controller, UseControllerProps, useFormContext } from 'react-hook-form'
import Image from 'next/image'
import { CloseCircle, Eye, EyeSlash } from 'iconsax-react'
import styled from 'styled-components'

type TProps = Omit<any, 'name' | 'status'> &
  Pick<UseControllerProps, 'rules'> & {
    name: string
    label?: string
    required?: boolean
    allowClear?: boolean
    handlePressEnter?: Function
  }

const FormInputPassword: React.FC<TProps> = ({
  onChange: onChange1,
  onBlur: onBlur1,
  name,
  rules,
  label,
  required = false,
  allowClear = false,
  handlePressEnter,
  ...props
}) => {
  const { control } = useFormContext()

  return (
    <div className={'w-full'}>
      <label
        className="block text-[#333] text-sm font-medium mb-1"
        htmlFor={name}
      >
        {label} {required === true && <span className="text-red-700">*</span>}
      </label>
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
                type="password"
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
                  props.className,
                  error &&
                    '!border-b-red border-x-0 border-t-0 hover:!border-red',
                  `h-[40px] text-base border-t-0 !border-x-0 !bg-transparent 
                  hover:border-x-none !shadow-none hover:!border-golden
                  text-text-blur !border-b border-gray rounded-none focus-within:border-golden pl-0`,
                )}
              />
              <ErrorMessage
                errors={errors}
                name={name}
                render={({ message }) => (
                  <p className="text-red text-xs font-medium mt-1">{message}</p>
                )}
              />
            </div>
          )
        }}
      />
    </div>
  )
}

const StyledIcon = styled.div`
  .ant-input-password-icon {
    color: ${props => props.theme.colors['golden']} !important;
  }
`
export default FormInputPassword
