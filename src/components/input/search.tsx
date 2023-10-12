import React, { useState, useCallback } from 'react'

import { Input } from '@nextui-org/react'
import { SearchNormal1 as SearchIcon } from 'iconsax-react'
import { twMerge } from 'tailwind-merge'

type inputType = {
  placeholder?: string
  value?: string
  onChange?: () => void
  onClear?: () => void
  styleInput?: string
}

const SearchInput: React.FC<inputType> = ({
  placeholder,
  value,
  onChange,
  onClear,
  styleInput,
}) => {
  return (
    <Input
      isClearable
      required
      variant="bordered"
      size="md"
      color="primary"
      placeholder={placeholder || 'Tìm kiếm'}
      startContent={<SearchIcon className="text-base-drak-gray mr-2" />}
      className={twMerge('w-96 bg-white rounded-xl', styleInput)}
      value={value}
      onClear={onClear}
      onValueChange={onChange}
    />
  )
}

export default SearchInput
