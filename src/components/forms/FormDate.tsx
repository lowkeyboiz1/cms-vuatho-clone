import { ErrorMessage } from '@hookform/error-message'
import clsx from 'clsx'
import Image from 'next/image'
import moment from 'moment'
import React from 'react'
import { Controller, UseControllerProps, useFormContext } from 'react-hook-form'
import styled from 'styled-components'

type TProps = Omit<any, 'name' | 'value' | 'format'> &
  Pick<UseControllerProps, 'rules'> & {
    name: string
    label?: string
    required?: boolean
    format?: 'DD/MM/YYYY' | 'DD/MM/YYYY HH:mm:ss' | 'HH:mm' | 'HH:mm:ss'
    showToday?: boolean
    showNow?: boolean
  }

const FormDate: React.FC<TProps> = ({
  label,
  name,
  rules,
  required,
  onChange: onChange1,
  format = 'DD/MM/YYYY',
  showToday = true,
  showNow = true,
  ...props
}) => {
  const { control } = useFormContext()

  return (
    <WrapInput className="w-full">
      {label && (
        <label
          className="block text-text-blur text-sm font-medium mb-1"
          htmlFor={name}
        >
          {label} {required === true && <span className="text-red-700">*</span>}
        </label>
      )}
      <Controller
        control={control}
        name={name}
        rules={rules}
        render={({
          field: { value, onChange, ...newField },
          fieldState: { error },
          formState: { errors },
        }) => (
          <div className="w-full">
            {/* 
            // @ts-ignore */}
            {/* <DatePicker
              {...{ ...props, ...newField }}
              allowClear={false}
              showToday={showToday}
              showNow={showNow}
              // value={value && moment(new Date(value), format)}
              format={format}
              className={clsx(
                props?.className,
                `duration-0 bg-[#181818] !w-full h-[50px] border-none 
                     py-0 rounded-2xl !shadow-inset overflow-hidden focus-within:bg-linear-gray text-white`,
              )}
              status={error && 'error'}
              onChange={(value: any, dateString) => {
                onChange(value ? moment(value).format() : value)
                onChange1?.(value, dateString)
              }}
              suffixIcon={
                <Image src="/icon/calendar.svg" width={24} height={24} alt="" />
              }
            /> */}
            <ErrorMessage
              errors={errors}
              name={name as any}
              render={({ message }) => (
                <p className="text-warning text-xs font-medium mt-1">
                  {message}
                </p>
              )}
            />
          </div>
        )}
      />
    </WrapInput>
  )
}

const WrapInput = styled.div`
  .ant-picker {
    input {
      color: ${props => props.theme.colors.white};
    }
  }
`

export default FormDate
