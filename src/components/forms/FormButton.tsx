// import { ButtonProps } from 'antd'
import React, { useMemo } from 'react'
import { useFormContext } from 'react-hook-form'
// import { PrimaryButton } from '@/components/common'

interface IProps extends Omit<any, 'disabled' | 'loading' | 'onClick'> {
  onClick: (data: any) => any
  loading?: boolean
  disabled?: boolean
  tabIndex?: number | undefined
}

const FormButton: React.FC<IProps> = ({
  onClick,
  loading = false,
  disabled: d = false,
  tabIndex,
  ...props
}) => {
  const {
    handleSubmit,
    formState: { isDirty, isSubmitting, isValid },
  } = useFormContext()

  const disabled = useMemo(() => {
    return !isValid
  }, [isValid])

  return (
    <button
      {...props}
      tabIndex={tabIndex}
      onClick={handleSubmit(onClick)}
      disabled={disabled || d}
      // loading={isSubmitting || loading}
    />
  )
}

export default FormButton
