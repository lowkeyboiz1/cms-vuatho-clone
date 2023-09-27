import { useDispatch, useSelector } from 'react-redux'

import services from '@/services'
import { RootState } from '@/store'
import { authAction } from '@/store/slices/authSlice'
import SideBar from './sidebar'
import Header from './header'

import { Montserrat } from 'next/font/google'
const montserrat = Montserrat({ subsets: ['latin'] })

import { Accordion, AccordionItem } from '@nextui-org/react'
import { useEffect, useState } from 'react'
import { title } from 'process'

export interface IAppProps {
  children: React.ReactNode
}

export default function Layout({ children }: IAppProps) {
  const dispatch = useDispatch()

  const userInfo = useSelector((state: RootState) => state.auth.userInfo)

  const getMe = async () => {
    try {
      const res = await services.auth.authGetMe()
      if (res?.data) {
        dispatch(
          authAction.updateUserInfo({
            isLoading: false,
            isAuth: true,
            name: 'Admin',
          }),
        )
        localStorage.setItem(
          'access_token',
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJhZG1pbiIsIm5hbWUiOiJI4buTbiBOaMawIEPDoXQgTMOhaSIsImRlcGFydG1lbnQiOiJQaMOybmcgSVQiLCJwb3NpdGlvbiI6Ikdpw6FtIMSR4buRYyIsInBlcm1pc3Npb24iOnsiYWxsIjp7InJlYWQiOmZhbHNlLCJ3cml0ZSI6ZmFsc2V9LCJvcmRlcnMiOnsicmVhZCI6dHJ1ZSwid3JpdGUiOnRydWV9LCJjdXN0b21lciI6eyJyZWFkIjp0cnVlLCJ3cml0ZSI6dHJ1ZX0sImRhc2hib2FyZCI6eyJyZWFkIjp0cnVlLCJ3cml0ZSI6dHJ1ZX0sImludmVudG9yeSI6eyJyZWFkIjp0cnVlLCJ3cml0ZSI6dHJ1ZX0sInVuaXRNYW5hZ2UiOnsicmVhZCI6dHJ1ZSwid3JpdGUiOnRydWV9LCJtYW5hZ2VVc2VycyI6eyJyZWFkIjp0cnVlLCJ3cml0ZSI6dHJ1ZX0sInByb2R1Y3RMaXN0Ijp7InJlYWQiOnRydWUsIndyaXRlIjp0cnVlfSwiYnVzaW5lc3NUcmlwIjp7InJlYWQiOnRydWUsIndyaXRlIjp0cnVlfSwibWV0aG9kTWFuYWdlIjp7InJlYWQiOnRydWUsIndyaXRlIjp0cnVlfSwicHJvZHVjdEJyYW5kIjp7InJlYWQiOnRydWUsIndyaXRlIjp0cnVlfSwic3RhdHVzTWFuYWdlIjp7InJlYWQiOnRydWUsIndyaXRlIjp0cnVlfSwicHJvZHVjdFN1cGxpZXIiOnsicmVhZCI6dHJ1ZSwid3JpdGUiOnRydWV9LCJ0aWNrZXRQYXltZW50cyI6eyJyZWFkIjp0cnVlLCJ3cml0ZSI6dHJ1ZX0sInRpY2tldFJlY2VpcHRzIjp7InJlYWQiOnRydWUsIndyaXRlIjp0cnVlfSwicHJvZHVjdENhdGVnb3J5Ijp7InJlYWQiOnRydWUsIndyaXRlIjp0cnVlfSwicHJvZHVjdFByb21vdGlvbnMiOnsicmVhZCI6dHJ1ZSwid3JpdGUiOnRydWV9fSwiaWF0IjoxNjkxMDQ3OTAzLCJleHAiOjE2OTE2NTI3MDN9.q6519caEUnxu3Htky8U0wlEEpjgSUCFZ0ic8znDR6Es',
        )
      }
    } catch (error) {
      localStorage.removeItem('access_token')
      // Router.push({ pathname: urlClientConstants.LOGIN })
    } finally {
      dispatch(
        authAction.updateUserInfo({
          isLoading: false,
          isAuth: false,
        }),
      )
    }
  }

  useEffect(() => {
    if (userInfo?.isAuth) {
      return
    }
    const accessToken = localStorage.getItem('access_token')
    if (!!accessToken?.length) {
      getMe()
    } else {
      dispatch(
        authAction.updateUserInfo({
          isLoading: false,
          isAuth: false,
        }),
      )
    }
  }, [userInfo?.isAuth])

  if (userInfo?.isLoading) return <div>Checking authentication...</div>

  return <LoggedLayout children={children} />
}

const LoggedLayout = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useDispatch()
  const stateSider = useSelector((state: RootState) => state.sider.hiddenSider)
  const BreadcrumbPage = useSelector(
    (state: RootState) => state.breadcrumb.breadcrumbPage,
  )

  return (
    <body className={`flex bg-[#f9f9f9] w-full` + montserrat.className}>
      <SideBar />
      <div className="w-full bg-[#f9f9f9] z-0 pl-[20%] 13inch:pl-[22%]">
        <Header />
        <main className="pt-5 container w-full mx-auto pb-5 px-5 ">
          {children}
        </main>
      </div>
    </body>
  )
}
