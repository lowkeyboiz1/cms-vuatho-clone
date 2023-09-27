import { Montserrat } from 'next/font/google'
import * as React from 'react'
const montserrat = Montserrat({ subsets: ['latin'] })

export interface IAppProps {
  children: React.ReactNode
}

export default function AuthLayout({ children }: IAppProps) {
  return <main className={montserrat.className}>Auth layout{children}</main>
}
