import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import AuthLayout from './auth-layout'
import LoggedLayout from './logged-layout'
import services from '@/services'
import { RootState } from '@/store'
import { authAction } from '@/store/slices/authSlice'

export interface IAppProps {
  children: React.ReactNode
}

export default function Layout({ children }: IAppProps) {
  const [onFetching, setOnFetching] = useState<boolean>(false)

  const dispatch = useDispatch()
  const userInfo = useSelector((state: RootState) => state.auth.userInfo)

  const getMe = async () => {
    const access_token = localStorage.getItem('access_token')
    if (!access_token?.length) {
      dispatch(
        authAction.updateUserInfo({
          isLoading: false,
          isAuth: false,
        }),
      )
    }

    try {
      const res = await services.auth.authGetMe()
      if (res.status === 200) {
        if (res?.user) {
          dispatch(
            authAction.updateUserInfo({
              isLoading: false,
              isAuth: true,
              ...res?.user,
            }),
          )
        }
      } else {
        localStorage.removeItem('access_token')
        dispatch(
          authAction.updateUserInfo({
            isLoading: false,
            isAuth: false,
          }),
        )
      }
    } catch (error) {
      localStorage.removeItem('access_token')
      console.log(error)

      dispatch(
        authAction.updateUserInfo({
          isLoading: false,
          isAuth: false,
          name: '',
        }),
      )
    }
  }

  useEffect(() => {
    onFetching && getMe()
  }, [onFetching])

  useEffect(() => {
    userInfo?.isLoading && setOnFetching(true)
  }, [userInfo?.isLoading])

  if (userInfo?.isLoading) return <div>Checking authentication...</div>
  if (userInfo?.isAuth === false) return <AuthLayout />

  return <LoggedLayout children={children} />
}
