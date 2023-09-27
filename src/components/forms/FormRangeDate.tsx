import React, { useEffect } from 'react'
import { Controller, UseControllerProps, useFormContext } from 'react-hook-form'
import { ErrorMessage } from '@hookform/error-message'
import moment from 'moment'
import clsx from 'clsx'

type TProps = Omit<any, 'name' | 'value' | 'format'> &
  Pick<UseControllerProps, 'rules'> & {
    name: string
    label: string
    required?: boolean
    format?: 'DD/MM/YYYY' | 'DD/MM/YYYY HH:mm:ss' | 'HH:mm' | 'HH:mm:ss'
    getValuesFrom: [string, string]
  }

const FormRangeDate: React.FC<TProps> = ({
  label,
  name,
  required,
  rules,
  format = 'DD/MM/YYYY',
  onChange: onChange1,
  getValuesFrom = [],
  ...props
}) => {
  const { control, getValues, setValue } = useFormContext()

  useEffect(() => {
    if (getValuesFrom.length !== 2) {
      return
    }

    const [first, second] = getValuesFrom
    const firstValue = getValues(first)
    const secondValue = getValues(second)

    // prettier-ignore
    if(!firstValue || !secondValue || !moment(new Date(firstValue)).isValid() || !moment(new Date(secondValue)).isValid()) {
      return
    }

    setValue(name, [firstValue, secondValue])
  }, getValuesFrom)

  return (
    <div className="w-full">
      <label className="block text-gray-700 text-sm mb-1" htmlFor={name}>
        {label} {required === true && <span className="text-red-700">*</span>}
      </label>
      <Controller
        control={control}
        name={name}
        rules={rules}
        render={({
          field: { value, onChange, ...newField },
          fieldState: { error },
          formState: { errors },
        }) => {
          return (
            <>
              {/* <DatePicker.RangePicker
                {...{ ...props, ...newField }}
                value={
                  value && value?.map((d: any) => moment(new Date(d), format))
                }
                format={format}
                onChange={(dates: any, formatString: any) => {
                  if (dates) {
                    onChange(dates.map((date: any) => moment(date).format()))
                  } else {
                    onChange([])
                  }

                  onChange1?.(dates, formatString)
                }}
                className={clsx('w-full', props?.className)}
                status={error && 'error'}
              /> */}
              <ErrorMessage
                errors={errors}
                name={name}
                render={({ message }) => (
                  <p className="text-warning text-xs font-medium mt-1">
                    {message}
                  </p>
                )}
              />
            </>
          )
        }}
      />
    </div>
  )
}

export default FormRangeDate
