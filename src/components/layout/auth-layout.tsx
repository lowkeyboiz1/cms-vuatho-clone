import { useState } from 'react'

import { Button, Input } from '@nextui-org/react'
import { Eye, EyeSlash } from 'iconsax-react'
import { useDispatch } from 'react-redux'
import { authAction } from '@/store/slices/authSlice'
import Image from 'next/image'
import instance from '@/services/axiosConfig'
import { ToastComponent } from '../Toast'

const AuthLayout = () => {
  const dispatch = useDispatch()

  const [isVisible, setIsVisible] = useState(false)

  const toggleVisibility = () => setIsVisible(!isVisible)
  const [name, setName] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    try {
      if (!name.length || !password.length) {
        return
      }
      const payload = {
        email: name,
        password,
      }
      const { data } = await instance.post('/auth/login', payload)
      localStorage.setItem('access_token', data.token)
      console.log(data)

      dispatch(
        authAction.updateUserInfo({
          isLoading: false,
          isAuth: true,
          ...data.user,
        }),
      )
      ToastComponent({
        message: 'Đăng nhập thành công',
        type: 'success',
      })
    } catch (error) {
      ToastComponent({
        message: 'Username hoặc password không hợp lệ',
        type: 'error',
      })
    }
  }
  return (
    <div className="h-[100vh] flex items-center justify-center bg-primary-blue">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 bg-black/10 py-12 px-8 rounded-xl shadow-lg shadow-black/30"
      >
        <div className="relative h-10 w-[120px] mx-auto mb-2">
          <Image src={'/logo.svg'} alt="" fill />
        </div>
        <Input
          type="text"
          label="User name"
          labelPlacement={'outside'}
          placeholder="Enter your User name"
          className="w-80"
          value={name}
          onChange={e => setName(e.target.value)}
          classNames={{
            label: 'text-white',
            inputWrapper: '!bg-white/10 text-white',
            input: 'placeholder:text-white/30',
          }}
        />
        <Input
          label="Password"
          labelPlacement="outside"
          placeholder="Enter your password"
          classNames={{
            label: 'text-white',
            inputWrapper: '!bg-white/10 text-white',
            input: 'placeholder:text-white/30',
          }}
          endContent={
            <button
              className="focus:outline-none"
              type="button"
              onClick={toggleVisibility}
            >
              {isVisible ? (
                <Eye
                  className="text-2xl text-default-400 pointer-events-none"
                  color="#fff"
                  size={18}
                />
              ) : (
                <EyeSlash
                  className="text-2xl text-default-400 pointer-events-none"
                  color="#fff"
                  size={18}
                />
              )}
            </button>
          }
          type={isVisible ? 'text' : 'password'}
          className="w-80"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <Button type="submit" className="mt-3">
          Đăng nhập
        </Button>
      </form>
    </div>
  )
}

export default AuthLayout
