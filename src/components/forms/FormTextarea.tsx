import { ErrorMessage } from '@hookform/error-message'
import clsx from 'clsx'
import React from 'react'
import { Controller, UseControllerProps, useFormContext } from 'react-hook-form'

type TProps = Omit<any, 'name' | 'status'> &
  Pick<UseControllerProps, 'rules'> & {
    name: string
    label: string
    required?: boolean
  }

const FormTextarea: React.FC<TProps> = ({
  onChange: onChange1,
  onBlur: onBlur1,
  name,
  rules,
  label,
  required = false,
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
              <textarea
                onChange={e => {
                  onChange(e)
                  onChange1?.(e)
                }}
                onBlur={e => {
                  onBlur()
                  onBlur1?.(e)
                }}
                {...{ ...props, ...field }}
                className={clsx(props?.className, '!rounded-[4px]')}
              />
              <ErrorMessage
                errors={errors}
                name={name}
                render={({ message }) => (
                  <p className="text-red-700 text-xs font-medium mt-1">
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

export default FormTextarea
