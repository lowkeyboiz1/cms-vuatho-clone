import { ErrorMessage } from '@hookform/error-message'
import clsx from 'clsx'
import React from 'react'
import { Controller, UseControllerProps, useFormContext } from 'react-hook-form'
import { CloseCircle } from 'iconsax-react'
import styled from 'styled-components'

type TProps = Omit<any, 'name' | 'status'> &
  Pick<UseControllerProps, 'rules'> & {
    name: string
    label?: string
    required?: boolean
    tabIndex?: number | undefined
    handlePressEnter?: Function
  }

const FormInput: React.FC<TProps> = ({
  onChange: onChange1,
  onBlur: onBlur1,
  name,
  rules,
  label,
  required = false,
  allowClear = false,
  tabIndex,
  handlePressEnter,
  ...props
}) => {
  const { control } = useFormContext()

  return (
    <div className={'w-full'}>
      <label
        className="block text-text-blur text-sm font-medium mb-1"
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
            <Styled className="w-full">
              <input
                // autoComplete="off"
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
                  props.disabled && '!text-gray',
                  error && '!border-b-red !border-solid',
                  `custom-input-number bg-grey !bg-none !w-full h-[40px] md:h-[50px] border-none rounded-2xl 
                  focus-within:!bg-grey !shadow-none text-gray`,
                )}
                tabIndex={tabIndex}
              />
              <ErrorMessage
                errors={errors}
                name={name}
                render={({ message }) => (
                  <p className="text-red text-xs font-medium mt-1">{message}</p>
                )}
              />
            </Styled>
          )
        }}
      />
    </div>
  )
}

const Styled = styled.div`
  .ant-input-affix-wrapper {
    input {
      background: none !important;
      color: inherit;
      &:focus-within {
      }
    }
  }
`
export default FormInput
