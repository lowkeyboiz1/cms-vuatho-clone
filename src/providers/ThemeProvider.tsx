import * as React from 'react'
import { NextUIProvider } from '@nextui-org/react'

export interface IProps {
  children: React.ReactNode
}

import { ToastContainer } from 'react-toastify'

export default function ThemeProvider({ children }: IProps) {
  return (
    <>
      <ToastContainer />
      <NextUIProvider>{children}</NextUIProvider>
    </>
  )
}
