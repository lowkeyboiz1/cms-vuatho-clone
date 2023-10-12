import { ErrorMessage } from '@hookform/error-message'
import React, { useCallback } from 'react'
import { Controller, UseControllerProps, useFormContext } from 'react-hook-form'
// import Select, { Props as SelectProps, StylesConfig } from 'react-select'
import styled from 'styled-components'
import { ArrowDown2, User } from 'iconsax-react'

// const customStyles: StylesConfig<any, boolean, any> = {
//   control: (styles, { isFocused }) => ({
//     ...styles,
//     height: 50,
//     borderColor: '#12181F',
//     backgroundColor: '#12181F',
//     borderWidth: 1,
//     boxShadow: isFocused ? '0px 0px 0px 2px rgba(40,60,146,.15)' : 'none',
//     borderRadius: 4,
//     cursor: 'pointer',
//     '&:hover': {
//       borderColor: '#12181F',
//     },
//   }),
//   placeholder: styles => ({
//     ...styles,
//     color: '#49607c',
//     fontWeight: 400,
//   }),
//   valueContainer: styles => ({
//     ...styles,
//     flexWrap: 'nowrap',
//   }),
//   multiValue: styles => ({
//     ...styles,
//     borderRadius: 999,
//     minWidth: 'min-content',
//   }),
//   singleValue: styles => ({
//     ...styles,
//     color: '#fff',
//   }),
//   option: styles => ({
//     ...styles,
//     backgroundColor: '#12181F',
//     color: '#fff',
//   }),
//   container: styles => ({
//     ...styles,
//     backgroundColor: '#12181F',
//   }),
// }

type TProps = Omit<any, 'name' | 'value'> &
  Pick<UseControllerProps, 'rules'> & {
    name: string
    label?: string
    required?: boolean
    refer?: string
    tabIndex?: number | undefined
  }

const FormSelect: React.FC<TProps> = ({
  onChange: onChange1,
  onBlur: onBlur1,
  name,
  rules,
  label,
  required = false,
  className,
  refer,
  tabIndex,
  ...props
}) => {
  const { control, watch } = useFormContext()

  const formatValueCb = useCallback(
    (value: any) => {
      const { options } = props

      if (!options || !Array.isArray(options)) {
        return undefined
      }

      if (refer) {
        if (Array.isArray(value)) {
          return options.filter(opt => !!value.find(x => x === opt.value))
        }

        return options.find(x => x[refer] === value)
      } else {
        if (Array.isArray(value)) {
          return options.filter(opt => !!value.find(x => x.value === opt.value))
        }

        return options.find(x => x.value === value)
      }
    },
    [props?.options],
  )

  return (
    <Styled className={'w-full'} id={`dropdownSelect${name}`}>
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
          field: { onChange, onBlur, value, ...field },
          formState: { errors },
        }) => {
          return (
            <div className="w-full">
              <select
                tabIndex={tabIndex}
                {...{ ...props, ...field }}
                className={`${className} duration-0 bg-[#FFFFFF0D] !w-full h-[40px] md:h-[50px] border-none 
                py-0 rounded-md overflow-hidden focus-within:bg-secondary`}
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
    </Styled>
  )
}

const Styled = styled.div`
  .ant-select {
    .ant-select-selector {
      height: 100%;
      border: none;
      outline: none;
      background: transparent;
      display: flex;
      align-items: center;
    }
    .ant-select-selection-item {
      color: white};
      height: 100% !important;
    }
    .ant-select-selection-placeholder {
      color: gray !important;
    }
  }
  .ant-select-selection-search-input {
    height: 100% !important;
    color:white !important;
    background: transparent !important;
    background-position: 0 0 !important;

    &:-webkit-autofill {
      background-color: #faffbd !important;
    }
  }
`
export default FormSelect
