import { ErrorMessage } from '@hookform/error-message'
import clsx from 'clsx'
import { ArrowDown2, ArrowUp, ArrowUp2 } from 'iconsax-react'
import React, { useEffect, useState } from 'react'
import { Controller, UseControllerProps, useFormContext } from 'react-hook-form'
import styled from 'styled-components'

type TProps = Omit<any, 'name' | 'status'> &
  Pick<UseControllerProps, 'rules'> & {
    name: string
    label?: string
    required?: boolean
    handlePressEnter?: Function
  }

const FormInputNumber: React.FC<TProps> = ({
  onChange: onChange1,
  onBlur: onBlur1,
  name,
  rules,
  label,
  required = false,
  handlePressEnter,
  ...props
}) => {
  const { control } = useFormContext()

  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <Styled className={'w-full'}>
      <label
        className="block text-gray text-sm font-medium mb-1"
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
              {mounted && (
                <input
                  type="number"
                  // inputMode="numeric"
                  {...{ ...props, ...field }}
                  onWheel={() => (document?.activeElement as any)?.blur()}
                  onKeyDown={e => {
                    if (['-'].includes(e.key)) {
                      e.preventDefault()
                    }
                  }}
                  onChange={e => {
                    onChange(e)
                    onChange1?.(e)
                  }}
                  onBlur={e => {
                    onBlur()
                    onBlur1?.(e)
                  }}
                  className={clsx(
                    props.className,
                    `custom-input-number bg-grey !bg-none !w-full h-[40px] md:h-[50px] border-none rounded-2xl 
                    focus-within:!bg-grey !shadow-none`,
                  )}
                  // controls={{
                  //   upIcon: (
                  //     <div className="rounded-md bg-gray">
                  //       <ArrowUp2 className="text-grey" />
                  //     </div>
                  //   ),
                  //   downIcon: (
                  //     <div className="rounded-md bg-gray">
                  //       <ArrowDown2 className="text-grey" />
                  //     </div>
                  //   ),
                  // }}
                />
              )}
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
    </Styled>
  )
}

const Styled = styled.div`
  input {
    // &:focus {
    //   box-shadow: ${props => props.theme.boxShadow['inset']};
    // }
  }
  .ant-input-number {
    background: transparent !important;
    outline: none;
    box-shadow: none;
    .ant-input-number-input-wrap {
      outline: none;
      box-shadow: none;
      .ant-input-number-input {
        padding-left: 1.5rem;
      }
    }
  }
`

export default FormInputNumber
