import React from 'react'
import {
  Controller,
  FieldValues,
  RegisterOptions,
  useFormContext,
} from 'react-hook-form'
import clsx from 'clsx'
import { ErrorMessage } from '@hookform/error-message'

type TProps = Omit<any, 'name'> & {
  name: string
  label: string
  rules?: RegisterOptions
}

const FormCheckbox: React.FC<TProps> = ({ label, name, rules, ...props }) => {
  const { control } = useFormContext()

  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field: { value, ...newField }, formState: { errors } }) => (
        <React.Fragment>
          <input
            type="checkbox"
            {...newField}
            className={clsx(props?.className, 'text-base')}
            checked={value}
          >
            {label}
          </input>
          <ErrorMessage
            errors={errors}
            name={name as any}
            render={({ message }) => (
              <p className="text-red-700 text-xs font-medium mt-1">{message}</p>
            )}
          />
        </React.Fragment>
      )}
    />
  )
}

export default FormCheckbox
