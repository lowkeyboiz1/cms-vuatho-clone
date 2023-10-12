import React from 'react'
import Link from 'next/link'
import { useDispatch, useSelector } from 'react-redux'

import { RootState } from '@/store'

import { Notification as NotiIcon } from 'iconsax-react'
import {
  Avatar,
  Badge,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from '@nextui-org/react'
import { authAction } from '@/store/slices/authSlice'

const Header = () => {
  const BreadcrumbPage = useSelector(
    (state: RootState) => state.breadcrumb.breadcrumbPage,
  )
  return (
    <header className="sticky top-0 w-full h-[70px] bg-white z-50">
      <div className="container mx-auto flex items-center justify-between h-full px-5">
        <ul id="breadcrumbs" className="flex space-x-4 ml-3">
          {BreadcrumbPage?.map((e, i) => (
            <li key={e.title} className="flex items-center">
              <div
                className={`${
                  i !== BreadcrumbPage.length - 1
                    ? 'text-base-drak-gray'
                    : 'text-base-black-1 font-semibold'
                } text-sm 13inch:text-base`}
              >
                {e.url ? (
                  <Link href={e.url}>{e.title}</Link>
                ) : (
                  <span>{e.title}</span>
                )}
              </div>
              {i !== BreadcrumbPage?.length - 1 && (
                <div className="h-2 w-2 rounded-full bg-[#D9D9D9] ml-4" />
              )}
            </li>
          ))}
        </ul>
        <div className="flex space-x-6">
          <NotiInHeader />
          <AvatarInHeader />
        </div>
      </div>
    </header>
  )
}

const NotiInHeader: React.FC = () => {
  return (
    <div>
      <Badge color="danger" shape="circle" content="" size="md">
        <div className="w-8 h-8 13inch:w-10 13inch:h-10 bg-primary-blue-2 flex place-items-center place-content-center rounded-md">
          <NotiIcon size={24} className="text-[#5A9DFF]" />
        </div>
      </Badge>
    </div>
  )
}

const AvatarInHeader: React.FC = () => {
  const userInfo = useSelector((state: RootState) => state.auth.userInfo)

  const dispatch = useDispatch()
  const handleLogout = () => {
    localStorage.removeItem('access_token')
    dispatch(authAction.setLogout())
  }
  return (
    <Dropdown placement="bottom-end">
      <DropdownTrigger>
        <Button
          variant="light"
          color="primary"
          startContent={
            <Avatar
              src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
              className="w-8 h-8 13inch:w-10 13inch:h-10"
            />
          }
          radius="full"
          className="h-fit font-semibold text-xs 13inch:text-base text-base-black-1 pl-0"
        >
          {userInfo.full_name}
        </Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Account Information">
        <DropdownItem key="edit">Chỉnh sửa thông tin</DropdownItem>
        <DropdownItem key="log-out" onClick={handleLogout}>
          Đăng xuất
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  )
}

export default Header
