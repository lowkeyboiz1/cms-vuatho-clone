import React from 'react'

import { Montserrat } from 'next/font/google'
const montserrat = Montserrat({ subsets: ['latin'] })

import SideBar from './sidebar'
import Header from './header'

export interface IAppProps {
  children: React.ReactNode
}

const LoggedLayout = ({ children }: IAppProps) => {
  return (
    <body className={`bg-[#f9f9f9] w-full` + montserrat.className}>
      <SideBar />
      <div className="min-w-full bg-[#f9f9f9] min-h-screen z-0 pl-[20%]">
        <Header />
        <main className="pt-5 container w-full mx-auto pb-5 px-5 relative min-h-[calc(100vh-70px)] overflow-hidden">
          {children}
        </main>
      </div>
    </body>
  )
}

export default LoggedLayout
