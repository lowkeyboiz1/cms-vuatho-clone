import * as React from 'react'
import { Button, ButtonProps } from '@nextui-org/react'

export interface IProps extends ButtonProps {}

export default function PrimaryButton({ children, ...props }: IProps) {
  return (
    <Button color="primary" {...props}>
      {children}
    </Button>
  )
}
